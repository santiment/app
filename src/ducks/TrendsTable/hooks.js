import { useMemo } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { TRENDING_WORDS_QUERY, LAST_DAY_SOCIAL_VOLUME_QUERY } from './queries'
import { calcPercentageChange } from '../../utils/utils'

const ARRAY = []
export const useTrendingWords = () => {
  const { data, loading } = useQuery(TRENDING_WORDS_QUERY)

  let trendingWords = ARRAY
  if (data) {
    const item = data.getTrendingWords[0]
    if (item) {
      trendingWords = item.topWords
    }
  }

  return { trendingWords, isLoading: loading }
}

export const useTrendSocialVolumeChange = trend => {
  const { data } = useQuery(LAST_DAY_SOCIAL_VOLUME_QUERY, { variables: trend })

  return useMemo(
    () => {
      if (!data) return {}

      const { score } = trend
      const lastScore = data.getMetric.timeseriesData[0].value

      return {
        value: Math.round(score),
        change: calcPercentageChange(score, lastScore)
      }
    },
    [data]
  )
}
