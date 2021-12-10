import { useEffect, useMemo } from 'react'
import { useProjects } from '../../../../../stores/projects'

export function useAllProjects (filter) {
  const { projects, isLoading } = useProjects()

  return useMemo(() => {
    let items = projects
    if (items.length > 0 && filter && filter.length > 0) {
      const filterHelper = ({ name, ticker }) =>
        name.toLowerCase().includes(filter) ||
        ticker.toLowerCase().includes(filter)
      items = items.filter(filterHelper)
    }
    return { data: items, loading: isLoading }
  }, [projects, isLoading, filter])
}

export function useOnClickOutside (ref, handler) {
  useEffect(() => {
    const listener = event => {
      if (!ref.current || ref.current.contains(event.target)) {
        return
      }
      handler(event)
    }
    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)
    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, handler])
}
