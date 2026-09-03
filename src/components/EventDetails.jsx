import React, { useEffect, useState } from 'react'
import './EventDetails.css'

const details = [
  { icon: '📅', label: 'Date',  value: '7 September 2026', sub: 'Monday' },
  { icon: '⏰', label: 'Time',  value: '2:00 PM Onwards', sub: 'Be there on time!' },
  { icon: '📍', label: 'Venue', value: 'TCET Multipurpose Hall', sub: '2nd Floor' },
]

export default function EventDetails({ onNext }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <section className={`event-screen ${visible ? 'visible' : ''}`}>
      <div className="event-inner">
        {/* Heading */}
        <div className="section-badge">Event Details</div>
        <h2 className="event-heading">
          Join Us for a<br />
          <em>Day to Remember</em>
        </h2>

        <div className="divider gold-divider" aria-hidden="true">
          <span /><span>🎓</span><span />
        </div>

        {/* Cards */}
        <div className="details-grid">
          {details.map((d, i) => (
            <div
              key={d.label}
              className="detail-card"
              style={{ animationDelay: `${0.2 + i * 0.15}s` }}
            >
              <span className="detail-icon">{d.icon}</span>
              <div className="detail-text">
                <span className="detail-label">{d.label}</span>
                <span className="detail-value">{d.value}</span>
                <span className="detail-sub">{d.sub}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Hosted by strip */}
        <div className="hosted-by">
          <span>Hosted by</span>
          <strong>Thakur Global Business School</strong>
          <span className="hosted-hearts">🌸 💛 🌸</span>
        </div>

        <button className="next-btn" onClick={onNext} aria-label="What to expect">
          What's in Store?
          <span className="arrow">→</span>
        </button>
      </div>
    </section>
  )
}
