import React, { useEffect } from 'react'
import Chord from './Chord'
import { useDayMatrix } from './hooks'
/* import { formatNumber } from '../../../utils/formatting' */

const AnimatedChord = ({
  periodMatrix,
  dayIndex,
  daysAmount,
  isLoading,
  setDayIndex,
  ...props
}) => {
  const { matrix, isEmpty } = useDayMatrix(periodMatrix, dayIndex)

  useEffect(
    () => {
      if (isLoading || daysAmount === 1) return

      const interval = setInterval(
        () => setDayIndex(index => ++index % daysAmount),
        1500
      )
      return () => clearInterval(interval)
    },
    [daysAmount, isLoading]
  )

  return (
    <Chord {...props} matrix={matrix} isEmpty={isEmpty} isLoading={isLoading} />
  )
}

export default AnimatedChord
