import { useState, useEffect } from 'react'

export const useDebounce = (fn, time, dependencies = []) => {
  const [timer, setTimer] = useState()
  useEffect(() => {
    clearTimeout(timer)
    setTimer(setTimeout(fn, time))
    return () => clearTimeout(timer)
  }, dependencies)
}
