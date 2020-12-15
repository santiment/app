import { useCallback, useState } from 'react'

export const useVisibleItems = () => {
  const [visibleItems, setVisibleItems] = useState([])

  const changeVisibleItems = useCallback(
    ({ pageIndex, pageSize, rows }) => {
      const startIndex = pageIndex * pageSize
      const lastIndex = startIndex + pageSize

      const visibleSlugs = rows
        .slice(startIndex, lastIndex)
        .map(({ original: { slug } }) => slug)

      if (
        visibleSlugs.length > 0 &&
        JSON.stringify(visibleSlugs) !== JSON.stringify(visibleItems)
      ) {
        setVisibleItems(visibleSlugs)
      }
    },
    [setVisibleItems, visibleItems]
  )

  return {
    visibleItems,
    changeVisibleItems
  }
}
