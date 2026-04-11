export interface KakaoLoginResponse {
  isNewUser: boolean
  user: {
    id: number
    nickname: string
    profileImageUrl?: string
  }
}
