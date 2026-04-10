export const API_ENDPOINTS = {
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
    START: '/riding/start',
    VERIFY: (ridingId: number) => `/riding/${ridingId}/verify`,
    END: (ridingId: number) => `/riding/${ridingId}/end`,
    HISTORY: '/riding/history',
  },
  POINTS: {
    ME: '/points/me',
    CLAIM: '/points/claim',
    HISTORY: '/points/history',
  },
} as const;
