import React, { useState, useEffect } from 'react'

const OPTIONS = {
  threshold: 0.4
}

const observePressedModifier = (() => {
  const subscribers = new Set()
  const visibles = new Set()

  const notify = subscriber => subscriber(visibles)
  const update = () => subscribers.forEach(notify)
  const observer = new IntersectionObserver(changes => {
    changes.forEach(({ target, isIntersecting }) => {
      if (isIntersecting) {
        visibles.add(target)
      } else {
        visibles.delete(target)
      }
    })

    requestAnimationFrame(update)
  }, OPTIONS)

  return (target, subscriber) => {
    subscribers.add(subscriber)
    observer.observe(target)

    return () => {
      subscribers.delete(subscriber)
      visibles.delete(target)
      observer.unobserve(target)
    }
  }
})()

export const withViewportFilter = Component => ({ chart, insights }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const { canvas } = chart
    return observePressedModifier(canvas, visibles =>
      setIsVisible(visibles.has(canvas))
    )
  }, [])

  return isVisible ? <Component chart={chart} insights={insights} /> : null
}
