import { useMemo } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

const CONVERSATIONS_QUERY = gql`
  query commentsFeed($to: DateTime!) {
    commentsFeed(
      limit: 15
      cursor: { type: BEFORE, datetime: $to, order: DESC }
    ) {
      id
      content
      insertedAt
      insight {
        id
        title
      }
      timelineEvent {
        id
      }
      shortUrl {
        shortUrl
      }
      blockchainAddress {
        id
        address
        labels {
          metadata
          name
          origin
        }
      }
      chartConfiguration {
        id
        title
      }
      user {
        id
        username
        avatarUrl
        email
      }
    }
  }
`

export const useConversations = ({ to = 'utc_now' }) => {
  const { data, loading, error } = useQuery(CONVERSATIONS_QUERY, {
    variables: {
      to
    }
  })

  return useMemo(() => {
    return {
      data: data ? data.commentsFeed : [],
      loading,
      error
    }
  }, [data, loading, error])
}
