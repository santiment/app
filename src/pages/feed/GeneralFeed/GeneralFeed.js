import React, { useEffect } from 'react'
import { Query } from 'react-apollo'
import { FEED_QUERY } from '../../../queries/FeedGQL'
import HelpTooltip from '../../../components/WatchlistOverview/WatchlistAnomalies/HelpTooltip'
import PageLoader from '../../../components/Loader/PageLoader'
import FeedItemRenderer from './FeedItemRenderer/FeedItemRenderer'
import SonarFeedActivityPage from '../../SonarFeed/SonarFeedActivityPage'
import styles from './GeneralFeed.module.scss'

const MAX_LIMIT = 6

const isBottom = el => {
  return el.getBoundingClientRect().bottom <= window.innerHeight
}

const FeedList = ({ events, onLoadMore }) => {
  const handleScroll = ({ currentTarget }) => {
    if (events.length) {
      const wrappedElement = document.getElementById('root')
      if (isBottom(wrappedElement)) {
        onLoadMore()
      }
    }
  }

  useEffect(() => {
    if (events.length) {
      window.addEventListener('scroll', handleScroll, true)
    }
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, onLoadMore)

  return (
    <div
      className={styles.scrollable}
      onScroll={e => handleScroll(e, onLoadMore)}
    >
      {!events || !events.length ? (
        <SonarFeedActivityPage />
      ) : (
        events.map((item, index) => {
          return <FeedItemRenderer item={item} key={index} />
        })
      )}
    </div>
  )
}

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
        variables={{
          limit: MAX_LIMIT,
          cursor: {
            type: 'BEFORE',
            datetime: new Date().toISOString()
          }
        }}
      >
        {props => {
          const { data, fetchMore } = props

          if (!data) {
            return null
          }

          const { timelineEvents } = data
          const [first] = timelineEvents
          const { events } = first

          return (
            <FeedList
              events={events}
              onLoadMore={() =>
                fetchMore({
                  variables: {
                    limit: MAX_LIMIT,
                    cursor: {
                      type: 'BEFORE',
                      datetime: events[events.length - 1].insertedAt
                    }
                  },
                  updateQuery: (prev, { loading, fetchMoreResult }) => {
                    if (!fetchMoreResult) return prev

                    const prevData = prev.timelineEvents[0]
                    const newEvents = [
                      ...prevData.events,
                      ...fetchMoreResult.timelineEvents[0].events
                    ]

                    const mergeResult = {
                      timelineEvents: [
                        {
                          events: newEvents,
                          cursor: prev.timelineEvents[0].cursor,
                          __typename: 'TimelineEventsPaginated'
                        }
                      ]
                    }

                    return mergeResult
                  }
                })
              }
            />
          )
        }}
      </Query>
    </div>
  )
}

export default GeneralFeed
