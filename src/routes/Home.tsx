import { useState, useEffect, useCallback } from 'react'
import RingChart from '@/components/home/RingChart'
import Stats from '@/components/home/Stats'
import HomeHeader from '@/components/home/HomeHeader'
import { BottomNav } from '@/components/BottomNav'

const VERIFY_SECONDS = 300 // 5분
const MAX_EARN_SECONDS = 1200 // 20분

export default function Home() {
  const [riding, setRiding] = useState(false)
  const [elapsedSec, setElapsedSec] = useState(0)
  const [claimedPoints, setClaimedPoints] = useState(0)

  // 타이머 로직
  useEffect(() => {
    if (!riding) return
    const id = setInterval(() => {
      setElapsedSec((s) => {
        if (s >= MAX_EARN_SECONDS) {
          clearInterval(id)
          return s
        }
        return s + 1
      })
    }, 1000)
    return () => clearInterval(id)
  }, [riding])

  const handleStartRide = useCallback(() => {
    setRiding(true)
    setElapsedSec(0)
    setClaimedPoints(0)
  }, [])

  const handleClaim = useCallback((points: number) => {
    setClaimedPoints((prev) => prev + points)
    // 여기서 실제 API 호출 등을 통해 유저의 총 포인트를 업데이트할 수 있습니다.
  }, [])

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60)
    const s = sec % 60
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  const isVerifying = riding && elapsedSec < VERIFY_SECONDS
  const isEarning = riding && elapsedSec >= VERIFY_SECONDS && elapsedSec < MAX_EARN_SECONDS
  return (
    <div className="flex h-full flex-1 justify-center overflow-hidden bg-background">
      <div className="flex h-full w-full max-w-md flex-col">
        <HomeHeader />

        <main className="flex min-h-0 flex-1 flex-col items-center justify-center px-5">
          {!riding ? (
            /* 대여 전: 대여 버튼 */
            <div className="flex flex-col items-center">
              <p className="mb-8 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
                따릉이 대여 후 탭하세요
              </p>
              <button
                type="button"
                onClick={handleStartRide}
                className="group relative flex h-48 w-48 items-center justify-center rounded-full transition-transform active:scale-95"
              >
                <div className="absolute inset-0 animate-[spin_20s_linear_infinite] rounded-full border-2 border-dashed border-neon-mint/30" />
                <div className="absolute inset-3 rounded-full border border-neon-mint/50 neon-glow-mint" />
                <div className="absolute inset-6 flex items-center justify-center rounded-full bg-neon-mint/10 backdrop-blur-sm">
                  <div className="text-center">
                    <span className="text-glow-mint block text-lg font-black tracking-wider text-neon-mint">
                      자전거
                    </span>
                    <span className="text-glow-mint block text-lg font-black tracking-wider text-neon-mint">
                      대여하기
                    </span>
                  </div>
                </div>
              </button>
            </div>
          ) : (
            /* 주행 중: 상태 정보 + RingChart + Stats */
            <div className="flex w-full flex-1 flex-col">
              <div className="mt-4 flex h-12 items-center justify-center">
                {isVerifying && (
                  <div className="glass-surface flex items-center gap-2 rounded-full border border-amber-500/30 px-4 py-2">
                    <div className="h-2 w-2 animate-pulse rounded-full bg-amber-500" />
                    <span className="text-xs font-semibold tracking-wide text-amber-400">
                      검증 중 · 적립 대기 {formatTime(VERIFY_SECONDS - elapsedSec)}
                    </span>
                  </div>
                )}
                {isEarning && (
                  <div className="glass-surface flex items-center gap-2 rounded-full border border-neon-mint/30 px-4 py-2">
                    <div className="h-2 w-2 animate-pulse rounded-full bg-neon-mint" />
                    <span className="text-xs font-semibold tracking-wide text-neon-mint">
                      적립 중 · 남은 시간 {formatTime(MAX_EARN_SECONDS - elapsedSec)}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex min-h-0 flex-1 items-center justify-center">
                <RingChart
                  elapsedSec={elapsedSec}
                  claimedPoints={claimedPoints}
                  onClaim={handleClaim}
                />
              </div>
              <div className="pb-5">
                <Stats elapsedSec={elapsedSec} />
              </div>
            </div>
          )}
        </main>
        <BottomNav />
      </div>
    </div>
  )
}
