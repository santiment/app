import React from 'react'
import { extractEventsFromData, isBottom, makeFeedVariables } from '../utils'
import debounce from 'lodash.debounce'
import FeedList from './FeedList'
import isEqual from 'lodash.isequal'

class FeedListLoading extends React.Component {
  state = {
    isEndCommon: false,
    events: this.props.events
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

    const variables = makeFeedVariables(events[events.length - 1].insertedAt)

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
    const { events: propEvents } = nextProps
    const { events: currentEvents } = this.state
    if (propEvents.length > 0) {
      const [event] = propEvents
      if (!currentEvents.find(item => isEqual(item, event))) {
        const newEvents = this.state.events
        newEvents.push(...propEvents)
        this.setState({
          ...this.state,
          events: newEvents
        })
      }
    } else if (propEvents.length === 0) {
      this.setState({
        ...this.state,
        isEndCommon: true
      })
    }
  }

  render () {
    const { isLoading } = this.props
    const { events } = this.state
    const filtered = events.filter(
      ({ post, payload, trigger }) => post || (trigger && payload)
    )
    return <FeedList events={filtered} isLoading={isLoading} />
  }
}

export default FeedListLoading
