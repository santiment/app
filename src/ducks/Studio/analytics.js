import GA from '../../utils/tracking'

export function trackMetricState ({ label }, state) {
  const action = state ? 'Showing' : 'Removing'
  GA.event(
    {
      category: 'Chart',
      action: `${action} "${label}"`
    },
    ['ga', 'intercom']
  )
}
