import CustomAlert from '@/components/common/CustomAlert'

interface DeleteAccountAlertProps {
  onConfirm: () => void
  isPending?: boolean
}

export default function DeleteAccountAlert({ onConfirm, isPending }: DeleteAccountAlertProps) {
  return (
    <CustomAlert
      trigger={(open) => (
        <button
          type="button"
          disabled={isPending}
          onClick={open}
          className="text-sm text-muted-foreground/80 underline underline-offset-4 disabled:opacity-50"
        >
          회원탈퇴
        </button>
      )}
      title="회원탈퇴 하시겠습니까?"
      description={'탈퇴 시 모든 정보와 포인트가 삭제되며\n복구할 수 없습니다.'}
      descriptionClassName="break-keep leading-relaxed"
      confirmLabel="탈퇴하기"
      onConfirm={onConfirm}
    />
  )
}
