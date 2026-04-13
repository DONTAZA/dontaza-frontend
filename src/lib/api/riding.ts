import apiClient from './client'
import API_ENDPOINTS from './endpoints'
import type {
  RentRequest,
  RentResponse,
  CurrentRidingResponse,
  ReturnRequest,
  ReturnResponse,
  VerifyResponse,
  CancelRidingResponse,
} from '@/types/riding'

export async function rentBike(body: RentRequest): Promise<RentResponse> {
  return apiClient.post<RentResponse>(API_ENDPOINTS.RIDING.RENT, body)
}

export async function getCurrentRiding(): Promise<CurrentRidingResponse> {
  return apiClient.get<CurrentRidingResponse>(API_ENDPOINTS.RIDING.CURRENT)
}

export async function verifyRiding(): Promise<VerifyResponse> {
  return apiClient.get<VerifyResponse>(API_ENDPOINTS.RIDING.VERIFY)
}

export async function returnBike(body: ReturnRequest): Promise<ReturnResponse> {
  return apiClient.post<ReturnResponse>(API_ENDPOINTS.RIDING.RETURN, body)
}

export async function cancelRiding(): Promise<CancelRidingResponse> {
  return apiClient.patch<CancelRidingResponse>(API_ENDPOINTS.RIDING.CANCEL)
}
