import { useCallback, useState } from 'react'
import { addOrRemove } from './CompareDialog'

export const useComparingAssets = () => {
  const [comparingAssets, setComparingAssets] = useState([])
  const addAsset = useCallback(
    item => {
      setComparingAssets(
        addOrRemove(comparingAssets, item, ({ id }) => id === item.id)
      )
    },
    [comparingAssets, setComparingAssets]
  )

  const updateAssets = useCallback(
    items => {
      const normalizedItems = items.map(item => {
        const { name, ticker, id, slug, logoUrl, darkLogoUrl } = item.original
        return { name, ticker, id, slug, logoUrl, darkLogoUrl }
      })
      if (JSON.stringify(normalizedItems) !== JSON.stringify(comparingAssets)) {
        setComparingAssets(normalizedItems)
      }
    },
    [comparingAssets, setComparingAssets]
  )

  const cleanAll = useCallback(
    () => {
      setComparingAssets([])
    },
    [setComparingAssets]
  )

  return {
    comparingAssets,
    addAsset,
    updateAssets,
    cleanAll
  }
}
