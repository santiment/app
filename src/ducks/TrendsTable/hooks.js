import { useMemo } from 'react'
import { useQuery } from '@apollo/react-hooks'
import {
  TRENDING_WORDS_QUERY,
  TRENDING_WORDS_CONTEXT_QUERY,
  SOCIAL_VOLUME_QUERY,
  LAST_DAY_SOCIAL_VOLUME_QUERY,
  WORDS_SOCIAL_DOMINANCE_QUERY,
} from './queries'
import { calcPercentageChange } from '../../utils/utils'

const ARRAY = []
const LOADING = {
  data: ARRAY,
  isLoading: true,
}

const wordAccessor = ({ word }) => word

export function useTrendingWords(variables) {
  const { data, loading } = useQuery(TRENDING_WORDS_QUERY, { variables })

  return useMemo(() => {
    if (!data) {
      return { trendingWords: ARRAY, words: ARRAY, isLoading: loading }
    }

    let trendingWords = ARRAY
    const item = data.getTrendingWords[data.getTrendingWords.length - 1]
    if (item) {
      trendingWords = item.topWords
    }

    return {
      trendingWords,
      words: trendingWords.map(wordAccessor),
      isLoading: loading,
    }
  }, [data])
}

function useTrendWordsData(query, words) {
  const { data } = useQuery(query, {
    variables: {
      words,
    },
    skip: words.length === 0,
  })

  return useMemo(() => {
    if (!data) return

    const { wordsData } = data
    const WordSocialVolume = {}

    if (wordsData) {
      wordsData.forEach(({ word, data }) => {
        WordSocialVolume[word] = data
      })
    }

    return WordSocialVolume
  }, [data])
}

export function useTrendSocialVolumeChange(words, trend) {
  const data = useTrendWordsData(LAST_DAY_SOCIAL_VOLUME_QUERY, words)

  return useMemo(() => {
    if (!data) return {}

    const [{ value: oldValue }, { value: newValue }] = data[trend.word]

    return {
      value: Math.round(newValue),
      change: calcPercentageChange(oldValue, newValue),
    }
  }, [data])
}

export function useTrendSocialVolume(words, trend) {
  const data = useTrendWordsData(SOCIAL_VOLUME_QUERY, words)

  return useMemo(() => {
    if (!data) return LOADING

    return {
      data: trend ? data[trend.word].slice(0, -1) : data,
      isLoading: false,
    }
  }, [data])
}

export function useTrendSocialDominance(words, trend) {
  const { data: trendContext, isLoading: isLoadingTrendContext } = useTrendWordContext(words, trend)
  const trendWords = trendContext.map(({ word }) => word)
  const data = useTrendWordsData(WORDS_SOCIAL_DOMINANCE_QUERY, trendWords)

  return useMemo(() => {
    if (!data || isLoadingTrendContext) return LOADING

    const socialDominance = Object.keys(data).map((word) => ({ word, value: data[word] }))

    return {
      data: socialDominance,
      isLoading: false,
    }
  }, [data, isLoadingTrendContext])
}

export function useTrendWordContext(words, trend) {
  const data = useTrendWordsData(TRENDING_WORDS_CONTEXT_QUERY, words)

  return useMemo(() => {
    if (!data) return LOADING

    return {
      data: trend ? data[trend.word] : data,
      isLoading: false,
    }
  }, [data])
}
