import React from 'react'
import { ReferenceArea } from 'recharts'
import { binarySearch } from '../../pages/Trends/utils'
import {
  calculateUnitByFormat,
  getTimeIntervalFromToday,
  DAY,
  MONTH
} from '../../utils/dates'

const MOVE_CLB = (target, { datetime }) => {
  const value = new Date(datetime)

  return (
    target.getDate() < value.getDate() && target.getMonth() <= value.getMonth()
  )
}

const CHECK_CLB = (target, { datetime }) => {
  const value = new Date(datetime)

  return (
    target.getDate() === value.getDate() &&
    target.getMonth() === value.getMonth()
  )
}

const getPaywallX = (array, { from: target }) => {
  const { value } = binarySearch({
    moveClb: MOVE_CLB,
    checkClb: CHECK_CLB,
    target,
    array
  })

  if (value) {
    return +new Date(value.datetime)
  }
}

const AREA_STYLES = {
  fill: 'none',
  stroke: '#FFAD4D',
  strokeOpacity: '0.5',
  strokeDasharray: '7'
}

const displayPaywall = ({ data }) => {
  if (!data || !data.length) return

  const currentDate = new Date()
  const { length } = data

  const lastItemDate = new Date(data[length - 1].datetime)
  const firstItemDate = new Date(data[0].datetime)

  const leftDiff = calculateUnitByFormat(currentDate - firstItemDate, DAY)
  const rightDiff = calculateUnitByFormat(currentDate - lastItemDate, DAY)

  const hasLeftPaywall = leftDiff > 90
  const hasRightPaywall = rightDiff < 2

  return [
    hasLeftPaywall && (
      <ReferenceArea
        key='leftPaywall'
        x2={
          getPaywallX(data, getTimeIntervalFromToday(-3, MONTH)) ||
          +lastItemDate
        }
        {...AREA_STYLES}
      />
    ),
    hasRightPaywall && (
      <ReferenceArea
        key='rightPaywall'
        x1={
          getPaywallX(data, getTimeIntervalFromToday(-1, DAY)) || +firstItemDate
        }
        x2={+lastItemDate}
        {...AREA_STYLES}
      />
    )
  ]
}

export default displayPaywall
