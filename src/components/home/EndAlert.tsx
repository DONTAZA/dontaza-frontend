import AlertDialog from '@/components/common/AlertDialog'
import RewardButton from '@/components/home/RewardButton'

interface EndAlertProps {
  onConfirm: () => void
  disabled?: boolean
  isPending?: boolean
}

export default function EndAlert({ onConfirm, disabled, isPending }: EndAlertProps) {
  return (
    <AlertDialog
      trigger={(open) => (
        <RewardButton disabled={disabled || isPending} onClick={open} />
      )}
      title="라이딩을 종료하시겠습니까?"
      description="확인을 누르면 포인트가 적립되고 종료됩니다."
      onConfirm={onConfirm}
    />
  )
}
