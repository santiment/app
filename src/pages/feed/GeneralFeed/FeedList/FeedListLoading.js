import React from 'react'
import {
  extractEventsFromData,
  isBottom,
  makeVariables,
  MAX_LIMIT
} from '../utils'
import FeedList from './FeedList'

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

export default FeedListLoading
