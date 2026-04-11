import { useState, useCallback, useRef, useEffect } from 'react'
import { Loader2 } from 'lucide-react'

interface StationPinInputProps {
  onComplete: (pin: string) => void
  onCancel?: () => void
  title?: string
  subtitle?: string
}

export default function StationPinInput({
  onComplete,
  onCancel,
  title = '자전거 대여소 번호',
  subtitle = '4자리를 입력하세요',
}: StationPinInputProps) {
  const [pin, setPin] = useState(['', '', '', ''])
  const [loading, setLoading] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    inputRefs.current[0]?.focus()
  }, [])

  const isFull = pin.every((d) => d !== '')

  const handleChange = useCallback(
    (index: number, value: string) => {
      if (loading) return
      const digit = value.replace(/\D/g, '').slice(-1)
      const newPin = [...pin]
      newPin[index] = digit
      setPin(newPin)

      if (digit && index < 3) {
        inputRefs.current[index + 1]?.focus()
      }
    },
    [pin, loading]
  )

  const handleConfirm = useCallback(() => {
    if (!isFull || loading) return
    const full = pin.join('')
    setLoading(true)
    setTimeout(() => {
      onComplete(full)
      setLoading(false)
    }, 1500)
  }, [isFull, loading, pin, onComplete])

  const handleKeyDown = useCallback(
    (index: number, e: React.KeyboardEvent) => {
      if (loading) return
      if (e.key === 'Backspace' && !pin[index] && index > 0) {
        const newPin = [...pin]
        newPin[index - 1] = ''
        setPin(newPin)
        inputRefs.current[index - 1]?.focus()
      }
    },
    [pin, loading]
  )

  return (
    <div className="flex flex-col items-center w-full">
      <p className="text-lg font-bold text-foreground tracking-wide">{title}</p>
      <p className="text-sm text-muted-foreground mt-1 mb-8">{subtitle}</p>

      <div className="flex gap-4 mb-8">
        {[0, 1, 2, 3].map((i) => (
          <input
            key={i}
            ref={(el) => {
              inputRefs.current[i] = el
            }}
            type="tel"
            inputMode="numeric"
            maxLength={1}
            value={pin[i]}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            disabled={loading}
            className={`w-14 h-16 rounded-lg border-2 text-center text-2xl font-black outline-none transition-all duration-200 bg-card ${
              pin[i]
                ? 'border-primary text-foreground4 shadow-[0_0_12px_hsl(var(--primary)/0.3)]'
                : 'border-muted-foreground/30 text-foreground focus:border-primary/60 focus:shadow-[0_0_8px_hsl(var(--primary)/0.15)]'
            } disabled:opacity-40`}
          />
        ))}
      </div>

      <div className="mb-6 flex gap-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="rounded-md border border-amber-400/50 px-6 py-2 text-base font-bold tracking-wider text-amber-400 transition-all duration-300 active:scale-[0.97] disabled:opacity-40"
          >
            취소
          </button>
        )}
        <button
          type="button"
          onClick={handleConfirm}
          disabled={!isFull || loading}
          className={`rounded-md border px-6 py-2 text-base font-bold tracking-wider transition-all duration-300 ${
            isFull && !loading
              ? 'border-neon-mint text-neon-mint active:scale-[0.97]'
              : 'border-muted-foreground/30 text-muted-foreground/40 cursor-not-allowed'
          }`}
        >
          확인
        </button>
      </div>

      <div className="h-6 flex items-center justify-center">
        {loading && (
          <>
            <Loader2 size={16} className="text-primary animate-spin mr-2" />
            <span className="text-sm text-primary font-semibold tracking-wide">
              대여소 확인 중...
            </span>
          </>
        )}
      </div>
    </div>
  )
}
