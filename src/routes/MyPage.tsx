import {
  Gift,
  CalendarDays,
  User as UserIcon,
  FileText,
  MapPin,
  Shield,
  Coins,
  ChevronRight,
} from 'lucide-react'
import { useNavigate } from 'react-router'
import useUserProfile from '@/hooks/useUserProfile'
import useLogout from '@/hooks/useLogout'
import useWithdraw from '@/hooks/useWithdraw'
import { Button } from '@/components/ui/button'
import LogoutAlert from '@/components/mypage/LogoutAlert'
import DeleteAccountAlert from '@/components/mypage/DeleteAccountAlert'

const gridMenu = [
  {
    icon: Gift,
    label: '기프티콘 교환',
    color: 'text-electric-purple',
  },
  {
    icon: CalendarDays,
    label: '라이딩 기록',
    color: 'text-neon-mint',
  },
]

const legalMenu = [
  { icon: FileText, label: '서비스 이용약관', path: '/terms/service' },
  { icon: MapPin, label: '위치정보 이용약관', path: '/terms/location' },
  { icon: Shield, label: '개인정보처리방침', path: '/terms/privacy' },
  { icon: Coins, label: '포인트 이용약관', path: '/terms/points' },
]

export default function MyPage() {
  const navigate = useNavigate()
  const { data: profile } = useUserProfile()
  const logoutMutation = useLogout()
  const withdrawMutation = useWithdraw()

  return (
    <div className="flex-1 min-h-0 w-full overflow-y-auto px-6 pt-6 pb-6 flex flex-col gap-6">
      {/* 상단 프로필 영역 */}
      <div className="flex shrink-0 flex-col gap-6">
        <div className="glass-surface rounded-2xl p-6 flex items-center gap-4">
          <div className="w-16 h-16 shrink-0 rounded-full bg-linear-to-br from-neon-mint/30 to-electric-purple/30 border border-glass-border/50 overflow-hidden flex items-center justify-center">
            {profile?.profileImageUrl ? (
              <img
                src={profile?.profileImageUrl}
                alt="프로필"
                className="w-full h-full object-cover"
              />
            ) : (
              <UserIcon size={28} className="text-neon-mint" />
            )}
          </div>
          <div className="flex-1">
            <p className="text-base font-bold text-foreground">{profile?.nickname || '라이더'}님</p>
          </div>
        </div>

        <div className="glass-surface shrink-0 rounded-2xl p-5 text-center border border-neon-mint/20">
          <p className="text-xs text-muted-foreground tracking-widest uppercase mb-2">
            총 보유 포인트
          </p>
          <p className="text-2xl font-black italic text-neon-mint text-glow-mint tracking-tight">
            {(profile?.totalPoints ?? 0).toLocaleString()} P
          </p>
        </div>
      </div>

      {/* 그리드 메뉴 */}
      <div className="grid shrink-0 grid-cols-2 gap-3">
        {gridMenu.map((item) => (
          <Button
            key={item.label}
            variant="ghost"
            disabled
            className="relative glass-surface h-auto rounded-2xl p-2 flex flex-col items-center gap-3 border border-glass-border/40"
          >
            <div className="w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center">
              <item.icon size={24} className={item.color} />
            </div>
            <span className="text-sm font-semibold text-foreground tracking-wide">
              {item.label}
            </span>

            {/* 출시 예정 오버레이 */}
            <div className="absolute inset-0 bg-background/70 backdrop-blur-[2px] flex items-center justify-center rounded-2xl">
              <span className="text-base font-bold text-foreground tracking-widest uppercase">
                출시 예정
              </span>
            </div>
          </Button>
        ))}
      </div>

      {/* 약관 */}
      <div className="shrink-0 glass-surface overflow-hidden rounded-2xl border border-glass-border/30">
        {legalMenu.map((item, i) => (
          <Button
            key={item.label}
            variant="ghost"
            className={`h-auto w-full flex items-center justify-between px-5 py-3 rounded-none active:bg-muted/30 transition-colors ${
              i < legalMenu.length - 1 ? 'border-b border-glass-border/20' : ''
            }`}
            onClick={() => navigate(item.path)}
          >
            <div className="flex items-center gap-3">
              <item.icon size={18} className="text-muted-foreground" />
              <span className="text-sm text-foreground tracking-wide">{item.label}</span>
            </div>
            <ChevronRight size={16} className="text-muted-foreground" />
          </Button>
        ))}
      </div>

      {/* 하단 버튼 영역 */}
      <div className="flex shrink-0 justify-end gap-4">
        <LogoutAlert
          onConfirm={() => logoutMutation.mutate()}
          isPending={logoutMutation.isPending}
        />
        <DeleteAccountAlert
          onConfirm={() => withdrawMutation.mutate()}
          isPending={withdrawMutation.isPending}
        />
      </div>
    </div>
  )
}
