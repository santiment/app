import React from 'react'
import {
  extractEventsFromData,
  isBottom,
  getMerged,
  CURSOR_DAYS_COUNT,
  makeFeedVariables,
  INFINITY_COUNT_LIMIT,
  CURSOR_TYPES
} from '../utils'
import debounce from 'lodash.debounce'
import FeedList from './FeedList'
import { addDays } from '../../../../utils/dates'
import { START_DATE } from '../GeneralFeed'

class FeedListLoading extends React.Component {
  state = {
    isEndCommon: false,
    isEndActivities: false,
    start: START_DATE
  }

  eventsUpdater = (prev, next) => {
    const { fetchMoreResult } = next
    if (!fetchMoreResult) return prev

    const data = extractEventsFromData(fetchMoreResult)
    if (data.length === 0) {
      console.log('is end 1')
      this.setState({
        ...this.state,
        isEndCommon: true
      })
    }

    return {
      timelineEvents: [
        {
          events: [...data],
          cursor: fetchMoreResult.timelineEvents[0].cursor,
          __typename: 'TimelineEventsPaginated'
        }
      ]
    }
  }

  activitiesUpdater = (prev, next) => {
    const { fetchMoreResult } = next
    if (!fetchMoreResult) return prev

    const data = fetchMoreResult.activities.activity

    if (data.length === 0) {
      console.log('is end 2')
      this.setState({
        ...this.state,
        isEndActivities: true
      })
    }

    return {
      activities: {
        activity: [...data],
        cursor: fetchMoreResult.activities.cursor,
        __typename: 'SignalHistoricalActivityPaginated'
      }
    }
  }

  onLoadMore = (isEnd, fetchMore, updater, after) => {
    console.log('onLoadMore')
    if (isEnd) {
      console.log('isend')
      return null
    }

    const variables = makeFeedVariables(after)
    console.log('fetchMore', variables)

    return fetchMore({
      variables: variables,
      updateQuery: updater
    })
  }

  setStart = date => {
    this.setState({
      ...this.state,
      start: date
    })
  }

  handleScroll = event => {
    const wrappedElement = document.getElementById('root')
    if (isBottom(wrappedElement)) {
      const { fetchMoreCommon, fetchMoreActivities } = this.props
      const { isEndCommon, isEndActivities, start } = this.state

      console.log('handleScroll')
      const newFrom = addDays(start, CURSOR_DAYS_COUNT)
      this.onLoadMore(isEndCommon, fetchMoreCommon, this.eventsUpdater, newFrom)
      this.onLoadMore(
        isEndActivities,
        fetchMoreActivities,
        this.activitiesUpdater,
        newFrom
      )
      this.setStart(newFrom)
    }
  }

  componentDidMount () {
    console.log('componentDidMount')
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
