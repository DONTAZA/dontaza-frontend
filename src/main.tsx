import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Capacitor } from '@capacitor/core'
import '@/index.css'
import App from './App'

// PWA 카카오 OAuth 콜백 처리
// 카카오 로그인 후 ?code=xxx 로 리다이렉트되면 sessionStorage에 저장 후 /login으로 이동
if (!Capacitor.isNativePlatform()) {
  const params = new URLSearchParams(window.location.search)
  const oauthCode = params.get('code')
  if (oauthCode) {
    sessionStorage.setItem('kakao_oauth_code', oauthCode)
    window.history.replaceState({}, '', '/')
    window.location.hash = '/login'
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
