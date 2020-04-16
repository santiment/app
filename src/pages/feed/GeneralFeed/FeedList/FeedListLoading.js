import React from 'react'
import { extractEventsFromData, isBottom, makeFeedVariables } from '../utils'
import debounce from 'lodash.debounce'
import FeedList from './FeedList'
import isEqual from 'lodash.isequal'

const filterPulseInsights = (events) =>{
  return events.filter(({post}) => post && post.isPulse);
}

class FeedListLoading extends React.Component {
  state = {
    isEndCommon: false,
    events: this.props.events,
    sortType: this.props.sortType,
    filters: this.props.filters
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

    const { sortType, filters, isPulse } = this.props

    const variables = makeFeedVariables({
      date: events[events.length - 1].insertedAt,
      orderBy: sortType.type,
      filterBy: filters,
      isPulse
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
    const {
      events: propEvents,
      sortType: propsSortType,
      filters: propFilters,
      isPulse
    } = nextProps
    const {
      events: currentEvents,
      sortType: stateSortType,
      filters: stateFilters
    } = this.state

    const isNewEventsList =
      !isEqual(propsSortType, stateSortType) ||
      !isEqual(propFilters, stateFilters) ||
      this.props.isPulse !== isPulse

    if (isNewEventsList) {
      this.setState({
        ...this.state,
        events: [],
        sortType: propsSortType,
        filters: propFilters,
        isEndCommon: false,
        isNewEventsList
      })
      return
    }

    const filtered = this.getFilteredEvents({
      events: propEvents,
      isPulse: isPulse
    });

    if (filtered.length > 0) {
      const [event] = propEvents
      if (!currentEvents.find(({ id }) => id === event.id)) {
        const newEvents = this.state.events
        newEvents.push(...propEvents)
        this.setState({
          ...this.state,
          events: newEvents,
          isNewEventsList
        })
      }
    } else {
      this.setState({
        ...this.state,
        isEndCommon: true,
        isNewEventsList
      })
    }
  }

  getFilteredEvents({events, isPulse}) {
    return isPulse ? filterPulseInsights(events) : events.filter(
      ({ post, payload, trigger }) => post || (trigger && payload)
    )
  }

  render () {
    const { isLoading, showProfileExplanation, isPulse } = this.props
    const { isNewEventsList, events } = this.state
    const filtered = this.getFilteredEvents({isPulse, events})

    return (
      <FeedList
        events={filtered}
        isLoading={isLoading}
        isNewEventsList={isNewEventsList}
        showProfileExplanation={showProfileExplanation}
      />
    )
  }
}

export default FeedListLoading
