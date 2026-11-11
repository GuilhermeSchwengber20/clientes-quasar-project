<script setup>
import { computed, reactive, watch } from 'vue'

const model = defineModel({ type: Boolean, default: false })

const props = defineProps({
    loading: { type: Boolean, default: false },
    // null = modo cadastro | objeto = modo edição
    cliente: { type: Object, default: null }
})

const emit = defineEmits(['save'])

const isEdit = computed(() => !!props.cliente)

const initialForm = () => ({ nome: '', email: '', endereco: '', ativo: true })
const form = reactive(initialForm())

// Preenche (edição) ou limpa (cadastro) sempre que o dialog abrir
watch(model, (open) => {
    if (!open) return
    Object.assign(form, initialForm(), props.cliente ?? {})
})

function onSubmit() {
    // Emite só os campos do formulário (sem alterar o objeto original da tabela)
    const { nome, email, endereco, ativo } = form
    emit('save', { nome, email, endereco, ativo })
}
</script>
<template>
    <q-dialog v-model="model" persistent>
        <q-card style="width: 460px; max-width: 95vw" class="q-pa-sm">
            <q-card-section class="row items-center q-pb-none">
                <div class="text-h6 text-weight-bold">{{ isEdit ? 'Editar cliente' : 'Novo cliente' }}</div>
                <q-space />
                <q-btn flat round dense icon="close" :disable="loading" v-close-popup />
            </q-card-section>

            <q-form @submit.prevent="onSubmit">
                <q-card-section class="q-gutter-md">
                    <q-input v-model="form.nome" label="Nome" outlined dense autofocus
                        :rules="[(v) => !!v || 'Informe o nome']" />
                    <q-input v-model="form.email" label="E-mail" type="email" outlined dense :rules="[
                        (v) => !!v || 'Informe o e-mail',
                        (v) => /.+@.+\..+/.test(v) || 'E-mail inválido'
                    ]" />
                    <q-input v-model="form.endereco" label="Endereço" outlined dense
                        :rules="[(v) => !!v || 'Informe o endereço']" />
                    <q-toggle v-model="form.ativo" label="Cliente ativo" color="primary" />
                </q-card-section>

                <q-card-actions align="right" class="q-px-md q-pb-md">
                    <q-btn flat no-caps label="Cancelar" :disable="loading" v-close-popup />
                    <q-btn unelevated no-caps color="primary" type="submit"
                        :label="isEdit ? 'Salvar alterações' : 'Salvar'" :loading="loading" />
                </q-card-actions>
            </q-form>
        </q-card>
    </q-dialog>
</template>
