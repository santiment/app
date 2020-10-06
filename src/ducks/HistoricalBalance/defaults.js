import React from 'react'
import { getNewInterval } from '../SANCharts/IntervalSelector'
import { getIntervalByTimeRange } from '../../utils/dates'

const DEFAULT_TIME_RANGE = '6M'
const { from: FROM, to: TO } = getIntervalByTimeRange(
  DEFAULT_TIME_RANGE.toLowerCase()
)

const SETTINGS = {
  // address: '0x609ba2969E9A807C8f450e37909F10f88E5Fc931',
  from: FROM,
  to: TO,
  interval: getNewInterval(FROM, TO),
  timeRange: DEFAULT_TIME_RANGE
}

export const withDefaults = Component => ({ defaultSettings, ...props }) => (
  <Component
    {...props}
    defaultSettings={Object.assign({}, SETTINGS, defaultSettings)}
  />
)
