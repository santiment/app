import React, { useState, useEffect } from 'react'
import { Chord } from '@nivo/chord'
import { LABELS } from './matrix'
import { usePeriodMatrix, useDayMatrix } from './hooks'

const margin = { top: 60, right: 60, bottom: 90, left: 60 }

const Flow = ({ slug }) => {
  const [dayIndex, setDayIndex] = useState(0)
  const periodMatrix = usePeriodMatrix(slug)
  const matrix = useDayMatrix(periodMatrix, dayIndex)

  useEffect(() => {
    const interval = setInterval(() => setDayIndex(index => ++index), 1500)
    return () => clearInterval(interval)
  }, [])

  return (
    <Chord
      enableLabel
      isInteractive
      animate
      width={700}
      height={700}
      matrix={matrix}
      keys={LABELS}
      margin={margin}
      valueFormat='.2f'
      padAngle={0.02}
      innerRadiusRatio={0.95}
      arcOpacity={1}
      arcBorderWidth={1}
      arcBorderColor={{ from: 'color', modifiers: [['darker', 0.4]] }}
      ribbonOpacity={0.5}
      ribbonBorderWidth={1}
      ribbonBorderColor={{ from: 'color', modifiers: [['darker', 0.4]] }}
      label='id'
      labelOffset={25}
      labelRotation={-180}
      labelTextColor={{ from: 'color', modifiers: [['darker', 1]] }}
      colors={{ scheme: 'nivo' }}
      arcHoverOpacity={1}
      arcHoverOthersOpacity={0.2}
      ribbonHoverOpacity={1}
      ribbonHoverOthersOpacity={0.2}
      motionStiffness={300}
      motionDamping={40}
    />
  )
}

export default Flow
