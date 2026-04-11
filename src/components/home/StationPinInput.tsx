import { useState, useCallback, useRef, useEffect } from 'react'
import { Loader2 } from 'lucide-react'

interface StationPinInputProps {
  onComplete: (pin: string) => void
  title?: string
  subtitle?: string
}

export default function StationPinInput({
  onComplete,
  title = '자전거 대여소 번호',
  subtitle = '4자리를 입력하세요',
}: StationPinInputProps) {
  const [pin, setPin] = useState(['', '', '', ''])
  const [loading, setLoading] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    inputRefs.current[0]?.focus()
  }, [])

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

      const full = newPin.join('')
      if (full.length === 4 && newPin.every((d) => d !== '')) {
        setLoading(true)
        setTimeout(() => {
          onComplete(full)
          setLoading(false)
        }, 1500)
      }
    },
    [pin, loading, onComplete]
  )

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
                ? 'border-primary text-primary shadow-[0_0_12px_hsl(var(--primary)/0.3)]'
                : 'border-muted-foreground/30 text-foreground focus:border-primary/60 focus:shadow-[0_0_8px_hsl(var(--primary)/0.15)]'
            } disabled:opacity-40`}
          />
        ))}
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
