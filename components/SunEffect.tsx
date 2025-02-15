export const SunEffect = () => (
  <div className="sun-container absolute inset-0 pointer-events-none overflow-hidden">
    {/* 大气光晕效果 */}
    <div className="absolute top-[-150px] right-[-150px] w-[300px] h-[300px] opacity-30">
      <div className="absolute inset-0 rounded-full bg-gradient-radial from-yellow-100/80 via-orange-200/50 to-transparent blur-[50px]" />
    </div>

    {/* 主太阳体 */}
    <div className="absolute top-[-50px] right-[-50px] w-[150px] h-[150px]">
      {/* 外层光晕 - 模拟大气散射 */}
      <div className="absolute inset-[-100%] animate-pulse">
        <div className="absolute inset-0 rounded-full bg-gradient-radial from-orange-200/60 via-yellow-200/40 to-transparent blur-[30px]" />
      </div>

      {/* 中层光晕 */}
      <div className="absolute inset-[-50%]">
        <div className="absolute inset-0 rounded-full bg-gradient-radial from-yellow-100/80 via-yellow-300/60 to-transparent blur-[20px]" />
      </div>

      {/* 太阳本体 */}
      <div className="absolute inset-0">
        {/* 核心层 */}
        <div className="absolute inset-0 rounded-full bg-gradient-radial from-yellow-50 via-yellow-300 to-orange-500 animate-sun-pulse" />
        
        {/* 表面纹理 */}
        <div className="absolute inset-0 rounded-full opacity-30 sun-texture" />
      </div>

      {/* 光芒效果 */}
      <div className="absolute inset-[-50%] sun-rays">
        {[...Array(36)].map((_, i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 origin-left h-[1px]"
            style={{
              transform: `rotate(${i * 10}deg)`,
              background: `linear-gradient(90deg, rgba(255,255,255,0.8) 0%, rgba(255,236,176,0.3) 50%, transparent 100%)`,
              width: `${200 + Math.sin(i) * 20}%`,
              animation: `rayPulse ${3 + Math.random()}s ease-in-out infinite`,
              animationDelay: `${i * 0.1}s`
            }}
          />
        ))}
      </div>
    </div>

    <style jsx>{`
      @keyframes rayPulse {
        0%, 100% {
          opacity: 0.3;
          transform: rotate(${Math.random() * 360}deg) scaleX(0.95);
        }
        50% {
          opacity: 0.7;
          transform: rotate(${Math.random() * 360}deg) scaleX(1.05);
        }
      }

      @keyframes sun-pulse {
        0%, 100% {
          transform: scale(1);
          filter: brightness(1);
        }
        50% {
          transform: scale(1.02);
          filter: brightness(1.1);
        }
      }

      .sun-texture {
        background-image: radial-gradient(
          circle at center,
          transparent 0%,
          rgba(255, 255, 255, 0.2) 20%,
          transparent 40%,
          rgba(255, 255, 255, 0.1) 60%,
          transparent 80%
        );
        animation: rotate 120s linear infinite;
      }

      @keyframes rotate {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }

      .animate-sun-pulse {
        animation: sun-pulse 4s ease-in-out infinite;
      }
    `}</style>
  </div>
)
