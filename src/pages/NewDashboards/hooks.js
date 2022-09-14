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

  useEffect(() => {
    console.log(activeSubItem)
  }, [activeSubItem])

  return {
    activeItem,
    activeSubItem,
    setActiveItem,
    setActiveSubItem,
  }
}
