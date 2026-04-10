import { apiClient } from './client'
import { API_ENDPOINTS } from './endpoints'
import type { KakaoLoginResponse } from '@/types/auth'

const REDIRECT_URI = 'dontaza://oauth'

export function kakaoLogin(authorizationCode: string) {
  return apiClient.post<KakaoLoginResponse>(API_ENDPOINTS.AUTH.KAKAO_LOGIN, {
    authorizationCode,
    redirectUri: REDIRECT_URI,
  })
}
