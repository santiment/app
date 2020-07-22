import Above from './icons/above.svg'
import Below from './icons/below.svg'
// import Between from './icons/between.svg'
// import Outside from './icons/outside.svg'
import PercentUp from './icons/percent-up.svg'
import PercentDown from './icons/percent-down.svg'
// import PercentBetween from './icons/percent-between.svg'
// import PercentOutside from './icons/percent-outside.svg'
import {
  percentMetricFormatter,
  percentValueFormatter,
  percentServerValueFormatter
} from './utils'

export const Filter = {
  above: {
    icon: Above,
    label: 'Above'
  },
  below: {
    icon: Below,
    label: 'Below'
  },
  // between: {
  //   icon: Between,
  //   label: 'Between',
  //   combinator: 'and'
  // },
  // outside: {
  //   icon: Outside,
  //   label: 'Outside',
  //   combinator: 'or'
  // },
  percent_up: {
    icon: PercentUp,
    label: 'Moving up %',
    aggregation: 'last',
    badge: '%',
    isPro: true,
    showTimeRange: true,
    showSecondInput: true,
    metricFormatter: percentMetricFormatter
  },
  percent_down: {
    icon: PercentDown,
    label: 'Moving down %',
    aggregation: 'last',
    badge: '%',
    isPro: true,
    showTimeRange: true,
    showSecondInput: true,
    metricFormatter: percentMetricFormatter
  }
  // percent_between: {
  //   icon: PercentBetween,
  //   label: 'Between %',
  //   aggregation: 'last',
  //   badge: '%',
  //   isPro: true,
  //   showTimeRange: true,
  //   showSecondInput: true,
  //   metricFormatter: percentMetricFormatter,
  //   combinator: 'and'
  // },
  // percent_up_or_down: {
  //   icon: PercentOutside,
  //   label: 'Up or down %',
  //   aggregation: 'last',
  //   badge: '%',
  //   isPro: true,
  //   showTimeRange: true,
  //   metricFormatter: percentMetricFormatter,
  //   combinator: 'or'
  // }
}

// export const Combinator = {
//   or: 'OR',
//   and: 'AND'
// }

export const Operator = {
  more: 'greater_than',
  less: 'less_than'
}

//     metricFormatter: percentMetricFormatter,
//     valueFormatter: percentValueFormatter,
//     serverValueFormatter: percentServerValueFormatter

//     valueFormatter: value => percentValueFormatter(-value),
//     serverValueFormatter: value => percentServerValueFormatter(-value)

Object.keys(Filter).forEach(key => {
  Filter[key].key = key
})
