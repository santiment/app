import React, { useMemo } from 'react'
import cx from 'classnames'
import { useAddressHistoricalBalance } from './hooks'
import styles from './index.module.scss'

const WIDTH = 72
const HEIGHT = 32

const MiniChart = ({ address, change }) => {
  const data = useAddressHistoricalBalance(address)

  const [linePoints, areaPoints] = useMemo(
    () => {
      const dataLength = data.length
      if (!dataLength) return ''

      let min = data[0].balance
      let max = data[0].balance

      data.forEach(({ balance }) => {
        if (balance < min) {
          min = balance
        }
        if (balance > max) {
          max = balance
        }
      })

      const xAxisFactor = WIDTH / dataLength
      const yAxisFactor = HEIGHT / (max - min)

      const points = data.map(
        ({ balance }, index) =>
          `${index * xAxisFactor},${(max - balance) * yAxisFactor}`
      )
      const [startX, startY] = points[0].split(',')
      const [lastX] = points[dataLength - 1].split(',')

      const linePoints = points.join(' ')
      return [
        linePoints,
        `${linePoints} ${lastX},${HEIGHT} ${startX},${HEIGHT}, ${startX},${startY}`
      ]
    },
    [data]
  )

  return (
    <svg
      viewBox='0 0 72 32'
      height='32'
      className={cx(styles.chart, change > 0 && styles.chart_positive)}
    >
      <defs>
        <linearGradient id='negative-change' x1='0' x2='0' y1='0' y2='2'>
          <stop offset='0%' stopColor='var(--persimmon)' stopOpacity='0.3' />
          <stop offset='60%' stopColor='var(--white)' stopOpacity='0' />
        </linearGradient>
        <linearGradient id='positive-change' x1='0' x2='0' y1='0' y2='2'>
          <stop offset='0%' stopColor='var(--lima)' stopOpacity='0.3' />
          <stop offset='60%' stopColor='var(--white)' stopOpacity='0' />
        </linearGradient>
      </defs>
      <polyline points={linePoints} className={styles.line} />
      <polyline points={areaPoints} className={styles.area} />
    </svg>
  )
}

export default MiniChart
