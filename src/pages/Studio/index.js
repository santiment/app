import React, { useState, useEffect, useRef } from 'react'
import { Redirect } from 'react-router-dom'
import { parse } from 'query-string'
import { track } from 'webkit/analytics'
import { queryLayout } from 'studio/api/layouts'
import { selectedLayout } from 'studio/stores/layout'
import Studio from './Studio'
import URLExtension from './URLExtension'
import RecentAssetExtension from './RecentAssetExtension'
import {
  SHORT_URL_POSTFIX,
  getShortUrlHash,
  onAnonComment,
  handleSavedComment,
  handleLayoutCommentLink,
  onDefaultLayoutAddressSelect,
} from './utils'
import { parseUrl } from './sharing/parse'
import { parseTemplate } from './sharing/template'
import { getIdFromSEOLink } from '../../utils/url'
import { getFullUrl } from '../../components/Share/utils'
import CtaJoinPopup from '../../components/CtaJoinPopup/CtaJoinPopup'
import PageLoader from '../../components/Loader/PageLoader'
import { storeActivity } from '../../pages/Explorer/api'

const parseLayout = (layout) => layout && queryLayout(+layout).then(selectedLayout.set)

const Extensions = (props) => (
  <>
    <URLExtension {...props} />
    <RecentAssetExtension settings={props.settings} />
    <CtaJoinPopup />
  </>
)

export default ({ location, isDesktop }) => {
  const [parsedUrl, setParsedUrl] = useState()
  const [slug, setSlug] = useState('')
  const [address, setAddress] = useState('')
  const [prevTemplateId, setPrevTemplateId] = useState()
  const shortUrlHashState = useState()
  const prevFullUrlRef = useRef()

  const { pathname, search } = location

  useEffect(() => {
    window.onAnonComment = onAnonComment
    window.onDefaultLayoutAddressSelect = onDefaultLayoutAddressSelect

    return () => {
      window.onAnonComment = null
      window.onDefaultLayoutAddressSelect = null
      window.onCommentSubmitted = null
      selectedLayout.set()
    }
  }, [])

  useEffect(() => {
    if (parsedUrl && parsedUrl.layout) {
      window.onCommentSubmitted = () =>
        storeActivity('CHART_CONFIGURATION', parsedUrl.layout, 'COMMENT')
    }
    return () => (window.onCommentSubmitted = null)
  }, [parsedUrl])

  useEffect(() => {
    const { slug: newSlug, address: newAddress } = parse(search)
    if (newSlug && newSlug !== slug) setSlug(newSlug)
    if (newAddress && newAddress !== address) setAddress(newAddress)
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
        .then((layout) => {
          if (isRacing) return
          const parsedUrl = {
            settings: layout.project,
            widgets: parseTemplate(layout),
          }
          if (!parsedUrl.settings.slug) {
            parsedUrl.settings.slug = 'bitcoin'
            parsedUrl.settings.ticker = 'BTC'
          }

          selectedLayout.set(layout)
          if (location.hash === '#comment') handleSavedComment(parsedUrl)
          handleLayoutCommentLink(parsedUrl, search)
          setShortUrlHash()
          setSlug(parsedUrl.settings.slug || '')
          setAddress(parsedUrl.settings.address || '')
          setParsedUrl(parsedUrl)
        })
        .catch(console.error)
      return
    }

    if (!pathname.endsWith(SHORT_URL_POSTFIX)) {
      const parsedUrl = parseUrl(search)
      if (parsedUrl.settings) {
        setSlug(parsedUrl.settings.slug || '')
        setAddress(parsedUrl.settings.address || '')
      }

      parseLayout(parsedUrl.layout)
      setShortUrlHash()
      return setParsedUrl(parsedUrl)
    }

    const shortUrlHash = getShortUrlHash(pathname)
    if (shortUrlHash === prevShortUrlHash) return

    getFullUrl(shortUrlHash)
      .then((fullUrl) => {
        if (isRacing) return

        setShortUrlHash(shortUrlHash)
        if (prevFullUrlRef.current !== fullUrl) {
          prevFullUrlRef.current = fullUrl
          const parsedUrl = parseUrl(fullUrl)

          if (parsedUrl.settings) {
            setSlug(parsedUrl.settings.slug || '')
            setAddress(parsedUrl.settings.address || '')
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

  if (!isDesktop) {
    return <Redirect to={'/projects/' + (settings ? settings.slug : slug)} />
  }

  return (
    <Studio
      slug={slug}
      address={address}
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
