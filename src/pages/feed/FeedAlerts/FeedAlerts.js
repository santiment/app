import React, { useMemo } from 'react'
import Loadable from 'react-loadable'
import { connect } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { parse } from 'query-string'
import IndexTab from '../../../components/IndexTabs/IndexTab'
import PageLoader from '../../../components/Loader/PageLoader'
import { RecommendedSignals } from '../../SonarFeed/SonarFeedRecommendations'
import { useSignals } from '../../../ducks/Signals/common/getSignals'
import styles from './FeedAlerts.module.scss'

const LoadableAlertsList = Loadable({
  loader: () => import('../../SonarFeed/SignalsList'),
  loading: () => <PageLoader />
})

const FeedAlerts = ({ userId }) => {
  const { tab } = parse(useLocation().search, { parseNumbers: true })
  const { data: signals = [], loading } = useSignals({
    skip: !userId
  })
  const initialTab = useMemo(() => {
    if (tab) {
      return tab
    }

    return signals && signals.length > 0 ? 1 : 0
  }, [signals, tab])

  return loading || !userId ? (
    <PageLoader />
  ) : (
    <div className={styles.container}>
      <IndexTab
        key={tab}
        initialTab={initialTab}
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

const mapStateToProps = ({ user }) => ({
  userId: user && user.data ? user.data.id : undefined
})

export default connect(mapStateToProps)(FeedAlerts)
