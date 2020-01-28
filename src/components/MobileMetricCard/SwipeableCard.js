import React, { useState } from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import styles from './SwipeableCard.module.scss'

const BUTTON_WIDTH = 85
const BUTTON_ACTIVATION_ZONE = 1.2 * BUTTON_WIDTH
const SPEED_THRESHOLD = 5
const PERCENTS_THRESHOLD = 60
const FULL_HIDE_POSITION = -2000

const SIDES = { RIGHT: 'right', LEFT: 'left' }

const isSwipeEvent = ({ x, y, startX, startY }) =>
  Math.abs(x - startX) - Math.abs(y - startY) > 8

const isDirectionChanged = (prev, curr) => {
  if (prev === 0 || curr === 0) return true
  return Boolean((prev > 0) ^ (curr > 0))
}

const detectSwipeDirection = offset => (offset <= 0 ? SIDES.RIGHT : SIDES.LEFT)

const SwipeableCard = ({
  children,
  onLeftActionClick,
  onRightActionClick,
  hasLeftAction,
  hasRightAction = true,
  isSelected,
  width: containerWidth
}) => {
  const [startPos, setStartPos] = useState(0)
  const [offset, setOffset] = useState(0)
  const [side, setSide] = useState(null)
  const [currentGesture, setCurrentGesture] = useState(null)
  const [isSwipe, setIsSwipe] = useState(null)

  const onLeftAction = () => {
    onLeftActionClick()
    setStartPos(0)
  }
  const onRightAction = () => {
    setOffset(FULL_HIDE_POSITION)
    setTimeout(onRightActionClick, 500)
  }

  const shouldActivateAction = ({ prevX, prevTs, x, ts }) => {
    const speed = Math.abs(x - prevX) / (ts - prevTs)
    const offsetInPercents = (Math.abs(offset) * 100) / containerWidth

    return speed > SPEED_THRESHOLD || offsetInPercents > PERCENTS_THRESHOLD
  }

  const haveAction = side =>
    (side === SIDES.RIGHT && hasRightAction) ||
    (side === SIDES.LEFT && hasLeftAction)

  const onStart = ({ touches: [{ pageX: x, pageY: y }] }) => {
    setCurrentGesture({
      startX: x,
      startY: y,
      prevX: x,
      prevTs: Date.now(),
      initialPos: startPos
    })
  }

  const onMove = evt => {
    if (!currentGesture) {
      return
    }

    const { startX, prevX, startY, prevTs, initialPos } = currentGesture
    const { pageX: x, pageY: y } = evt.touches[0]
    const newOffset = x - startX + initialPos

    if (isSwipe === null) {
      if (isSwipeEvent({ startX, startY, x, y })) {
        setIsSwipe(true)
      } else {
        onCancel()
        return
      }
    }

    if (isDirectionChanged(offset, newOffset)) {
      const side = detectSwipeDirection(newOffset)

      if (!haveAction(side)) {
        onCancel()
        return
      }

      setSide(side)
    }

    setOffset(newOffset)

    const ts = Date.now()

    if (shouldActivateAction({ prevX, x, prevTs, ts })) {
      side === SIDES.RIGHT ? onRightAction() : onLeftAction()
      setCurrentGesture(null)
      return
    }

    setCurrentGesture({ ...currentGesture, prevX: x, prevTs: ts })

    if (Math.abs(newOffset) > BUTTON_ACTIVATION_ZONE) {
      setStartPos(newOffset > 0 ? BUTTON_WIDTH : -BUTTON_WIDTH)
    } else {
      setStartPos(0)
    }
  }

  const onCancel = () => {
    if (!currentGesture) {
      return
    }

    setCurrentGesture(null)
    setIsSwipe(null)

    if (offset !== FULL_HIDE_POSITION) {
      setOffset(startPos)
    }
  }

  return (
    <div
      className={cx(
        styles.container,
        styles[`container__${side}`],
        offset && styles.container__action,
        offset === FULL_HIDE_POSITION && styles.container__hide,
        isSelected && styles.container__selected
      )}
      style={{ '--button-width': `${BUTTON_WIDTH}px` }}
    >
      {hasLeftAction && (
        <button
          className={cx(styles.button, styles.button__left)}
          onClick={onLeftAction}
        >
          <Icon type='info-round' />
        </button>
      )}
      {hasRightAction && (
        <button
          className={cx(styles.button, styles.button__right)}
          onClick={onRightAction}
        >
          <Icon type={isSelected ? 'remove' : 'plus-round'} />
        </button>
      )}
      <div
        className={styles.content}
        onTouchCancel={onCancel}
        onTouchEnd={onCancel}
        onTouchMove={onMove}
        onTouchStart={onStart}
        style={{
          transform: `translateX(${offset}px)`,
          transition: `${currentGesture ? '' : `transform ease 0.5s`}`
        }}
      >
        {children}
      </div>
    </div>
  )
}

export default SwipeableCard
