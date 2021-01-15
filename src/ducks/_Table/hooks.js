import { useMemo, useState } from 'react'

const SET = new Set()
export function useSelectedItemsSet (items) {
  const [selectedItemsSet, setSelectedItemsSet] = useState(SET)

  function selectItem (item) {
    const newState = new Set(selectedItemsSet)

    if (newState.has(item)) {
      newState.delete(item)
    } else {
      newState.add(item)
    }

    setSelectedItemsSet(newState)
  }

  function selectAll () {
    setSelectedItemsSet(
      selectedItemsSet.size === items.length ? SET : new Set(items)
    )
  }

  return {
    selectedItemsSet,
    selectItem,
    selectAll,
    isAllItemSelected: selectedItemsSet.size === items.length
  }
}

const ARRAY = []
export function useColumns (allColumns, hiddenColumnIds = ARRAY) {
  return useMemo(
    () => {
      if (hiddenColumnIds.length === 0) return allColumns

      const hiddenSet = new Set(hiddenColumnIds)
      return allColumns.filter(({ id }) => !hiddenSet.has(id))
    },
    [hiddenColumnIds]
  )
}
