import { useState, useEffect } from 'react'

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
      function onKeyDown (e) {
        const { ctrlKey, metaKey } = e

        if ((metaKey || ctrlKey) && key === e.key) {
          clb()
        }
      }

      target.addEventListener('keydown', onKeyDown)

      return () => target.removeEventListener('keydown', onKeyDown)
    },
    [clb, target]
  )
}

const DEFAULT_PRESSED_MOFIER = {
  altKey: false,
  shiftKey: false,
  metaKey: false,
  ctrlKey: false
}

export function usePressedModifier () {
  const [pressedModifier, setPressedModifier] = useState(DEFAULT_PRESSED_MOFIER)

  useEffect(() => {
    function onKeyEvent ({ altKey, shiftKey, metaKey, ctrlKey }) {
      setPressedModifier(state =>
        state.altKey === altKey &&
        state.shiftKey === shiftKey &&
        state.metaKey === metaKey &&
        state.ctrlKey === ctrlKey
          ? state
          : {
            altKey,
            shiftKey,
            metaKey,
            ctrlKey
          }
      )
    }

    window.addEventListener('keydown', onKeyEvent)
    window.addEventListener('keyup', onKeyEvent)

    return () => {
      window.removeEventListener('keydown', onKeyEvent)
      window.removeEventListener('keyup', onKeyEvent)
    }
  }, [])

  return pressedModifier
}
