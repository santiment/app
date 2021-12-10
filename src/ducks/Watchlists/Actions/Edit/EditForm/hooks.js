import { useState, useEffect, useMemo } from 'react'
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
  const data = useAllProjects(filter)
  const watchlistProjects = useMemo(
    () => (watchlist ? watchlist.listItems.map(l => l.project) : []),
    [watchlist]
  )
  const [checkedItems, setCheckedItems] = useState(watchlistProjects)
  const [filteredProjects, setFilteredProjects] = useState(watchlistProjects)
  const unusedProjects = useMemo(() => {
    const watchListIDs = new Set(filteredProjects.map(i => i.id))
    return data.filter(item => !watchListIDs.has(item.id))
  }, [data, filteredProjects])

  useEffect(() => {
    let items = watchlistProjects
    if (filter && filter.length > 0) {
      items = items.filter(item => filterHelper(filter, item))
    }
    setFilteredProjects(items)
  }, [filter, watchlistProjects])

  const toggleWatchlistProject = item =>
    setCheckedItems(old => {
      let items = new Set(old)
      const has = items.has(item)
      if (!has) {
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
    unusedProjects,
    filteredProjects
  }
}
