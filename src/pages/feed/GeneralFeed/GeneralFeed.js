import React, { useEffect, useState } from 'react'
import { Query } from 'react-apollo'
import { FEED_QUERY } from '../../../queries/FeedGQL'
import HelpTooltip from '../../../components/WatchlistOverview/WatchlistAnomalies/HelpTooltip'
import PageLoader from '../../../components/Loader/PageLoader'
import FeedItemRenderer from './FeedItemRenderer/FeedItemRenderer'
import SonarFeedActivityPage from '../../SonarFeed/SonarFeedActivityPage'
import styles from './GeneralFeed.module.scss'

const MAX_LIMIT = 8

const isBottom = el => {
  return el.getBoundingClientRect().bottom <= window.innerHeight
}

const FeedList = ({ events, onLoadMore }) => {
  const handleScroll = () => {
    const wrappedElement = document.getElementById('root')
    if (isBottom(wrappedElement)) {
      onLoadMore()
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, true)
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

  const [isEnd, setEnd] = useState(false)

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
              isEnd={isEnd}
              onLoadMore={() => {
                console.log(
                  'load before ',
                  events[events.length - 1].insertedAt
                )
                return (
                  !isEnd &&
                  fetchMore({
                    variables: {
                      limit: MAX_LIMIT,
                      cursor: {
                        type: 'BEFORE',
                        datetime: events[events.length - 1].insertedAt
                      }
                    },
                    updateQuery: (prev, { fetchMoreResult }) => {
                      if (!fetchMoreResult) return prev

                      const prevData = prev.timelineEvents[0]

                      const loadedEvents =
                        fetchMoreResult.timelineEvents[0].events

                      if (loadedEvents.length === 0) {
                        setEnd(true)
                      }

                      const newEvents = [...prevData.events, ...loadedEvents]

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
                )
              }}
            />
          )
        }}
      </Query>
    </div>
  )
}

export default GeneralFeed
