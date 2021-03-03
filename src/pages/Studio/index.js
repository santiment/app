import React, { useState, useEffect, useRef } from 'react'
import URLExtension from './URLExtension'
import RecentAssetExtension from './RecentAssetExtension'
import {
  SHORTHAND_OFFSET,
  SHORTHAND_RIGHT_INDEX,
  SHORTHAND_POSTFIX
} from './utils'
import ChartPage from '../Chart'
import CtaJoinPopup from '../../components/CtaJoinPopup/CtaJoinPopup'
import PageLoader from '../../components/Loader/PageLoader'
import { getFullUrl } from '../../components/Share/utils'
import { parseUrlV2 } from '../../ducks/Studio/url/parse'

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

    if (!pathname.endsWith(SHORTHAND_POSTFIX)) {
      return setParsedUrl(parseUrlV2(search))
    }

    const setShortUrlHash = shortUrlHashState[1]
    const shortUrlHash = pathname.slice(SHORTHAND_OFFSET, SHORTHAND_RIGHT_INDEX)

    getFullUrl(shortUrlHash)
      .then(fullUrl => {
        if (isRacing) return

        prevFullUrlRef.current = fullUrl
        setShortUrlHash(shortUrlHash)
        setParsedUrl(parseUrlV2(fullUrl))
      })
      .catch(e => console.error(e))

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
