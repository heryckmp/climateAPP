export const CloudEffect = () => {
  return (
    <div className="clouds-container absolute inset-0 pointer-events-none overflow-hidden">
      {/* Camada de nuvens grandes */}
      {[...Array(4)].map((_, i) => (
        <div
          key={`large-${i}`}
          className="cloud absolute"
          style={{
            top: `${(i * 25)}%`,
            left: `-20%`,
            animationDuration: `${35 + Math.random() * 15}s`,
            animationDelay: `${i * 4}s`,
          }}
        >
          <div className="cloud-part main bg-white/8" />
          <div className="cloud-part center bg-white/8" />
          <div className="cloud-part right bg-white/8" />
        </div>
      ))}

      {/* Camada de nuvens médias */}
      {[...Array(3)].map((_, i) => (
        <div
          key={`medium-${i}`}
          className="cloud absolute"
          style={{
            top: `${15 + (i * 30)}%`,
            left: `-15%`,
            transform: 'scale(0.7)',
            animationDuration: `${25 + Math.random() * 10}s`,
            animationDelay: `${i * 5 + 2}s`,
          }}
        >
          <div className="cloud-part main bg-white/12" />
          <div className="cloud-part center bg-white/12" />
          <div className="cloud-part right bg-white/12" />
        </div>
      ))}

      <style jsx>{`
        @keyframes float-cloud {
          0% { transform: translateX(-100%) scale(1); }
          100% { transform: translateX(400%) scale(1); }
        }

        .cloud {
          animation: float-cloud linear infinite;
          filter: blur(4px);
        }

        .cloud-part {
          position: absolute;
          border-radius: 100px;
        }

        .cloud-part.main {
          width: 150px;
          height: 50px;
          bottom: 0;
          left: 0;
        }

        .cloud-part.center {
          width: 100px;
          height: 100px;
          bottom: 15px;
          left: 50px;
        }

        .cloud-part.right {
          width: 80px;
          height: 80px;
          bottom: 8px;
          left: 110px;
        }
      `}</style>
    </div>
  )
}