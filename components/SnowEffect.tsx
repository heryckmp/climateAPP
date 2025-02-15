export const SnowEffect = ({ intensity }) => {
  // 根据强度确定雪花数量和大小范围
  const getSnowflakeConfig = () => {
    switch (intensity) {
      case "小雪": case "小到中雪":
        return { count: 50, sizeRange: [1, 3] }
      case "中雪": case "中到大雪":
        return { count: 100, sizeRange: [1, 4] }
      case "大雪": case "大到暴雪": case "暴雪":
        return { count: 150, sizeRange: [2, 6] }
      default:
        return { count: 100, sizeRange: [1, 4] }
    }
  }

  const config = getSnowflakeConfig()

  return (
    <div className="snow-container absolute inset-0 pointer-events-none">
      {[...Array(config.count)].map((_, i) => {
        // 为每个雪花生成随机特性
        const size = config.sizeRange[0] + Math.random() * (config.sizeRange[1] - config.sizeRange[0])
        const startDelay = Math.random() * 5
        const duration = 12 + Math.random() * 15 // 更长的动画时间
        const horizontalSwing = 15 + Math.random() * 30 // 更大的水平摆动

        return (
          <div
            key={i}
            className="snowflake absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-${Math.random() * 10}%`,
              opacity: 0.4 + Math.random() * 0.4,
              width: `${size}px`,
              height: `${size}px`,
              animationDelay: `-${startDelay}s`,
              animationDuration: `${duration}s`,
              filter: `blur(${Math.random() * 0.5 + 0.2}px)`,
              '--horizontal-swing': `${horizontalSwing}px`,
            } as any}
          />
        )
      })}
      <style jsx>{`
        .snowflake {
          background: radial-gradient(circle at 50% 50%, 
            rgba(255, 255, 255, 0.9) 0%,
            rgba(255, 255, 255, 0.4) 60%,
            rgba(255, 255, 255, 0) 100%);
          border-radius: 50%;
          animation: snowfall linear infinite;
          will-change: transform;
        }

        @keyframes snowfall {
          0% {
            transform: translateY(-10px) 
                       translateX(calc(var(--horizontal-swing) * -1)) 
                       rotate(0deg)
                       scale(0.8);
          }
          25% {
            transform: translateY(25vh) 
                       translateX(0) 
                       rotate(90deg)
                       scale(1);
          }
          50% {
            transform: translateY(50vh) 
                       translateX(var(--horizontal-swing)) 
                       rotate(180deg)
                       scale(0.9);
          }
          75% {
            transform: translateY(75vh) 
                       translateX(0) 
                       rotate(270deg)
                       scale(1);
          }
          100% {
            transform: translateY(110vh) 
                       translateX(calc(var(--horizontal-swing) * -1)) 
                       rotate(360deg)
                       scale(0.8);
          }
        }

        .snow-container {
          perspective: 1500px;
          transform-style: preserve-3d;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}