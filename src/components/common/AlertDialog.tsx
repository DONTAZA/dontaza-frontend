import { useState, type ReactNode } from 'react'
import {
  AlertDialog as AlertDialogRoot,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

interface AlertDialogProps {
  trigger: (open: () => void) => ReactNode
  title: string
  description?: string
  cancelLabel?: string
  confirmLabel?: string
  onConfirm: () => void
}

export default function AlertDialog({
  trigger,
  title,
  description,
  cancelLabel = '취소',
  confirmLabel = '확인',
  onConfirm,
}: AlertDialogProps) {
  const [open, setOpen] = useState(false)

  return (
    <AlertDialogRoot open={open} onOpenChange={setOpen}>
      {trigger(() => setOpen(true))}

      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {description && <AlertDialogDescription>{description}</AlertDialogDescription>}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="rounded-sm border-gray-600 text-foreground">
            {cancelLabel}
          </AlertDialogCancel>
          <AlertDialogAction
            variant="outline"
            onClick={() => {
              setOpen(false)
              onConfirm()
            }}
            className="rounded-sm border-neon-mint/60 text-neon-mint"
          >
            {confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogRoot>
  )
}
