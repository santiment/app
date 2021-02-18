import { useMemo } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { WORD_CLOUD_QUERY } from './wordCloudGQL'
import { getTimeIntervalFromToday } from '../../utils/dates'

const useIsoTime = ({ from, to }) => {
  return useMemo(
    () => {
      let fromIso = from
      let toIso = to
      if (!from) {
        const { from, to } = getTimeIntervalFromToday(-1, 'd')
        fromIso = from.toISOString()
        toIso = to.toISOString()
      }

      return { fromIso, toIso }
    },
    [from, to]
  )
}

export function useWordCloud ({ size = 25, word, from, to, onLoad }) {
  const { toIso, fromIso } = useIsoTime({ from, to })

  const query = useQuery(WORD_CLOUD_QUERY, {
    variables: {
      from: fromIso,
      to: toIso,
      size,
      word
    }
  })

  return useMemo(
    () => {
      const { data, loading, error } = query

      if (data && onLoad) onLoad()

      return {
        cloud: data && data.wordContext ? data.wordContext : [],
        loading,
        error
      }
    },
    [query]
  )
}
