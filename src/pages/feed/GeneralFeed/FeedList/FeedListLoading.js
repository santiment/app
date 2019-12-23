import React from 'react'
import {
  extractEventsFromData,
  isBottom,
  makeVariables,
  MAX_LIMIT,
  getMerged
} from '../utils'
import FeedList from './FeedList'

class FeedListLoading extends React.Component {
  state = {
    isEndCommon: false,
    isEndActivities: false
  }

  eventsUpdater = (prev, next) => {
    const { fetchMoreResult } = next
    if (!fetchMoreResult) return prev

    const loadedEvents = extractEventsFromData(fetchMoreResult)

    if (loadedEvents.length < MAX_LIMIT) {
      this.setState({
        ...this.state,
        isEndCommon: true
      })
    }

    const prevData = prev.timelineEvents[0]
    const newEvents = [...prevData.events, ...loadedEvents]

    return {
      timelineEvents: [
        {
          events: newEvents,
          cursor: fetchMoreResult.timelineEvents[0].cursor,
          __typename: 'TimelineEventsPaginated'
        }
      ]
    }
  }

  activitiesUpdater = (prev, next) => {
    const { fetchMoreResult } = next
    if (!fetchMoreResult) return prev

    const loadedEvents = fetchMoreResult.activities.activity

    if (loadedEvents.length < MAX_LIMIT) {
      this.setState({
        ...this.state,
        isEndActivities: true
      })
    }

    const prevData = prev.activities.activity
    const newData = [...prevData, ...loadedEvents]

    return {
      activities: {
        activity: newData,
        cursor: fetchMoreResult.activities.cursor,
        __typename: 'SignalHistoricalActivityPaginated'
      }
    }
  }

  onLoadMore = (isEnd, fetchMore, list, updater) => {
    if (isEnd) {
      return null
    }

    const lastItem = list[list.length - 1]
    const variables = makeVariables(lastItem.insertedAt || lastItem.triggeredAt)

    return fetchMore({
      variables: variables,
      updateQuery: updater
    })
  }

  handleScroll = event => {
    const wrappedElement = document.getElementById('root')
    if (isBottom(wrappedElement)) {
      const {
        events,
        activities,
        fetchMoreCommon,
        fetchMoreActivities
      } = this.props
      const { isEndCommon, isEndActivities } = this.state

      this.onLoadMore(isEndCommon, fetchMoreCommon, events, this.eventsUpdater)
      this.onLoadMore(
        isEndActivities,
        fetchMoreActivities,
        activities,
        this.activitiesUpdater
      )
    }
  }

  componentDidMount () {
    window.addEventListener('scroll', this.handleScroll, true)
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.handleScroll)
  }

  render () {
    const { events, activities } = this.props
    const merged = getMerged(events, activities)

    return <FeedList events={merged} />
  }
}

export default FeedListLoading
