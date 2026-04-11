interface EndRideButtonProps {
  onEndRide: () => void
  disabled?: boolean
}

export default function RewardButton({ onEndRide, disabled }: EndRideButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onEndRide}
      className={`mt-8 flex items-center rounded-full px-8 py-3 transition-all duration-300 ${
        disabled
          ? 'bg-muted text-muted-foreground opacity-60 cursor-not-allowed'
          : 'glass-pill cursor-pointer active:scale-[0.97] shadow-[0_0_20px_rgba(245,158,11,0.3)]'
      }`}
    >
      <span className={`text-base font-bold tracking-wider ${disabled ? '' : 'text-amber-400'}`}>
        라이딩 종료하기
      </span>
    </button>
  )
}
