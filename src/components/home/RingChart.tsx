import RewardButton from './RewardButton'

const MAX_REWARDED_MINUTES = 20
const MAX_REWARDED_POINTS = 100
const VERIFY_MINUTES = 5

interface RingChartProps {
  elapsedSec: number
  claimedPoints: number
  onClaim: (points: number) => void
}

export default function RingChart({ elapsedSec, claimedPoints, onClaim }: RingChartProps) {
  const currentMinutes = Math.floor(elapsedSec / 60)

  const isVerifying = elapsedSec < VERIFY_MINUTES * 60
  const circumference = 2 * Math.PI * 100
  // 초 단위로 부드럽게 진행률 계산 (전체 20분 기준)
  const progress = Math.min(elapsedSec / (MAX_REWARDED_MINUTES * 60), 1)
  const progressDash = circumference * progress

  // 포인트 계산: 전체 20분 100포인트 기준 (분당 5포인트)
  const pointsPerSec = MAX_REWARDED_POINTS / (MAX_REWARDED_MINUTES * 60)
  const totalEarned = Math.floor(Math.min(elapsedSec, MAX_REWARDED_MINUTES * 60) * pointsPerSec)

  // 현재 화면에 표시할 포인트 = 전체 쌓인 포인트 - 이미 적립한 포인트
  const earnedPoints = Math.max(0, totalEarned - claimedPoints)

  return (
    <div className="relative flex flex-col items-center">
      <div
        className={`absolute h-64 w-64 rounded-full blur-3xl transition-colors duration-1000 ${
          isVerifying ? 'bg-amber-500/5' : 'bg-neon-mint/5'
        }`}
      />
      <div className="absolute h-48 w-48 rounded-full bg-electric-purple/5 blur-3xl" />

      <div className="relative">
        <svg width="240" height="240" viewBox="0 0 250 250" className="relative z-10">
          <circle
            cx="125"
            cy="125"
            r="100"
            fill="none"
            stroke="hsl(230 10% 14%)"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <circle
            cx="125"
            cy="125"
            r="100"
            fill="none"
            stroke={isVerifying ? 'url(#yellowGradient)' : 'url(#mintGradient)'}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={`${progressDash} ${circumference}`}
            strokeDashoffset="0"
            className="transition-all duration-300 ease-linear"
            style={{
              filter: isVerifying ? 'none' : 'drop-shadow(0 0 8px hsl(155 100% 50% / 0.4))',
              transform: 'rotate(-90deg)',
              transformOrigin: '125px 125px',
            }}
          />
          <circle
            cx="125"
            cy="125"
            r="85"
            fill="none"
            stroke="hsl(230 10% 14%)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="mintGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(155 100% 50%)" />
              <stop offset="100%" stopColor="hsl(155 100% 70%)" />
            </linearGradient>
            <linearGradient id="yellowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--color-amber-500)" />
              <stop offset="100%" stopColor="var(--color-yellow-400)" />
            </linearGradient>
          </defs>
        </svg>

        <div className="absolute inset-0 z-20 flex flex-col gap-1 items-center justify-center">
          <span className="mb-0.5 text-[10px] font-medium tracking-widest text-muted-foreground uppercase">
            {isVerifying ? '검증 중' : '적립 가능 시간'}
          </span>
          <span
            className={`leading-none tracking-tight text-4xl font-black italic text-foreground transition-all duration-500 ${
              isVerifying ? '' : 'text-glow-mint'
            }`}
          >
            {currentMinutes}
          </span>
          <span
            className={`text-base font-light tracking-widest transition-colors duration-500 ${
              isVerifying ? 'text-amber-500' : 'text-neon-mint'
            }`}
          >
            min
          </span>
        </div>
      </div>

      <RewardButton earnedPoints={earnedPoints} onClaim={onClaim} isVerifying={isVerifying} />
    </div>
  )
}
