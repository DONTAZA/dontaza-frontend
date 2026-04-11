import apiClient from './client'
import API_ENDPOINTS from './endpoints'
import type { UserProfile } from '@/types/user'

export default function getUserProfile() {
  return apiClient.get<UserProfile>(API_ENDPOINTS.USER.PROFILE)
}
