export interface RentRequest {
  lat: number
  lng: number
}

export interface RentResponse {
  ridingId: number
  nearbyStationIds: string[]
  status: 'WAITING_VERIFICATION'
}

export interface CurrentRidingResponse {
  active: boolean
  ridingId: number | null
  status: 'WAITING_VERIFICATION' | 'IN_PROGRESS' | null
  verifyAvailable: boolean
  rentedAt: string | null
}

export interface VerifyResponse {
  verified: boolean
}

export interface ReturnRequest {
  lat: number
  lng: number
  earnedPoints: number
}

export interface ReturnResponse {
  ridingId: number
  returnStationId: string
  distanceMeters: number
  durationSeconds: number
  earnedPoints: number
  status: 'COMPLETED'
}
