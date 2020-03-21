import React from 'react'
import styles from './index.module.scss'

const Signal = ({ signal, setHovered, removeSignal }) => {
  function onMouseEnter () {
    setTimeout(() => setHovered(signal), 0)
  }

  function onMouseLeave () {
    setHovered()
  }

  function onClick () {
    removeSignal(signal.id)
  }

  return (
    <div
      className={styles.signal}
      style={{
        top: signal.y
      }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    />
  )
}

export default Signal
