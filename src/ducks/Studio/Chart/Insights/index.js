import React, { useMemo, useState, useEffect, useCallback } from 'react'
import { useQuery } from '@apollo/react-hooks'
import Point from './Point'
import { PROJECT_INSIGHTS_QUERY } from './gql'
import { useInsights } from '../../insights/context'
import { findPointByDate } from '../../../Chart/utils'
import styles from './index.module.scss'

const POINT_MARGIN = 13

const newPoint = (insight, top, left) =>
  Object.assign({}, insight, { top, left })

function getStackOffset (stack, x) {
  const offset = stack[x] || 0
  stack[x] = offset ? offset + POINT_MARGIN : POINT_MARGIN
  return offset
}

function buildInsightPoints (chart, insights) {
  const points = []
  const stack = {}

  for (let i = insights.length - 1; i > -1; i--) {
    const insight = insights[i]
    const point = findPointByDate(chart.points, +new Date(insight.publishedAt))
    if (!point) continue

    const { x } = point
    points.push(newPoint(insight, chart.bottom - getStackOffset(stack, x), x))
  }

  return points
}

const Insights = ({ chart, ticker }) => {
  const insights = useInsights()
  const points = useMemo(
    () => (chart.points.length ? buildInsightPoints(chart, insights) : []),
    [chart.points, insights]
  )
  const [openedIndex, setOpenedIndex] = useState()
  const onPrevClick = useCallback(() => setOpenedIndex(i => i - 1), [])
  const onNextClick = useCallback(() => setOpenedIndex(i => i + 1), [])
  const lastIndex = points.length - 1

  return (
    <div className={styles.wrapper}>
      {points.map((point, i) => (
        <Point
          key={point.id}
          index={i}
          isOpened={i === openedIndex}
          isFirst={i === 0}
          isLast={i === lastIndex}
          setOpenedIndex={setOpenedIndex}
          onPrevClick={onPrevClick}
          onNextClick={onNextClick}
          {...point}
        />
      ))}
    </div>
  )
}

export default Insights
