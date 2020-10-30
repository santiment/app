import Above from '../icons/above.svg'
import Below from '../icons/below.svg'
import Between from '../icons/between.svg'
import Outside from '../icons/outside.svg'
import PercentUp from '../icons/percent-up.svg'
import PercentDown from '../icons/percent-down.svg'
import PercentBetween from '../icons/percent-between.svg'
import PercentOutside from '../icons/percent-outside.svg'
import {
  percentValueFormatter,
  percentServerValueFormatter,
  percentValueMirrorFormatter,
  percentServerValueMirrorFormatter
} from '../formatters'

export const Operator = {
  more: 'greater_than',
  less: 'less_than',
  inside: 'inside_channel',
  outside: 'outside_channel'
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
  between: {
    icon: Between,
    label: 'Between',
    operator: Operator.inside,
    showSecondInput: true
  },
  outside: {
    icon: Outside,
    label: 'Outside',
    operator: Operator.outside,
    showSecondInput: true
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
  },
  percent_between: {
    icon: PercentBetween,
    label: 'Between',
    aggregation: 'last',
    badge: '%',
    isPro: true,
    showTimeRange: true,
    showSecondInput: true,
    operator: Operator.inside,
    valueFormatter: percentValueFormatter,
    serverValueFormatter: percentServerValueFormatter
  },
  percent_up_or_down: {
    icon: PercentOutside,
    label: 'Up or down',
    badge: '%',
    isPro: true,
    showTimeRange: true,
    onlyPositiveNumbers: true,
    operator: Operator.outside,
    valueFormatter: percentValueMirrorFormatter,
    serverValueFormatter: percentServerValueMirrorFormatter
  }
}

Object.keys(Filter).forEach(key => {
  Filter[key].key = key
})
