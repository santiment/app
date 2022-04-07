import { useState, useMemo, useEffect } from 'react'
import { useProjects } from '../../../../../stores/projects'

const filterHelper = (filter, { ticker, name }) =>
  name.toLowerCase().includes(filter) || ticker.toLowerCase().includes(filter)

function useFilteredItems(filter, items) {
  return useMemo(() => {
    if (items.length > 0 && filter && filter.length > 0) {
      items = items.filter((item) => filterHelper(filter, item))
    }
    return items
  }, [filter, items])
}

function useAllProjects(filter) {
  const { projects } = useProjects()
  return useFilteredItems(filter, projects)
}

<<<<<<< HEAD
export function useEditAssets (filter, watchlist, onChange, preSelectedItems = []) {
=======
export function useEditAssets(filter, watchlist, onChange, preSelectedItems = []) {
>>>>>>> master
  const allProjects = useAllProjects(filter)
  const [checkedItems, setCheckedItems] = useState(watchlist)
  const filteredWatchlist = useFilteredItems(filter, checkedItems)
  const unusedProjects = useMemo(() => {
    const checkedItemsIDs = new Set(checkedItems.map((i) => i.id))
    return allProjects.filter((item) => !checkedItemsIDs.has(item.id))
  }, [allProjects, checkedItems])

  useEffect(() => {
    if (preSelectedItems.length > 0) {
      setCheckedItems(preSelectedItems)
      onChange(preSelectedItems.map((l) => ({ projectId: parseInt(l.id) })))
    }
  }, [preSelectedItems])

  const toggleWatchlistProject = (item) =>
    setCheckedItems((old) => {
      let items = new Set(old)
      if (!items.has(item)) {
        items.add(item)
      } else {
        items.delete(item)
      }
      items = Array.from(items)
      if (onChange) onChange(items.map((l) => ({ projectId: parseInt(l.id) })))
      return items
    })

  return {
    checkedItems,
    filteredWatchlist,
    toggleWatchlistProject,
    unusedProjects,
  }
}
