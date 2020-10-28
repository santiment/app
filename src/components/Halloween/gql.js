import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { store } from '../../redux'
import { checkIsLoggedIn } from '../../pages/UserSelectors'

export const TRACK_EVENTS_MUTATION = gql`
  mutation trackEvents($events: json) {
    trackEvents(events: $events)
  }
`

export function useTrackEvents () {
  const isLoggedIn = checkIsLoggedIn(store.getState())

  const [mutate, data] = useMutation(TRACK_EVENTS_MUTATION)

  function trackEvent (event_name, metadata) {
    if (!isLoggedIn) {
      return
    }

    const created_at = new Date()

    return mutate({
      variables: {
        events: JSON.stringify([{ event_name, metadata, created_at }])
      }
    }).catch(err => console.error(err))
  }

  return [trackEvent, data]
}
