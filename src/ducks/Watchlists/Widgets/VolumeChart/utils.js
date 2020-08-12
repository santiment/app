import memoize from 'lodash.memoize'
import { formatNumber, millify } from '../../../../utils/formatting'
import { getTreeMapColor } from './ColorsExplanation'

export const getSorter = memoize(({ sortKey, desc }) => (a, b) => {
  if (desc) {
    return +b[sortKey] - +a[sortKey]
  } else {
    return +a[sortKey] - +b[sortKey]
  }
})

export function getBarColor (val) {
  return +val > 0 ? 'var(--jungle-green)' : 'var(--persimmon)'
}

export const getTooltipLabels = memoize(key => {
  return [
    {
      key: key,
      label: 'Price change',
      formatter: val => `${formatNumber(val)} %`
    },
    {
      key: 'priceUsd',
      label: 'Price, USD',
      formatter: val => `$ ${formatNumber(val)}`
    },
    {
      key: 'marketcapUsd',
      label: 'Market Cap',
      formatter: val => `$ ${millify(val)}`
    }
  ]
})

export const formatProjectTreeMapValue = val =>
  val
    ? formatNumber(val, {
      maximumFractionDigits: 2,
      directionSymbol: true
    }) + '%'
    : null

export const RANGES = [
  {
    label: '1h',
    key: 'percentChange1h'
  },
  {
    label: '24h',
    key: 'percentChange24h'
  },
  {
    label: '7d',
    key: 'percentChange7d'
  }
]

export const SORT_RANGES = [
  {
    label: 'Marketcap  ⬆️',
    key: 'marketcapUsd'
  },
  {
    label: 'Marketcap  ⬇️',
    key: 'marketcapUsd',
    desc: false
  },
  {
    label: `Price changes  ⬆️`,
    key: ''
  },
  {
    label: 'Price changes  ⬇️',
    key: '',
    desc: false
  }
]

export const getWordLength = (fontSize, word) =>
  (fontSize - 3) * word.length + 8

export const getFontSize = (index, length) => {
  if (index < length * 0.05) {
    return 16
  } else if (index < length * 0.1) {
    return 12
  } else if (index < length * 0.2) {
    return 10
  } else {
    return 8
  }
}

export const mapToColors = (data, key) => {
  return data.map(item => {
    const value = +item[key]
    const color = getTreeMapColor(value)
    return {
      ...item,
      color
    }
  })
}

export const getBarValue = value => {
  return Math.abs(value) < 1
    ? formatNumber(value, {
      maximumFractionDigits: 2
    })
    : formatNumber(value, {
      maximumFractionDigits: 0,
      minimumFractionDigits: 0
    })
}
