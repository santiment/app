import React from 'react'
import { getNewInterval } from '../SANCharts/IntervalSelector'
import { getIntervalByTimeRange } from '../../utils/dates'

export const MAX_ASSETS_NUMBER = 5
const DEFAULT_TIME_RANGE = '6m'
const { from: FROM, to: TO } = getIntervalByTimeRange(DEFAULT_TIME_RANGE)

const SETTINGS = {
  address: '',
  from: FROM.toISOString(),
  to: TO.toISOString(),
  interval: getNewInterval(FROM, TO),
  timeRange: DEFAULT_TIME_RANGE.toUpperCase()
}

export const withDefaults = Component => ({ defaultSettings, ...props }) => (
  <Component
    {...props}
    defaultSettings={Object.assign({}, SETTINGS, defaultSettings)}
  />
)
