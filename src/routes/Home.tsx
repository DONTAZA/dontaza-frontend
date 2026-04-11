import { useState, useEffect, useCallback } from 'react'
import { toast } from 'sonner'
import RingChart from '@/components/home/RingChart'
import HomeHeader from '@/components/home/HomeHeader'
import StartButton from '@/components/home/StartButton'
import EndAlert from '@/components/home/EndAlert'
import { getCurrentPosition, requestGeolocationPermission } from '@/hooks/useGeolocation'
import useStartRide from '@/hooks/useStartRide'
import useRidingStore from '@/stores/ridingStore'

const VERIFY_SECONDS = 300 // 5분
const MAX_EARN_SECONDS = 1200 // 20분

const MESSAGES_BEFORE = [
  '대여를 검증하고 있어요',
  '5분 뒤부터 라이딩을 종료할 수 있어요',
  '종료 시 포인트가 적립돼요',
]
const MESSAGES_AFTER = ['자전거 반납 후 종료하기를 눌러주세요', '라이딩 종료 후 포인트를 적립하세요']

function computeElapsed(rentedAt: string): number {
  return Math.min(
    Math.floor((Date.now() - new Date(rentedAt).getTime()) / 1000),
    MAX_EARN_SECONDS,
  )
}

export default function Home() {
  const ridingId = useRidingStore((s) => s.ridingId)
  const rentedAt = useRidingStore((s) => s.rentedAt)

  const [elapsedSec, setElapsedSec] = useState(() => {
    const stored = useRidingStore.getState().rentedAt
    if (!stored) return 0
    return computeElapsed(stored)
  })
  const [claimedPoints, setClaimedPoints] = useState(0)
  const [msgIndex, setMsgIndex] = useState(0)

  const riding = ridingId !== null
  const isVerifying = elapsedSec < VERIFY_SECONDS
  const messages = isVerifying ? MESSAGES_BEFORE : MESSAGES_AFTER

  const startRide = useStartRide()

  useEffect(() => {
    requestGeolocationPermission()
  }, [])

  // 매초 rentedAt 기준으로 경과 시간 재계산
  useEffect(() => {
    if (!riding || !rentedAt) return
    const id = setInterval(() => {
      setElapsedSec(computeElapsed(rentedAt))
    }, 1000)
    return () => clearInterval(id)
  }, [riding, rentedAt])

  useEffect(() => {
    const timer = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % messages.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [messages.length])

  const handleStartRide = useCallback(async () => {
    try {
      const pos = await getCurrentPosition()
      startRide.mutate({ lat: pos.lat, lng: pos.lng })
    } catch {
      toast.error('위치를 확인할 수 없습니다. GPS를 확인해주세요.')
    }
  }, [startRide])

  const handleEndRide = useCallback(() => {
    // TODO: useEndRide 연동
  }, [])

  const handleClaim = useCallback((points: number) => {
    setClaimedPoints((prev) => prev + points)
  }, [])

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <HomeHeader />

      <div className="flex flex-1 flex-col overflow-hidden p-4">
        {!riding ? (
          <StartButton onStart={handleStartRide} isPending={startRide.isPending} />
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center pt-8">
            <div className="mb-4 h-8 w-full overflow-hidden text-center">
              <span
                key={msgIndex}
                className="block text-sm font-medium tracking-wide text-foreground/80 animate-in fade-in slide-in-from-right-4 duration-700"
              >
                {messages[msgIndex]}
              </span>
            </div>
            <RingChart
              elapsedSec={elapsedSec}
              claimedPoints={claimedPoints}
              onClaim={handleClaim}
            />
            <EndAlert onConfirm={handleEndRide} disabled={isVerifying} />
          </div>
        )}
      </div>
    </div>
  )
}
