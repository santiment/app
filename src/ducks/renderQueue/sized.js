import React, { useState, useContext, useEffect } from 'react'

function SizedRenderQueue (size) {
  const queue = []
  const loadingSet = new Set()

  function renderNext () {
    const [ref, setIsRendered] = queue.shift()

    loadingSet.add(ref)
    setIsRendered(true)
  }

  function onItemLoad (ref) {
    loadingSet.delete(ref)

    if (queue.length) renderNext()
  }

  function Ref () {
    const ref = () => onItemLoad(ref)
    return ref
  }

  function register (ref, setIsRendered) {
    if (loadingSet.size < size) {
      loadingSet.add(ref)
      setIsRendered(true)
    } else {
      queue.push([ref, setIsRendered])
    }
  }

  return () => {
    const [isRendered, setIsRendered] = useState(false)
    const ref = useState(Ref)[0]

    useEffect(() => register(ref, setIsRendered), [])

    return { isRendered, onLoad: ref }
  }
}
export const newRenderQueue = size => () => SizedRenderQueue(size)

const RenderQueueContext = React.createContext()
export const useRenderQueueItem = () => useContext(RenderQueueContext)()

export const RenderQueueProvider = ({ children, RenderQueue }) => (
  <RenderQueueContext.Provider value={useState(RenderQueue)[0]}>
    {children}
  </RenderQueueContext.Provider>
)
export const withRenderQueueProvider = (
  Component,
  SizedRenderQueue
) => props => (
  <RenderQueueProvider RenderQueue={SizedRenderQueue}>
    <Component {...props} />
  </RenderQueueProvider>
)
