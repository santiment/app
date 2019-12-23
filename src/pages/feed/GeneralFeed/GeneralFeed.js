import React from 'react'
import { Query } from 'react-apollo'
import { FEED_QUERY } from '../../../queries/FeedGQL'
import HelpTooltip from '../../../components/WatchlistOverview/WatchlistAnomalies/HelpTooltip'
import PageLoader from '../../../components/Loader/PageLoader'
import FeedListLoading from './FeedList/FeedListLoading'
import { extractEventsFromData, makeVariables } from './utils'
import styles from './GeneralFeed.module.scss'

const GeneralFeed = ({ loading, events }) => {
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
        query={FEED_QUERY}
        variables={makeVariables(new Date().toISOString())}
      >
        {props => {
          const { data, fetchMore } = props

          if (!data) {
            return (
              <div className={styles.scrollable}>
                <PageLoader />
              </div>
            )
          }

          const events = extractEventsFromData(data)

          return <FeedListLoading events={events} fetchMore={fetchMore} />
        }}
      </Query>
    </div>
  )
}

export default GeneralFeed
