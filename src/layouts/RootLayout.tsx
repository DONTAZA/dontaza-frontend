import { Outlet } from 'react-router'
import { BottomNav } from '@/components/BottomNav'

export function RootLayout() {
  return (
    <div className="mx-auto flex h-svh w-full max-w-md flex-col overflow-hidden bg-background">
      <main className="relative flex min-h-0 flex-1 flex-col">
        <Outlet />
      </main>
      <div className="flex-none">
        <BottomNav />
      </div>
    </div>
  )
}
