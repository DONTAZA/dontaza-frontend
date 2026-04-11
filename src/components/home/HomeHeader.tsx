export default function HomeHeader() {
  const point = 3200

  return (
    <div className="border-b border-glass-border/30 bg-glass/70 px-5 pt-3 pb-2 backdrop-blur-2xl">
      <div className="flex items-center justify-between">
        <img src="/logo.png" alt="DONTAZA" className="h-9 w-auto" />

        <span className="text-mint text-base font-bold tracking-wider text-neon-mint">
          {point.toLocaleString()}P
        </span>
      </div>
    </div>
  )
}
