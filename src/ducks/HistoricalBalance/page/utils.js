export const mapAssetsToFlatArray = assetsSlugs =>
  assetsSlugs.map(item => {
    const { slug, asset } = item
    return slug || asset || item
  })

export const initPriceMetrics = (assets, isEnabled) =>
  assets && assets.length > 0
    ? assets.map(item => ({ asset: item, enabled: isEnabled }))
    : []
