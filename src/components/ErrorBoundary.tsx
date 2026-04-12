import { Component, type ErrorInfo, type ReactNode } from 'react'
import { Button } from '@/components/ui/button'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[ErrorBoundary]', error, info)
  }

  private handleReset = () => {
    this.setState({ hasError: false })
    window.location.hash = '/'
  }

  render() {
    if (!this.state.hasError) return this.props.children

    return (
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background px-8 text-center">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">문제가 발생했어요</h1>
          <p className="text-sm text-muted-foreground">
            잠시 후 다시 시도해주세요. 문제가 계속되면 앱을 재시작해주세요.
          </p>
        </div>
        <Button onClick={this.handleReset} size="lg" className="rounded-full px-8">
          홈으로 돌아가기
        </Button>
      </div>
    )
  }
}
