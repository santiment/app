import { useState } from 'react'

export const useAssetsAnomalyToggler = () => {
  const [filteredItems, setFilteredItems] = useState(null)
  const [filterType, setFilterType] = useState(null)

  function toggleAssetsFiltering (assets, type) {
    if (type === filterType) {
      setFilterType(null)
      setFilteredItems(null)
    } else {
      setFilterType(type)
      setFilteredItems(assets)
    }
  }

  function clearFilters () {
    setFilteredItems(null)
    setFilterType(null)
  }

  return {
    toggleAssetsFiltering,
    filteredItems,
    clearFilters,
    filterType
  }
}
