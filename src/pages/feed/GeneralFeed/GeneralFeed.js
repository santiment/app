import React from 'react'
import { connect } from 'react-redux'
import { Query } from 'react-apollo'
import { FEED_QUERY } from '../../../queries/FeedGQL'
import HelpTooltip from '../../../components/WatchlistOverview/WatchlistAnomalies/HelpTooltip'
import PageLoader from '../../../components/Loader/PageLoader'
import FeedListLoading from './FeedList/FeedListLoading'
import { TRIGGER_ACTIVITIES_QUERY } from '../../SonarFeed/SonarFeedActivityPage'
import InsightUnAuthPage from '../../Insights/InsightUnAuthPage'
import { checkIsLoggedIn, checkIsLoggedInPending } from '../../UserSelectors'
import { addDays } from '../../../utils/dates'
import {
  CURSOR_DAYS_COUNT,
  extractEventsFromData,
  makeFeedVariables
} from './utils'
import styles from './GeneralFeed.module.scss'

export const START_DATE = addDays(new Date(), CURSOR_DAYS_COUNT)

const Header = () => (
  <div className={styles.title}>
    <div>General feed</div>
    <HelpTooltip
      position='bottom'
      align='start'
      classes={styles}
      withDesc={false}
    >
      This is a continuous stream of updates on cryptocurrency assets, your
      personal watchlists and general market conditions, using various Santiment
      metrics and tools
    </HelpTooltip>
  </div>
)

const GeneralFeed = ({ isLoggedIn, isUserLoading }) => {
  if (isUserLoading) {
    return (
      <>
        <Header />
        <div className={styles.scrollable}>
          <PageLoader />
        </div>
      </>
    )
  }

  return (
    <div className={styles.container}>
      <Header />

      {!isLoggedIn ? (
        <div className={styles.scrollable}>
          <InsightUnAuthPage />
        </div>
      ) : (
        <Query
          query={FEED_QUERY}
          variables={makeFeedVariables(START_DATE)}
          notifyOnNetworkStatusChange={true}
        >
          {({ data, fetchMore: fetchMoreCommon, loading: loadingEvents }) => {
            if (!data) {
              return (
                <div className={styles.scrollable}>
                  <PageLoader />
                </div>
              )
            }

            const events = extractEventsFromData(data)

            return (
              <Query
                query={TRIGGER_ACTIVITIES_QUERY}
                variables={makeFeedVariables(START_DATE)}
                notifyOnNetworkStatusChange={true}
              >
                {({
                  data,
                  fetchMore: fetchMoreActivities,
                  loading: loadingActivities
                }) => {
                  if (!data) {
                    return null
                  }

                  const { activity: activities } = data.activities

                  return (
                    <FeedListLoading
                      events={events}
                      activities={activities}
                      fetchMoreCommon={fetchMoreCommon}
                      fetchMoreActivities={fetchMoreActivities}
                      start={START_DATE}
                      isLoading={loadingActivities || loadingEvents}
                    />
                  )
                }}
              </Query>
            )
          }}
        </Query>
      )}
    </div>
  )
}

const mapStateToProps = state => ({
  isLoggedIn: checkIsLoggedIn(state),
  isUserLoading: checkIsLoggedInPending(state)
})

export default connect(mapStateToProps)(GeneralFeed)
