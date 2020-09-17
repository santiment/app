export const getPriceMetricWithSlug = slug => {
  return 'priceUsd_' + slug.replace(/-/g, '')
}
