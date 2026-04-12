import { useState, useEffect, useCallback, useRef } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import RingChart from '@/components/home/RingChart'
import HomeHeader from '@/components/home/HomeHeader'
import StartButton from '@/components/home/StartButton'
import EndAlert from '@/components/home/EndAlert'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { getCurrentPosition, requestGeolocationPermission } from '@/hooks/useGeolocation'
import useStartRide from '@/hooks/useStartRide'
import useEndRide from '@/hooks/useEndRide'
import useVerifyRiding from '@/hooks/useVerifyRiding'
import useCurrentRiding from '@/hooks/useCurrentRiding'
import useRidingStore from '@/stores/ridingStore'

const VERIFY_SECONDS = 300 // 5분
const MAX_EARN_SECONDS = 1200 // 20분

const MESSAGES_BEFORE = [
  '대여를 검증하고 있어요',
  '5분 뒤부터 라이딩을 종료할 수 있어요',
  '종료 시 포인트가 적립돼요',
]
const MESSAGES_AFTER = [
  '자전거 반납 후 종료하기를 눌러주세요',
  '라이딩 종료 후 포인트를 적립하세요',
]

function computeElapsed(rentedAt: string, now: number): number {
  const raw = Math.floor((now - new Date(rentedAt).getTime()) / 1000)
  return Math.max(0, Math.min(raw, MAX_EARN_SECONDS))
}

export default function Home() {
  const rentedAt = useRidingStore((s) => s.rentedAt)
  const verified = useRidingStore((s) => s.verified)
  const startRiding = useRidingStore((s) => s.start)
  const setVerified = useRidingStore((s) => s.setVerified)
  const resetRiding = useRidingStore((s) => s.reset)
  const queryClient = useQueryClient()

  const [now, setNow] = useState(() => Date.now())
  const [claimedPoints, setClaimedPoints] = useState(0)
  const [msgIndex, setMsgIndex] = useState(0)
  const [verifyFailed, setVerifyFailed] = useState(false)
  // 서버 복원 시 verify 완료 전까지 startRiding을 지연시킬 임시 보관용
  const pendingRentedAtRef = useRef<string | null>(null)
  // verify 자동 트리거 1회 제한 (실패 시 무한 루프 방지)
  const verifyAttemptedRef = useRef(false)

  const riding = rentedAt !== null
  const elapsedSec = rentedAt ? computeElapsed(rentedAt, now) : 0
  const isVerifying = elapsedSec < VERIFY_SECONDS
  const messages = isVerifying ? MESSAGES_BEFORE : MESSAGES_AFTER

  const startRide = useStartRide()
  const endRide = useEndRide()
  const verify = useVerifyRiding({
    onFailure: () => {
      pendingRentedAtRef.current = null
      setVerifyFailed(true)
    },
  })

  // 5분 경과 시점에 verify API 1회 호출
  const verifyMutate = verify.mutate

  // 페이지 진입 시 서버에 진행 중인 라이딩 조회
  const { data: currentRiding } = useCurrentRiding()
  useEffect(() => {
    if (!currentRiding?.active || !currentRiding.rentedAt) return
    const rentedAt = currentRiding.rentedAt

    if (currentRiding.status === 'IN_PROGRESS') {
      // 이미 검증 완료된 세션 → 바로 복원
      startRiding(rentedAt)
      setVerified()
      return
    }

    // WAITING_VERIFICATION
    const elapsed = computeElapsed(rentedAt, Date.now())
    if (elapsed >= VERIFY_SECONDS && currentRiding.verifyAvailable) {
      if (verifyAttemptedRef.current) return
      verifyAttemptedRef.current = true
      // 5분 경과 + 미검증 → verify 후 startRiding (RingChart 깜빡임 방지)
      pendingRentedAtRef.current = rentedAt
      verifyMutate()
    } else {
      // 아직 5분 미만 → store 복원만, 타이머 effect가 5분 시점에 verify 호출
      startRiding(rentedAt)
    }
  }, [currentRiding, startRiding, setVerified, verifyMutate])

  // 복원 경로의 verify 완료 처리: 성공 시 startRiding, 실패는 useVerifyRiding이 처리
  useEffect(() => {
    if (!pendingRentedAtRef.current) return
    if (verify.isSuccess) {
      if (verify.data?.verified) {
        startRiding(pendingRentedAtRef.current)
      }
      pendingRentedAtRef.current = null
    } else if (verify.isError) {
      pendingRentedAtRef.current = null
    }
  }, [verify.isSuccess, verify.isError, verify.data, startRiding])

  // 5분 경과 시점에 verify API 1회 호출 (verified는 store에서 관리 → 리마운트 후에도 유지)
  useEffect(() => {
    if (!riding || isVerifying || verified) return
    if (verifyAttemptedRef.current) return
    verifyAttemptedRef.current = true
    verifyMutate()
  }, [riding, isVerifying, verified, verifyMutate])

  useEffect(() => {
    requestGeolocationPermission()
  }, [])

  // rentedAt이 있을 때만 매초 now 업데이트 → elapsedSec은 렌더 중 파생
  useEffect(() => {
    if (!rentedAt) return
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [rentedAt])

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

  const handleEndRide = useCallback(async () => {
    if (!riding) return
    try {
      const pos = await getCurrentPosition()
      const earnedPoints = Math.min(Math.floor((elapsedSec / 60) * 5), 100)
      endRide.mutate({ lat: pos.lat, lng: pos.lng, earnedPoints })
    } catch {
      toast.error('위치를 확인할 수 없습니다. GPS를 확인해주세요.')
    }
  }, [riding, elapsedSec, endRide])

  const handleClaim = useCallback((points: number) => {
    setClaimedPoints((prev) => prev + points)
  }, [])

  const handleVerifyRetry = useCallback(() => {
    setVerifyFailed(false)
    verifyAttemptedRef.current = true
    verifyMutate()
  }, [verifyMutate])

  const handleVerifyCancel = useCallback(() => {
    setVerifyFailed(false)
    verifyAttemptedRef.current = false
    resetRiding()
    queryClient.removeQueries({ queryKey: ['riding', 'current'] })
  }, [resetRiding, queryClient])

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <HomeHeader />

      <AlertDialog open={verifyFailed} onOpenChange={setVerifyFailed}>
        <AlertDialogContent size="sm">
          <AlertDialogHeader className="py-2">
            <AlertDialogTitle>라이딩 검증 실패</AlertDialogTitle>
            <AlertDialogDescription>
              대여 검증에 실패했습니다. 다시 시도하시겠어요?
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="bg-transparent border-t-0 py-3 gap-2">
            <AlertDialogAction
              variant="outline"
              onClick={handleVerifyCancel}
              className="rounded-sm border-white/30 px-5 text-white/70"
            >
              취소
            </AlertDialogAction>
            <AlertDialogAction
              variant="outline"
              onClick={handleVerifyRetry}
              className="rounded-sm border-neon-mint/60 px-5 text-neon-mint"
            >
              재시도
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="flex flex-1 flex-col overflow-hidden p-4">
        {!riding || verifyFailed ? (
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
            <EndAlert
              onConfirm={handleEndRide}
              disabled={isVerifying}
              isPending={endRide.isPending}
            />
          </div>
        )}
      </div>
    </div>
  )
}
