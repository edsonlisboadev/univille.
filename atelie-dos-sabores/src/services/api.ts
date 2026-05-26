/**
 * api.ts — Axios instance e funções de serviço tipadas.
 *
 * Crie um `.env` na raiz com:
 *   VITE_API_URL=https://api.ateliedossabores.com.br/v1
 *   VITE_API_TOKEN=seu_token   (opcional)
 */

import axios, { AxiosError } from 'axios'

// ── Instância Axios ──────────────────────────────────────
const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ??
    'https://api.ateliedossabores.com.br/v1',
  timeout: 12_000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

// ── Request interceptor — token Bearer ──────────────────
api.interceptors.request.use((config) => {
  const token = import.meta.env.VITE_API_TOKEN as string | undefined
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// ── Response interceptor — normaliza erros ───────────────
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const serverMessage = (
      error.response?.data as { message?: string } | undefined
    )?.message

    const message =
      serverMessage ??
      error.message ??
      'Erro inesperado. Tente novamente mais tarde.'

    return Promise.reject(new Error(message))
  },
)

// ── Tipos ────────────────────────────────────────────────
export interface OrcamentoPayload {
  nome: string
  telefone: string
  dataEvento: string
  observacoes?: string
}

export interface OrcamentoResponse {
  id: string
  status: 'recebido' | 'em_analise'
  mensagem: string
}

// ── Funções de API ───────────────────────────────────────

/**
 * POST /orcamentos
 * Registra pedido de orçamento de Kit Festa.
 * Em caso de falha, o componente faz fallback para WhatsApp.
 */
export const solicitarOrcamento = async (
  payload: OrcamentoPayload,
): Promise<OrcamentoResponse> => {
  const { data } = await api.post<OrcamentoResponse>('/orcamentos', payload)
  return data
}

export default api
