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

const AccordionContent = ({ children, className, show }) => {
  const containerRef = useRef(null)
  const [height, setHeight] = useState(0)

  useEffect(
    () => {
      if (show && height === 0) {
        containerRef.current.style.maxHeight =
          containerRef.current.scrollHeight + 'px'
        setHeight(containerRef.current.scrollHeight)
      }

      if (!show && height !== 0) {
        containerRef.current.style.maxHeight = 0
        setHeight(0)
      }
    },
    [show]
  )

  return (
    <div className={cx(styles.roll, show && styles.rollOut)} ref={containerRef}>
      <CSSTransition
        unmountOnExit
        in={show}
        timeout={300}
        classNames={transitionStyles}
      >
        <div className={className}>{children}</div>
      </CSSTransition>
    </div>
  )
}

export default AccordionContent
