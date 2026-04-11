interface StartButtonProps {
  onStart: () => void
}

export default function StartButton({ onStart }: StartButtonProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-foreground/80">
        자전거 대여 후 탭하세요
      </p>
      <button
        type="button"
        onClick={onStart}
        className="group relative flex h-48 w-48 items-center justify-center rounded-full transition-transform active:scale-95"
      >
        <div className="absolute inset-0 animate-[spin_20s_linear_infinite] rounded-full border-2 border-dashed border-primary/30" />
        <div className="absolute inset-3 rounded-full border border-primary/50 shadow-[0_0_15px_rgba(var(--primary-rgb),0.3)]" />
        <div className="absolute inset-6 flex items-center justify-center rounded-full bg-primary/10 backdrop-blur-sm">
          <div className="text-center">
            <span className="block text-lg font-black tracking-wider text-primary drop-shadow-[0_0_8px_rgba(var(--primary-rgb),0.5)]">
              라이딩
            </span>
            <span className="block text-lg font-black tracking-wider text-primary drop-shadow-[0_0_8px_rgba(var(--primary-rgb),0.5)]">
              시작하기
            </span>
          </div>
        </div>
      </button>
    </div>
  )
}
