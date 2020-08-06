import React, { useMemo, useState, useCallback } from 'react'
import Point from './Point'
import { withViewportFilter } from './withViewportFilter'
import { useInsights } from '../../insights/context'
import { useUser } from '../../../../stores/user'
import { findPointByDate } from '../../../Chart/utils'

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

const Insights = ({ chart, insights }) => {
  const isAnon = !useUser().isLoggedIn
  const points = useMemo(
    () => (chart.points.length ? buildInsightPoints(chart, insights) : []),
    [chart.points, insights]
  )
  const [openedIndex, setOpenedIndex] = useState()
  const onPrevClick = useCallback(() => setOpenedIndex(i => i - 1), [])
  const onNextClick = useCallback(() => setOpenedIndex(i => i + 1), [])
  const lastIndex = points.length - 1

  return points.map((point, i) => (
    <Point
      key={point.id}
      index={i}
      isOpened={i === openedIndex}
      isFirst={i === 0}
      isLast={i === lastIndex}
      setOpenedIndex={setOpenedIndex}
      onPrevClick={onPrevClick}
      onNextClick={onNextClick}
      isAnon={isAnon}
      {...point}
    />
  ))
}

const withOnlyIfInsights = Component => props => {
  const insights = useInsights()
  return insights.length ? <Component {...props} insights={insights} /> : null
}

export default withOnlyIfInsights(withViewportFilter(Insights))
