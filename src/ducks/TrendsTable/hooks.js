import { useMemo } from 'react'
import { useQuery } from '@apollo/react-hooks'
import {
  TRENDING_WORDS_QUERY,
  SOCIAL_VOLUME_QUERY,
  LAST_DAY_SOCIAL_VOLUME_QUERY
} from './queries'
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
      const { score } = trend
      const value = Math.round(score)

      if (!data) {
        return {
          value
        }
      }

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
export const useTrendSocialVolume = trend => {
  const { data } = useQuery(SOCIAL_VOLUME_QUERY, { variables: trend })

  return useMemo(
    () => {
      if (!data) return LOADING

      const socialVolumes = data.getMetric.timeseriesData
      return {
        data: [...socialVolumes, { value: trend.score }],
        isLoading: false
      }
    },
    [data]
  )
}
