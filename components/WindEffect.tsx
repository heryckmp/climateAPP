export const WindEffect = () => (
  <div className="wind-container absolute inset-0 pointer-events-none overflow-hidden">
    {[...Array(20)].map((_, i) => (
      <div
        key={i}
        className="wind-line absolute bg-white opacity-30"
        style={{
          top: `${Math.random() * 100}%`,
          width: `${50 + Math.random() * 100}px`,
          height: '1px',
          animationDuration: `${1 + Math.random()}s`,
          animationDelay: `${Math.random() * 2}s`
        }}
      />
    ))}
    <style jsx>{`
      @keyframes wind {
        0% { transform: translateX(-100%) scaleY(1); }
        50% { transform: translateX(50%) scaleY(2); }
        100% { transform: translateX(100vw) scaleY(1); }
      }
      .wind-line {
        animation: wind linear infinite;
      }
    `}</style>
  </div>
)

