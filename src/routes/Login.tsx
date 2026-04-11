import { useEffect } from 'react'
import { Capacitor } from '@capacitor/core'
import { App as CapacitorApp } from '@capacitor/app'
import { Browser } from '@capacitor/browser'
import { Button } from '@/components/ui/button'
import useKakaoLogin from '@/hooks/useKakaoLogin'

const KAKAO_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY as string
const NATIVE_REDIRECT_URI = 'dontaza://oauth'

const BikeSilhouette = () => (
  <svg
    width="200"
    height="120"
    viewBox="0 0 200 120"
    fill="none"
    className="opacity-30"
    aria-hidden="true"
  >
    <circle cx="45" cy="85" r="30" stroke="rgba(102, 255, 178, 0.9)" strokeWidth="2" fill="none" />
    <circle cx="155" cy="85" r="30" stroke="rgba(102, 255, 178, 0.9)" strokeWidth="2" fill="none" />
    <path
      d="M45 85 L80 40 L120 40 L155 85 L120 40 L100 85 L45 85"
      stroke="rgba(102, 255, 178, 0.9)"
      strokeWidth="2"
      fill="none"
    />
    <circle
      cx="80"
      cy="40"
      r="5"
      fill="rgba(102, 255, 178, 0.3)"
      stroke="rgba(102, 255, 178, 0.9)"
      strokeWidth="1"
    />
  </svg>
)

export default function Login() {
  const { mutate: loginWithKakao, isPending, isError } = useKakaoLogin()

  // Native: 딥링크(dontaza://oauth?code=xxx)로 코드 수신
  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return

    const listenerPromise = CapacitorApp.addListener('appUrlOpen', ({ url }) => {
      const code = new URL(url).searchParams.get('code')
      if (code) {
        Browser.close()
        loginWithKakao(code)
      }
    })

    return () => {
      listenerPromise.then((l) => l.remove())
    }
  }, [loginWithKakao])

  // PWA: main.tsx에서 sessionStorage에 저장한 코드 처리
  useEffect(() => {
    if (Capacitor.isNativePlatform()) return

    const code = sessionStorage.getItem('kakao_oauth_code')
    if (code) {
      sessionStorage.removeItem('kakao_oauth_code')
      loginWithKakao(code)
    }
  }, [loginWithKakao])

  const handleKakaoLogin = async () => {
    const isNative = Capacitor.isNativePlatform()
    const redirectUri = isNative ? NATIVE_REDIRECT_URI : window.location.origin

    const kakaoAuthUrl =
      `https://kauth.kakao.com/oauth/authorize` +
      `?client_id=${KAKAO_REST_API_KEY}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&response_type=code`

    if (isNative) {
      await Browser.open({ url: kakaoAuthUrl })
    } else {
      window.location.href = kakaoAuthUrl
    }
  }

  return (
    <div className="flex min-h-svh justify-center bg-[#06110d] text-white">
      <div className="relative flex min-h-svh w-full max-w-md flex-col overflow-hidden">
        <div className="absolute left-1/2 top-1/4 h-80 w-80 -translate-x-1/2 rounded-full bg-[#66FFB2]/10 blur-[100px]" />
        <div className="absolute bottom-1/4 left-1/3 h-60 w-60 rounded-full bg-[#7a5cff]/10 blur-[80px]" />

        <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-8">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <BikeSilhouette />
          </div>

          <div className="animate-in fade-in zoom-in-95 mt-6 mb-2 duration-700">
            <h1 className="text-5xl font-black italic tracking-tight text-white">
              돈
              <span className="text-[#66FFB2] [text-shadow:0_0_18px_rgba(102,255,178,0.55)]">
                타자
              </span>
            </h1>
          </div>

          <p className="animate-in fade-in duration-700 text-sm tracking-[0.35em] text-white/60 uppercase [animation-delay:200ms]">
            돈 벌면서 타는 자전거
          </p>
        </div>

        <div className="relative z-10 space-y-3 px-8 pb-12">
          {isError && (
            <p className="text-center text-sm text-red-400">
              로그인에 실패했습니다. 다시 시도해주세요.
            </p>
          )}
          <Button
            onClick={handleKakaoLogin}
            disabled={isPending}
            size="lg"
            className="h-auto w-full rounded-full py-4 text-base font-bold tracking-wide text-[#191919] transition-transform duration-200 active:scale-[0.97] hover:bg-[#FEE500]/95 disabled:opacity-60"
            style={{
              background: '#FEE500',
              boxShadow: '0 0 20px rgba(254, 229, 0, 0.25)',
            }}
          >
            {isPending ? '로그인 중...' : '카카오로 3초 만에 시작하기'}
          </Button>

          <p className="mt-4 text-center text-xs leading-5 text-white/50">
            계속 진행하면 이용약관 및 개인정보처리방침에 동의하게 됩니다.
          </p>
        </div>
      </div>
    </div>
  )
}
