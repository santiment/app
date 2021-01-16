import { Metric } from '../../Filter/dataHub/metrics'
import { AGGREGATIONS_LOWER } from '../../Filter/dataHub/aggregations'

export const DEFAULT_TIME_RANGE = '1d'
export const DIRECTIONS = {
  DESC: 'desc',
  ASC: 'asc'
}

export const DEFAULT_ORDER_BY = {
  metric: Metric.marketcap_usd.key,
  dynamicFrom: DEFAULT_TIME_RANGE,
  dynamicTo: 'now',
  aggregation: AGGREGATIONS_LOWER.LAST,
  direction: DIRECTIONS.DESC
}

export const activeDynamicColumnsKeys = [
  'price_usd',
  'price_usd_change_1d',
  'volume_usd',
  'volume_usd_change_1d',
  'marketcap_usd',
  'dev_activity_1d',
  'daily_active_addresses'
]

export const activeStaticColumnsKeys = ['marketSegments', 'rank', 'ethSpent']