import { useEffect } from 'react'
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
}`

export const useAllProjects = (filter) => {
    const { data, loading, error } = useQuery(ALL_PROJECTS)
    let items = (data && data.allProjects) ? data.allProjects : []
    if (items.length > 0 && filter && filter.length > 0) {
      const filterHelper = item => item.name.toLowerCase().includes(filter) || item.ticker.toLowerCase().includes(filter)
      items = items.filter(filterHelper)
    }
    return { data: items, loading, error }
}

export function useOnClickOutside(ref, handler) {
    useEffect(
      () => {
        const listener = (event) => {
          // Do nothing if clicking ref's element or descendent elements
          if (!ref.current || ref.current.contains(event.target)) {
            return;
          }
          handler(event);
        };
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);
        return () => {
          document.removeEventListener("mousedown", listener);
          document.removeEventListener("touchstart", listener);
        };
      },
      // Add ref and handler to effect dependencies
      // It's worth noting that because passed in handler is a new ...
      // ... function on every render that will cause this effect ...
      // ... callback/cleanup to run every render. It's not a big deal ...
      // ... but to optimize you can wrap handler in useCallback before ...
      // ... passing it into this hook.
      [ref, handler]
    );
  }
  