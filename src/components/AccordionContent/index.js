import React, { useState, useEffect, useRef } from 'react'
import cx from 'classnames'
import { CSSTransition } from 'react-transition-group'
import styles from './index.module.scss'

const transitionStyles = {
  enter: styles.contentEnter,
  enterActive: styles.contentEnterActive,
  exit: styles.contentExit,
  exitActive: styles.contentExitActive
}

// px / ms
const VELOCITY = 1
const MIN_TIME = 200
const MAX_TIME = 400
const MIN_EXIT_TIME = 200
const MAX_EXIT_TIME = 300

const calculateTime = distance => {
  const time = distance / VELOCITY
  if (time < MIN_TIME) {
    return MIN_TIME
  }

  if (time > MAX_TIME) {
    return MAX_TIME
  }

  return time
}

const calculateExitTime = distance => {
  const time = distance / VELOCITY - 100
  if (time < MIN_EXIT_TIME) {
    return MIN_EXIT_TIME
  }

  if (time > MAX_EXIT_TIME) {
    return MAX_EXIT_TIME
  }

  return time
}

const AccordionContent = ({ children, show }) => {
  const containerRef = useRef(null)
  const [height, setHeight] = useState(0)

  function clearMaxHeight () {
    containerRef.current.style.maxHeight = ''
  }

  useEffect(
    () => {
      const elem = containerRef.current
      if (show && height === 0) {
        elem.style.maxHeight = 0
        const elemHeight = elem.scrollHeight
        setHeight(elemHeight)
      }

      if (!show && height !== 0) {
        elem.style.maxHeight = height + 'px'
        setHeight(0)
      }
    },
    [show]
  )

  useEffect(
    () => {
      const elem = containerRef.current

      if (height) {
        elem.style.transition = `max-height ${calculateTime(
          height
        )}ms ease-in-out`
        elem.style.maxHeight = height + 'px'
      } else {
        elem.style.transition = `max-height ${calculateExitTime(
          elem.scrollHeight
        )}ms ease`
        elem.style.maxHeight = 0
      }
    },
    [height]
  )

  return (
    <div className={cx(styles.roll, show && styles.rollOut)} ref={containerRef}>
      <CSSTransition
        unmountOnExit
        in={show}
        timeout={400}
        classNames={transitionStyles}
        onEntered={clearMaxHeight}
        onExited={clearMaxHeight}
      >
        {children}
      </CSSTransition>
    </div>
  )
}

export default AccordionContent
