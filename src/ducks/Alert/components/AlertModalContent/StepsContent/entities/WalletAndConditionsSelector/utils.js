export function mapAssetsToProjects(all, walletAssets) {
  return walletAssets.reduce((acc, { slug: itemSlug, value: itemValue, balance }) => {
    const matchedAsset = all.find(({ slug }) => slug === itemSlug || slug === itemValue)
    if (matchedAsset) {
      matchedAsset.balance = balance
      acc.push({
        value: matchedAsset.slug,
        label: matchedAsset.name,
      })
    }
    return acc
  }, [])
}
