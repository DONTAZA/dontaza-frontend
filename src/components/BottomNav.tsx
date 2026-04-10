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
    <div className="flex w-full justify-center border-t border-glass-border/30 bg-glass/70 backdrop-blur-2xl">
      <div className="flex w-full">
        {tabs.map((tab) => {
            const active = location.pathname === tab.path

            return (
              <Button
                key={tab.path}
                type="button"
                variant="ghost"
                onClick={() => navigate(tab.path)}
                aria-label={tab.label}
                className="h-auto flex-1 items-center justify-center rounded-none py-4 transition-colors hover:bg-transparent"
              >
                <tab.icon
                  size={22}
                  className={
                    active
                      ? 'text-neon-mint drop-shadow-[0_0_8px_hsl(155_100%_50%/_0.5)]'
                      : 'text-muted-foreground'
                  }
                />
              </Button>
            )
          })}
        </div>
      </div>
  )
}
