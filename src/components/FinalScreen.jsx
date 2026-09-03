import React, { useEffect, useState } from 'react'
import './FinalScreen.css'

export default function FinalScreen() {
  const [visible, setVisible] = useState(false)
  const [heartsPopped, setHeartsPopped] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 100)
    const t2 = setTimeout(() => setHeartsPopped(true), 1200)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  return (
    <section className={`final-screen ${visible ? 'visible' : ''}`}>
      {/* Burst hearts */}
      {heartsPopped && (
        <div className="hearts-burst" aria-hidden="true">
          {['❤️','💛','🌸','💕','✨','🌺','💖','🌼','❤️','💛'].map((h, i) => (
            <span key={i} className="burst-heart" style={{ '--i': i }}>{h}</span>
          ))}
        </div>
      )}

      <div className="final-inner">
        {/* Top emblem */}
        <div className="final-emblem" aria-hidden="true">
          <span>🎓</span>
          <div className="final-emblem-ring" />
        </div>

        <p className="final-college">Thakur Global Business School</p>

        <div className="divider gold-divider" aria-hidden="true">
          <span /><span>✦</span><span />
        </div>

        <h2 className="final-heading">
          Your presence will make<br />
          our celebration<br />
          <em>truly special.</em>
        </h2>

        <p className="final-sub">
          We look forward to celebrating with you and expressing
          our gratitude in the most heartfelt way possible.
        </p>

        {/* Date recap */}
        <div className="date-recap">
          <div className="recap-item">
            <span>📅</span>
            <span>7 September 2026</span>
          </div>
          <div className="recap-divider">·</div>
          <div className="recap-item">
            <span>⏰</span>
            <span>2:00 PM Onwards</span>
          </div>
          <div className="recap-divider">·</div>
          <div className="recap-item">
            <span>📍</span>
            <span>TCET Multipurpose Hall, 2nd Floor</span>
          </div>
        </div>

        {/* Final CTA */}
        <button
          className="final-btn"
          onClick={() => {}} 
          aria-label="We look forward to seeing you"
        >
          <span>See You There!</span>
          <span className="final-btn-heart">❤️</span>
        </button>

        {/* Closing note */}
        <p className="closing-note">
          — With love &amp; gratitude, your students 🌸
        </p>
      </div>
    </section>
  )
}
