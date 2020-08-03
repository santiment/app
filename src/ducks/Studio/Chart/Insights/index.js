import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import Point from './Point'
import { PROJECT_INSIGHTS_QUERY } from './gql'
import { findPointByDate } from '../../../Chart/utils'
import styles from './index.module.scss'

const DEFAULT_INSIGHTS = []
const POINT_MARGIN = 13

const newPoint = (insight, top, left) =>
  Object.assign({}, insight, { top, left })

function getStackOffset (stack, x) {
  const offset = stack[x] || 0
  stack[x] = offset ? offset + POINT_MARGIN : POINT_MARGIN
  return offset
}

function buildInsightPoints (chart, insights) {
  const { length } = insights
  const points = []
  const stack = {}

  for (let i = 0; i < length; i++) {
    const insight = insights[i]
    const point = findPointByDate(chart.points, +new Date(insight.publishedAt))
    if (!point) continue

    const { x } = point
    points.push(newPoint(insight, chart.bottom - getStackOffset(stack, x), x))
  }

  return points
}

const Insights = ({ chart, ticker }) => {
  const { data } = useQuery(PROJECT_INSIGHTS_QUERY, {
    variables: {
      ticker
    }
  })
  const [insights, setInsights] = useState(DEFAULT_INSIGHTS)

  useEffect(
    () => {
      if (!(data && data.insights.length && chart.points.length)) return

      setInsights(buildInsightPoints(chart, data.insights))
    },
    [data, chart.points]
  )

  useEffect(
    () => {
      console.log(insights)
    },
    [insights]
  )

  return (
    <div className={styles.wrapper}>
      {insights.map(insight => (
        <Point key={insight.id} {...insight} />
      ))}
    </div>
  )
}

export default Insights
