import { parse, stringify } from 'query-string'

const BASE = window.location.origin + '/labs/balance?'
const URL_FORMAT = { arrayFormat: 'bracket' }

const slugExtractor = ({ slug }) => slug

export function generateSearchQuery(address, chartAssets, priceAssets) {
  const assets = chartAssets.map(slugExtractor)
  const priceMetrics = priceAssets.map(slugExtractor)

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
  const { address = '', assets, priceMetrics } = parse(url, URL_FORMAT)

  return {
    settings: { address },
    chartAssets: [],
    priceAssets: [],
  }
}
