import React, { useState, useEffect, useRef } from 'react'
import Studio from '../Chart'
import URLExtension from './URLExtension'
import RecentAssetExtension from './RecentAssetExtension'
import { getIdFromSEOLink } from '../../utils/url'
import CtaJoinPopup from '../../components/CtaJoinPopup/CtaJoinPopup'
import PageLoader from '../../components/Loader/PageLoader'
import { getTemplate } from '../../ducks/Studio/Template/gql/hooks'
import { parseTemplate } from './parse/template'
import { parseUrl } from './parse'

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
  const { pathname, search } = location

  useEffect(
    () => {
      const templateId = getIdFromSEOLink(pathname)

      if (Number.isFinite(templateId)) {
        getTemplate(templateId)
          .then(template => {
            setParsedUrl({
              settings: template.project,
              widgets: parseTemplate(template)
            })
          })
          .catch(console.error)
        return
      }

      setParsedUrl(parseUrl(search)) // TODO: Delete after enabling short urls [@vanguard | Mar  3, 2021]
    },
    [pathname]
  )

  if (!parsedUrl) return <PageLoader />

  return (
    <Studio
      parsedUrl={parsedUrl}
      Extensions={Extensions}
      shortUrlHashState={shortUrlHashState}
      prevFullUrlRef={prevFullUrlRef}
    />
  )
}
