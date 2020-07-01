import { useEffect } from 'react'

export function useKeyDown (clb, key) {
  useEffect(() => {
    function onKeyDown (e) {
      if (e.key === key) {
        clb(e)
      }
    }

    window.addEventListener('keydown', onKeyDown)

    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])
}

export function useKeyboardShortcut (key, clb, target = window) {
  useEffect(
    () => {
      function onKeyPress (e) {
        const { ctrlKey, metaKey } = e

        if ((metaKey || ctrlKey) && key === e.key) {
          clb()
        }
      }

      target.addEventListener('keydown', onKeyPress)

      return () => target.removeEventListener('keydown', onKeyPress)
    },
    [clb, target]
  )
}
