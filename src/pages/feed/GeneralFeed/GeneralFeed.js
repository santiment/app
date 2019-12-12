import React, { useEffect } from 'react'
import { Query } from 'react-apollo'
import { FEED_QUERY } from '../../../queries/FeedGQL'
import HelpTooltip from '../../../components/WatchlistOverview/WatchlistAnomalies/HelpTooltip'
import PageLoader from '../../../components/Loader/PageLoader'
import FeedItemRenderer from './FeedItemRenderer/FeedItemRenderer'
import SonarFeedRecommendations from '../../SonarFeed/SonarFeedRecommendations'
import styles from './GeneralFeed.module.scss'

const MAX_LIMIT = 6

const FeedList = ({ events, onLoadMore }) => {
  const isBottom = el => {
    return el.getBoundingClientRect().bottom <= window.innerHeight
  }
  const handleScroll = ({ currentTarget }) => {
    console.log('handleScroll')
    if (events.length) {
      const wrappedElement = document.getElementById('root')
      if (isBottom(wrappedElement)) {
        onLoadMore()
      }
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
        <SonarFeedRecommendations description='There are not any activities yet' />
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
                  updateQuery: (prev, { fetchMoreResult }) => {
                    console.log('updateQuery')
                    if (!fetchMoreResult) return prev

                    debugger
                    const newEvents = [
                      ...prev.timelineEvents[0].events,
                      ...fetchMoreResult.timelineEvents[0].events
                    ]

                    const mergeResult = Object.assign({}, prev, {
                      timelineEvents: {
                        events: newEvents
                      }
                    })
                    console.log(mergeResult)

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
