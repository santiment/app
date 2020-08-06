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

export function useKeyboardCmdShortcut (key, clb, target = window) {
  useEffect(
    () => {
      function onKeyDown (e) {
        const { ctrlKey, metaKey } = e

        if ((metaKey || ctrlKey) && key === e.key) {
          e.preventDefault()
          clb()
        }
      }

      target.addEventListener('keydown', onKeyDown)

      return () => target.removeEventListener('keydown', onKeyDown)
    },
    [clb, target]
  )
}
