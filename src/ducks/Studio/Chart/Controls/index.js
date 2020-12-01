import React, { useEffect } from 'react'
import Button from './Button'
import LineActions from './LineActions'
import { CursorType } from '../../../Chart/cursor'
import { useIsBetaMode } from '../../../../stores/ui'
import styles from './index.module.scss'

const CursorControl = ({ cursorType, toggleCursorType }) => (
  <Button
    stroke
    isActive={cursorType === CursorType.FREE}
    onClick={toggleCursorType}
  >
    <svg width='18' height='18' xmlns='http://www.w3.org/2000/svg'>
      <path
        stroke='none'
        d='M.5 8.5h6v1h-6zM11.5 8.5h6v1h-6zM9.5.5v6h-1v-6zM9.5 11.5v6h-1v-6z'
      />
    </svg>
  </Button>
)

const LineDrawControl = ({ isNewDrawingState }) => {
  const [isNewDrawing, setIsNewDrawing] = isNewDrawingState

  return (
    <Button
      stroke
      isActive={isNewDrawing}
      onClick={() => setIsNewDrawing(!isNewDrawing)}
      className={styles.drawing}
    >
      <svg width='18' height='18' xmlns='http://www.w3.org/2000/svg'>
        <path stroke='none' d='M4.4 12.9l8.5-8.6.7.7-8.5 8.6z' />
        <circle fill='none' cx='3' cy='15' r='2.5' />
        <circle fill='none' cx='15' cy='3' r='2.5' />
      </svg>
    </Button>
  )
}

const Controls = ({
  chartRef,
  chartCursor,
  selectedLineState,
  isDrawingState,
  isNewDrawingState,
  rerenderWidgets
}) => {
  const isBetaMode = useIsBetaMode()

  useEffect(rerenderWidgets, [isDrawingState[0]])

  return (
    <div className={styles.wrapper}>
      <CursorControl {...chartCursor} />
      {isBetaMode && <LineDrawControl isNewDrawingState={isNewDrawingState} />}

      {selectedLineState[0] && (
        <LineActions
          chartRef={chartRef}
          selectedLineState={selectedLineState}
        />
      )}
    </div>
  )
}

export default Controls
