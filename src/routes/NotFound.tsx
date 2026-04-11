import { useNavigate } from 'react-router'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="flex h-full flex-col items-center justify-center p-6 text-center">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tighter text-foreground">404</h1>
        <p className="text-muted-foreground">페이지를 찾을 수 없습니다</p>
      </div>
      <Button
        variant="outline"
        className="mt-8 rounded-sm border-neon-mint text-neon-mint"
        onClick={() => navigate('/')}
      >
        홈으로 돌아가기
      </Button>
    </div>
  )
}
