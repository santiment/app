import { useQuery } from '@apollo/react-hooks'
import { WORD_CLOUD_QUERY } from './wordCloudGQL'
import { getTimeIntervalFromToday } from '../../utils/dates'

export function useWordCloud ({ size = 25, word, from, to }) {
  let fromIso = from
  let toIso = to
  if (!from) {
    const { from, to } = getTimeIntervalFromToday(-1, 'd')
    fromIso = from.toISOString()
    toIso = to.toISOString()
  }

  const { data, loading, error } = useQuery(WORD_CLOUD_QUERY, {
    variables: {
      from: fromIso,
      to: toIso,
      size,
      word
    }
  })
  return {
    cloud: data && data.wordContext ? data.wordContext : [],
    loading,
    error
  }
}
