import React, { useState } from 'react'
import WelcomeScreen    from './components/WelcomeScreen'
import InvitationReveal from './components/InvitationReveal'
import EventDetails     from './components/EventDetails'
import WhatToExpect     from './components/WhatToExpect'
import FinalScreen      from './components/FinalScreen'
import FloatingElements from './components/FloatingElements'
import './App.css'

/*
  Screen flow:
  0 → Welcome
  1 → Invitation Reveal
  2 → Event Details
  3 → What To Expect
  4 → Final Screen
*/

export default function App() {
  const [screen, setScreen] = useState(0)

  const next = () => setScreen(s => Math.min(s + 1, 4))

  return (
    <div className="app-wrapper">
      <FloatingElements />

      {screen === 0 && <WelcomeScreen    onOpen={next} />}
      {screen === 1 && <InvitationReveal onNext={next} />}
      {screen === 2 && <EventDetails     onNext={next} />}
      {screen === 3 && <WhatToExpect     onNext={next} />}
      {screen === 4 && <FinalScreen />}
    </div>
  )
}
