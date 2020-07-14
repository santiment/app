import React from 'react'
import Loadable from 'react-loadable'
import { connect } from 'react-redux'
import IndexTab from '../../Marketing/IndexTabs/IndexTab'
import PageLoader from '../../../components/Loader/PageLoader'
import { RecommendedSignals } from '../../SonarFeed/SonarFeedRecommendations'
import { checkIsLoggedIn } from '../../UserSelectors'
import styles from './FeedAlerts.module.scss'

const LoadableAlertsList = Loadable({
  loader: () => import('../../SonarFeed/SignalsList'),
  loading: () => <PageLoader />
})

const FeedAlerts = ({ isLoggedIn }) => {
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
            content: (
              <LoadableAlertsList showRecommendations={!isLoggedIn} showNew />
            )
          }
        ]}
      />
    </div>
  )
}

const mapStateToProps = state => ({
  isLoggedIn: checkIsLoggedIn(state)
})

export default connect(mapStateToProps)(FeedAlerts)
