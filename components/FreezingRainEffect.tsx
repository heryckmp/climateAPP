import { RainEffect } from './RainEffect'

export const FreezingRainEffect = () => (
  <div className="freezing-rain-container absolute inset-0 pointer-events-none">
    <RainEffect intensity="中雨" />
    {[...Array(50)].map((_, i) => (
      <div
        key={i}
        className="ice-particle absolute bg-blue-100 rounded-full"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          width: `${1 + Math.random() * 2}px`,
          height: `${1 + Math.random() * 2}px`,
          opacity: Math.random() * 0.5 + 0.5,
          animationDuration: `${2 + Math.random() * 3}s`,
          animationDelay: `${Math.random() * 2}s`
        }}
      />
    ))}
    <style jsx>{`
      @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(10px); }
      }
      .ice-particle {
        animation: float ease-in-out infinite;
      }
    `}</style>
  </div>
)

