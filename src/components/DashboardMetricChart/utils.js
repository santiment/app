import { formatNumber } from '../../utils/formatting'
import { CRYPTO_ERA_START_DATE } from '../../utils/dates'

export const makeIntervalSelectors = ({
  val,
  label,
  interval = '1d',
  from
}) => ({
  value: val,
  label: label,
  requestParams: {
    from: from || `utc_now-${val}`,
    to: `utc_now`,
    interval
  }
})

export const makeMetric = (key, label, formatter = formatNumber) => {
  return {
    key,
    label,
    formatter
  }
}

export const INTERVAL_30_DAYS = makeIntervalSelectors({
  val: '30d',
  label: '1M',
  interval: '3h'
})

export const DEFAULT_INTERVAL_SELECTORS = [
  makeIntervalSelectors({ val: '1d', label: '1D', interval: '15m' }),
  makeIntervalSelectors({ val: '1w', label: '1W', interval: '1h' }),
  INTERVAL_30_DAYS,
  makeIntervalSelectors({ val: '90d', label: '3M', interval: '8h' }),
  makeIntervalSelectors({ val: '183d', label: '6m', interval: '1d' }),
  makeIntervalSelectors({
    label: 'All',
    interval: '1d',
    from: CRYPTO_ERA_START_DATE
  })
]
