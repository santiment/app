import { useState, useEffect } from 'react'

const DEFAULT_PRESSED_MODIFIER = {
  altKey: false,
  shiftKey: false,
  metaKey: false,
  ctrlKey: false,
  // NOTE: cmdKey is the "command" on macOS and the "ctrl" on Windows  [@vanguard | Jul  9, 2020]
  cmdKey: false
}

// NOTE: This pattern will guarantee to have only 0..N listeners during app lifetime [@vanguard | Aug  6, 2020]
export const observePressedModifier = (() => {
  let subscribers = new Set()
  let state = DEFAULT_PRESSED_MODIFIER

  const notify = subscriber => subscriber(state)
  function update (newState) {
    state = newState
    subscribers.forEach(notify)
  }

  function onKeyEvent ({ altKey, shiftKey, metaKey, ctrlKey }) {
    if (
      state.altKey !== altKey ||
      state.shiftKey !== shiftKey ||
      state.metaKey !== metaKey ||
      state.ctrlKey !== ctrlKey
    ) {
      update({
        altKey,
        shiftKey,
        metaKey,
        ctrlKey,
        cmdKey: metaKey || ctrlKey
      })
    }
  }

  const onBlur = () =>
    state !== DEFAULT_PRESSED_MODIFIER && update(DEFAULT_PRESSED_MODIFIER)

  return subscriber => {
    if (subscribers.size === 0) {
      window.addEventListener('keydown', onKeyEvent)
      window.addEventListener('keyup', onKeyEvent)
      window.addEventListener('blur', onBlur)
    }

    subscribers.add(subscriber)

    return () => {
      subscribers.delete(subscriber)

      if (subscribers.size === 0) {
        window.removeEventListener('keydown', onKeyEvent)
        window.removeEventListener('keyup', onKeyEvent)
        window.removeEventListener('blur', onBlur)
      }
    }
  }
})()

export function usePressedModifier () {
  const [PressedModifier, setPressedModifier] = useState(
    DEFAULT_PRESSED_MODIFIER
  )
  useEffect(() => observePressedModifier(setPressedModifier), [])
  return PressedModifier
}
