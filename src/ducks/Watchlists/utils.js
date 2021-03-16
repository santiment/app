import qs from 'query-string'
import { useCallback, useEffect, useMemo, useState } from 'react'
import queryString from 'query-string'
import { INFOGRAPHICS } from './Widgets/VolumeChart/utils'

export const ALL_PROJECTS_WATCHLIST_SLUG = 'projects'

export function getWatchlistId (search) {
  const { name: str } = qs.parse(search) || {}

  if (str) {
    const [, id] = str.split('@')
    return id
  }
}

export function hasAssetById ({ id, listItems }) {
  if (!id || !listItems) return
  return listItems.some(({ id: projectId }) => projectId === id)
}

export function hasAddress (listItems, source) {
  if (!source || !listItems) return
  return listItems.some(({ address: target }) => target === source.address)
}

export const getWatchlistName = ({ type, location: { search } }) => {
  switch (type) {
    case 'screener':
      return 'My Screener'
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
      ? `Crypto Watchlist: ${listName} - Sanbase`
      : 'All Crypto Assets - Sanbase',
    description: isWatchlist
      ? 'Santiment Watchlists let you keep track of different crypto projects, and compare their performance, on-chain behavior and development activity.'
      : 'Financial, on-chain and development data for 1100+ crypto projects in the Santiment database, including BTC, XRP, ETH and 700+ ERC-20 tokens'
  }
}

const DEFAULT_SCREENER_URL_PARAMS = {
  isPriceChartActive: false,
  isPriceTreeMap: false,
  isVolumeTreeMap: false,
  isMovement: false,
  [INFOGRAPHICS.PRICE_BAR_CHART]: {
    interval: '24h'
  },
  [INFOGRAPHICS.SOCIAL_VOLUME_TREE_MAP]: {
    interval: '24h'
  },
  [INFOGRAPHICS.PRICE_TREE_MAP]: {
    interval: '24h'
  }
}

export const useScreenerUrl = ({ location, history, defaultParams }) => {
  const predefined = useMemo(
    () => {
      return {
        ...DEFAULT_SCREENER_URL_PARAMS,
        ...defaultParams
      }
    },
    [defaultParams]
  )

  const [widgets, setWidgets] = useState(predefined)

  const parsedUrl = useMemo(() => queryString.parse(location.search), [
    location.search
  ])

  const getCharts = useCallback(
    () =>
      parsedUrl && parsedUrl.charts ? JSON.parse(parsedUrl.charts) : predefined,
    [parsedUrl, predefined]
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

export const useScreenerUrlUpdaters = (widgets, setWidgets) => {
  const onChangeSettings = useCallback(
    (key, { label: interval, sorter, currency }) => {
      const widget = widgets[key]
      setWidgets({
        ...widgets,
        [key]: {
          ...widget,
          interval: interval || widget.interval,
          sorter: sorter || widget.sorter,
          currency: currency || widget.currency
        }
      })
    },
    [widgets, setWidgets]
  )

  return { onChangeSettings }
}

export const PROJECT = 'PROJECT'
export const BLOCKCHAIN_ADDRESS = 'BLOCKCHAIN_ADDRESS'
