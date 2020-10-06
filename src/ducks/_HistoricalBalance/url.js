import { parse, stringify } from 'query-string'

const BASE = window.location.origin + '/labs/balance?'
const URL_FORMAT = { arrayFormat: 'bracket' }

export const slugExtractor = ({ slug }) => slug
const assetConvertor = (slug) => ({ slug })

export function generateSearchQuery(address, chartAssets, priceAssets) {
  const assets = chartAssets.map(slugExtractor)
  const priceMetrics = priceAssets

  return stringify(
    {
      address,
      assets,
      priceMetrics,
    },
    URL_FORMAT,
  )
}

export function generateUrl(address, chartAssets, priceAssets) {
  return BASE + generateSearchQuery(address, chartAssets, priceAssets)
}

export function parseUrl(url) {
  const { address = '', assets = [], priceMetrics = [] } = parse(
    url,
    URL_FORMAT,
  )

  return {
    settings: { address },
    chartAssets: assets.map(assetConvertor),
    priceAssets: priceMetrics,
  }
}
