import React from 'react'
import { Query } from 'react-apollo'
import { FEED_QUERY } from '../../../queries/FeedGQL'
import HelpTooltip from '../../../components/WatchlistOverview/WatchlistAnomalies/HelpTooltip'
import PageLoader from '../../../components/Loader/PageLoader'
import FeedListLoading from './FeedList/FeedListLoading'
import {
  CURSOR_DAYS_COUNT,
  extractEventsFromData,
  makeFeedVariables
} from './utils'
import { TRIGGER_ACTIVITIES_QUERY } from '../../SonarFeed/SonarFeedActivityPage'
import { addDays } from '../../../utils/dates'
import styles from './GeneralFeed.module.scss'
import InsightUnAuthPage from '../../Insights/InsightUnAuthPage'
import { checkIsLoggedIn } from '../../UserSelectors'
import { compose } from 'recompose'
import { connect } from 'react-redux'

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

      {!isLoggedIn && (
        <div className={styles.scrollable}>
          <InsightUnAuthPage />
        </div>
      )}

      {isLoggedIn && (
        <Query
          query={FEED_QUERY}
          variables={makeFeedVariables(START_DATE)}
          notifyOnNetworkStatusChange={true}
        >
          {props => {
            const {
              data,
              fetchMore: fetchMoreCommon,
              loading: loadingEvents
            } = props

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
                {props => {
                  const {
                    data,
                    fetchMore: fetchMoreActivities,
                    loading: loadingActivities
                  } = props

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
  isUserLoading: state.user.isLoading
})

const enhance = compose(connect(mapStateToProps))
export default enhance(GeneralFeed)
