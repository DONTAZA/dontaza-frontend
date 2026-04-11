import apiClient from './client'
import API_ENDPOINTS from './endpoints'
import type { PointsMe } from '@/types/points'

export function getPointsMe() {
  return apiClient.get<PointsMe>(API_ENDPOINTS.POINTS.ME)
}
