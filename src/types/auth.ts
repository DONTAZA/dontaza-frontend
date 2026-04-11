export interface KakaoLoginResponse {
  accessToken: string
  refreshToken: string
  isNewUser: boolean
  user: {
    id: number
    nickname: string
    profileImageUrl?: string
  }
}

export interface RefreshTokenResponse {
  accessToken: string
  refreshToken: string
}
