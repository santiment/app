import { useMemo } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { TIMELINE_EVENTS_QUERY } from '../../../queries/FeedGQL'
import { makeFeedVariables } from '../../../pages/feed/GeneralFeed/utils'

export const useTimelineEvents = ({ to = 'utc_now', type, author }) => {
  const variables = makeFeedVariables({
    date: to,
    filterBy: {
      type,
      author
    }
  })

  const { data, loading, error } = useQuery(TIMELINE_EVENTS_QUERY, {
    variables: variables,
    fetchPolicy: 'network-only'
  })

  return useMemo(
    () => {
      return {
        data: data ? data.timelineEvents[0] : undefined,
        loading,
        error
      }
    },
    [data, loading, error]
  )
}
