import React, { useState, useContext, useCallback, useEffect } from 'react'

function checkIsInViewport (container) {
  const { y, height } = container.getBoundingClientRect()
  const shouldBeInViewport = height * 0.3

  return y > -shouldBeInViewport && y + height < height + shouldBeInViewport
}

function RenderQueue () {
  const queue = []
  let isLookingForViewportItem = true

  return {
    useRenderQueueItem (ref) {
      const [isRendered, setIsRendered] = useState(false)
      const onLoad = useCallback(() => {}, [])

      useEffect(() => {
        const container = ref.current

        if (isLookingForViewportItem && checkIsInViewport(container)) {
          isLookingForViewportItem = false
          return setIsRendered(true)
        }

        queue.push(container)
      }, [])

      return { isRendered, onLoad }
    }
  }
}

const RenderQueueContext = React.createContext()
export const useRenderQueue = () => useContext(RenderQueueContext)

export const RenderQueueProvider = ({ children }) => (
  <RenderQueueContext.Provider value={useState(RenderQueue)[0]}>
    {children}
  </RenderQueueContext.Provider>
)
export const withRenderQueueProvider = Component => props => (
  <RenderQueueProvider>
    <Component {...props} />
  </RenderQueueProvider>
)
