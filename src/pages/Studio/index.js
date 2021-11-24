import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { parse } from 'query-string'
import { track } from 'webkit/analytics'
import { queryLayout } from 'studio/api/layouts'
import { selectedLayout } from 'studio/stores/layout'
import Studio from './Studio'
import URLExtension from './URLExtension'
import RecentAssetExtension from './RecentAssetExtension'
import { SHORT_URL_POSTFIX, getShortUrlHash } from './utils'
import { parseUrl } from './sharing/parse'
import { parseTemplate } from './sharing/template'
import { getIdFromSEOLink } from '../../utils/url'
import { getFullUrl } from '../../components/Share/utils'
import CtaJoinPopup from '../../components/CtaJoinPopup/CtaJoinPopup'
import PageLoader from '../../components/Loader/PageLoader'

const parseLayout = layout =>
  layout && queryLayout(+layout).then(selectedLayout.set)

const Extensions = props => (
  <>
    <URLExtension {...props} />
    <RecentAssetExtension settings={props.settings} />
    <CtaJoinPopup />
  </>
)

export default ({ location }) => {
  const [parsedUrl, setParsedUrl] = useState()
  const [slug, setSlug] = useState('')
  const [prevTemplateId, setPrevTemplateId] = useState()
  const shortUrlHashState = useState()
  const prevFullUrlRef = useRef()
  const history = useHistory()

  const { pathname, search } = location

  useEffect(() => {
    window.__onLinkClick = e => {
      e.preventDefault()

      const node = e.currentTarget
      const href = node.getAttribute('href')
      if (href) history.push(href)
    }

    return () => {
      window.__onLinkClick = null
      selectedLayout.set()
    }
  }, [])

  useEffect(() => {
    const newSlug = parse(search).slug
    if (newSlug && newSlug !== slug) setSlug(newSlug)
  }, [search])

  useEffect(() => {
    if (pathname === '/charts') selectedLayout.set()

    let isRacing = false
    const templateId = getIdFromSEOLink(pathname)
    if (prevFullUrlRef.current === pathname + search) return
    track.pageview('sanbase')
    const [prevShortUrlHash, setShortUrlHash] = shortUrlHashState

    if (Number.isFinite(templateId)) {
      if (templateId === prevTemplateId) return

      setPrevTemplateId(templateId)
      queryLayout(+templateId)
        .then(layout => {
          if (isRacing) return
          const parsedUrl = {
            settings: layout.project,
            widgets: parseTemplate(layout)
          }
          if (!parsedUrl.settings.slug) {
            parsedUrl.settings.slug = 'bitcoin'
            parsedUrl.settings.ticker = 'BTC'
          }

          selectedLayout.set(layout)
          setShortUrlHash()
          setSlug(parsedUrl.settings.slug || '')
          setParsedUrl(parsedUrl)
        })
        .catch(console.error)
      return
    }

    if (!pathname.endsWith(SHORT_URL_POSTFIX)) {
      const parsedUrl = parseUrl(search)
      if (parsedUrl.settings) {
        setSlug(parsedUrl.settings.slug || '')
      }

      parseLayout(parsedUrl.layout)
      setShortUrlHash()
      return setParsedUrl(parsedUrl)
    }

    const shortUrlHash = getShortUrlHash(pathname)
    if (shortUrlHash === prevShortUrlHash) return

    getFullUrl(shortUrlHash)
      .then(fullUrl => {
        if (isRacing) return

        setShortUrlHash(shortUrlHash)
        if (prevFullUrlRef.current !== fullUrl) {
          prevFullUrlRef.current = fullUrl
          const parsedUrl = parseUrl(fullUrl)

          if (parsedUrl.settings) {
            setSlug(parsedUrl.settings.slug || '')
          }
          parseLayout(parsedUrl.layout)
          setParsedUrl(parsedUrl)
        }
      })
      .catch(console.error)

    return () => (isRacing = true)
  }, [pathname])

  if (!parsedUrl) return <PageLoader />

  const { widgets, settings, sidewidget } = parsedUrl || {}
  return (
    <Studio
      slug={slug}
      parsedUrl={parsedUrl}
      Extensions={Extensions}
      shortUrlHashState={shortUrlHashState}
      prevFullUrlRef={prevFullUrlRef}
      pathname={pathname}
      defaultWidgets={widgets}
      defaultSettings={settings}
      defaultSidewidget={sidewidget}
      setSlug={setSlug}
    />
  )
}
