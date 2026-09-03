import React, { useMemo } from 'react'
import './FloatingElements.css'

const PETALS = ['🌸', '🌺', '🌼', '✨', '🍂', '📖', '🌹']

export default function FloatingElements() {
  const petals = useMemo(() => (
    Array.from({ length: 18 }, (_, i) => ({
      id: i,
      emoji:  PETALS[i % PETALS.length],
      left:   `${Math.random() * 100}%`,
      delay:  `${Math.random() * 12}s`,
      dur:    `${10 + Math.random() * 12}s`,
      size:   `${0.9 + Math.random() * 0.9}rem`,
      opacity: 0.25 + Math.random() * 0.35,
    }))
  ), [])

  const stars = useMemo(() => (
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      top:   `${Math.random() * 100}%`,
      left:  `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      size:  `${1 + Math.random() * 2}px`,
    }))
  ), [])

  return (
    <div className="floating-layer" aria-hidden="true">
      {/* Stars */}
      {stars.map(s => (
        <span
          key={`star-${s.id}`}
          className="star"
          style={{
            top: s.top, left: s.left,
            width: s.size, height: s.size,
            animationDelay: s.delay,
          }}
        />
      ))}

      {/* Falling petals */}
      {petals.map(p => (
        <span
          key={`petal-${p.id}`}
          className="petal"
          style={{
            left:            p.left,
            animationDelay:  p.delay,
            animationDuration: p.dur,
            fontSize:        p.size,
            opacity:         p.opacity,
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  )
}
