import { useState, useMemo } from 'react'
import { useProjects } from '../../../../../stores/projects'

const filterHelper = (filter, { ticker, name }) =>
  name.toLowerCase().includes(filter) || ticker.toLowerCase().includes(filter)

function useAllProjects (filter) {
  const { projects } = useProjects()

  return useMemo(() => {
    let items = projects
    if (items.length > 0 && filter && filter.length > 0) {
      items = items.filter(item => filterHelper(filter, item))
    }
    return items
  }, [projects, filter])
}

export function useEditAssets (filter, watchlist, onChange) {
  const allProjects = useAllProjects(filter)
  const [checkedItems, setCheckedItems] = useState(watchlist)
  const unusedProjects = useMemo(() => {
    const checkedItemsIDs = new Set(checkedItems.map(i => i.id))
    return allProjects.filter(item => !checkedItemsIDs.has(item.id))
  }, [allProjects, checkedItems])

  const toggleWatchlistProject = item =>
    setCheckedItems(old => {
      let items = new Set(old)
      if (!items.has(item)) {
        items.add(item)
      } else {
        items.delete(item)
      }
      items = Array.from(items)
      onChange && onChange(items)
      return items
    })

  return {
    checkedItems,
    toggleWatchlistProject,
    unusedProjects
  }
}
