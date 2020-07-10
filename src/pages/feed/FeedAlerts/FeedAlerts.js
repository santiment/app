import React from 'react'
import Loadable from 'react-loadable'
import { connect } from 'react-redux'
import IndexTab from '../../Marketing/IndexTabs/IndexTab'
import PageLoader from '../../../components/Loader/PageLoader'
import { checkIsLoggedIn } from '../../UserSelectors'
import { RecommendedSignals } from '../../SonarFeed/SonarFeedRecommendations'
import styles from './FeedAlerts.module.scss'

const LoadableMyAlertsPage = Loadable({
  loader: () => import('../../SonarFeed/SonarFeedMySignalsPage'),
  loading: () => <PageLoader />
})

const FeedAlerts = ({ isLoggedIn }) => {
  return (
    <div className={styles.container}>
      <IndexTab
        tabs={[
          {
            title: 'Explore Alerts',
            content: <RecommendedSignals showTitle={false} />
          },
          {
            title: 'My Alerts',
            content: <LoadableMyAlertsPage isLoggedIn={isLoggedIn} />
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
