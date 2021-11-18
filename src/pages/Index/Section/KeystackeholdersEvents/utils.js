import React, { useMemo } from 'react'
import { ReferenceDot, Line } from 'recharts'

export function GetReferenceDots (signals, yAxisId) {
  return signals.reduce((acc, { date, yCoord }, idx) => {
    return [
      ...acc,
      <Line
        key={'price_usd_' + idx}
        dataKey={'price_usd_' + idx}
        type='monotone'
        dot={false}
        isAnimationActive={false}
        connectNulls
        activeDot={false}
        stroke='url(#lineGradient)'
        strokeWidth={1}
        fill='none'
        opacity={1}
      />,
      <ReferenceDot
        x={date}
        y={yCoord}
        key={idx}
        ifOverflow='extendDomain'
        r={4}
        isFront
        stroke='var(--persimmon)'
        strokeWidth='2px'
        fill='var(--white)'
      />
    ]
  }, [])
}

export const useMinMaxValues = (data, key) => {
  return useMemo(() => {
    let lowest = Number.POSITIVE_INFINITY
    let highest = Number.NEGATIVE_INFINITY
    let tmp
    for (let i = 0; i < data.length; i++) {
      tmp = data[i][key]
      if (tmp < lowest) lowest = tmp
      if (tmp > highest) highest = tmp
    }

    return { min: lowest, max: highest }
  }, [data, key])
}

export function getNearestPricePoint (timeseries, datetime) {
  let target = timeseries[0]
  const time = new Date(datetime).getTime()

  for (let i = 0; i < timeseries.length; i++) {
    const current = timeseries[i]

    if (current.datetime < time) {
      target = current
    } else {
      break
    }
  }

  return target
}
