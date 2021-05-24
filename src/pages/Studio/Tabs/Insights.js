import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import Loadable from 'react-loadable'
import PageLoader from '../../../components/Loader/PageLoader'

const LoadableRelatedInsights = Loadable({
  loader: () => import('../../../ducks/Studio/RelatedInsights/RelatedInsights'),
  loading: () => <PageLoader />
})

const InsightsTab = ({ settings }) => {
  const [target, setTarget] = useState()

  useEffect(() => {
    setTarget(document.querySelector('.studio-screen'))
  }, [])

  return target
    ? ReactDOM.createPortal(
      <LoadableRelatedInsights settings={settings} />,
      target
    )
    : null
}

export default InsightsTab
