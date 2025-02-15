export const FogEffect = () => (
  <div className="fog-container absolute inset-0 pointer-events-none">
    {[...Array(5)].map((_, i) => (
      <div
        key={i}
        className="fog-layer absolute inset-0 bg-gray-300"
        style={{
          opacity: 0.1 + (i * 0.05),
          animationDuration: `${20 + (i * 5)}s`,
          animationDelay: `${i * -5}s`
        }}
      />
    ))}
    <style jsx>{`
      @keyframes fog {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
      }
      .fog-layer {
        animation: fog linear infinite;
      }
    `}</style>
  </div>
)

