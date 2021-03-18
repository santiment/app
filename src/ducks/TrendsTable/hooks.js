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
const LOADING = {
  data: ARRAY,
  isLoading: true
}

const wordAccessor = ({ word }) => word

export function useTrendingWords (variables) {
  const { data } = useQuery(TRENDING_WORDS_QUERY, { variables })

  return useMemo(
    () => {
      if (!data) return { trendingWords: ARRAY, words: ARRAY, isLoading: true }

      let trendingWords = ARRAY
      const item = data.getTrendingWords[0]
      if (item) {
        trendingWords = item.topWords
      }

      return {
        trendingWords,
        words: trendingWords.map(wordAccessor),
        isLoading: false
      }
    },
    [data]
  )
}

function useTrendWordsData (query, words) {
  const { data } = useQuery(query, {
    variables: {
      words
    }
  })

  return useMemo(
    () => {
      if (!data) return

      const { wordsData } = data
      const WordSocialVolume = {}

      wordsData.forEach(({ word, data }) => {
        WordSocialVolume[word] = data
      })

      return WordSocialVolume
    },
    [data]
  )
}

export function useTrendSocialVolumeChange (words, trend) {
  const data = useTrendWordsData(LAST_DAY_SOCIAL_VOLUME_QUERY, words)

  return useMemo(
    () => {
      if (!data) return {}

      const [{ value: oldValue }, { value: newValue }] = data[trend.word]

      return {
        value: Math.round(newValue),
        change: calcPercentageChange(oldValue, newValue)
      }
    },
    [data]
  )
}

export function useTrendSocialVolume (words, trend) {
  const data = useTrendWordsData(SOCIAL_VOLUME_QUERY, words)

  return useMemo(
    () => {
      if (!data) return LOADING

      return {
        data: data[trend.word],
        isLoading: false
      }
    },
    [data]
  )
}

export function useTrendWordContext (words, trend) {
  const data = useTrendWordsData(TRENDING_WORDS_CONTEXT_QUERY, words)

  return useMemo(
    () => {
      if (!data) return LOADING

      return {
        data: data[trend.word],
        isLoading: false
      }
    },
    [data]
  )
}
