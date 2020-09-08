import React from 'react'
import Loadable from 'react-loadable'
import IndexTab from '../../Marketing/IndexTabs/IndexTab'
import PageLoader from '../../../components/Loader/PageLoader'
import { RecommendedSignals } from '../../SonarFeed/SonarFeedRecommendations'
import styles from './FeedAlerts.module.scss'

const LoadableAlertsList = Loadable({
  loader: () => import('../../SonarFeed/SignalsList'),
  loading: () => <PageLoader />
})

const FeedAlerts = () => {
  return (
    <div className={styles.container}>
      <IndexTab
        tabs={[
          {
            title: 'Explore Alerts',
            content: <RecommendedSignals showTitle={false} showNew />
          },
          {
            title: 'My Alerts',
            content: <LoadableAlertsList showNew />
          }
        ]}
      />
    </div>
  )
}

export default FeedAlerts
