import React from 'react'
import { compose } from 'recompose'
import { graphql } from 'react-apollo'
import { FEED_QUERY } from '../../../queries/FeedGQL'
import HelpTooltip from '../../../components/WatchlistOverview/WatchlistAnomalies/HelpTooltip'
import PageLoader from '../../../components/Loader/PageLoader'
import SignalCard from '../../../components/SignalCard/SignalCard'
import styles from './GeneralFeed.module.scss'
import WatchlistCard from '../../../components/Watchlists/WatchlistCard'
import { getSharedWatchlistLink } from '../../../components/Watchlists/FeaturedWatchlist'

const GeneralFeed = ({ loading, events }) => {
  console.log(events)
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

      <div className={styles.scrollable}>
        {events.map(
          ({ eventType, trigger, post, userList: watchlist }, index) => {
            const key = eventType + '_' + index
            if (trigger) {
              return (
                <SignalCard
                  key={key}
                  deleteEnabled={false}
                  isUserTheAuthor={false}
                  id={trigger.id}
                  goToSignalSettings={() => {
                    // goToSignalSettings(id)
                  }}
                  className={styles.card}
                  signal={trigger}
                />
              )
            }

            if (watchlist) {
              const { name, ...rest } = watchlist
              return (
                <WatchlistCard
                  key={key}
                  name={name}
                  to={getSharedWatchlistLink(watchlist)}
                  {...rest}
                />
              )
            }

            return null
          }
        )}
      </div>
    </div>
  )
}

const enhance = compose(
  graphql(FEED_QUERY, {
    options: props => ({
      variables: {
        after: '2019-03-27T15:43:07.109578Z',
        before: '2019-03-27T15:43:07.051777Z'
      }
    }),
    props: ({ data: { loading, error, timelineEvents } }) => ({
      loading,
      error,
      events:
        timelineEvents && timelineEvents[0] ? timelineEvents[0].events : []
    })
  })
)

export default enhance(GeneralFeed)
