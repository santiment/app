import { Metric } from '../../../../dataHub/metrics'
import Above from './icons/above.svg'
import Below from './icons/below.svg'
// import Between from './icons/between.svg'
// import Outide from './icons/outside.svg'
import PercentUp from './icons/percent-up.svg'
// import PercentDown from './icons/percent-down.svg'
// import PercentBetween from './icons/percent-between.svg'
// import PercentOutside from './icons/percent-outside.svg'

export const metrics = [
  Metric.price_usd,
  Metric.marketcap_usd,
  Metric.volume_usd
]

export const DEFAULT_TIMERANGES = ['1d', '7d', '30d']

export const defaultValueFormatter = value => value
export const defaultMetricFormatter = ({ metric }) => metric

const percentServerValueFormatter = value => value / 100
const percentValueFormatter = value => value * 100
const percentMetricFormatter = ({ metric, timeRange = '1d' }) =>
  `${metric}_change_${timeRange}`

export const Operator = {
  greater_than: {
    icon: Above,
    label: 'Above'
  },
  less_than: {
    icon: Below,
    label: 'Below'
  },
  // beetween: {
  //   icon: Between,
  //   label: 'Between',
  // },
  // outside: {
  //   icon: Outide,
  //   label: 'Outside',
  // },
  percent_greater_than: {
    icon: PercentUp,
    dataKey: 'greater_than',
    label: 'Moving up %',
    type: 'percent',
    metricFormatter: percentMetricFormatter,
    valueFormatter: percentValueFormatter,
    serverValueFormatter: percentServerValueFormatter
  }
  // percent_less_than: {
  //   icon: PercentDown,
  //   label: 'Moving down %',
  //   dataKey: 'less_than',
  //   type: 'percent',
  //   metricFormatter: percentMetricFormatter,
  //   valueFormatter: percentValueFormatter,
  //   serverValueFormatter: percentServerValueFormatter
  // }
  // moving_in: {
  //   icon: PercentBetween,
  //   label: 'Between %',
  // },
  // moving_out: {
  //   icon: PercentOutside,
  //   label: 'Up or down %',
  // }
}

Object.keys(Operator).forEach(key => {
  Operator[key].key = key
})
