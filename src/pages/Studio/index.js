import React, { useState, useEffect, useRef } from 'react'
import URLExtension from './URLExtension'
import RecentAssetExtension from './RecentAssetExtension'
import ChartPage from '../Chart'
import { getIdFromSEOLink } from '../../utils/url'
import CtaJoinPopup from '../../components/CtaJoinPopup/CtaJoinPopup'
import PageLoader from '../../components/Loader/PageLoader'
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
    const { pathname, search } = location
    const templateId = getIdFromSEOLink(pathname)

    if (Number.isFinite(templateId)) {
      return getTemplate(templateId)
        .then(template => {
          setParsedUrl({
            settings: template.project,
            widgets: getChartWidgetsFromTemplate(template)
          })
        })
        .catch(console.error)
    }

    setParsedUrl(parseUrlV2(search)) // TODO: Delete after enabling short urls [@vanguard | Mar  3, 2021]
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
