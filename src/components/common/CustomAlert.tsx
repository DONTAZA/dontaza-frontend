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
import { cn } from '@/lib/utils'

interface CustomAlertProps {
  trigger?: (open: () => void) => ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
  title: string
  description?: ReactNode
  descriptionClassName?: string
  cancelLabel?: string
  confirmLabel?: string
  hideCancel?: boolean
  onConfirm: () => void
  onCancel?: () => void
}

export default function CustomAlert({
  trigger,
  open: controlledOpen,
  onOpenChange,
  title,
  description,
  descriptionClassName,
  cancelLabel = '취소',
  confirmLabel = '확인',
  hideCancel = false,
  onConfirm,
  onCancel,
}: CustomAlertProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false)
  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : uncontrolledOpen
  const setOpen = (next: boolean) => {
    if (!isControlled) setUncontrolledOpen(next)
    onOpenChange?.(next)
  }

  return (
    <AlertDialogRoot open={open} onOpenChange={setOpen}>
      {trigger?.(() => setOpen(true))}

      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {description && (
            <AlertDialogDescription
              className={cn('whitespace-pre-line', descriptionClassName)}
            >
              {description}
            </AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          {!hideCancel && (
            <AlertDialogCancel
              onClick={onCancel}
              className="rounded-sm border-gray-600 text-foreground"
            >
              {cancelLabel}
            </AlertDialogCancel>
          )}
          <AlertDialogAction
            variant="outline"
            onClick={() => {
              setOpen(false)
              onConfirm()
            }}
            className={cn(
              'rounded-sm border-neon-mint/60 text-neon-mint',
              hideCancel && 'col-span-2 w-full',
            )}
          >
            {confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogRoot>
  )
}
