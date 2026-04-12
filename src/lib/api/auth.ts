import apiClient from './client'
import API_ENDPOINTS from './endpoints'
import type { KakaoLoginResponse } from '@/types/auth'

export interface AgreeToTermsRequest {
  termsOfService: boolean
  privacyPolicy: boolean
  locationTerms: boolean
}

export function kakaoLogin(authorizationCode: string, redirectUri: string) {
  return apiClient.post<KakaoLoginResponse>(API_ENDPOINTS.AUTH.KAKAO_LOGIN, {
    authorizationCode,
    redirectUri,
  })
}

export function agreeToTerms(data: AgreeToTermsRequest) {
  return apiClient.post<void>(API_ENDPOINTS.AUTH.AGREE, data)
}

export function logout() {
  return apiClient.delete<void>(API_ENDPOINTS.AUTH.LOGOUT)
}
