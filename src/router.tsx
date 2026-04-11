import { createHashRouter } from 'react-router'
import RootLayout from '@/layouts/RootLayout'
import Home from '@/routes/Home'
import MyPage from '@/routes/MyPage'
import Login from '@/routes/Login'
import NotFound from '@/routes/NotFound'

const router = createHashRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    // TODO: 인증 연동 후 ProtectedRoute 복원
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'mypage', element: <MyPage /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])

export default router
