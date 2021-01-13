import React, { useMemo } from 'react'
import cx from 'classnames'
import styles from './index.module.scss'

const MiniChart = ({ data, name, change, width, height, className }) => {
  const [linePoints, areaPoints] = useMemo(
    () => {
      const dataLength = data.length
      if (!dataLength) return ''

      let min = data[0][name]
      let max = data[0][name]

      data.forEach(item => {
        const value = item[name]
        if (value < min) {
          min = value
        }
        if (value > max) {
          max = value
        }
      })

      if (min === max) {
        min = 0
      }

      const xAxisFactor = width / (dataLength - 1)
      const yAxisFactor = height / (max - min)

      const points = data.map(
        (item, index) =>
          `${index * xAxisFactor},${(max - item[name]) * yAxisFactor}`
      )
      const [startX, startY] = points[0].split(',')
      const [lastX] = points[dataLength - 1].split(',')

      const linePoints = points.join(' ')
      return [
        linePoints,
        `${linePoints} ${lastX},${height} ${startX},${height}, ${startX},${startY}`
      ]
    },
    [data]
  )

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      height={height}
      className={cx(
        styles.chart,
        change > 0 && styles.chart_positive,
        className
      )}
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

MiniChart.defaultProps = {
  data: [],
  width: 72,
  height: 32
}

export default MiniChart
