import { parse, stringify } from 'query-string'

const BASE = window.location.origin + '/labs/balance?'
const URL_FORMAT = { arrayFormat: 'bracket' }

export const slugExtractor = ({ slug }) => slug
export const assetConvertor = slug => ({ slug })

export function generateSearchQuery (settings, chartAssets, priceAssets, isLog) {
  const { address, from, to } = settings
  const assets = chartAssets.map(slugExtractor)
  const priceMetrics = priceAssets

  return stringify(
    {
      address,
      assets,
      priceMetrics,
      from,
      to,
      isLog
    },
    URL_FORMAT
  )
}

export function generateUrl (settings, chartAssets, priceAssets) {
  return BASE + generateSearchQuery(settings, chartAssets, priceAssets)
}

export function parseUrl (url) {
  const {
    address = '',
    assets = [],
    priceMetrics = [],
    from,
    to,
    isLog
  } = parse(url, URL_FORMAT)

  const settings = { address }

  if (from && to) {
    settings.from = from
    settings.to = to
    settings.timeRange = undefined
  }

  return {
    settings,
    chartAssets: assets.map(assetConvertor),
    priceAssets: priceMetrics,
    isLog: isLog === 'true'
  }
}
