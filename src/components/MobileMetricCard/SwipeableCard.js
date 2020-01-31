import React, { useState } from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import styles from './SwipeableCard.module.scss'

const BUTTON_WIDTH = 85
const BUTTON_ACTIVATION_ZONE = 1.2 * BUTTON_WIDTH
const PERCENTS_THRESHOLD = 70
const FULL_HIDE_POSITION = -1000

const SIDES = { RIGHT: 'right', LEFT: 'left' }

const isSwipeEvent = ({ x, y, startX, startY }) =>
  Math.abs(x - startX) > Math.abs(y - startY)

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
  isOuterEvent = false,
  hasRightAction = true,
  useInitialAnimation = true,
  isSelected,
  width: containerWidth
}) => {
  const [startPos, setStartPos] = useState(0)
  const [offset, setOffset] = useState(0)
  const [side, setSide] = useState(null)
  const [currentGesture, setCurrentGesture] = useState(null)
  const [isSwipe, setIsSwipe] = useState(null)
  const [withAnimation] = useState(useInitialAnimation)

  const onLeftAction = () => {
    onLeftActionClick()
    setStartPos(0)
    setCurrentGesture(null)
  }

  const onRightAction = () => {
    setOffset(FULL_HIDE_POSITION)
    setTimeout(() => {
      setOffset(0)
      onRightActionClick()
    }, 500)
  }

  const onCardClick = () => {
    if (currentGesture || isSwipe || startPos || offset) {
    } else {
      setSide(SIDES.RIGHT)
      onRightAction()
    }
  }

  const shouldActivateAction = ({ prevX, x }) => {
    const offsetInPercents = (Math.abs(offset) * 100) / containerWidth

    return offsetInPercents > PERCENTS_THRESHOLD
  }

  const haveAction = side =>
    (side === SIDES.RIGHT && hasRightAction) ||
    (side === SIDES.LEFT && hasLeftAction)

  if (offset && startPos && isOuterEvent && !currentGesture) {
    setOffset(0)
  }

  const onStart = evt => {
    const { pageX: x, pageY: y } = evt.touches[0]
    setCurrentGesture({
      startX: x,
      startY: y,
      prevX: x,
      initialPos: startPos
    })
  }

  const onMove = evt => {
    if (!currentGesture) {
      return
    }

    const { startX, prevX, startY, initialPos } = currentGesture
    const { pageX: x, pageY: y } = evt.touches[0]
    const newOffset = x - startX + initialPos

    if (isSwipe === null) {
      if (isSwipeEvent({ startX, startY, x, y })) {
        setIsSwipe(true)

        // NOTE: For Safari, will ignore in Chrome (due to passive event)
        evt.preventDefault()
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

    if (shouldActivateAction({ prevX, x })) {
      side === SIDES.RIGHT ? onRightAction() : onLeftAction()
      return
    }

    setCurrentGesture({ ...currentGesture, prevX: x })

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
        styles.wrapper,
        styles[`wrapper__${side}`],
        offset && styles.wrapper__action,
        offset === FULL_HIDE_POSITION && styles.wrapper__hide,
        isSelected && styles.wrapper__selected,
        withAnimation && styles.wrapper__animation
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
        onClick={onCardClick}
        style={{
          transform: `translateX(${offset}px)`,
          transition: `${currentGesture ? '' : `transform ease 0.7s`}`
        }}
      >
        {children}
      </div>
    </div>
  )
}

export default SwipeableCard
