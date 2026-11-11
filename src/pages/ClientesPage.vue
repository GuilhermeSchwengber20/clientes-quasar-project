<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { useClientes } from '../composables/useClientes'
import PageHeader from '../components/base/PageHeader.vue'
import StateWrapper from '../components/base/StateWrapper.vue'
import ClienteTable from '../components/clientes/ClienteTable.vue'
import ClienteFormDialog from '../components/clientes/ClienteFormDialog.vue'

const $q = useQuasar()
const { clientes, status, errorMessage, saving, isEmpty, carregar, listar, criar, atualizar, remover } =
    useClientes()

const showForm = ref(false)
const clienteSelecionado = ref(null) // null = cadastro | objeto = edição

function abrirCadastro() {
    clienteSelecionado.value = null
    showForm.value = true
}

function abrirEdicao(cliente) {
    clienteSelecionado.value = cliente
    showForm.value = true
}

async function salvar(payload) {
    const editando = !!clienteSelecionado.value

    try {
        if (editando) {
            await atualizar(clienteSelecionado.value.id, payload)
        } else {
            await criar(payload)
        }

        showForm.value = false
        $q.notify({
            type: 'positive',
            message: editando ? 'Cliente atualizado com sucesso' : 'Cliente criado com sucesso',
            position: 'top-right'
        })

        listar()
    } catch (err) {
        $q.notify({
            type: 'negative',
            message: err.message || 'Não foi possível salvar o cliente',
            position: 'top-right'
        })
    }
}

function confirmarRemocao(cliente) {
    $q.dialog({
        title: 'Remover cliente',
        message: `Deseja realmente remover <b>${cliente.nome}</b>? Essa ação não pode ser desfeita.`,
        html: true,
        persistent: true,
        ok: { label: 'Remover', color: 'negative', unelevated: true, noCaps: true },
        cancel: { label: 'Cancelar', flat: true, noCaps: true }
    }).onOk(async () => {
        try {
            await remover(cliente.id)
            $q.notify({ type: 'positive', message: 'Cliente removido', position: 'top-right' })
        } catch (err) {
            $q.notify({
                type: 'negative',
                message: err.message || 'Erro ao remover o cliente',
                position: 'top-right'
            })
        }
    })
}

onMounted(carregar)
</script>

<template>
    <q-page padding class="page-container">
        <PageHeader title="Clientes" subtitle="Gerencie os clientes cadastrados no sistema">
            <template #actions>
                <q-btn unelevated no-caps color="primary" icon="add" label="Novo cliente" class="full-width"
                    :disable="status !== 'success'" @click="abrirCadastro" />
            </template>
        </PageHeader>

        <StateWrapper :status="status" :error-message="errorMessage" @retry="carregar">
            <!-- Estado vazio -->
            <q-card v-if="isEmpty" flat bordered class="q-pa-xl text-center">
                <q-icon name="group_off" size="56px" color="grey-5" />
                <div class="text-h6 q-mt-md">Nenhum cliente cadastrado</div>
                <div class="text-body2 text-grey-7 q-mb-lg">Comece criando o seu primeiro cliente.</div>
                <q-btn unelevated no-caps color="primary" icon="add" label="Novo cliente" @click="abrirCadastro" />
            </q-card>

            <!-- Estado de sucesso -->
            <ClienteTable v-else :rows="clientes" @edit="abrirEdicao" @remove="confirmarRemocao" />
        </StateWrapper>

        <ClienteFormDialog v-model="showForm" :cliente="clienteSelecionado" :loading="saving" @save="salvar" />
    </q-page>
</template>

<style scoped>
.page-container {
    max-width: 1200px;
    margin: 0 auto;
}
</style>