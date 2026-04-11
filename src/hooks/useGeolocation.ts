import { Capacitor } from '@capacitor/core'
import { Geolocation } from '@capacitor/geolocation'

export interface GeoPosition {
  lat: number
  lng: number
}

export class GeolocationError extends Error {
  readonly code?: number

  constructor(message: string, code?: number) {
    super(message)
    this.name = 'GeolocationError'
    this.code = code
  }
}

/**
 * 위치 권한을 사전 요청합니다. 홈 진입 시점에 호출하세요.
 * - Native: Geolocation.requestPermissions()
 * - PWA: getCurrentPosition()으로 브라우저 권한 팝업 트리거
 */
export async function requestGeolocationPermission(): Promise<void> {
  if (Capacitor.isNativePlatform()) {
    const permission = await Geolocation.checkPermissions()
    if (permission.location === 'prompt' || permission.location === 'prompt-with-rationale') {
      await Geolocation.requestPermissions()
    }
    return
  }

  // PWA: 브라우저는 실제 위치 요청을 해야만 권한 팝업이 뜸
  await new Promise<void>((resolve) => {
    if (!navigator.geolocation) {
      resolve()
      return
    }
    navigator.geolocation.getCurrentPosition(
      () => resolve(),
      () => resolve(), // 거부해도 에러 무시 (이후 대여 시점에 재처리)
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
    )
  })
}

/**
 * 현재 위치를 한 번 가져옵니다.
 * - Native (iOS/Android): @capacitor/geolocation
 * - PWA: navigator.geolocation
 *
 * enableHighAccuracy: true → GPS 우선 (위도·경도 정확도 향상)
 * timeout: 10000ms
 */
export async function getCurrentPosition(): Promise<GeoPosition> {
  if (Capacitor.isNativePlatform()) {
    const permission = await Geolocation.checkPermissions()
    if (permission.location === 'denied') {
      throw new GeolocationError('위치 권한이 거부되었습니다. 설정에서 허용해주세요.')
    }
    if (permission.location === 'prompt' || permission.location === 'prompt-with-rationale') {
      const result = await Geolocation.requestPermissions()
      if (result.location === 'denied') {
        throw new GeolocationError('위치 권한이 거부되었습니다. 설정에서 허용해주세요.')
      }
    }

    const pos = await Geolocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 10000,
    })
    return {
      lat: pos.coords.latitude,
      lng: pos.coords.longitude,
    }
  }

  // PWA: Web Geolocation API
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new GeolocationError('이 기기는 위치 서비스를 지원하지 않습니다.'))
      return
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        resolve({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        })
      },
      (err) => {
        const messages: Record<number, string> = {
          1: '위치 권한이 거부되었습니다. 브라우저 설정에서 허용해주세요.',
          2: '위치를 확인할 수 없습니다. GPS 신호를 확인해주세요.',
          3: '위치 요청 시간이 초과되었습니다.',
        }
        reject(new GeolocationError(messages[err.code] ?? err.message, err.code))
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
    )
  })
}
