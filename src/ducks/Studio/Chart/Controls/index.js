import React from 'react'
import cx from 'classnames'
import UIButton from '@santiment-network/ui/Button'
import { CursorType } from '../../../Chart/cursor'
import { useIsBetaMode } from '../../../../stores/ui'
import styles from './index.module.scss'

const Button = ({ className, isActive, ...props }) => (
  <UIButton
    {...props}
    variant='ghost'
    className={cx(styles.btn, className, isActive && styles.btn_active)}
  />
)

const CursorControl = ({ cursorType, toggleCursorType }) => (
  <Button isActive={cursorType === CursorType.FREE} onClick={toggleCursorType}>
    <svg width='18' height='18' xmlns='http://www.w3.org/2000/svg'>
      <path
        stroke='none'
        d='M.5 8.5h6v1h-6zM11.5 8.5h6v1h-6zM9.5.5v6h-1v-6zM9.5 11.5v6h-1v-6z'
      />
    </svg>
  </Button>
)

const LineDrawControl = ({ isDrawingLineState }) => {
  const [isDrawingLine, setIsDrawingLine] = isDrawingLineState

  return (
    <Button
      isActive={isDrawingLine}
      onClick={() => setIsDrawingLine(!isDrawingLine)}
    >
      <svg width='18' height='18' xmlns='http://www.w3.org/2000/svg'>
        <path stroke='none' d='M4.4 12.9l8.5-8.6.7.7-8.5 8.6z' />
        <circle fill='none' cx='3' cy='15' r='2.5' />
        <circle fill='none' cx='15' cy='3' r='2.5' />
      </svg>
    </Button>
  )
}

const Controls = ({ chartCursor, isDrawingLineState }) => {
  const isBetaMode = useIsBetaMode()

  return (
    <div className={styles.wrapper}>
      <CursorControl {...chartCursor} />
      {isBetaMode && (
        <LineDrawControl isDrawingLineState={isDrawingLineState} />
      )}
    </div>
  )
}

export default Controls
