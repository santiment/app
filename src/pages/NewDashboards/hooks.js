import { useEffect, useState } from 'react'
import { DASHBOARDS } from './constants'

export const useNav = () => {
  const [activeItem, setActiveItem] = useState(DASHBOARDS[0])
  const [activeSubItem, setActiveSubItem] = useState(undefined)

  useEffect(() => {
    const subItems = activeItem.subItems

    if (subItems) {
      setActiveSubItem(subItems[0])
    } else {
      setActiveSubItem(undefined)
    }
  }, [activeItem])

  function getSubItemScrollPosition(subItem) {
    const itemAnchor = document.getElementById(subItem.key)

    return itemAnchor ? itemAnchor.offsetTop - 28 : 0
  }

  function scrollToSubItem(subItem) {
    const scrollPosition = getSubItemScrollPosition(subItem)

    if (scrollPosition) {
      const itemIdx = activeItem.subItems.findIndex(({ title }) => title === subItem.title)
      const isFirst = itemIdx === 0

      window.scrollTo(0, isFirst ? 0 : scrollPosition)
    }
  }

  return {
    activeItem,
    activeSubItem,
    setActiveItem,
    setActiveSubItem,
    scrollToSubItem,
  }
}
