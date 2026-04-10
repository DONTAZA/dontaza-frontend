import { Home, User } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router'
import { Button } from '@/components/ui/button'

const tabs = [
  { icon: Home, label: 'home', path: '/' },
  { icon: User, label: 'mypage', path: '/mypage' },
]

export function BottomNav() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <div className="fixed right-0 bottom-0 left-0 z-50 flex justify-center">
      <div className="w-full max-w-md border-t border-glass-border/30 bg-glass/70 backdrop-blur-2xl">
        <div className="flex">
          {tabs.map((tab) => {
            const active = location.pathname === tab.path

            return (
              <Button
                key={tab.path}
                type="button"
                variant="ghost"
                onClick={() => navigate(tab.path)}
                aria-label={tab.label}
                className="h-auto flex-1 items-center justify-center rounded-none py-4 transition-colors hover:bg-transparent cursor-pointer"
              >
                <tab.icon
                  size={22}
                  className={
                    active
                      ? 'text-neon-mint drop-shadow-[0_0_8px_hsl(155_100%_50%_/_0.5)]'
                      : 'text-muted-foreground'
                  }
                />
              </Button>
            )
          })}
        </div>
        <div className="h-[env(safe-area-inset-bottom)]" />
      </div>
    </div>
  )
}
