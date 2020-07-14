import { Metric } from '../../../../dataHub/metrics'
import Above from './icons/above.svg'
import Below from './icons/below.svg'
import Between from './icons/between.svg'
import Outide from './icons/outside.svg'
import PercentUp from './icons/percent-up.svg'
import PercentDown from './icons/percent-down.svg'
import PercentBetween from './icons/percent-between.svg'
import PercentOutside from './icons/percent-outside.svg'

export const metrics = [
  Metric.price_usd,
  Metric.marketcap_usd,
  Metric.volume_usd
]

export const Operator = {
  greater_than: {
    icon: Above,
    label: 'Above'
  },
  less_than: {
    icon: Below,
    label: 'Below'
  },
  beetween: {
    // type: ['greater_than_or_equal_to', 'less_than_or_equal_to'],
    icon: Between,
    label: 'Between',
    isDisabled: true
  },
  outside: {
    // type: ['less_than_or_equal_to', 'greater_than_or_equal_to'],
    icon: Outide,
    label: 'Outside',
    isDisabled: true
  },
  moving_up: {
    icon: PercentUp,
    label: 'Moving up %',
    isDisabled: true
  },
  moving_down: {
    icon: PercentDown,
    label: 'Moving down %',
    isDisabled: true
  },
  moving_in: {
    // type: ['greater_than_or_equal_to', 'less_than_or_equal_to'],
    icon: PercentBetween,
    label: 'Between %',
    isDisabled: true
  },
  moving_out: {
    // type: ['less_than_or_equal_to', 'greater_than_or_equal_to'],
    icon: PercentOutside,
    label: 'Up or down %',
    isDisabled: true
  }
}

Object.keys(Operator).forEach(key => {
  Operator[key].key = key
})
