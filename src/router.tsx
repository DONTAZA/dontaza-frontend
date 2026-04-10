import { createBrowserRouter, Navigate } from 'react-router';
import { RootLayout } from '@/layouts/RootLayout';
import Home from '@/routes/Home';
import MyPage from '@/routes/MyPage';

export const router = createBrowserRouter([
  {
    path: '/login',
    // 인증 연동 전에는 로그인 화면에서 막히지 않도록 홈으로 우회한다.
    element: <Navigate replace to="/" />,
  },
  {
    // TODO: 인증 연동 후 ProtectedRoute 복원
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'mypage', element: <MyPage /> },
    ],
  },
]);
