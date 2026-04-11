import AlertDialog from '@/components/common/AlertDialog'

interface LogoutAlertProps {
  onConfirm: () => void
  isPending?: boolean
}

export default function LogoutAlert({ onConfirm, isPending }: LogoutAlertProps) {
  return (
    <AlertDialog
      trigger={(open) => (
        <button
          type="button"
          disabled={isPending}
          onClick={open}
          className="text-sm text-muted-foreground/80 underline underline-offset-4 disabled:opacity-50"
        >
          로그아웃
        </button>
      )}
      title="로그아웃 하시겠습니까?"
      description="확인을 누르면 로그아웃됩니다."
      onConfirm={onConfirm}
    />
  )
}
