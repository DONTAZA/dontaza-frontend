import { createHashRouter, Navigate, Outlet } from 'react-router'
import RootLayout from '@/layouts/RootLayout'
import Home from '@/routes/Home'
import MyPage from '@/routes/MyPage'
import Login from '@/routes/Login'
import NotFound from '@/routes/NotFound'
import useUserProfile from '@/hooks/useUserProfile'

function ProtectedRoute() {
  const { isLoading, isError } = useUserProfile()
  if (isLoading) return null
  if (isError) return <Navigate to="/login" replace />
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
