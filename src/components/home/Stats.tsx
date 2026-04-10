import { Clock, Flame } from 'lucide-react'

interface StatsProps {
  elapsedSec: number
}

export default function Stats({ elapsedSec }: StatsProps) {
  const kcal = Math.floor(elapsedSec * 0.12)

  return (
    <div className="px-5 pt-2 pb-8">
      <div className="mb-6 grid grid-cols-2 gap-3">
        <div className="glass-surface neumorphic-up rounded-xl p-4">
          <div className="mb-2 flex items-center gap-2">
            <Flame size={16} className="text-neon-mint" />
            <span className="text-xs tracking-wider text-muted-foreground uppercase">칼로리</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-foreground">{kcal}</span>
            <span className="text-xs text-muted-foreground">kcal</span>
          </div>
        </div>

        <div className="glass-surface neumorphic-up rounded-xl p-4">
          <div className="mb-2 flex items-center gap-2">
            <Clock size={16} className="text-electric-purple" />
            <span className="text-xs tracking-wider text-muted-foreground uppercase">
              총 이용 거리
            </span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-foreground">
              {(elapsedSec * 0.004).toFixed(1)}
            </span>
            <span className="text-xs text-muted-foreground">km</span>
          </div>
        </div>
      </div>
    </div>
  )
}
