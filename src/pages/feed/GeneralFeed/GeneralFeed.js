import React, { useEffect, useState } from 'react'
import { Query } from 'react-apollo'
import { FEED_QUERY } from '../../../queries/FeedGQL'
import HelpTooltip from '../../../components/WatchlistOverview/WatchlistAnomalies/HelpTooltip'
import PageLoader from '../../../components/Loader/PageLoader'
import FeedItemRenderer from './FeedItemRenderer/FeedItemRenderer'
import SonarFeedActivityPage from '../../SonarFeed/SonarFeedActivityPage'
import styles from './GeneralFeed.module.scss'

const MAX_LIMIT = 8

const makeVariables = date => ({
  limit: MAX_LIMIT,
  cursor: {
    type: 'BEFORE',
    datetime: date
  }
})

const extractEventsFromData = data => {
  const { timelineEvents } = data
  const [first] = timelineEvents
  const { events } = first
  return events
}

const isBottom = el => {
  return el.getBoundingClientRect().bottom <= window.innerHeight
}

const FeedList = ({ events }) => {
  return (
    <div className={styles.scrollable}>
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

class FeedListLoading extends React.Component {
  state = {
    isEnd: false
  }

  onLoadMore = () => {
    const { events, fetchMore } = this.props
    const { isEnd } = this.state

    const variables = makeVariables(events[events.length - 1].insertedAt)

    if (isEnd) {
      return null
    }

    return fetchMore({
      variables: variables,
      updateQuery: (prev, next) => {
        const { fetchMoreResult } = next
        if (!fetchMoreResult) return prev

        const loadedEvents = extractEventsFromData(fetchMoreResult)

        if (loadedEvents.length < MAX_LIMIT) {
          this.setState({
            isEnd: true
          })
        }

        const prevData = prev.timelineEvents[0]
        const newEvents = [...prevData.events, ...loadedEvents]

        const mergeResult = Object.assign(
          {},
          {
            timelineEvents: [
              {
                events: newEvents,
                cursor: fetchMoreResult.timelineEvents[0].cursor,
                __typename: 'TimelineEventsPaginated'
              }
            ]
          }
        )

        return mergeResult
      }
    })
  }

  handleScroll = event => {
    const wrappedElement = document.getElementById('root')
    if (isBottom(wrappedElement)) {
      this.onLoadMore()
    }
  }

  componentDidMount () {
    window.addEventListener('scroll', this.handleScroll, true)
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.handleScroll)
  }

  render () {
    const { events } = this.props
    return <FeedList events={events} />
  }
}

export default GeneralFeed
