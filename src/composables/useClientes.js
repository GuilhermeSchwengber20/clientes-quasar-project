import { ref, computed } from 'vue'
import { clientesService } from '../services/clientesService'

export function useClientes() {
  const clientes = ref([])
  const status = ref('loading') // 'loading' | 'error' | 'success'
  const errorMessage = ref('')
  const saving = ref(false)

  const isEmpty = computed(() => status.value === 'success' && clientes.value.length === 0)

  async function carregar() {
    status.value = 'loading'
    errorMessage.value = ''
    try {
      clientes.value = await clientesService.listar()
      status.value = 'success'
    } catch (err) {
      errorMessage.value = err?.message
      status.value = 'error'
    }
  }

  async function criar(payload) {
    saving.value = true
    try {
      const novo = await clientesService.criar(payload)
      clientes.value.unshift(novo)
      return novo
    } finally {
      saving.value = false
    }
  }

   async function atualizar(id, payload) {
    saving.value = true
    try {
      const atualizado = await clientesService.atualizar(id, payload)
      
      return atualizado
    } finally {
      saving.value = false
    }
  }

  async function remover(id) {
    await clientesService.remover(id)
    clientes.value = clientes.value.filter((c) => c.id !== id)
  }

  return { clientes, status, errorMessage, saving, isEmpty, carregar, criar, atualizar, remover }
}