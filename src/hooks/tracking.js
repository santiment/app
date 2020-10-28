import { useMutation } from '@apollo/react-hooks'
import { store } from '../redux'
import { checkIsLoggedIn } from '../pages/UserSelectors'
import { TRACK_EVENTS_MUTATION } from '../queries/TrackingGQL'

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
