import qs from 'query-string'
import { useCallback, useEffect, useMemo, useState } from 'react'
import queryString from 'query-string'

export function getWatchlistLink ({ name, id }) {
  return `/assets/list?name=${encodeURIComponent(name)}@${id}`
}

export function isStaticWatchlist (watchlist) {
  const { name } = watchlist.function || {}
  return name === 'empty'
}

export function isDynamicWatchlist (watchlist = {}) {
  if (watchlist === null) {
    return
  }

  const { name } = watchlist.function || {}
  return (
    name !== 'empty' && (name === 'selector' || name === 'top_all_projects')
  )
}

export function getWatchlistId (search) {
  const { name: str } = qs.parse(search) || {}

  if (str) {
    const [, id] = str.split('@')
    return id
  }
}

export function isDefaultScreenerPath (pathname) {
  return pathname === DEFAULT_SCREENER.to
}

export function hasAssetById ({ id, listItems }) {
  if (!id) return
  return listItems.some(({ id: projectId }) => projectId === id)
}

export const getWatchlistName = ({ type, location: { search } }) => {
  switch (type) {
    case 'all':
      return 'All Assets'
    case 'screener':
      return 'My Screener'
    case 'erc20':
      return 'ERC20 Assets'
    case 'list':
      const name = (qs.parse(search).name || '').split('@')[0]
      return name
    default:
      return 'Assets'
  }
}

export const normalizeCSV = items => {
  return items.map(item => {
    const { __typename, id, signals, ethAddresses, ...rest } = item
    const _ethAddresses = ethAddresses
      ? ethAddresses.map(
        address =>
          `https://app.santiment.net/balance?address=${
            address.address
          }&assets[]=ethereum`
      )
      : undefined
    if (_ethAddresses && _ethAddresses.length > 0) {
      return { _ethAddresses, ...rest }
    }
    return rest
  })
}

export const getHelmetTags = (isList, listName) => {
  const isWatchlist = isList && listName
  return {
    title: isWatchlist
      ? `Crypto Watchlist: ${listName.split('@')[0]} - Sanbase`
      : 'All Crypto Assets - Sanbase',
    description: isWatchlist
      ? 'Santiment Watchlists let you keep track of different crypto projects, and compare their performance, on-chain behavior and development activity.'
      : 'Financial, on-chain and development data for 1100+ crypto projects in the Santiment database, including BTC, XRP, ETH and 700+ ERC-20 tokens'
  }
}

export const DEFAULT_SCREENER = {
  name: 'My screener',
  to: '/assets/screener',
  slug: 'TOTAL_MARKET',
  assetType: 'screener'
}

export const DEFAULT_SCREENER_FUNCTION = {
  args: { size: 10000 },
  name: 'top_all_projects'
}

// NOTE (haritonasty): remove it after migration on dynamic watchlists
// (need to integrate server-side pagination for tables before)
// July 5, 2020

export const BASIC_CATEGORIES = [
  {
    name: 'All assets',
    to: '/assets/all',
    slug: 'TOTAL_MARKET',
    assetType: 'all'
  },
  {
    name: 'ERC20',
    to: '/assets/erc20',
    slug: 'TOTAL_ERC20',
    assetType: 'erc20'
  }
]

export function countAssetsSort ({ count: countA }, { count: countB }) {
  return countA > countB ? -1 : 1
}

const DEFAULT_SCREENER_URL_PARAMS = {
  isPriceChartActive: false,
  isPriceTreeMap: false,
  isVolumeTreeMap: false,
  priceBarChart: {
    interval: '24h'
  },
  socialVolumeTreeMap: {
    interval: '24h'
  },
  priceTreeMap: {
    interval: '24h'
  }
}

export const useScreenerUrl = ({ location, history }) => {
  const [widgets, setWidgets] = useState(DEFAULT_SCREENER_URL_PARAMS)

  const parsedUrl = useMemo(() => queryString.parse(location.search), [
    location.search
  ])

  const getCharts = useCallback(
    () => {
      return parsedUrl && parsedUrl.charts
        ? JSON.parse(parsedUrl.charts)
        : DEFAULT_SCREENER_URL_PARAMS
    },
    [parsedUrl]
  )

  useEffect(() => {
    const charts = getCharts()
    if (charts) setWidgets(charts)
  }, [])

  const urlChange = useCallback(
    data => {
      const oldCharts = getCharts()
      history.replace(
        `${window.location.pathname}?${queryString.stringify({
          ...parsedUrl,
          charts: JSON.stringify({
            ...oldCharts,
            ...data
          })
        })}`
      )
    },
    [parsedUrl]
  )

  useEffect(
    () => {
      urlChange(widgets)
    },
    [widgets]
  )

  return { widgets, setWidgets }
}
