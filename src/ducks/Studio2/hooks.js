import { useEffect } from 'react'

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
