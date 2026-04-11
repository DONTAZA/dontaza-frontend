import { useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import RewardButton from '@/components/home/RewardButton'

interface EndAlertProps {
  onConfirm: () => void
  disabled?: boolean
}

export default function EndAlert({ onConfirm, disabled }: EndAlertProps) {
  const [open, setOpen] = useState(false)

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <RewardButton disabled={disabled} onClick={() => setOpen(true)} />

      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogTitle>라이딩을 종료하시겠습니까?</AlertDialogTitle>
          <AlertDialogDescription>
            확인을 누르면 포인트가 적립되고 종료됩니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="rounded-sm border-gray-600 text-foreground">
            취소
          </AlertDialogCancel>
          <AlertDialogAction
            variant="outline"
            onClick={() => {
              setOpen(false)
              onConfirm()
            }}
            className="rounded-sm border-neon-mint/60 text-neon-mint"
          >
            확인
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
