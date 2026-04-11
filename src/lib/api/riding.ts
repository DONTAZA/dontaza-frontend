import apiClient from './client'
import API_ENDPOINTS from './endpoints'
import type {
  RentRequest,
  RentResponse,
  CurrentRidingResponse,
  ReturnRequest,
  ReturnResponse,
  VerifyResponse,
} from '@/types/riding'

export async function rentBike(body: RentRequest): Promise<RentResponse> {
  return apiClient.post<RentResponse>(API_ENDPOINTS.RIDING.RENT, body)
}

export async function getCurrentRiding(): Promise<CurrentRidingResponse> {
  return apiClient.get<CurrentRidingResponse>(API_ENDPOINTS.RIDING.CURRENT)
}

export async function verifyRiding(ridingId: number): Promise<VerifyResponse> {
  return apiClient.get<VerifyResponse>(API_ENDPOINTS.RIDING.VERIFY(ridingId))
}

export async function returnBike(ridingId: number, body: ReturnRequest): Promise<ReturnResponse> {
  return apiClient.post<ReturnResponse>(API_ENDPOINTS.RIDING.RETURN(ridingId), body)
}
