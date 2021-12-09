import { useEffect, useMemo } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

const ALL_PROJECTS = gql`
  {
    allProjects {
      id
      name
      ticker
      logoUrl
      darkLogoUrl
    }
  }
`

export const useAllProjects = filter => {
  const { data, loading, error } = useQuery(ALL_PROJECTS)

  return useMemo(() => {
    let items = data && data.allProjects ? data.allProjects : []
    if (items.length > 0 && filter && filter.length > 0) {
      const filterHelper = item =>
        item.name.toLowerCase().includes(filter) ||
        item.ticker.toLowerCase().includes(filter)
      items = items.filter(filterHelper)
    }
    return { data: items, loading, error }
  }, [data, loading, error, filter])
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
