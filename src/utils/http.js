// Wrapper para requisições

const BASE_URL = 'http://localhost:3001';

const DEFAULT_TIMEOUT = 15000


// CONTROLE GLOBAL PARA ERRO
export class ApiError extends Error {
    constructor(message, status = 0, data = null) {
        super(message);
        this.name = "AppError";
        this.status = status;
        this.data = data;       
    }
}

async function request(url, method = 'GET', payload, options = {}) {
    const controller = new AbortController();

    const timeoutId = setTimeout(() => controller.abort(), options.timeout ?? DEFAULT_TIMEOUT);

    const headers = {
        Accept: 'application/json',
        ...options.headers
    }

    // Exemplo de token de autenticação:
    // const token = localStorage.getItem('token')
    // if (token) headers.Authorization = `Bearer ${token}`

    const config = { method, headers, signal: options.signal ?? controller.signal }

    if(payload !== undefined) {
        headers['Content-Type'] = 'application/json'
        config.body = JSON.stringify(payload)
    }

    try {
        const response = await fetch(`${BASE_URL}${url}`, config);

        // 204 No Content (Comum em DELETE)
        const data = response.status === 204 ? null : await response.json().catch(() => null);

        if (!response.ok) {
            throw new ApiError(data?.message || `Erro ${response.status}`, data);
        }

        return data;
    } catch (error) {
        if(error instanceof ApiError) throw error;
    if(error.name === 'AbortError') throw new ApiError('A requisição demorou demais. Tente novamente mais tarde')
        throw new ApiError('Não foi possivel conectar ao servidor')
    } finally {
        clearTimeout(timeoutId)
    }
}

export const http = {
    get: (url, options) => request(url, 'GET', undefined, options),
    post: (url, payload, options) => request(url, 'POST', payload, options),
    put: (url, payload, options) => request(url, 'PUT', payload, options),
    patch: (url, payload, options) => request(url, 'PATCH', payload, options),
    delete: (url, payload, options) => request(url, 'DELETE', undefined, options)
}