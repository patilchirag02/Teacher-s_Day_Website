import React, { useEffect, useState } from 'react'
import './WhatToExpect.css'

const agenda = [
  { icon: '🎤', title: 'Grand Welcome',     desc: "Teachers' ceremonial entry with a warm welcome." },
  { icon: '🎭', title: 'Performances',      desc: 'Songs, dances, and skits performed with heart.' },
  { icon: '🎲', title: 'Fun Games',         desc: 'Light-hearted games to bring joy and laughter.' },
  { icon: '🖊️', title: 'Shayari & Poetry', desc: 'Heartfelt verses penned by your students.' },
  { icon: '📸', title: 'Photoshoot',        desc: 'Capture the memories with a curated photo session.' },
  { icon: '🌸', title: 'Photo Booth',       desc: 'Strike a pose at our themed photo booth!', optional: true },
  { icon: '💛', title: 'Wall of Gratitude', desc: 'Messages of thanks, love, and appreciation.', optional: true },
]

export default function WhatToExpect({ onNext }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <section className={`expect-screen ${visible ? 'visible' : ''}`}>
      <div className="expect-inner">
        <div className="section-badge">What's in Store</div>
        <h2 className="expect-heading">
          An Evening Crafted<br />
          <em>Just for You</em>
        </h2>

        <div className="divider gold-divider" aria-hidden="true">
          <span /><span>🌺</span><span />
        </div>

        <ul className="agenda-list">
          {agenda.map((item, i) => (
            <li
              key={item.title}
              className={`agenda-item ${item.optional ? 'optional' : ''}`}
              style={{ animationDelay: `${0.1 + i * 0.1}s` }}
            >
              <span className="agenda-icon">{item.icon}</span>
              <div className="agenda-text">
                <span className="agenda-title">
                  {item.title}
                  {item.optional && <span className="tag">Optional</span>}
                </span>
                <span className="agenda-desc">{item.desc}</span>
              </div>
            </li>
          ))}
        </ul>

        <p className="expect-note">
          Every moment designed to celebrate and honour you. ✨
        </p>

        <button className="next-btn" onClick={onNext} aria-label="Go to final message">
          Continue
          <span className="arrow">→</span>
        </button>
      </div>
    </section>
  )
}
