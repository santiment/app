import { useState, useRef } from 'react'
import { SHARE_PATH, getShortUrl } from './utils'

const buildShortLink = shortUrlHash =>
  `${window.location.origin}${SHARE_PATH}${shortUrlHash}`

export function getCurrentPath () {
  const { pathname, search } = window.location
  return pathname + search
}

export function useShortLink () {
  const [shortLink, setShortLink] = useState('')
  const cache = useRef({}).current

  function getShortLink () {
    const currentPath = getCurrentPath()
    const cachedLink = cache[currentPath]

    if (cachedLink) {
      return setShortLink(cachedLink)
    }

    getShortUrl(currentPath).then(shortUrlHash => {
      const shortLink = buildShortLink(shortUrlHash)
      cache[currentPath] = shortLink
      setShortLink(shortLink)
    })
  }

  return {
    shortLink,
    getShortLink
  }
}
