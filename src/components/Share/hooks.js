import { useState, useRef } from 'react'
import { SHARE_PATH, getShortUrl } from './utils'

const buildShortLink = (shortUrlHash) => `${window.location.origin}${SHARE_PATH}${shortUrlHash}`

export function getCurrentPath() {
  const { pathname, search } = window.location
  return pathname + search
}

export function useShortShareLink(staticPath) {
  const [shortShareLink, setShortShareLink] = useState('')
  const cache = useRef({}).current

<<<<<<< HEAD
  function getShortShareLink (path) {
=======
  function getShortShareLink(path) {
>>>>>>> master
    const currentPath = typeof path === 'string' ? path : staticPath || getCurrentPath()
    const cachedLink = cache[currentPath]

    if (cachedLink) {
      setShortShareLink(cachedLink)
      return Promise.resolve(cachedLink)
    }

    return getShortUrl(currentPath).then((shortUrlHash) => {
      const shortShareLink = buildShortLink(shortUrlHash)
      cache[currentPath] = shortShareLink
      setShortShareLink(shortShareLink)
      return shortShareLink
    })
  }

  return {
    shortShareLink,
    getShortShareLink,
  }
}
