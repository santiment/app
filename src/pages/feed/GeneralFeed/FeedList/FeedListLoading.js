import React from 'react'
import { extractEventsFromData, isBottom, makeFeedVariables } from '../utils'
import debounce from 'lodash.debounce'
import FeedList from './FeedList'
import isEqual from 'lodash.isequal'

class FeedListLoading extends React.Component {
  state = {
    isEndCommon: false,
    events: this.props.events,
    sortType: this.props.sortType
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

  onLoadMore = (fetchMore, updater) => {
    const { events } = this.state

    if (!events.length) {
      return null
    }

    const { sortType } = this.props

    const variables = makeFeedVariables({
      date: events[events.length - 1].insertedAt,
      orderBy: sortType
    })

    return fetchMore({
      variables: variables,
      updateQuery: updater
    })
  }

  loadPart = (isEnd, fetchMore, updater) => {
    if (isEnd) {
      return
    }

    this.onLoadMore(fetchMore, updater)
  }

  handleScroll = debounce(event => {
    const wrappedElement = document.getElementById('root')
    const { isLoading } = this.props
    if (!isLoading && isBottom(wrappedElement) && !this.unmounted) {
      const { fetchMoreCommon } = this.props
      const { isEndCommon } = this.state

      this.loadPart(isEndCommon, fetchMoreCommon, this.eventsUpdater)
    }
  })

  componentDidMount () {
    window.addEventListener('scroll', this.handleScroll, true)
  }

  componentWillUnmount () {
    this.unmounted = true
    window.removeEventListener('scroll', this.handleScroll)
  }

  componentWillReceiveProps (nextProps) {
    const { events: propEvents, sortType: propsSortType } = nextProps
    const { events: currentEvents, sortType: stateSortType } = this.state

    const isNewSortType = !isEqual(propsSortType, stateSortType)
    if (isNewSortType) {
      this.setState({
        ...this.state,
        events: [],
        sortType: propsSortType,
        isEndCommon: false,
        isNewSortType
      })
      return
    }

    if (propEvents.length > 0) {
      const [event] = propEvents
      if (!currentEvents.find(({ id }) => id === event.id)) {
        const newEvents = this.state.events
        newEvents.push(...propEvents)
        this.setState({
          ...this.state,
          events: newEvents,
          isNewSortType
        })
      }
    } else if (propEvents.length === 0) {
      this.setState({
        ...this.state,
        isEndCommon: true,
        isNewSortType
      })
    }
  }

  render () {
    const { isLoading } = this.props
    const { events, isNewSortType } = this.state
    const filtered = events.filter(
      ({ post, payload, trigger }) => post || (trigger && payload)
    )
    return (
      <FeedList
        events={filtered}
        isLoading={isLoading}
        isNewSortType={isNewSortType}
      />
    )
  }
}

export default FeedListLoading
