import { useEffect, useRef } from 'react'

export const useEventListener = (eventName, handler, element = window) => {
  const savedHandler = useRef()

  useEffect(
    () => {
      savedHandler.current = handler
    },
    [handler]
  )

  useEffect(
    () => {
      const isSupported = element && element.addEventListener
      if (!isSupported) return

      const eventListener = event => savedHandler.current(event)

      element.addEventListener(eventName, eventListener)

      return () => {
        element.removeEventListener(eventName, eventListener)
      }
    },
    [eventName, element]
  )
}

export const useCtrlSPress = callback => {
  const listenHotkey = e => {
    const { ctrlKey, metaKey, code } = e

    if ((metaKey || ctrlKey) && code === 'KeyS') {
      e.preventDefault()

      callback()
    }
  }

  useEventListener('keydown', listenHotkey)
}
