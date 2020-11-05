import { useState, useRef } from 'react'
import { SHARE_PATH, getShortUrl } from './utils'

const buildShortLink = shortUrlHash =>
  `${window.location.origin}${SHARE_PATH}${shortUrlHash}`

export function getCurrentPath () {
  const { pathname, search } = window.location
  return pathname + search
}

export function useShortShareLink () {
  const [shortShareLink, setShortShareLink] = useState('')
  const cache = useRef({}).current

  function getShortShareLink (path) {
    const currentPath = typeof path === 'string' ? path : getCurrentPath()
    const cachedLink = cache[currentPath]

    if (cachedLink) {
      return setShortShareLink(cachedLink)
    }

    getShortUrl(currentPath).then(shortUrlHash => {
      const shortShareLink = buildShortLink(shortUrlHash)
      cache[currentPath] = shortShareLink
      setShortShareLink(shortShareLink)
    })
  }

  return {
    shortShareLink,
    getShortShareLink
  }
}
