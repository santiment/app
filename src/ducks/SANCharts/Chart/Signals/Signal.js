import React from 'react'
import { alignY, drawTextBubble, drawTexts, drawLine } from './helpers'
import styles from './index.module.scss'

const Signal = ({ signal, setHovered }) => {
  function onMouseEnter () {
    setHovered(signal)
  }

  function onMouseLeave () {
    setHovered()
  }

  return (
    <div
      className={styles.signal}
      style={{
        top: signal.y
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    />
  )
}

export default Signal
