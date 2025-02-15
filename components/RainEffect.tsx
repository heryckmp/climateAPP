export const RainEffect = ({ intensity }) => {
  const getDropCount = () => {
    switch (intensity) {
      case "light": return 50
      case "moderate": return 100
      case "heavy": return 150
      case "extreme": return 200
      case "drizzle": return 30
      default: return 100
    }
  }

  return (
    <div className="rain-container absolute inset-0 pointer-events-none">
      {[...Array(getDropCount())].map((_, i) => (
        <div
          key={i}
          className="rain-drop absolute bg-blue-400 opacity-70"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDuration: `${0.5 + Math.random() * 0.3}s`,
            animationDelay: `${Math.random() * 2}s`
          }}
        />
      ))}
      <style jsx>{`
        @keyframes rain {
          0% { transform: translateY(-10px); }
          100% { transform: translateY(100vh); }
        }
        .rain-drop {
          width: 1px;
          height: 15px;
          animation: rain linear infinite;
        }
      `}</style>
    </div>
  )
}

