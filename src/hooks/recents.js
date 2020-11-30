import { useState, useEffect } from 'react'
import { getRecentAsset } from '../queries/recents'

const EMPTY_ARRAY = []

export function useRecentAssets (slugs) {
  const [currSlugs, setCurrSlugs] = useState(slugs)
  const [recentAssets, setRecentAssets] = useState(EMPTY_ARRAY)
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  if (JSON.stringify(slugs) !== JSON.stringify(currSlugs)) {
    setCurrSlugs(slugs)
  }

  useEffect(
    () => {
      setIsLoading(true)
      let assets = []
      let race = false

      Promise.all(
        slugs.map((id, i) =>
          getRecentAsset(id).then(asset => (assets[i] = asset))
        )
      )
        .then(data => {
          if (race) return

          assets = assets.filter(Boolean)

          setRecentAssets(assets)
          setIsLoading(false)
          setIsError(false)
        })
        .catch(e => {
          if (race) return

          setIsLoading(false)
          setIsError(e)
        })

      return () => (race = true)
    },
    [currSlugs]
  )

  return [recentAssets, isLoading, isError]
}
