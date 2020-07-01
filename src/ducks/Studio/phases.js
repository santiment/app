import { useState } from 'react'

export const Phase = {
  IDLE: 'idle',
  MAPVIEW: 'mapview',
  MAPVIEW_SELECTION: 'mapview_selection',
}

export function usePhase() {
  const [currentPhase, setCurrentPhase] = useState(Phase.IDLE)
  const [previousPhase, setPreviousPhase] = useState(currentPhase)

  function setPhase(newPhase, prevPhase = newPhase) {
    setPreviousPhase(prevPhase)
    setCurrentPhase(newPhase)
  }

  return {
    currentPhase,
    previousPhase,
    setPhase,
  }
}
