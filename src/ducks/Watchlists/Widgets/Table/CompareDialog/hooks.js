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

  const cleanAll = useCallback(
    () => {
      setComparingAssets([])
    },
    [setComparingAssets]
  )

  return {
    comparingAssets,
    addAsset,
    cleanAll
  }
}
