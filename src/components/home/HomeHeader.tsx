export default function HomeHeader() {
  const cash = 3200

  return (
    <div className="border-b border-glass-border/30 bg-glass/70 px-5 pt-3 pb-2 backdrop-blur-2xl">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold tracking-wide text-foreground/80">DONTAZA</span>

        <div className="glass-pill neon-glow-mint flex items-center gap-2 px-4 py-1.5">
          <span className="text-glow-mint text-base font-bold tracking-wider text-neon-mint">
            {cash.toLocaleString()}P
          </span>
        </div>
      </div>
    </div>
  )
}
