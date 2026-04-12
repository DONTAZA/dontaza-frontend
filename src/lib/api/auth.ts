import apiClient from './client'
import API_ENDPOINTS from './endpoints'
import type { KakaoLoginResponse } from '@/types/auth'

export function kakaoLogin(authorizationCode: string, redirectUri: string) {
  return apiClient.post<KakaoLoginResponse>(API_ENDPOINTS.AUTH.KAKAO_LOGIN, {
    authorizationCode,
    redirectUri,
  })
}

export function agreeToTerms() {
  return apiClient.patch<null>(API_ENDPOINTS.AUTH.AGREE)
}

export function logout() {
  return apiClient.delete<void>(API_ENDPOINTS.AUTH.LOGOUT)
}

export function withdraw() {
  return apiClient.delete<void>(API_ENDPOINTS.AUTH.WITHDRAW)
}
