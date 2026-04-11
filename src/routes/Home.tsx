import { useState, useEffect, useCallback } from 'react'
import RingChart from '@/components/home/RingChart'
import HomeHeader from '@/components/home/HomeHeader'
import StationPinInput from '@/components/home/StationPinInput'
import RewardButton from '@/components/home/RewardButton'

const VERIFY_SECONDS = 300 // 5분
const MAX_EARN_SECONDS = 1200 // 20분

const MESSAGES_BEFORE = [
  '대여를 검증하고 있어요',
  '5분 뒤부터 라이딩을 종료할 수 있어요',
  '종료 시 포인트가 적립돼요',
]
const MESSAGES_AFTER = ['종료하기를 눌러 반납하세요', '반납하여 포인트를 적립하세요']

export default function Home() {
  const [riding, setRiding] = useState(false)
  const [ending, setEnding] = useState(false)
  const [elapsedSec, setElapsedSec] = useState(0)
  const [claimedPoints, setClaimedPoints] = useState(0)
  const [msgIndex, setMsgIndex] = useState(0)

  const isVerifying = elapsedSec < VERIFY_SECONDS
  const messages = isVerifying ? MESSAGES_BEFORE : MESSAGES_AFTER

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

  useEffect(() => {
    const timer = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % messages.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [messages.length])

  const handleStartRide = useCallback((_pin: string) => {
    setRiding(true)
    setElapsedSec(0)
    setClaimedPoints(0)
  }, [])

  const handleEndRide = useCallback(() => {
    setRiding(false)
    setElapsedSec(0)
    setClaimedPoints(0)
  }, [])

  const handleClaim = useCallback((points: number) => {
    setClaimedPoints((prev) => prev + points)
  }, [])

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <HomeHeader />

      <div className="flex flex-1 flex-col overflow-hidden p-4">
        {!riding ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-6">
            <StationPinInput onComplete={handleStartRide} />
          </div>
        ) : ending ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4">
            <StationPinInput
              title="라이딩을 종료하시겠습니까?"
              subtitle="대여소 번호 4자리를 입력해주세요"
              onComplete={() => {
                setEnding(false)
                handleEndRide()
              }}
            />
            <button
              onClick={() => setEnding(false)}
              className="rounded-full border border-amber-400/50 px-8 py-3 text-base font-bold tracking-wider text-amber-400 transition-all duration-300 active:scale-[0.97]"
            >
              취소
            </button>
          </div>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center pt-8">
            <div className="h-8 mb-4 overflow-hidden w-full text-center">
              <span
                key={msgIndex}
                className="text-sm font-medium tracking-wide text-foreground/80 animate-in fade-in slide-in-from-right-4 duration-700 block"
              >
                {messages[msgIndex]}
              </span>
            </div>
            <RingChart
              elapsedSec={elapsedSec}
              claimedPoints={claimedPoints}
              onClaim={handleClaim}
            />
            <RewardButton
              onEndRide={() => setEnding(true)}
              disabled={elapsedSec < VERIFY_SECONDS}
            />
          </div>
        )}
      </div>
    </div>
  )
}
