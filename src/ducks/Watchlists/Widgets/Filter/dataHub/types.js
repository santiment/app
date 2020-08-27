import Above from '../icons/above.svg'
import Below from '../icons/below.svg'
import PercentUp from '../icons/percent-up.svg'
import PercentDown from '../icons/percent-down.svg'
import {
  percentValueFormatter,
  percentServerValueFormatter
} from '../formatters'

export const Operator = {
  more: 'greater_than',
  less: 'less_than'
}

export const Filter = {
  above: {
    icon: Above,
    label: 'Above',
    operator: Operator.more
  },
  below: {
    icon: Below,
    label: 'Below',
    operator: Operator.less
  },
  percent_up: {
    icon: PercentUp,
    label: 'Moving up',
    shortLabel: 'up',
    aggregation: 'last',
    badge: '%',
    isPro: true,
    showTimeRange: true,
    onlyPositiveNumbers: true,
    operator: Operator.more,
    valueFormatter: percentValueFormatter,
    serverValueFormatter: percentServerValueFormatter
  },
  percent_down: {
    icon: PercentDown,
    label: 'Moving down',
    shortLabel: 'down',
    aggregation: 'last',
    badge: '%',
    isPro: true,
    showTimeRange: true,
    onlyPositiveNumbers: true,
    operator: Operator.less,
    valueFormatter: value => percentValueFormatter(-value),
    serverValueFormatter: value => percentServerValueFormatter(-value)
  }
}

Object.keys(Filter).forEach(key => {
  Filter[key].key = key
})
