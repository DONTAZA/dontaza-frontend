import { Outlet } from 'react-router'
import { BottomNav } from '@/components/BottomNav'

export function RootLayout() {
  return (
    <div className="mx-auto flex h-svh w-full max-w-md flex-col overflow-hidden bg-background">
      <main className="flex min-h-0 flex-1 flex-col pb-5">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  )
}
