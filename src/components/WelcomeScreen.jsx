import React, { useEffect, useState } from 'react'
import './WelcomeScreen.css'

export default function WelcomeScreen({ onOpen }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <section className={`welcome-screen ${visible ? 'visible' : ''}`}>
      {/* Decorative ring */}
      <div className="deco-ring ring-1" aria-hidden="true" />
      <div className="deco-ring ring-2" aria-hidden="true" />

      <div className="welcome-content">
        {/* Emblem */}
        <div className="emblem" aria-hidden="true">
          <span className="emblem-icon">🎓</span>
          <div className="emblem-glow" />
        </div>

        {/* College */}
        <p className="college-label">Thakur Global Business School</p>
        <div className="divider">
          <span className="divider-line" />
          <span className="divider-icon">✦</span>
          <span className="divider-line" />
        </div>

        {/* Hero title */}
        <h1 className="hero-title">
          <span className="title-line">Teachers' Day</span>
          <span className="title-line accent">Celebration</span>
          <span className="title-year">2026</span>
        </h1>

        {/* Sub caption */}
        <p className="hero-sub">
          A heartfelt tribute to those who light the way.
        </p>

        {/* Floating flowers row */}
        <div className="flower-row" aria-hidden="true">
          {['🌸','🌹','🌺','🌸','🌹'].map((f, i) => (
            <span key={i} className="flower-icon" style={{ animationDelay: `${i * 0.3}s` }}>{f}</span>
          ))}
        </div>

        {/* CTA */}
        <button className="cta-btn" onClick={onOpen} aria-label="Open your invitation">
          <span className="btn-text">Open Your Invitation</span>
          <span className="btn-icon">💐</span>
          <span className="btn-shine" aria-hidden="true" />
        </button>

        <p className="scroll-hint">7 September 2026</p>
      </div>
    </section>
  )
}
