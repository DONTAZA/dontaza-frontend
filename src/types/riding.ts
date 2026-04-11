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
  ridingId: number
  status: 'IN_PROGRESS'
  rentedAt: string
}

export interface VerifyResponse {
  verified: boolean
}

export interface ReturnRequest {
  lat: number
  lng: number
}

export interface ReturnResponse {
  ridingId: number
  returnStationId: string
  distanceMeters: number
  durationSeconds: number
  earnedPoints: number
  status: 'COMPLETED'
}
