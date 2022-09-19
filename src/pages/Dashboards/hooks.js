import { useEffect, useState } from 'react'
import { track } from 'webkit/analytics'
import { DASHBOARDS } from './constants'

export const useNav = ({ match, location, history }) => {
  const [activeItem, setActiveItem] = useState(DASHBOARDS[0])
  const [activeSubItem, setActiveSubItem] = useState(undefined)

  useEffect(() => {
    const currentPathname = location.pathname
    const itemPath = currentPathname.split('/')[2]

    if (itemPath && itemPath !== activeItem.path) {
      const item = DASHBOARDS.find(({ path }) => path === itemPath)

      if (item) setActiveItem(item)
    }
  }, [])

  useEffect(() => {
    const currentPathname = location.pathname
    const url = `${match.path}/${activeItem.path}`

    if (url !== currentPathname) {
      history.push(url)
      track.pageview('sanbase')
    }
  }, [activeItem])

  useEffect(() => {
    const subItems = activeItem.subItems

    if (subItems) {
      setActiveSubItem(subItems[0])
    } else {
      setActiveSubItem(undefined)
    }
  }, [activeItem])

  useEffect(() => {
    if (activeSubItem) {
      const observer = new IntersectionObserver(handleObserve, {
        rootMargin: '0px',
        threshold: 0.5,
      })

      const subItemsTargets = collectSubItems()

      if (subItemsTargets) {
        subItemsTargets.forEach((item) => item && observer.observe(item))
      }

      return () => {
        if (subItemsTargets) {
          subItemsTargets.forEach((item) => item && observer.unobserve(item))
        }
      }
    }
  }, [activeSubItem])

  function getSubItemScrollPosition(subItem) {
    const itemAnchor = document.getElementById(subItem.key)

    return itemAnchor ? itemAnchor.offsetTop - 28 : 0
  }

  function scrollToSubItem(subItem) {
    const scrollPosition = getSubItemScrollPosition(subItem)

    if (scrollPosition) {
      const isFirst = activeItem.subItems[0].key === subItem.key

      window.scrollTo(0, isFirst ? 0 : scrollPosition)
    }
  }

  function collectSubItems() {
    return activeItem.subItems.map(({ key }) => document.getElementById(key))
  }

  function handleObserve(entries) {
    const subItems = activeItem.subItems

    entries.forEach(({ isIntersecting, target }) => {
      if (isIntersecting) {
        const targetSubItem = subItems.find(({ key }) => key === target.id)

        if (targetSubItem.key !== activeSubItem.key) setActiveSubItem(targetSubItem)
      }
    })
  }

  return {
    activeItem,
    activeSubItem,
    setActiveItem,
    setActiveSubItem,
    scrollToSubItem,
  }
}
