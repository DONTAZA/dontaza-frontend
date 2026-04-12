import { createHashRouter, Navigate, Outlet } from 'react-router'
import RootLayout from '@/layouts/RootLayout'
import Home from '@/routes/Home'
import MyPage from '@/routes/MyPage'
import Login from '@/routes/Login'
import NotFound from '@/routes/NotFound'
import useUserProfile from '@/hooks/useUserProfile'
import useAuthStore from '@/stores/authStore'

function ProtectedRoute() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const { isLoading, isError } = useUserProfile()

  if (isAuthenticated === true) return <Outlet />
  if (isAuthenticated === false) return <Navigate to="/login" replace />
  if (isLoading) return null
  if (isError) return <Navigate to="/login" replace />
  return <Outlet />
}

function PublicOnlyRoute() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  if (isAuthenticated === true) return <Navigate to="/" replace />
  return <Outlet />
}

const router = createHashRouter([
  {
    element: <PublicOnlyRoute />,
    children: [{ path: '/login', element: <Login /> }],
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
