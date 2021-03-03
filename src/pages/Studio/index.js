import React, { useState, useEffect, useRef } from 'react'
import URLExtension from './URLExtension'
import RecentAssetExtension from './RecentAssetExtension'
import {
  SHORT_URL_OFFSET,
  SHORT_URL_RIGHT_INDEX,
  SHORT_URL_POSTFIX
} from './utils'
import ChartPage from '../Chart'
import { getIdFromSEOLink } from '../../utils/url'
import CtaJoinPopup from '../../components/CtaJoinPopup/CtaJoinPopup'
import PageLoader from '../../components/Loader/PageLoader'
import { getFullUrl } from '../../components/Share/utils'
import { parseUrlV2 } from '../../ducks/Studio/url/parse'
import { getChartWidgetsFromTemplate } from '../../ducks/Studio/Template/utils'
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
  const shortUrlHashState = useState()
  const prevFullUrlRef = useRef()

  useEffect(() => {
    let isRacing = false
    const { pathname, search } = location

    const templateId = getIdFromSEOLink(pathname)

    if (Number.isFinite(templateId)) {
      return getTemplate(templateId)
        .then(template => {
          if (isRacing) return

          setParsedUrl({
            settings: template.project,
            widgets: getChartWidgetsFromTemplate(template)
          })
        })
        .catch(console.error)
    }

    if (!pathname.endsWith(SHORT_URL_POSTFIX)) {
      return setParsedUrl(parseUrlV2(search))
    }

    const setShortUrlHash = shortUrlHashState[1]
    const shortUrlHash = pathname.slice(SHORT_URL_OFFSET, SHORT_URL_RIGHT_INDEX)

    getFullUrl(shortUrlHash)
      .then(fullUrl => {
        if (isRacing) return

        prevFullUrlRef.current = fullUrl
        setShortUrlHash(shortUrlHash)
        setParsedUrl(parseUrlV2(fullUrl))
      })
      .catch(console.error)

    return () => (isRacing = true)
  }, [])

  if (!parsedUrl) return <PageLoader />

  return (
    <ChartPage
      parsedUrl={parsedUrl}
      Extensions={Extensions}
      shortUrlHashState={shortUrlHashState}
      prevFullUrlRef={prevFullUrlRef}
    />
  )
}
