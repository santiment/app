import React, { useState } from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import styles from './SwipeableCard.module.scss'

const BUTTON_WIDTH = 85

const SwipeableCard = ({ children }) => {
  const [startPosition, setStartPosition] = useState(0)
  const [offset, setOffset] = useState(0)
  const [side, setSide] = useState('right')

  let [currentGesture, setCurrentGesture] = useState(null)

  const onStart = evt => {
    setCurrentGesture({
      startX: evt.touches[0].pageX,
      prevX: evt.touches[0].pageX,
      startPosition
    })
  }

  const onMove = evt => {
    if (!currentGesture) {
      return
    }

    const { startX, prevX, startPosition } = currentGesture
    const x = evt.touches[0].pageX
    const dx = x - startX
    setOffset(startPosition + dx)
    setSide(offset > 0 ? 'right' : 'left')

    setCurrentGesture({ ...currentGesture, prevX: x })

    if (dx < -1.5 * BUTTON_WIDTH) {
      setStartPosition(-BUTTON_WIDTH)
    } else if (dx > 1.5 * BUTTON_WIDTH) {
      setStartPosition(BUTTON_WIDTH)
    } else {
      setStartPosition(0)
    }
  }

  const onCancel = evt => {
    if (!currentGesture) {
      return
    }

    setCurrentGesture(null)
    setOffset(startPosition)
  }

  return (
    <div
      className={cx(
        styles.container,
        side === 'right' && styles.container__right,
        side === 'left' && styles.container__left
      )}
      style={{ '--button-width': `${BUTTON_WIDTH}px` }}
    >
      <button className={cx(styles.button, styles.info)}>
        <Icon type='info-round' />
      </button>
      <button className={cx(styles.button, styles.add)}>
        <Icon type='plus-round' />
      </button>
      <div
        className={cx(
          styles.content,
          side === 'right' && styles.content__right,
          side === 'left' && styles.content__left
        )}
        onTouchCancel={onCancel}
        onTouchEnd={onCancel}
        onTouchMove={onMove}
        onTouchStart={onStart}
        style={{
          left: `${offset}px`,
          transition: `${currentGesture ? '' : 'left ease .5s'}`
        }}
      >
        {children}
      </div>
    </div>
  )
}

export default SwipeableCard
