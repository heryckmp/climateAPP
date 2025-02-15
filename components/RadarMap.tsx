'use client'

import { MapContainer, TileLayer, Marker, Popup, useMap, LayersControl } from 'react-leaflet'
import { useState, useEffect } from 'react'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import type { LatLngTuple } from 'leaflet'
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react'

// Fix for Leaflet default marker icons
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})
L.Marker.prototype.options.icon = DefaultIcon

// Componente para controlar o zoom automático
function AutoZoom({ center }: { center: LatLngTuple }) {
  const map = useMap()
  const [zoomLevel, setZoomLevel] = useState(4)
  
  useEffect(() => {
    let currentZoom = 4
    const targetZoom = 10
    const zoomInterval = 500 // Intervalo entre cada nível de zoom (em ms)
    
    // Função para fazer o zoom gradual
    const smoothZoom = () => {
      if (currentZoom < targetZoom) {
        currentZoom += 1
        map.setView(center, currentZoom, {
          animate: true,
          duration: 1
        })
        setZoomLevel(currentZoom)
        setTimeout(smoothZoom, zoomInterval)
      }
    }

    // Primeiro move o mapa para a posição inicial (zoom 4)
    map.setView(center, 4, {
      animate: true,
      duration: 1
    })

    // Inicia o zoom gradual após um pequeno delay
    setTimeout(smoothZoom, 1000)

    // Cleanup
    return () => {
      setZoomLevel(4)
    }
  }, [center, map])

  return null
}

interface RadarFrame {
  time: number;
  path: string;
}

interface RadarData {
  past: RadarFrame[];
  nowcast: RadarFrame[];
}

function TimeControl({ frames, currentFrame, onFrameChange, isPlaying, onPlayPause }: {
  frames: RadarFrame[];
  currentFrame: RadarFrame | null;
  onFrameChange: (frame: RadarFrame) => void;
  isPlaying: boolean;
  onPlayPause: () => void;
}) {
  return (
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-[1000] bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg flex items-center gap-4">
      <button
        onClick={() => {
          const currentIndex = frames.findIndex(f => f.time === currentFrame?.time);
          if (currentIndex > 0) {
            onFrameChange(frames[currentIndex - 1]);
          } else {
            onFrameChange(frames[frames.length - 1]);
          }
        }}
        className="p-1 hover:bg-gray-200 rounded-full transition-colors"
      >
        <SkipBack className="w-5 h-5" />
      </button>
      
      <button
        onClick={onPlayPause}
        className="p-1 hover:bg-gray-200 rounded-full transition-colors"
      >
        {isPlaying ? (
          <Pause className="w-5 h-5" />
        ) : (
          <Play className="w-5 h-5" />
        )}
      </button>
      
      <button
        onClick={() => {
          const currentIndex = frames.findIndex(f => f.time === currentFrame?.time);
          if (currentIndex < frames.length - 1) {
            onFrameChange(frames[currentIndex + 1]);
          } else {
            onFrameChange(frames[0]);
          }
        }}
        className="p-1 hover:bg-gray-200 rounded-full transition-colors"
      >
        <SkipForward className="w-5 h-5" />
      </button>
      
      <div className="text-sm">
        {currentFrame && new Date(currentFrame.time * 1000).toLocaleTimeString()}
      </div>
    </div>
  );
}

export default function RadarMap() {
  const [frames, setFrames] = useState<RadarFrame[]>([])
  const [currentFrame, setCurrentFrame] = useState<RadarFrame | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const defaultCenter: LatLngTuple = [-15.793889, -47.882778] // Centro do Brasil
  const [center, setCenter] = useState<LatLngTuple>(defaultCenter)
  const [isMounted, setIsMounted] = useState(false)
  const [isLocating, setIsLocating] = useState(true)
  const [locationError, setLocationError] = useState<string | null>(null)
  const [hasUserLocation, setHasUserLocation] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    async function fetchRadarData() {
      try {
        const res = await fetch('https://api.rainviewer.com/public/maps.json')
        const data = await res.json()
        
        if (data && data.radar && data.radar.past) {
          // Ordenar frames do mais antigo para o mais recente
          const sortedFrames = data.radar.past.map(frame => ({
            time: frame,
            path: frame.toString()
          })).sort((a, b) => a.time - b.time)
          
          setFrames(sortedFrames)
          setCurrentFrame(sortedFrames[0])
        }
      } catch (error) {
        console.error('Erro ao buscar dados do radar:', error)
      }
    }

    fetchRadarData()
    
    // Atualiza os dados a cada 5 minutos
    const interval = setInterval(fetchRadarData, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (!isPlaying || !frames.length || !currentFrame) return
    
    const interval = setInterval(() => {
      const currentIndex = frames.findIndex(f => f.time === currentFrame.time)
      if (currentIndex === frames.length - 1) {
        // Volta ao início quando chega no último frame
        setCurrentFrame(frames[0])
      } else {
        // Avança para o próximo frame
        setCurrentFrame(frames[currentIndex + 1])
      }
    }, 500) // Velocidade da animação reduzida para 500ms

    return () => clearInterval(interval)
  }, [isPlaying, currentFrame, frames])

  useEffect(() => {
    if (navigator.geolocation) {
      setIsLocating(true)
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newCenter: LatLngTuple = [position.coords.latitude, position.coords.longitude]
          setCenter(newCenter)
          setHasUserLocation(true)
          setIsLocating(false)
          setLocationError(null)
        },
        (error) => {
          console.error('Erro ao obter localização:', error)
          setIsLocating(false)
          setLocationError(
            error.code === 1 
              ? 'Permissão de localização negada. Por favor, permita o acesso à sua localização.'
              : 'Não foi possível obter sua localização. Verifique se o GPS está ativado.'
          )
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      )
    } else {
      setIsLocating(false)
      setLocationError('Seu navegador não suporta geolocalização')
    }
  }, [])

  if (!isMounted) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-80px)] bg-gray-800 text-white">
        Carregando mapa...
      </div>
    )
  }

  return (
    <div className="relative w-full h-[calc(100vh-80px)]">
      {isLocating && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-[1000] bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg">
          Obtendo sua localização...
        </div>
      )}
      {locationError && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-[1000] bg-red-500 text-white px-4 py-2 rounded-full shadow-lg">
          {locationError}
        </div>
      )}
      <MapContainer 
        center={center} 
        zoom={4} 
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="Mapa">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
          </LayersControl.BaseLayer>

          <LayersControl.BaseLayer name="Satélite">
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              attribution='&copy; <a href="https://www.esri.com">Esri</a>'
            />
          </LayersControl.BaseLayer>
          
          <LayersControl.BaseLayer name="Satélite com Rótulos">
            <TileLayer
              url="https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"
              attribution='&copy; Google Maps'
            />
          </LayersControl.BaseLayer>

          <LayersControl.Overlay checked name="Radar Meteorológico">
            {currentFrame && (
              <TileLayer
                url={`https://tilecache.rainviewer.com/v2/coverage/${currentFrame.time}/256/{z}/{x}/{y}/2/1_1.png`}
                attribution='&copy; <a href="https://www.rainviewer.com/">RainViewer</a>'
                opacity={1}
              />
            )}
          </LayersControl.Overlay>
        </LayersControl>

        {hasUserLocation && (
          <>
            <AutoZoom center={center} />
            <Marker position={center}>
              <Popup>
                Sua localização
              </Popup>
            </Marker>
          </>
        )}
      </MapContainer>

      {frames.length > 0 && currentFrame && (
        <TimeControl
          frames={frames}
          currentFrame={currentFrame}
          onFrameChange={setCurrentFrame}
          isPlaying={isPlaying}
          onPlayPause={() => setIsPlaying(!isPlaying)}
        />
      )}
    </div>
  )
} 