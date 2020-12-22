import { useState } from 'react'

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
