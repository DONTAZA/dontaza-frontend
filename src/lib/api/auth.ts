import apiClient from './client'
import API_ENDPOINTS from './endpoints'
import type { KakaoLoginResponse, RefreshTokenResponse } from '@/types/auth'

export function kakaoLogin(authorizationCode: string, redirectUri: string) {
  return apiClient.post<KakaoLoginResponse>(API_ENDPOINTS.AUTH.KAKAO_LOGIN, {
    authorizationCode,
    redirectUri,
  })
}

export function refreshToken(token: string) {
  return apiClient.post<RefreshTokenResponse>(API_ENDPOINTS.AUTH.REFRESH, {
    refreshToken: token,
  })
}

export function logout() {
  return apiClient.delete<void>(API_ENDPOINTS.AUTH.LOGOUT)
}
