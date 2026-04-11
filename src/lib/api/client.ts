import useAuthStore from '@/stores/authStore';
import type { ApiError, ApiErrorResponse, ApiResponse } from '@/types/api';

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'https://api.cashbike.io/api';

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    const token = useAuthStore.getState().accessToken;
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  private async tryRefreshToken(): Promise<boolean> {
    const storedRefreshToken = useAuthStore.getState().refreshToken
    if (!storedRefreshToken) return false

    try {
      const response = await fetch(`${this.baseUrl}/auth/token/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken: storedRefreshToken }),
      })
      if (!response.ok) return false

      const data = await response.json()
      useAuthStore.getState().setToken(data.data.accessToken)
      useAuthStore.getState().setRefreshToken(data.data.refreshToken)
      return true
    } catch {
      return false
    }
  }

  private async handleResponse<T>(response: Response, retryFn?: () => Promise<Response>): Promise<T> {
    if (response.status === 401) {
      if (retryFn) {
        const refreshed = await this.tryRefreshToken()
        if (refreshed) {
          const retried = await retryFn()
          return this.handleResponse<T>(retried) // retryFn 없이 호출 → 무한 루프 방지
        }
      }
      useAuthStore.getState().logout()
      window.location.hash = '/login'
      throw new Error('Unauthorized')
    }

    if (!response.ok) {
      const errorResponse: ApiErrorResponse | null = await response
        .json()
        .catch(() => null);

      const error: ApiError = {
        status: response.status,
        code: errorResponse?.error.code,
        message: errorResponse?.error.message ?? response.statusText,
      };

      throw error;
    }

    if (response.status === 204) {
      return undefined as T;
    }

    const data: ApiResponse<T> = await response.json();
    return data.data;
  }

  async get<T>(path: string): Promise<T> {
    const fetchFn = () => fetch(`${this.baseUrl}${path}`, { method: 'GET', headers: this.getHeaders() })
    return this.handleResponse<T>(await fetchFn(), fetchFn)
  }

  async post<T>(path: string, body?: unknown): Promise<T> {
    const fetchFn = () =>
      fetch(`${this.baseUrl}${path}`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: body ? JSON.stringify(body) : undefined,
      })
    return this.handleResponse<T>(await fetchFn(), fetchFn)
  }

  async put<T>(path: string, body?: unknown): Promise<T> {
    const fetchFn = () =>
      fetch(`${this.baseUrl}${path}`, {
        method: 'PUT',
        headers: this.getHeaders(),
        body: body ? JSON.stringify(body) : undefined,
      })
    return this.handleResponse<T>(await fetchFn(), fetchFn)
  }

  async delete<T>(path: string): Promise<T> {
    const fetchFn = () =>
      fetch(`${this.baseUrl}${path}`, { method: 'DELETE', headers: this.getHeaders() })
    return this.handleResponse<T>(await fetchFn(), fetchFn)
  }
}

const apiClient = new ApiClient(BASE_URL)

export default apiClient
