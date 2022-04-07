import { parse, stringify } from 'query-string'

const BASE = window.location.origin + '/labs/balance?'
const URL_FORMAT = { arrayFormat: 'bracket' }

export const slugExtractor = ({ slug }) => slug
export const assetConvertor = (slug) => ({ slug })

<<<<<<< HEAD
export function generateSearchQuery (settings, chartAssets, priceAssets, isLog) {
=======
export function generateSearchQuery(settings, chartAssets, priceAssets, isLog) {
>>>>>>> master
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
      isLog,
    },
    URL_FORMAT,
  )
}

export function generateUrl(settings, chartAssets, priceAssets) {
  return BASE + generateSearchQuery(settings, chartAssets, priceAssets)
}

<<<<<<< HEAD
export function parseUrl (url) {
=======
export function parseUrl(url) {
>>>>>>> master
  const { address = '', assets = [], priceMetrics = [], from, to, isLog } = parse(url, URL_FORMAT)

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
    isLog: isLog === 'true',
  }
}
