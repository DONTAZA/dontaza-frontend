import apiClient from './client'
import API_ENDPOINTS from './endpoints'
import type { KakaoLoginResponse } from '@/types/auth'

export function kakaoLogin(authorizationCode: string, redirectUri: string) {
  return apiClient.post<KakaoLoginResponse>(API_ENDPOINTS.AUTH.KAKAO_LOGIN, {
    authorizationCode,
    redirectUri,
  })
}

export function logout() {
  return apiClient.delete<void>(API_ENDPOINTS.AUTH.LOGOUT)
}
