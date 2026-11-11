<script setup>
import { ref } from 'vue'

defineProps({
    rows: { type: Array, default: () => [] }
})

defineEmits(['edit', 'remove'])

const filter = ref('')

const columns = [
    { name: 'nome', label: 'Nome', field: 'nome', align: 'left', sortable: true },
    { name: 'email', label: 'E-mail', field: 'email', align: 'left', sortable: true },
    { name: 'endereco', label: 'Endereço', field: 'endereco', align: 'left' },
    { name: 'ativo', label: 'Status', field: 'ativo', align: 'center', sortable: true },
    { name: 'acoes', label: '', field: 'acoes', align: 'right' }
]
</script>
<template>
    <q-card flat bordered class="rounded-borders-lg">
        <q-table flat :rows="rows" :columns="columns" row-key="id" :filter="filter" :pagination="{ rowsPerPage: 8 }"
            rows-per-page-label="Linhas por página" no-data-label="Nenhum cliente encontrado"
            no-results-label="Nenhum resultado para a busca">
            <template #top>
                <q-input v-model="filter" dense outlined clearable placeholder="Buscar cliente..." class="full-width"
                    style="max-width: 320px">
                    <template #prepend><q-icon name="search" /></template>
                </q-input>
            </template>

            <template #body-cell-nome="props">
                <q-td :props="props">
                    <div class="row items-center no-wrap">
                        <q-avatar size="34px" color="primary" text-color="white" class="q-mr-sm">
                            {{ props.row.nome.charAt(0).toUpperCase() }}
                        </q-avatar>
                        <span class="text-weight-medium">{{ props.row.nome }}</span>
                    </div>
                </q-td>
            </template>

            <template #body-cell-ativo="props">
                <q-td :props="props">
                    <q-badge :color="props.row.ativo ? 'positive' : 'grey-5'"
                        :label="props.row.ativo ? 'Ativo' : 'Inativo'" rounded class="q-px-sm q-py-xs" />
                </q-td>
            </template>

            <template #body-cell-acoes="props">
                <q-td :props="props">
                    <q-btn flat round dense color="primary" icon="edit" @click="$emit('edit', props.row)">
                        <q-tooltip>Editar</q-tooltip>
                    </q-btn>
                    <q-btn flat round dense color="negative" icon="delete_outline" @click="$emit('remove', props.row)">
                        <q-tooltip>Remover</q-tooltip>
                    </q-btn>
                </q-td>
            </template>
        </q-table>
    </q-card>
</template>
