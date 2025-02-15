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

export default function InteractiveGlobe() {
  const globeRef = useRef<any>()
  const [dimensions, setDimensions] = useState({ width: 0, height: 300 })
  const [isMounted, setIsMounted] = useState(false)
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null)

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