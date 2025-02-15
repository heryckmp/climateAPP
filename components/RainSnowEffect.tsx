import { RainEffect } from './RainEffect'
import { SnowEffect } from './SnowEffect'

export const RainSnowEffect = () => (
  <div className="rain-snow-container absolute inset-0 pointer-events-none">
    <RainEffect intensity="小雨" />
    <SnowEffect intensity="小雪" />
  </div>
)

