import { useState, useEffect } from 'react'

export function useKeyDown(clb, key) {
  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === key) {
        clb(e)
      }
    }

    window.addEventListener('keydown', onKeyDown)

    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])
}

export function usePhase(defaultPhase) {
  const [currentPhase, setCurrentPhase] = useState(defaultPhase)
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
