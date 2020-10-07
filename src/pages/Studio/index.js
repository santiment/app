import React, { useMemo } from 'react'
import ChartPage from '../Chart'
import { parseUrlV2 } from '../../ducks/Studio/url/parse'
import CtaJoinPopup from '../../components/CtaJoinPopup/CtaJoinPopup'
import URLExtension from './URLExtension'

const Extensions = props => (
  <>
    <URLExtension {...props} />
    <CtaJoinPopup />
  </>
)

export default ({ history }) => {
  const parsedUrl = useMemo(() => parseUrlV2(window.location.search), [])

  return (
    <ChartPage
      parsedUrl={parsedUrl}
      extensions={<Extensions history={history} />}
    />
  )
}
