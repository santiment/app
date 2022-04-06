import { useQuery } from '@apollo/react-hooks'
import { HISTORICAL_TRIGGER_POINTS_QUERY } from './queries'

export const getCooldown = cooldown => {
  if (
    cooldown &&
    (cooldown.indexOf('d') !== -1 || cooldown.indexOf('w') !== -1)
  ) {
    return '1d'
  }

  return cooldown && cooldown.indexOf('m') !== -1 ? '1h' : cooldown
}

export const useHistoricalTriggerPoints = ({ cooldown, settings, skip }) => {
  const { data, loading, error } = useQuery(HISTORICAL_TRIGGER_POINTS_QUERY, {
    skip: skip || !cooldown || !settings,
    variables: { cooldown, settings: JSON.stringify(settings) }
  })

  return { data, loading, error }
}
