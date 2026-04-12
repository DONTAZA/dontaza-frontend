import { Navigate, useNavigate, useParams } from 'react-router'
import { ChevronLeft } from 'lucide-react'
import termsOfServiceMd from '@/assets/legal/terms-of-service.md?raw'
import privacyPolicyMd from '@/assets/legal/privacy-policy.md?raw'
import locationTermsMd from '@/assets/legal/location-terms.md?raw'

const TERMS_MAP = {
  service: { title: '서비스 이용약관', content: termsOfServiceMd },
  privacy: { title: '개인정보처리방침', content: privacyPolicyMd },
  location: { title: '위치정보 이용약관', content: locationTermsMd },
} as const

type TermsType = keyof typeof TERMS_MAP

export default function TermsDetail() {
  const { type } = useParams<{ type: string }>()
  const navigate = useNavigate()

  if (!type || !(type in TERMS_MAP)) return <Navigate to="/" replace />

  const { title, content } = TERMS_MAP[type as TermsType]

  return (
    <div className="flex min-h-svh justify-center bg-[#06110d] text-white">
      <div className="flex min-h-svh w-full max-w-md flex-col">
        <div className="sticky top-0 flex items-center gap-2 border-b border-white/10 bg-[#06110d] px-4 py-4">
          <button
            onClick={() => navigate(-1)}
            className="-ml-2 p-2 text-white/60 transition-colors hover:text-white"
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-base font-bold">{title}</h1>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {renderMarkdown(content)}
        </div>
      </div>
    </div>
  )
}

function renderMarkdown(content: string) {
  return content.split('\n').map((line, i) => {
    if (line.startsWith('### ')) {
      return (
        <h3 key={i} className="mt-4 mb-1 text-sm font-bold text-white">
          {line.slice(4)}
        </h3>
      )
    }
    if (line.startsWith('## ')) {
      return (
        <h2 key={i} className="mt-6 mb-2 text-base font-bold text-white">
          {line.slice(3)}
        </h2>
      )
    }
    if (line.startsWith('# ')) {
      return (
        <h1 key={i} className="mt-2 mb-4 text-lg font-black text-white">
          {line.slice(2)}
        </h1>
      )
    }
    if (line.trim() === '---') {
      return <hr key={i} className="my-2 border-white/10" />
    }
    if (line.trim() === '') {
      return <div key={i} className="h-1" />
    }
    const text = line.replace(/\*\*(.*?)\*\*/g, '$1').replace(/\*(.*?)\*/g, '$1')
    return (
      <p key={i} className="text-xs leading-relaxed text-white/60">
        {text}
      </p>
    )
  })
}
