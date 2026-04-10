import { Button } from '@/components/ui/button'

interface RewardButtonProps {
  earnedPoints: number
  onClaim: (points: number) => void
  isVerifying: boolean
}

export default function RewardButton({ earnedPoints, onClaim, isVerifying }: RewardButtonProps) {
  const isReady = earnedPoints > 0 && !isVerifying

  return (
    <Button
      type="button"
      variant="ghost"
      disabled={!isReady}
      onClick={() => onClaim(earnedPoints)}
      className={`relative mt-7 min-w-44 rounded-full px-8 py-6 text-base font-black tracking-wider transition-all duration-300 active:scale-[0.97] ${
        isReady
          ? 'bg-linear-to-r from-amber-500 to-yellow-400 text-black shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:from-amber-500 hover:to-yellow-400 hover:text-black cursor-pointer'
          : 'bg-muted text-muted-foreground hover:bg-muted hover:text-muted-foreground opacity-80'
      }`}
    >
      {isVerifying
        ? `${earnedPoints} 포인트 적립 대기`
        : isReady
          ? `${earnedPoints} 포인트 적립`
          : '적립 중..'}
    </Button>
  )
}
