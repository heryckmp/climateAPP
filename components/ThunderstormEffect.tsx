import { RainEffect } from './RainEffect'

export const ThunderstormEffect = ({ withHail = false }) => (
  <div className="thunderstorm-container absolute inset-0 pointer-events-none">
    <RainEffect intensity="大雨" />
    {[...Array(5)].map((_, i) => (
      <div
        key={i}
        className="lightning absolute bg-yellow-400"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 50}%`,
          width: `${2 + Math.random() * 5}px`,
          height: `${100 + Math.random() * 200}px`,
          opacity: 0,
          animationDelay: `${Math.random() * 10}s`
        }}
      />
    ))}
    {withHail && [...Array(30)].map((_, i) => (
      <div
        key={i}
        className="hail absolute bg-blue-200 rounded-full"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          width: `${4 + Math.random() * 4}px`,
          height: `${4 + Math.random() * 4}px`,
          animationDuration: `${1 + Math.random()}s`,
          animationDelay: `${Math.random() * 2}s`
        }}
      />
    ))}
    <style jsx>{`
      @keyframes flash {
        0%, 100% { opacity: 0; }
        50% { opacity: 1; }
      }
      @keyframes hailfall {
        0% { transform: translateY(-10px); }
        100% { transform: translateY(100vh); }
      }
      .lightning {
        animation: flash 0.2s ease-out;
      }
      .hail {
        animation: hailfall linear infinite;
      }
    `}</style>
  </div>
)

