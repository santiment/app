import memoize from 'lodash.memoize'
import { formatNumber, millify } from '../../../../utils/formatting'
import { getTreeMapColor } from './ColorsExplanation'

export function getBarColor (val) {
  return +val > 0 ? 'var(--jungle-green)' : 'var(--persimmon)'
}

export const getTooltipLabels = memoize(({ key, label }) => {
  return [
    {
      key: key,
      label: label,
      formatter: (val) => `${formatNumber(100 * val)} %`,
    },
    {
      key: 'priceUsd',
      label: 'Price, USD',
      formatter: (val) => `$ ${formatNumber(val)}`,
    },
    {
      key: 'marketcapUsd',
      label: 'Market Cap',
      formatter: (val) => `$ ${millify(val)}`,
    },
  ]
})

export const INFOGRAPHIC_CURRENCIES = {
  USD: 'usd',
  ETH: 'eth',
  BTC: 'btc',
}

export const INFOGRAPHICS = {
  SOCIAL_VOLUME_TREE_MAP: 'socialVolumeTreeMap',
  PRICE_TREE_MAP: 'priceTreeMap',
  PRICE_BAR_CHART: 'priceBarChart',
}

export const PRICE_CHANGE_RANGES = {
  [INFOGRAPHIC_CURRENCIES.USD]: [
    {
      label: '24h',
      key: 'price_usd_change_1d',
    },
    {
      label: '7d',
      key: 'price_usd_change_7d',
    },
    {
      label: '30d',
      key: 'price_usd_change_30d',
    },
  ],
  [INFOGRAPHIC_CURRENCIES.BTC]: [
    {
      label: '24h',
      key: 'price_btc_change_1d',
    },
    {
      label: '7d',
      key: 'price_btc_change_7d',
    },
    {
      label: '30d',
      key: 'price_btc_change_30d',
    },
  ],
  [INFOGRAPHIC_CURRENCIES.ETH]: [
    {
      label: '24h',
      key: 'price_eth_change_1d',
    },
    {
      label: '7d',
      key: 'price_eth_change_7d',
    },
    {
      label: '30d',
      key: 'price_eth_change_30d',
    },
  ],
}

export const SOCIAL_VOLUME_CHANGE_RANGES = {
  [INFOGRAPHIC_CURRENCIES.USD]: [
    {
      label: '24h',
      key: 'social_volume_total_change_1d',
    },
    {
      label: '7d',
      key: 'social_volume_total_change_7d',
    },
    {
      label: '30d',
      key: 'social_volume_total_change_30d',
    },
  ],
}

export const SORT_RANGES = [
  {
    label: 'Marketcap  ⬆️',
    key: 'marketcap_usd',
    desc: false,
  },
  {
    label: 'Marketcap  ⬇️',
    key: 'marketcap_usd',
    desc: true,
  },
  {
    label: `Price changes  ⬆️`,
    key: '',
    desc: false,
  },
  {
    label: 'Price changes  ⬇️',
    key: '',
    desc: true,
  },
]

export const getWordLength = (fontSize, word) => (fontSize - 3) * word.length + 8

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
  return data.map((item) => {
    const value = +item[key]
    const color = getTreeMapColor(100 * value)
    return {
      ...item,
      color,
    }
  })
}

export const getBarValue = (value) => {
  return Math.abs(value) < 1
    ? formatNumber(value, {
        maximumFractionDigits: 2,
      })
    : formatNumber(value, {
        maximumFractionDigits: 0,
        minimumFractionDigits: 0,
      })
}

export const tooltipLabelFormatter = (value, payload) => {
  const data = payload[0]
  if (data.payload) {
    if (data.payload.name === data.payload.ticker) {
      return data.payload.ticker
    } else {
      return `${data.payload.name} ${data.payload.ticker}`
    }
  }
}
