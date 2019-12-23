import React from 'react'
import { Query } from 'react-apollo'
import { FEED_QUERY } from '../../../queries/FeedGQL'
import HelpTooltip from '../../../components/WatchlistOverview/WatchlistAnomalies/HelpTooltip'
import PageLoader from '../../../components/Loader/PageLoader'
import FeedListLoading from './FeedList/FeedListLoading'
import { extractEventsFromData, makeVariables } from './utils'
import { TRIGGER_ACTIVITIES_QUERY } from '../../SonarFeed/SonarFeedActivityPage'
import styles from './GeneralFeed.module.scss'

const START_DATE = new Date().toISOString()

const GeneralFeed = ({ loading }) => {
  if (loading) {
    return <PageLoader />
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div>General feed</div>
        <HelpTooltip
          position='bottom'
          align='start'
          classes={styles}
          withDesc={false}
        >
          This is a continuous stream of updates on cryptocurrency assets, your
          personal watchlists and general market conditions, using various
          Santiment metrics and tools
        </HelpTooltip>
      </div>

      <Query
        query={TRIGGER_ACTIVITIES_QUERY}
        variables={makeVariables(START_DATE)}
        fetchPolicy='cache-and-network'
      >
        {props => {
          const { data, fetchMore: fetchMoreActivities } = props

          if (!data) {
            return (
              <div className={styles.scrollable}>
                <PageLoader />
              </div>
            )
          }

          const { activity: activities } = data.activities

          console.log('activities', activities, data)

          return (
            <Query
              query={FEED_QUERY}
              variables={makeVariables(START_DATE)}
              fetchPolicy='cache-and-network'
            >
              {props => {
                const { data, fetchMore: fetchMoreCommon } = props

                if (!data) {
                  return null
                }

                const events = extractEventsFromData(data)
                console.log('events', events)

                return (
                  <FeedListLoading
                    events={events}
                    activities={activities}
                    fetchMoreCommon={fetchMoreCommon}
                    fetchMoreActivities={fetchMoreActivities}
                  />
                )
              }}
            </Query>
          )
        }}
      </Query>
    </div>
  )
}

export default GeneralFeed
