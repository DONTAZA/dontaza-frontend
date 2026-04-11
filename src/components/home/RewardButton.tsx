import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface RewardButtonProps {
  onClick?: () => void
  disabled?: boolean
}

export default function RewardButton({ onClick, disabled }: RewardButtonProps) {
  return (
    <Button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'mt-8 flex h-auto items-center rounded-full px-8 py-3 transition-all duration-300',
        disabled
          ? 'cursor-not-allowed bg-muted text-muted-foreground opacity-60'
          : 'glass-pill shadow-[0_0_20px_rgba(245,158,11,0.3)] active:scale-[0.97]',
      )}
    >
      <span className={cn('text-base font-bold tracking-wider', !disabled && 'text-amber-400')}>
        라이딩 종료하기
      </span>
    </Button>
  )
}
