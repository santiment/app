import { parse, stringify } from 'query-string'

const BASE = window.location.origin + '/labs/balance?'
const URL_FORMAT = { arrayFormat: 'bracket' }

export const slugExtractor = ({ slug }) => slug
export const assetConvertor = slug => ({ slug })

export function generateSearchQuery (settings, chartAssets, priceAssets) {
  const { address, from, to } = settings
  const assets = chartAssets.map(slugExtractor)
  const priceMetrics = priceAssets

  return stringify(
    {
      address,
      assets,
      priceMetrics,
      from: from,
      to: to
    },
    URL_FORMAT
  )
}

export function generateUrl (settings, chartAssets, priceAssets) {
  return BASE + generateSearchQuery(settings, chartAssets, priceAssets)
}

export function parseUrl (url) {
  const { address = '', assets = [], priceMetrics = [], from, to } = parse(
    url,
    URL_FORMAT
  )

  return {
    settings: { address, from, to },
    chartAssets: assets.map(assetConvertor),
    priceAssets: priceMetrics
  }
}
