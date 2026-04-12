import { useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import termsOfService from '@/assets/legal/terms-of-service.md?raw'
import privacyPolicy from '@/assets/legal/privacy-policy.md?raw'
import locationTerms from '@/assets/legal/location-terms.md?raw'

const TERMS = [
  { key: 'termsOfService', label: '[필수] 서비스 이용약관', content: termsOfService },
  { key: 'privacyPolicy', label: '[필수] 개인정보처리방침', content: privacyPolicy },
  { key: 'locationTerms', label: '[필수] 위치정보 이용약관', content: locationTerms },
] as const

type TermKey = (typeof TERMS)[number]['key']

interface TermsDialogProps {
  open: boolean
  onConfirm: () => void
  onCancel: () => void
  isPending?: boolean
}

export default function TermsDialog({
  open,
  onConfirm,
  onCancel,
  isPending = false,
}: TermsDialogProps) {
  const [checked, setChecked] = useState<Record<TermKey, boolean>>({
    termsOfService: false,
    privacyPolicy: false,
    locationTerms: false,
  })
  const [expanded, setExpanded] = useState<Record<TermKey, boolean>>({
    termsOfService: false,
    privacyPolicy: false,
    locationTerms: false,
  })

  const allChecked = Object.values(checked).every(Boolean)

  const toggleAll = () => {
    const next = !allChecked
    setChecked({ termsOfService: next, privacyPolicy: next, locationTerms: next })
  }

  const toggleCheck = (key: TermKey) => setChecked((prev) => ({ ...prev, [key]: !prev[key] }))
  const toggleExpand = (key: TermKey) => setExpanded((prev) => ({ ...prev, [key]: !prev[key] }))

  const handleCancel = () => {
    setChecked({ termsOfService: false, privacyPolicy: false, locationTerms: false })
    setExpanded({ termsOfService: false, privacyPolicy: false, locationTerms: false })
    onCancel()
  }

  return (
    <Dialog open={open}>
      <DialogContent showCloseButton={false} className="max-h-[85svh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-base font-bold">서비스 이용약관 동의</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-3 py-1">
          {/* 전체 동의 */}
          <button
            type="button"
            className="flex items-center gap-3 rounded-lg border border-border bg-muted/40 px-4 py-3 text-left"
            onClick={toggleAll}
          >
            <CheckCircle checked={allChecked} />
            <span className="text-sm font-semibold">전체 동의하기</span>
          </button>

          <div className="h-px bg-border" />

          {/* 개별 약관 항목 */}
          {TERMS.map(({ key, label, content }) => (
            <div key={key} className="rounded-lg border border-border overflow-hidden">
              <div className="flex items-center gap-2 px-3 py-2.5">
                <button
                  type="button"
                  className="flex items-center gap-2 flex-1"
                  onClick={() => toggleCheck(key)}
                >
                  <CheckBox checked={checked[key]} />
                  <span className="text-sm text-foreground">{label}</span>
                </button>
                <button
                  type="button"
                  className="p-1 text-muted-foreground"
                  onClick={() => toggleExpand(key)}
                  aria-label="약관 전문 보기"
                >
                  {expanded[key] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </button>
              </div>

              {expanded[key] && (
                <div className="border-t border-border bg-muted/30 px-4 py-3 max-h-48 overflow-y-auto">
                  <pre className="whitespace-pre-wrap text-xs text-muted-foreground font-sans leading-relaxed">
                    {content}
                  </pre>
                </div>
              )}
            </div>
          ))}
        </div>

        <DialogFooter className="flex-row gap-2">
          <Button
            variant="outline"
            className="flex-1 rounded-sm"
            onClick={handleCancel}
            disabled={isPending}
          >
            취소
          </Button>
          <Button
            className="flex-1 rounded-sm bg-neon-mint/80"
            disabled={!allChecked || isPending}
            onClick={onConfirm}
          >
            {isPending ? '처리 중...' : '동의하고 시작하기'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function CheckCircle({ checked }: { checked: boolean }) {
  return (
    <div
      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
        checked ? 'border-neon-mint bg-neon-mint' : 'border-muted-foreground/40'
      }`}
    >
      {checked && <div className="h-2 w-2 rounded-full bg-background" />}
    </div>
  )
}

function CheckBox({ checked }: { checked: boolean }) {
  return (
    <div
      className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border-2 transition-all ${
        checked ? 'border-neon-mint bg-neon-mint' : 'border-muted-foreground/40'
      }`}
    >
      {checked && (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          className="h-2.5 w-2.5 text-background"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      )}
    </div>
  )
}
