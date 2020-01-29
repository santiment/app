import gql from 'graphql-tag'

export const UNLIKE_INSIGHT_MUTATION = gql`
  mutation unvote($id: Int!) {
    unvote(postId: $id) {
      votedAt
    }
  }
`

export const LIKE_INSIGHT_MUTATION = gql`
  mutation vote($id: Int!) {
    vote(postId: $id) {
      votedAt
    }
  }
`

export const UNLIKE_FEED_EVENT_MUTATION = gql`
  mutation downvoteTimelineEvent($timelineEventId: Int) {
    downvoteTimelineEvent(timelineEventId: $timelineEventId) {
      id
      votes {
        userId
      }
    }
  }
`

export const LIKE_FEED_EVENT_MUTATION = gql`
  mutation upvoteTimelineEvent($timelineEventId: Int) {
    upvoteTimelineEvent(timelineEventId: $timelineEventId) {
      id
      votes {
        userId
      }
    }
  }
`
