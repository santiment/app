import Above from './icons/above.svg'
import Below from './icons/below.svg'
import Between from './icons/between.svg'
import Outside from './icons/outside.svg'
import PercentUp from './icons/percent-up.svg'
import PercentDown from './icons/percent-down.svg'
import PercentBetween from './icons/percent-between.svg'
import PercentOutside from './icons/percent-outside.svg'

export const Filter = {
  above: {
    icon: Above,
    label: 'Above'
  },
  below: {
    icon: Below,
    label: 'Below'
  },
  between: {
    icon: Between,
    label: 'Between',
    combinator: 'and'
  },
  outside: {
    icon: Outside,
    label: 'Outside',
    combinator: 'or'
  },
  percent_up: {
    icon: PercentUp,
    label: 'Moving up %',
    aggregation: 'last',
    isPRO: true,
    showTimeRange: true,
    showSecondInput: true
  },
  percent_down: {
    icon: PercentDown,
    label: 'Moving down %',
    aggregation: 'last',
    isPRO: true,
    showTimeRange: true,
    showSecondInput: true
  },
  percent_between: {
    icon: PercentBetween,
    label: 'Between %',
    aggregation: 'last',
    isPRO: true,
    showTimeRange: true,
    showSecondInput: true,
    combinator: 'and'
  },
  percent_up_or_down: {
    icon: PercentOutside,
    label: 'Up or down %',
    aggregation: 'last',
    isPRO: true,
    showTimeRange: true,
    combinator: 'or'
  }
}

export const Combinator = {
  or: 'OR',
  and: 'AND'
}

export const Operator = {
  more: 'greater_than',
  less: 'less_than'
}

export const DEFAULT_TIMERANGES = ['1d', '7d', '30d']

const percentServerValueFormatter = value => value / 100
const percentValueFormatter = value => value * 100
const percentMetricFormatter = ({ metric, timeRange = '1d' }) =>
  `${metric}_change_${timeRange}`

//   percent_greater_than: {
//     dataKey: 'greater_than',
//     metricFormatter: percentMetricFormatter,
//     valueFormatter: percentValueFormatter,
//     serverValueFormatter: percentServerValueFormatter
//   },
//   percent_less_than: {//
//     dataKey: 'less_than',
//     metricFormatter: percentMetricFormatter,
//     valueFormatter: value => percentValueFormatter(-value),
//     serverValueFormatter: value => percentServerValueFormatter(-value)
//   }

Object.keys(Filter).forEach(key => {
  Filter[key].key = key
})
