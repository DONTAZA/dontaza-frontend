const API_ENDPOINTS = {
  AUTH: {
    KAKAO_LOGIN: '/auth/kakao',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/token/refresh',
  },
  USER: {
    PROFILE: '/users/me',
  },
  STATION: {
    NEARBY: '/stations/nearby',
    DETAIL: (stationId: string) => `/stations/${stationId}`,
  },
  RIDING: {
    RENT: '/riding/rent',
    CURRENT: '/riding/current',
    VERIFY: (ridingId: number) => `/riding/${ridingId}/verify`,
    RETURN: (ridingId: number) => `/riding/${ridingId}/return`,
  },
  POINTS: {
    ME: '/points/me',
    CLAIM: '/points/claim',
    HISTORY: '/points/history',
  },
} as const

export default API_ENDPOINTS
