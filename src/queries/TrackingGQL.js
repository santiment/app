import gql from 'graphql-tag'

export const TRACK_EVENTS_MUTATION = gql`
  mutation trackEvents($events: json) {
    trackEvents(events: $events)
  }
`
