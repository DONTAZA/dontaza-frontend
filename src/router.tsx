import { createHashRouter, Navigate, Outlet } from 'react-router'
import RootLayout from '@/layouts/RootLayout'
import Home from '@/routes/Home'
import MyPage from '@/routes/MyPage'
import Login from '@/routes/Login'
import NotFound from '@/routes/NotFound'
import useAuthStore from '@/stores/authStore'

function ProtectedRoute() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  if (!isAuthenticated) return <Navigate to="/login" replace />
  return <Outlet />
}

const router = createHashRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <RootLayout />,
        children: [
          { index: true, element: <Home /> },
          { path: 'mypage', element: <MyPage /> },
          { path: '*', element: <NotFound /> },
        ],
      },
    ],
  },
])

export default router
