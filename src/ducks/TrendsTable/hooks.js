import { useMemo } from 'react'
import { useQuery } from '@apollo/react-hooks'
import {
  TRENDING_WORDS_QUERY,
  TRENDING_WORDS_CONTEXT_QUERY,
  SOCIAL_VOLUME_QUERY,
  LAST_DAY_SOCIAL_VOLUME_QUERY
} from './queries'
import { calcPercentageChange } from '../../utils/utils'

const ARRAY = []
export function useTrendingWords (variables) {
  const { data, loading } = useQuery(TRENDING_WORDS_QUERY, { variables })

  let trendingWords = ARRAY
  if (data) {
    const item = data.getTrendingWords[0]
    if (item) {
      trendingWords = item.topWords
    }
  }

  return { trendingWords, isLoading: loading }
}

export function useTrendSocialVolumeChange (trend, skip, onLoad) {
  const { data } = useQuery(LAST_DAY_SOCIAL_VOLUME_QUERY, {
    skip,
    variables: trend
  })

  return useMemo(
    () => {
      const { score } = trend
      const value = Math.round(score)

      if (!data) {
        return {
          value
        }
      }
      if (onLoad) onLoad()

      const lastScore = data.getMetric.timeseriesData[0].value
      return {
        value,
        change: calcPercentageChange(lastScore, score)
      }
    },
    [data]
  )
}

const LOADING = {
  data: ARRAY,
  isLoading: true
}
export function useTrendSocialVolume (trend, skip, onLoad) {
  const { data } = useQuery(SOCIAL_VOLUME_QUERY, { skip, variables: trend })

  return useMemo(
    () => {
      if (!data) return LOADING
      if (onLoad) onLoad()

      const socialVolumes = data.getMetric.timeseriesData
      return {
        data: [...socialVolumes, { value: trend.score }],
        isLoading: false
      }
    },
    [data]
  )
}

export function useTrendWordContext (trend) {
  const { data } = useQuery(TRENDING_WORDS_CONTEXT_QUERY)
  return useMemo(
    () => {
      if (!data) return LOADING

      const trendWord = data.getTrendingWords[0].topWords.find(
        ({ word }) => word === trend
      )

      return {
        data: trendWord ? trendWord.context.slice(0, 6) : ARRAY,
        isLoading: false
      }
    },
    [data]
  )
}
