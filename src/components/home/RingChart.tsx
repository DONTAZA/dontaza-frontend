const MAX_REWARDED_MINUTES = 20
const MAX_REWARDED_POINTS = 100
const POINTS_PER_MINUTE = 5
const VERIFY_MINUTES = 5

interface RingChartProps {
  elapsedSec: number
  claimedPoints: number
  onClaim: (points: number) => void
}

export default function RingChart({
  elapsedSec,
  claimedPoints: _claimedPoints,
  onClaim: _onClaim,
}: RingChartProps) {
  const currentMinutes = Math.floor(elapsedSec / 60)
  const currentSeconds = elapsedSec % 60
  const formattedTime = `${currentMinutes.toString().padStart(2, '0')}:${currentSeconds.toString().padStart(2, '0')}`

  const isVerifying = elapsedSec < VERIFY_MINUTES * 60

  const earnedPoints = Math.min(
    Math.floor((elapsedSec / 60) * POINTS_PER_MINUTE),
    MAX_REWARDED_POINTS
  )

  const circumference = 2 * Math.PI * 130
  // 초 단위로 부드럽게 진행률 계산 (전체 20분 기준)
  const progress = Math.min(elapsedSec / (MAX_REWARDED_MINUTES * 60), 1)
  const progressDash = circumference * progress

  return (
    <div className="relative flex flex-col items-center">
      <div
        className={`absolute h-80 w-80 rounded-full blur-3xl transition-colors duration-1000 ${
          isVerifying ? 'bg-amber-500/5' : 'bg-neon-mint/5'
        }`}
      />
      <div className="absolute h-64 w-64 rounded-full bg-electric-purple/5 blur-3xl" />

      <div className="relative">
        <svg width="300" height="300" viewBox="0 0 320 320" className="relative z-10">
          <circle
            cx="160"
            cy="160"
            r="130"
            fill="none"
            stroke="hsl(230 10% 14%)"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <circle
            cx="160"
            cy="160"
            r="130"
            fill="none"
            stroke={isVerifying ? 'url(#yellowGradient)' : 'url(#mintGradient)'}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${progressDash} ${circumference}`}
            strokeDashoffset="0"
            className="transition-all duration-300 ease-linear"
            style={{
              filter: 'none',
              transform: 'rotate(-90deg)',
              transformOrigin: '160px 160px',
            }}
          />
          <circle
            cx="160"
            cy="160"
            r="110"
            fill="none"
            stroke="hsl(230 10% 14%)"
            strokeWidth="4"
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
        <div className="absolute inset-0 z-20 flex flex-col gap-2 items-center justify-center">
          <span
            className={`leading-none tracking-tight text-4xl font-black italic transition-all duration-500 ${
              isVerifying ? 'text-amber-400' : 'text-mint text-neon-mint'
            }`}
          >
            {earnedPoints} P
          </span>
          <span
            className={`leading-none tracking-tight text-lg font-bold tabular-nums transition-all duration-500 ${
              isVerifying ? 'text-amber-400/80' : 'text-neon-mint/70'
            }`}
          >
            {formattedTime}
          </span>
        </div>
      </div>
    </div>
  )
}
