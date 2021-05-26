import React, { useState, useEffect, useRef } from 'react'
import { parse } from 'query-string'
import Studio from './Studio'
import URLExtension from './URLExtension'
import RecentAssetExtension from './RecentAssetExtension'
import { parseUrl } from './sharing/parse'
import { parseTemplate } from './sharing/template'
import { getIdFromSEOLink } from '../../utils/url'
import CtaJoinPopup from '../../components/CtaJoinPopup/CtaJoinPopup'
import PageLoader from '../../components/Loader/PageLoader'
import { getTemplate } from '../../ducks/Studio/Template/gql/hooks'

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
  const shortUrlHashState = useState()
  const prevFullUrlRef = useRef()
  const { pathname, search } = location

  useEffect(
    () => {
      const newSlug = parse(search).slug
      if (newSlug && newSlug !== slug) setSlug(newSlug)
    },
    [search]
  )

  useEffect(
    () => {
      const templateId = getIdFromSEOLink(pathname)
      if (prevFullUrlRef.current === pathname + search) return

      if (Number.isFinite(templateId)) {
        getTemplate(templateId)
          .then(template => {
            const parsedUrl = {
              settings: template.project,
              widgets: parseTemplate(template)
            }
            if (!parsedUrl.settings.slug) {
              parsedUrl.settings.slug = 'bitcoin'
              parsedUrl.settings.ticker = 'BTC'
            }
            setParsedUrl(parsedUrl)
          })
          .catch(console.error)
        return
      }
      setParsedUrl(parseUrl(search)) // TODO: Delete after enabling short urls [@vanguard | Mar  3, 2021]
    },
    [pathname]
  )

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
