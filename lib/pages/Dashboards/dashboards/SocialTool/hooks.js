import { useTrendingWords, useTrendWordsData } from '../../../../ducks/TrendsTable/hooks';
import { WORDS_SOCIAL_DOMINANCE_QUERY } from '../../../../ducks/TrendsTable/queries';
export function useSocialDominanceTrendingWords(period) {
  const {
    words,
    isLoading
  } = useTrendingWords(period);
  const wordsDominance = useTrendWordsData(WORDS_SOCIAL_DOMINANCE_QUERY, words);
  return {
    dominance: wordsDominance || {},
    loading: isLoading
  };
}