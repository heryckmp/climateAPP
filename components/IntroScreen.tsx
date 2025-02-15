import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

const InteractiveGlobe = dynamic(() => import('./Globe'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="text-white/60">Carregando globo...</div>
    </div>
  )
})

interface IntroScreenProps {
  onIntroComplete: () => void;
}

export function IntroScreen({ onIntroComplete }: IntroScreenProps) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Tempo total da animação do globo (zoom + transição)
    const totalAnimationTime = 8000 // 8 segundos

    // Timer para indicar que a intro terminou
    const timer = setTimeout(() => {
      setIsLoading(false)
      // Adiciona um pequeno delay antes de chamar onIntroComplete
      setTimeout(onIntroComplete, 500)
    }, totalAnimationTime)

    return () => clearTimeout(timer)
  }, [onIntroComplete])

  return (
    <div className={`fixed inset-0 z-50 bg-gradient-to-br from-blue-500 to-purple-600 transition-opacity duration-500 ${isLoading ? 'opacity-100' : 'opacity-0'}`}>
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <div className="absolute inset-0">
          <InteractiveGlobe isIntro={true} />
        </div>
        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${isLoading ? 'opacity-100' : 'opacity-0'}`}>
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-white">
              Bem-vindo ao ClimateAPP
            </h1>
            <p className="text-white/80">
              Localizando sua posição...
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 