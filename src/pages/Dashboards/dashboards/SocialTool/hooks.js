import { useTrendingWords, useTrendWordsData } from '../../../../ducks/TrendsTable/hooks'
import { WORDS_SOCIAL_DOMINANCE_QUERY } from '../../../../ducks/TrendsTable/queries'
import { getSocialDominanceSum } from '../../../../ducks/TrendsTable/utils'

export function useSocialDominanceTrendingWords(period) {
  const { words, isLoading } = useTrendingWords(period)
  const data = useTrendWordsData(WORDS_SOCIAL_DOMINANCE_QUERY, words)
  const wordsDominance = data && Object.keys(data).map((word) => ({ word, value: data[word] }))
  const socialDominance = wordsDominance && getSocialDominanceSum(wordsDominance)

  return {
    data: socialDominance || 0,
    loading: isLoading,
  }
}
