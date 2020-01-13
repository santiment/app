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
    startActivities: START_DATE,
    isEndActivities: false,
    isEndCommon: false
  }

  unmounted = false

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

  onLoadMore = (fetchMore, updater, after) => {
    const variables = makeFeedVariables(after)

    return fetchMore({
      variables: variables,
      updateQuery: updater
    })
  }

  loadPart = (start, updateStateDate, isEnd, fetchMore, updater, markIsEnd) => {
    if (isEnd) {
      return
    }

    const newFrom = addDays(start, CURSOR_DAYS_COUNT)
    updateStateDate(newFrom)

    this.onLoadMore(fetchMore, updater, newFrom)
  }

  handleScroll = debounce(event => {
    const wrappedElement = document.getElementById('root')
    const { isLoading } = this.props
    if (!isLoading && isBottom(wrappedElement) && !this.unmounted) {
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
        this.eventsUpdater,
        () => {
          this.setState({
            ...this.state,
            isEndCommon: true
          })
        }
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
        this.activitiesUpdater,
        () => {
          this.setState({
            ...this.state,
            isEndActivities: true
          })
        }
      )
    }
  })

  componentDidMount () {
    window.addEventListener('scroll', this.handleScroll, true)
  }

  componentWillUnmount () {
    this.unmounted = true
    window.removeEventListener('scroll', this.handleScroll)
  }

  render () {
    const { events, activities, isLoading } = this.props
    const merged = getMerged(events, activities)

    return <FeedList events={merged} isLoading={isLoading} />
  }
}

export default FeedListLoading
