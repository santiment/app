import React from 'react'
import { ReferenceArea } from 'recharts'
import { binarySearch } from '../../pages/Trends/utils'
import { getTimeIntervalFromToday, DAY, MONTH } from '../../utils/dates'

const MOVE_CLB = (target, { datetime }) => {
  const value = new Date(datetime)

  const targetFullYear = target.getFullYear()
  const valueFullYear = value.getFullYear()

  if (targetFullYear !== valueFullYear) {
    return targetFullYear < valueFullYear
  }

  const targetMonth = target.getMonth()
  const valueMonth = value.getMonth()

  if (targetMonth !== valueMonth) {
    return targetMonth < valueMonth
  }

  const targetDate = target.getDate()
  const valueDate = value.getDate()

  if (targetDate !== valueDate) {
    return targetDate < valueDate
  }

  return target.getHours() < value.getHours()
}

const CHECK_CLB = (target, { datetime }) => {
  const value = new Date(datetime)

  return (
    target.getFullYear() === value.getFullYear() &&
    target.getDate() === value.getDate() &&
    target.getMonth() === value.getMonth() &&
    target.getHours() === value.getHours()
  )
}

const AREA_STYLES = {
  fill: 'none',
  stroke: '#FFAD4D',
  strokeOpacity: '0.5',
  strokeDasharray: '7'
}

const getPaywallX = (array, target, rawEstimate) => {
  const { index } = binarySearch({
    moveClb: MOVE_CLB,
    checkClb: CHECK_CLB,
    target,
    array
  })

  const res = array[index]
  return res && +new Date(res.datetime)
}

const displayPaywall = ({ data }) => {
  if (!data || !data.length) return

  const lastItemDate = new Date(data[data.length - 1].datetime)
  const firstItemDate = new Date(data[0].datetime)

  const { from: leftHistoricalDate } = getTimeIntervalFromToday(-3, MONTH)
  const { from: rightHistoricalDate } = getTimeIntervalFromToday(-1, DAY)

  const isInsideLeftPaywall = lastItemDate <= leftHistoricalDate
  const isInsideRightPaywall = firstItemDate >= rightHistoricalDate

  const hasLeftPaywall =
    isInsideLeftPaywall ||
    (!isInsideRightPaywall && leftHistoricalDate >= firstItemDate)
  const hasRightPaywall =
    isInsideRightPaywall ||
    (!isInsideLeftPaywall && rightHistoricalDate <= lastItemDate)

  return [
    hasLeftPaywall && (
      <ReferenceArea
        key='leftPaywall'
        x2={
          isInsideLeftPaywall
            ? +lastItemDate
            : getPaywallX(data, leftHistoricalDate)
        }
        {...AREA_STYLES}
      />
    ),
    hasRightPaywall && (
      <ReferenceArea
        key='rightPaywall'
        x1={
          isInsideRightPaywall
            ? +firstItemDate
            : getPaywallX(data, rightHistoricalDate)
        }
        {...AREA_STYLES}
      />
    )
  ]
}

export default displayPaywall
