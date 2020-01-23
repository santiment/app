import React, { useState, useEffect } from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import styles from './SwipeableCard.module.scss'

const BUTTON_WIDTH = 85

const FULL_HIDE_POSITION = -2000

const SwipeableCard = ({
  children,
  onLeftActionClick,
  onRightActionClick,
  hasLeftAction,
  hasRightAction = true,
  hide,
  isSelected
}) => {
  const [startPosition, setStartPosition] = useState(0)
  const [offset, setOffset] = useState(0)
  const [side, setSide] = useState('right')

  let [currentGesture, setCurrentGesture] = useState(null)

  if (hide && offset !== FULL_HIDE_POSITION) {
    setOffset(FULL_HIDE_POSITION)
  }

  if (!hide && offset === FULL_HIDE_POSITION) {
    setOffset(0)
  }

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
    const offset = startPosition + dx
    if ((offset < 0 && !hasRightAction) || (offset > 0 && !hasLeftAction)) {
      return
    }

    setOffset(offset)
    setSide(offset > 0 ? 'left' : 'right')

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
        side === 'left' && styles.container__left,
        isSelected && styles.selected,
        hide && styles.hide
      )}
      style={{ '--button-width': `${BUTTON_WIDTH}px` }}
    >
      {hasLeftAction && (
        <button
          className={cx(styles.button, styles.left)}
          onClick={() => {
            onLeftActionClick()
            setStartPosition(0)
          }}
        >
          <Icon type='info-round' />
        </button>
      )}
      {hasRightAction && (
        <button
          className={cx(styles.button, styles.right)}
          onClick={() => {
            onRightActionClick()
            setStartPosition(0)
            setOffset(0)
          }}
        >
          <Icon type={isSelected ? 'remove' : 'plus-round'} />
        </button>
      )}
      <div
        className={cx(
          styles.content,
          side === 'right' && offset !== 0 && styles.content__right,
          side === 'left' && offset !== 0 && styles.content__left
        )}
        onTouchCancel={onCancel}
        onTouchEnd={onCancel}
        onTouchMove={onMove}
        onTouchStart={onStart}
        style={{
          left: `${offset}px`,
          transition: `${
            currentGesture ? '' : `left ease ${hide ? 3 : offset ? 0.5 : 0}s`
          }`
        }}
      >
        {children}
      </div>
    </div>
  )
}

export default SwipeableCard
