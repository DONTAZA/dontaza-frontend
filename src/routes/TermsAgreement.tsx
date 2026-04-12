import { useState } from 'react'
import { useNavigate } from 'react-router'
import { ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import useAgreeToTerms from '@/hooks/useAgreeToTerms'

export default function TermsAgreement() {
  const navigate = useNavigate()
  const { mutate: agreeToTerms, isPending } = useAgreeToTerms()

  const [agreements, setAgreements] = useState({
    termsOfService: false,
    privacyPolicy: false,
    locationTerms: false,
  })

  const allAgreed =
    agreements.termsOfService && agreements.privacyPolicy && agreements.locationTerms

  const toggleAll = () => {
    const next = !allAgreed
    setAgreements({ termsOfService: next, privacyPolicy: next, locationTerms: next })
  }

  const toggle = (key: keyof typeof agreements) => {
    setAgreements((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="flex min-h-svh justify-center bg-[#06110d] text-white">
      <div className="flex min-h-svh w-full max-w-md flex-col px-6 py-12">
        <div className="flex-1">
          <div className="mb-8">
            <h1 className="mb-2 text-2xl font-black tracking-tight">
              🚲 돈타자에 오신 것을 환영합니다!
            </h1>
            <p className="text-sm text-white/60">서비스 이용을 위해 아래 약관에 동의해주세요.</p>
          </div>

          <div
            className="mb-4 flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 transition-colors hover:bg-white/10"
            onClick={toggleAll}
          >
            <CheckCircle checked={allAgreed} />
            <span className="text-lg font-bold">전체 동의하기</span>
          </div>

          <div className="mb-4 h-px bg-white/10" />

          <div className="space-y-3">
            <TermItem
              label="[필수] 서비스 이용약관"
              checked={agreements.termsOfService}
              onToggle={() => toggle('termsOfService')}
              onDetail={() => navigate('/terms/service')}
            />
            <TermItem
              label="[필수] 개인정보처리방침"
              checked={agreements.privacyPolicy}
              onToggle={() => toggle('privacyPolicy')}
              onDetail={() => navigate('/terms/privacy')}
            />
            <TermItem
              label="[필수] 위치정보 이용약관"
              checked={agreements.locationTerms}
              onToggle={() => toggle('locationTerms')}
              onDetail={() => navigate('/terms/location')}
            />
          </div>
        </div>

        <div className="flex gap-3 pt-8">
          <Button
            variant="outline"
            className="h-14 flex-1 rounded-2xl border-white/20 bg-transparent text-white hover:bg-white/5 hover:text-white"
            onClick={() => navigate('/login', { replace: true })}
          >
            취소
          </Button>
          <Button
            className="h-14 flex-1 rounded-2xl bg-white font-bold text-[#06110d] hover:bg-white/90 disabled:opacity-40"
            disabled={!allAgreed || isPending}
            onClick={() => agreeToTerms()}
          >
            {isPending ? '처리 중...' : '동의하고 시작하기'}
          </Button>
        </div>
      </div>
    </div>
  )
}

function CheckCircle({ checked }: { checked: boolean }) {
  return (
    <div
      className={`flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all ${
        checked ? 'border-[#66FFB2] bg-[#66FFB2]' : 'border-white/20'
      }`}
    >
      {checked && <div className="h-2 w-2 rounded-full bg-[#06110d]" />}
    </div>
  )
}

function TermItem({
  label,
  checked,
  onToggle,
  onDetail,
}: {
  label: string
  checked: boolean
  onToggle: () => void
  onDetail: () => void
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 cursor-pointer items-center gap-3" onClick={onToggle}>
        <div
          className={`flex h-5 w-5 items-center justify-center rounded border-2 transition-all ${
            checked ? 'border-[#66FFB2] bg-[#66FFB2]' : 'border-white/20'
          }`}
        >
          {checked && (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              className="h-3 w-3 text-[#06110d]"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
        </div>
        <span className="text-sm font-semibold text-white/80">{label}</span>
      </div>
      <button
        onClick={onDetail}
        className="p-2 text-white/40 transition-colors hover:text-white/80"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  )
}
