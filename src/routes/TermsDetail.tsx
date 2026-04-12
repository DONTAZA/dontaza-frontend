import { Navigate, useNavigate, useParams } from 'react-router'
import { ChevronLeft } from 'lucide-react'
import termsOfServiceMd from '@/assets/legal/terms-of-service.md?raw'
import privacyPolicyMd from '@/assets/legal/privacy-policy.md?raw'
import locationTermsMd from '@/assets/legal/location-terms.md?raw'
import pointsPolicyMd from '@/assets/legal/points-policy.md?raw'

const TERMS_MAP = {
  service: { title: '서비스 이용약관', content: termsOfServiceMd },
  privacy: { title: '개인정보처리방침', content: privacyPolicyMd },
  location: { title: '위치정보 이용약관', content: locationTermsMd },
  points: { title: '포인트 이용약관', content: pointsPolicyMd },
} as const

type TermsType = keyof typeof TERMS_MAP

export default function TermsDetail() {
  const { type } = useParams<{ type: string }>()
  const navigate = useNavigate()

  if (!type || !(type in TERMS_MAP)) return <Navigate to="/" replace />

  const { title, content } = TERMS_MAP[type as TermsType]

  return (
    <div className="flex min-h-svh justify-center bg-background text-foreground">
      <div className="flex min-h-svh w-full max-w-md flex-col">
        <div className="sticky top-0 z-10 flex items-center gap-2 border-b border-border bg-background/80 px-4 py-4 backdrop-blur-md">
          <button
            onClick={() => navigate(-1)}
            className="-ml-2 p-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-base font-bold tracking-tight">{title}</h1>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-8 pb-20">
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
        <h3 key={i} className="mt-6 mb-2 text-sm font-bold text-foreground">
          {line.slice(4)}
        </h3>
      )
    }
    if (line.startsWith('## ')) {
      return (
        <h2 key={i} className="mt-8 mb-3 text-base font-extrabold text-foreground border-b border-border pb-1">
          {line.slice(3)}
        </h2>
      )
    }
    if (line.startsWith('# ')) {
      return (
        <h1 key={i} className="mt-4 mb-6 text-xl font-black tracking-tight text-foreground">
          {line.slice(2)}
        </h1>
      )
    }
    if (line.trim() === '---') {
      return <hr key={i} className="my-6 border-border" />
    }
    if (line.trim() === '') {
      return <div key={i} className="h-2" />
    }
    const text = line.replace(/\*\*(.*?)\*\*/g, '$1').replace(/\*\*(.*?)\*\*/g, '$1').replace(/\*(.*?)\*/g, '$1')
    return (
      <p key={i} className="text-sm leading-relaxed text-muted-foreground mb-1 break-keep">
        {text}
      </p>
    )
  })
}
