import { useEffect } from 'react'
import { addRecentAssets } from '../../utils/recent'

const RecentAssetExtension = ({ settings }) => {
  const { slug } = settings

  useEffect(
    () => {
      addRecentAssets(slug)
    },
    [slug]
  )

  return null
}

export default RecentAssetExtension
