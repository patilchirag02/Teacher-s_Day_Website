import React, { useEffect, useState } from 'react'
import './InvitationReveal.css'

export default function InvitationReveal({ onNext }) {
  const [phase, setPhase] = useState(0)
  // phase 0: envelope closed  → 1: opening  → 2: letter revealed

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 400)
    const t2 = setTimeout(() => setPhase(2), 1600)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  return (
    <section className="reveal-screen">
      <div className={`envelope-wrap ${phase >= 1 ? 'opening' : ''} ${phase >= 2 ? 'hidden' : ''}`}>
        <div className="envelope">
          <div className="env-flap" />
          <div className="env-body">
            <span className="env-seal">✦</span>
          </div>
        </div>
        <p className="env-label">Your invitation is here…</p>
      </div>

      {phase >= 2 && (
        <div className="letter-wrap">
          {/* Decorative top */}
          <div className="letter-deco-top" aria-hidden="true">
            {'🌸 ✦ 🌺 ✦ 🌸'.split(' ').map((c, i) => (
              <span key={i}>{c}</span>
            ))}
          </div>

          <div className="letter-card">
            <p className="letter-from">From your students, with love</p>

            <div className="letter-divider" aria-hidden="true">
              <span />
              <span>💐</span>
              <span />
            </div>

            <h2 className="letter-heading">
              Dear <em>Teacher</em>,
            </h2>

            <p className="letter-body">
              This celebration is dedicated to <strong>you</strong>.
            </p>

            <p className="letter-message">
              You are not just an educator — you are the compass that guides us,
              the light that dispels our doubts, and the steady hand that shapes
              our futures. Every lesson you taught us, every moment you believed
              in us, has left a mark that time will never erase.
            </p>

            <p className="letter-message">
              On this special day, we come together to celebrate the extraordinary
              person you are — and to say, from the bottom of our hearts,
              <em> thank you</em>.
            </p>

            <div className="letter-divider" aria-hidden="true">
              <span />
              <span>✦</span>
              <span />
            </div>

            <p className="letter-sign">
              — Your students at <strong>TGBS</strong>
            </p>
          </div>

          {/* Decorative bottom */}
          <div className="letter-deco-top" aria-hidden="true">
            {'🌹 ✦ 🌸 ✦ 🌹'.split(' ').map((c, i) => (
              <span key={i}>{c}</span>
            ))}
          </div>

          <button className="next-btn" onClick={onNext} aria-label="See event details">
            See Event Details
            <span className="arrow">→</span>
          </button>
        </div>
      )}
    </section>
  )
}
