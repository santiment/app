import React from 'react'
import {
  extractEventsFromData,
  isBottom,
  getMerged,
  CURSOR_DAYS_COUNT,
  makeFeedVariables
} from '../utils'
import debounce from 'lodash.debounce'
import FeedList from './FeedList'
import { addDays } from '../../../../utils/dates'
import { START_DATE } from '../GeneralFeed'

class FeedListLoading extends React.Component {
  state = {
    startCommon: START_DATE,
    startActivities: START_DATE
  }

  eventsUpdater = (prev, next) => {
    const { fetchMoreResult } = next
    if (!fetchMoreResult) return prev

    const data = extractEventsFromData(fetchMoreResult)

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

    return {
      activities: {
        activity: [...data],
        cursor: fetchMoreResult.activities.cursor,
        __typename: 'SignalHistoricalActivityPaginated'
      }
    }
  }

  onLoadMore = (isEnd, fetchMore, updater, after) => {
    if (isEnd) {
      return null
    }

    const variables = makeFeedVariables(after)

    return fetchMore({
      variables: variables,
      updateQuery: updater
    })
  }

  MAX_COUNTS = 10

  loadPart = (start, updateStateDate, isEnd, fetchMore, updater) => {
    let newFrom = null
    let counter = 0
    do {
      newFrom = addDays(start, CURSOR_DAYS_COUNT)
      updateStateDate(newFrom)
      counter++
    } while (
      this.onLoadMore(isEnd, fetchMore, updater, newFrom) === null &&
      counter < this.MAX_COUNTS
    )
  }

  handleScroll = debounce(event => {
    const wrappedElement = document.getElementById('root')
    const { isLoading } = this.props
    if (isBottom(wrappedElement) && !isLoading) {
      const { fetchMoreCommon, fetchMoreActivities } = this.props
      const {
        isEndCommon,
        isEndActivities,
        startCommon,
        startActivities
      } = this.state

      this.loadPart(
        startCommon,
        input => {
          this.setState({
            ...this.state,
            startCommon: input
          })
        },
        isEndCommon,
        fetchMoreCommon,
        this.eventsUpdater
      )

      this.loadPart(
        startActivities,
        input => {
          this.setState({
            ...this.state,
            startActivities: input
          })
        },
        isEndActivities,
        fetchMoreActivities,
        this.activitiesUpdater
      )
    }
  }, 100)

  componentDidMount () {
    window.addEventListener('scroll', this.handleScroll, true)
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.handleScroll)
  }

  render () {
    const { events, activities, isLoading } = this.props
    const merged = getMerged(events, activities)

    return <FeedList events={merged} isLoading={isLoading} />
  }
}

export default FeedListLoading
