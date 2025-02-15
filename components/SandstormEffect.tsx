export const SandstormEffect = ({ intensity }) => {
  const getParticleCount = () => {
    switch (intensity) {
      case "浮尘": case "扬沙": return 100
      case "沙尘暴": return 200
      case "强沙尘暴": return 300
      default: return 150
    }
  }

  return (
    <div className="sandstorm-container absolute inset-0 pointer-events-none">
      {[...Array(getParticleCount())].map((_, i) => (
        <div
          key={i}
          className="sand-particle absolute bg-yellow-600 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${1 + Math.random() * 2}px`,
            height: `${1 + Math.random() * 2}px`,
            opacity: Math.random() * 0.6 + 0.2,
            animationDuration: `${1 + Math.random() * 2}s`,
            animationDelay: `${Math.random() * 2}s`
          }}
        />
      ))}
      <style jsx>{`
        @keyframes sandstorm {
          0% { transform: translate(0, 0); }
          100% { transform: translate(100px, 100px); }
        }
        .sand-particle {
          animation: sandstorm linear infinite;
        }
      `}</style>
    </div>
  )
}

