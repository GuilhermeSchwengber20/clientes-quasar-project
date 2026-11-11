import { http } from '../utils/http'


export const clientesService = {
  listar: () => http.get('/clientes'),
  criar: (payload) => http.post('/clientes', payload),
  atualizar: (id, payload) => http.put(`/clientes/${id}`, payload),
  remover: (id) => http.delete(`/clientes/${id}`)
}