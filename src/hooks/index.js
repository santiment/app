import { useState, useEffect } from 'react'

export const useDebounceEffect = (fn, time, dependencies = []) => {
  const [timer, setTimer] = useState()
  useEffect(() => {
    clearTimeout(timer)
    setTimer(setTimeout(fn, time))
    return () => clearTimeout(timer)
  }, dependencies)
}

export const useDebounce = (fn, time) => {
  const [timer, setTimer] = useState()

  useEffect(() => () => clearTimeout(timer), [])

  return (...args) => {
    clearTimeout(timer)
    setTimer(setTimeout(() => fn(...args), time))
  }
}
