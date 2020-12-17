import React, { useMemo } from 'react'
import URLExtension from './URLExtension'
import RecentAssetExtension from './RecentAssetExtension'
import ChartPage from '../Chart'
import { parseUrlV2 } from '../../ducks/Studio/url/parse'
import CtaJoinPopup from '../../components/CtaJoinPopup/CtaJoinPopup'

const Extensions = props => (
  <>
    <URLExtension {...props} />
    <RecentAssetExtension settings={props.settings} />
    <CtaJoinPopup />
  </>
)

export default () => {
  const parsedUrl = useMemo(() => parseUrlV2(window.location.search), [])

  return <ChartPage parsedUrl={parsedUrl} Extensions={Extensions} />
}
