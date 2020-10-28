import { useMutation } from '@apollo/react-hooks'
import { useUser } from '../stores/user'
import { TRACK_EVENTS_MUTATION } from '../queries/TrackingGQL'

export function useTrackEvents (event_name, metadata) {
  const { isLoggedIn } = useUser()

  if (!isLoggedIn) {
    return
  }

  const [mutate] = useMutation(TRACK_EVENTS_MUTATION)
  const created_at = new Date()

  mutate({
    variables: {
      events: JSON.stringify([{ event_name, metadata, created_at }])
    }
  }).catch(err => console.error(err))
}
