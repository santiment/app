import { useMutation } from '@apollo/react-hooks'
import { useUser } from '../stores/user'
import { TRACK_EVENTS_MUTATION } from '../queries/TrackingGQL'
import { isProdApp, isBrowser, hasDoNotTrack, event } from '../utils/tracking'

export function useTrackEvents () {
  const { isLoggedIn } = useUser()

  const [mutate] = useMutation(TRACK_EVENTS_MUTATION, { skip: !isLoggedIn })
  const created_at = new Date()

  function trackEvent (
    { action, category, label, ...values },
    service = ['ga', 'sanapi']
  ) {
    if (!isBrowser || !isProdApp || hasDoNotTrack()) {
      return null
    }

    if (service.includes('ga')) {
      console.log('here')
      event({ action, category, label, ...values }, ['ga'])
    }

    if (service.includes('intercom')) {
      event({ action, category, label, ...values }, ['intercom'])
    }

    if (service.includes('twitter')) {
      event({ action, category, label, ...values }, ['twitter'])
    }

    if (service.includes('sanapi')) {
      console.log('here2')
      mutate({
        variables: {
          events: JSON.stringify([
            {
              event_name: action,
              metadata: { category, label, ...values },
              created_at
            }
          ])
        }
      }).catch(err => console.error(err))
    }
  }

  return [trackEvent]
}
