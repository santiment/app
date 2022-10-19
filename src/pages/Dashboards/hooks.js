import { useCallback, useEffect, useMemo, useState } from 'react'
import throttle from 'lodash.throttle'
import { useQuery } from '@apollo/react-hooks'
import { track } from 'webkit/analytics'
import { useEventListener } from '../../hooks/eventListeners'
import { METRIC_BOUNDARIES_QUERY } from './queries'
import { DASHBOARDS } from './constants'

function closestToZero(numbers) {
  let closestIndex = 0
  let diff = Number.MAX_VALUE

  for (let i = 0; i < numbers.length; i++) {
    const odd = numbers[i].odd

    let abs = Math.abs(odd)

    if (abs < diff) {
      closestIndex = i
      diff = abs
    } else if (abs === diff && odd > 0 && numbers[closestIndex] < 0) {
      closestIndex = i
    }
  }

  return numbers[closestIndex]
}

export const useNav = ({ match, location, history }) => {
  const [activeItem, setActiveItem] = useState(undefined)
  const [activeSubItem, setActiveSubItem] = useState(undefined)
  const targets = useMemo(
    () => (activeItem && activeItem.subItems ? collectSubItems(activeItem.subItems) : []),
    [activeItem, activeSubItem],
  )

  useEffect(() => {
    const currentPathname = location.pathname
    const itemPath = currentPathname.split('/')[2]

    if (!activeItem) {
      const item = itemPath ? DASHBOARDS.find(({ path }) => path === itemPath) : DASHBOARDS[0]

      if (item) setActiveItem(item)
    }

    return () => {}
  }, [])

  useEffect(() => {
    if (activeItem) {
      const currentPathname = location.pathname
      const currentHash = location.hash
      const url = `${match.path}/${activeItem.path}`

      if (url !== currentPathname) {
        history.push(url)
        track.pageview('sanbase')
      }

      const subItems = activeItem.subItems

      if (subItems) {
        const currentSubItem =
          currentHash && subItems.find(({ key }) => key === currentHash.replace('#', ''))

        if (currentSubItem) {
          const scrollPosition = getSubItemScrollPosition(currentSubItem)
          window.scrollTo({ left: 0, top: scrollPosition, behavior: 'auto' })
          history.replace(`${window.location.pathname}${currentHash}`)
        }

        setActiveSubItem(currentSubItem || subItems[0])
      } else {
        setActiveSubItem(undefined)
      }
    }
  }, [activeItem])

  useEffect(() => {
    if (activeSubItem) {
      history.replace(`${window.location.pathname}#${activeSubItem.key}`)
    }
  }, [activeSubItem])

  const handleObserve = useCallback(() => {
    if (targets.length > 0) {
      const maxEntry = findMaxEntry(targets)

      const subItems = activeItem.subItems

      const targetSubItem = maxEntry && subItems.find(({ key }) => key === maxEntry.target.id)

      if (targetSubItem && targetSubItem.key !== activeSubItem.key) setActiveSubItem(targetSubItem)
    }
  }, [activeItem, activeSubItem, targets])

  const throttledHandleObserve = throttle(handleObserve, 350)

  useEventListener('scroll', throttledHandleObserve)

  function getSubItemScrollPosition(subItem) {
    const itemAnchor = document.getElementById(subItem.key)

    return itemAnchor ? itemAnchor.offsetTop - window.innerHeight / 4 : 0
  }

  function scrollToSubItem(subItem) {
    const scrollPosition = getSubItemScrollPosition(subItem)

    if (scrollPosition) {
      const subItems = activeItem.subItems
      const isFirst = subItems[0].key === subItem.key
      const isLast = subItems[subItems.length - 1].key === subItem.key

      if (isFirst && !isLast) window.scrollTo({ left: 0, top: 0, behavior: 'smooth' })
      else if (!isFirst && isLast)
        window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: 'smooth' })
      else window.scrollTo({ left: 0, top: scrollPosition, behavior: 'smooth' })
    }
  }

  function collectSubItems(subItems) {
    return subItems.map(({ key }) => document.getElementById(key))
  }

  function findMaxEntry(targets) {
    const isBottom =
      document.documentElement.scrollHeight === window.pageYOffset + window.innerHeight

    const entries = targets.filter(Boolean).map((target) => ({
      target,
      boundingClientRect: target.getBoundingClientRect(),
    }))

    if (entries.length === activeItem.subItems.length) {
      const intersectingEntries = entries.map(({ target, boundingClientRect }) => ({
        target,
        top: boundingClientRect.top,
        bottom: boundingClientRect.bottom,
        y: boundingClientRect.y,
        boundingClientRect,
      }))

      const intersectionOdds = intersectingEntries.map(
        ({ top, bottom, boundingClientRect, ...rest }, index) => {
          let odd = Math.abs(top - window.innerHeight / 4)

          if (index === 0) odd = Math.abs(top - 226)
          if (index === intersectingEntries.length - 1 && isBottom) odd = 0

          return {
            odd,
            ...rest,
          }
        },
      )

      return closestToZero(intersectionOdds)
    }

    return false
  }

  return {
    activeItem,
    activeSubItem,
    setActiveItem,
    setActiveSubItem,
    scrollToSubItem,
  }
}

export function useRestrictedInfo(variables) {
  const { data } = useQuery(METRIC_BOUNDARIES_QUERY, { variables })
  return data ? data.getMetric.metadata.isRestricted : false
}
