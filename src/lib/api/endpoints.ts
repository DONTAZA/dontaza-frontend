const API_ENDPOINTS = {
  AUTH: {
    KAKAO_LOGIN: '/auth/kakao',
    AGREE: '/auth/agree',
    LOGOUT: '/auth/logout',
    WITHDRAW: '/auth/withdraw',
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
    VERIFY: '/riding/verify',
    RETURN: '/riding/return',
    CANCEL: '/riding/cancel',
  },
  POINTS: {
    ME: '/points/me',
  },
} as const

export default API_ENDPOINTS
