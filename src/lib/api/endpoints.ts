const API_ENDPOINTS = {
  AUTH: {
    KAKAO_LOGIN: '/auth/kakao',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/token/refresh',
    AGREE: '/auth/agree',
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
  },
  POINTS: {
    ME: '/points/me',
  },
} as const

export default API_ENDPOINTS
