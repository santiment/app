export const mapAssetsToFlatArray = assetsSlugs =>
  assetsSlugs.map(item => {
    const { slug, asset } = item
    return slug || asset || item
  })
