import React, { useState, useEffect, useRef } from 'react'
import StoryContent from './StoryContent'

const DURATION = 12 * 1000

const Story = ({ story = {}, open, onEnd }) => {
  const { slides } = story
  let [active, setActive] = useState(0)
  let [duration, setDuration] = useState(DURATION)
  let [resetFlag, setResetFlag] = useState(true)
  const last = slides.length - 1

  const onNext = () => {
    const next = active + 1
    if (next > last) onEnd()
    else setActive(Math.min(last, next))
    setDuration(DURATION)
    setResetFlag(!resetFlag)
  }

  const onPrev = () => {
    setActive(Math.max(0, active - 1))
    setDuration(DURATION)
    setResetFlag(!resetFlag)
  }

  useInterval(onNext, duration, resetFlag)

  return (
    <StoryContent
      active={active}
      slides={slides}
      onNext={onNext}
      onPrev={onPrev}
      onMediaClicked={() => setDuration(null)}
      isPaused={duration === null}
    />
  )
}

function useInterval (callback, delay, resetFlag) {
  const savedCallback = useRef()

  useEffect(
    () => {
      savedCallback.current = callback
    },
    [callback]
  )

  useEffect(
    () => {
      if (delay !== null) {
        let id = setInterval(() => savedCallback.current(), delay)
        return () => clearInterval(id)
      }
    },
    [delay, resetFlag]
  )
}

export default Story
