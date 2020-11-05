import { useMutation } from '@apollo/react-hooks'
import { useUser } from '../stores/user'
import { TRACK_EVENTS_MUTATION } from '../queries/TrackingGQL'
import { isProdApp, isBrowser, hasDoNotTrack } from '../utils/tracking'

export function useTrackEvents () {
  const { isLoggedIn } = useUser()

  const [mutate] = useMutation(TRACK_EVENTS_MUTATION, { skip: !isLoggedIn })

  function trackEvent (
    { action, category, label, ...values },
    service = ['ga', 'sanapi']
  ) {
    if (!isBrowser || !isProdApp || hasDoNotTrack()) {
      return null
    }

    const created_at = new Date()

    if (service.includes('ga')) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        ...values
      })
    }
    if (service.includes('intercom')) {
      window.Intercom('trackEvent', action, {
        event_category: category,
        event_label: label,
        ...values
      })
    }
    if (service.includes('twitter')) {
      window.twq('track', action, {
        content_type: category,
        content_name: label,
        ...values
      })
    }

    if (service.includes('sanapi')) {
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
