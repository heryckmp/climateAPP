'use client'

import { useEffect, useRef, useState } from 'react'
import Globe from 'react-globe.gl'
import { MapPin } from 'lucide-react'
import * as THREE from 'three'

interface UserLocation {
  lat: number;
  lng: number;
  label?: string;
}

interface Arc {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  color: string;
}

export default function InteractiveGlobe() {
  const globeRef = useRef<any>()
  const [dimensions, setDimensions] = useState({ width: 0, height: 300 })
  const [isMounted, setIsMounted] = useState(false)
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null)
  const [arcs, setArcs] = useState<Arc[]>([])

  // Função para gerar conexões aleatórias
  const generateArcs = (userLat: number, userLng: number) => {
    const cities = [
      { lat: 40.7128, lng: -74.0060 }, // New York
      { lat: 51.5074, lng: -0.1278 },  // London
      { lat: 35.6762, lng: 139.6503 }, // Tokyo
      { lat: -33.8688, lng: 151.2093 }, // Sydney
      { lat: -23.5505, lng: -46.6333 }, // São Paulo
      { lat: 28.6139, lng: 77.2090 },  // New Delhi
      { lat: 55.7558, lng: 37.6173 },  // Moscow
      { lat: 31.2304, lng: 121.4737 }, // Shanghai
    ]

    // Cor amarela brilhante para todas as linhas
    const glowingYellow = 'rgba(255, 255, 150, 0.6)' // Amarelo mais suave e realista

    const newArcs: Arc[] = cities.map(city => ({
      startLat: userLat,
      startLng: userLng,
      endLat: city.lat,
      endLng: city.lng,
      color: glowingYellow
    }))

    setArcs(newArcs)
  }

  useEffect(() => {
    setIsMounted(true)
    const updateDimensions = () => {
      const width = Math.min(window.innerWidth - 40, 800)
      setDimensions({ width, height: 300 })
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)

    // Obter localização do usuário
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            label: 'Sua localização'
          }
          setUserLocation(location)
          generateArcs(location.lat, location.lng) // Gerar arcos quando obtiver a localização

          // Configurar visualização inicial do globo
          if (globeRef.current) {
            globeRef.current.controls().autoRotate = true
            globeRef.current.controls().autoRotateSpeed = 0.5
            globeRef.current.controls().enableZoom = true
            
            // Ajustar ponto de vista para a localização do usuário
            globeRef.current.pointOfView({
              lat: location.lat,
              lng: location.lng,
              altitude: 0.4
            }, 2000)
          }
        },
        (error) => {
          console.error('Erro ao obter localização:', error)
          // Fallback para o Brasil se não conseguir a localização
          const fallbackLocation = {
            lat: -15.793889,
            lng: -47.882778,
            label: 'Brasil'
          }
          setUserLocation(fallbackLocation)
          generateArcs(fallbackLocation.lat, fallbackLocation.lng) // Gerar arcos com localização padrão
        }
      )
    }

    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  // Configuração dos marcadores
  const markerData = userLocation ? [userLocation] : []

  // Função customizada para renderizar o marcador
  const customMarker = () => {
    const canvas = document.createElement('canvas')
    canvas.width = 64
    canvas.height = 64
    const ctx = canvas.getContext('2d')
    if (ctx) {
      // Desenhar o X em vermelho
      ctx.strokeStyle = '#ef4444' // red-500
      ctx.lineWidth = 6
      
      // Primeira linha do X
      ctx.beginPath()
      ctx.moveTo(16, 16)
      ctx.lineTo(48, 48)
      ctx.stroke()
      
      // Segunda linha do X
      ctx.beginPath()
      ctx.moveTo(48, 16)
      ctx.lineTo(16, 48)
      ctx.stroke()

      // Contorno branco para melhor visibilidade
      ctx.strokeStyle = 'white'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(16, 16)
      ctx.lineTo(48, 48)
      ctx.moveTo(48, 16)
      ctx.lineTo(16, 48)
      ctx.stroke()
    }
    return canvas
  }

  if (!isMounted) return null

  return (
    <div className="relative w-full flex justify-center items-center mt-32 mb-16">
      <div 
        className="relative rounded-xl overflow-hidden"
        style={{ 
          width: dimensions.width,
          height: dimensions.height,
          background: 'linear-gradient(135deg, rgb(59, 130, 246) 0%, rgb(147, 51, 234) 100%)',
          opacity: 0.98
        }}
      >
        <Globe
          ref={globeRef}
          width={dimensions.width}
          height={dimensions.height}
          globeImageUrl="https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
          bumpImageUrl="https://unpkg.com/three-globe/example/img/earth-topology.png"
          backgroundImageUrl={null}
          atmosphereColor="rgb(155, 200, 255)"
          atmosphereAltitude={0.18}
          enablePointerInteraction={true}
          pointsData={[]}
          customLayerData={markerData}
          customThreeObject={() => {
            const sprite = new THREE.Sprite(
              new THREE.SpriteMaterial({
                map: new THREE.CanvasTexture(customMarker()),
                transparent: true,
                opacity: 0.9
              })
            )
            sprite.scale.set(8, 8, 1)
            return sprite
          }}
          customThreeObjectUpdate={(obj, d: UserLocation) => {
            Object.assign(obj.position, globeRef.current.getCoords(d.lat, d.lng, 0.01))
          }}
          arcsData={arcs}
          arcColor={'color'}
          arcDashLength={0.4}
          arcDashGap={0.15}
          arcDashAnimateTime={3000}
          arcStroke={0.5}
          arcAltitude={0.15}
          globeMaterial={
            new THREE.MeshPhongMaterial({
              map: new THREE.TextureLoader().load('https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg'),
              bumpMap: new THREE.TextureLoader().load('https://unpkg.com/three-globe/example/img/earth-topology.png'),
              bumpScale: 10,
              shininess: 15,
              specular: new THREE.Color(0x333333),
              specularMap: new THREE.TextureLoader().load('https://unpkg.com/three-globe/example/img/earth-water.png'),
              opacity: 1
            })
          }
        />
      </div>
    </div>
  )
} 