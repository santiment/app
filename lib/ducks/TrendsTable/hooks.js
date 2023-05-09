import { useMemo } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { TRENDING_WORDS_QUERY, TRENDING_WORDS_CONTEXT_QUERY, SOCIAL_VOLUME_QUERY } from './queries';
const ARRAY = [];
const LOADING = {
  data: ARRAY,
  isLoading: true
};

const wordAccessor = ({
  word
}) => word;

export function useTrendingWords(variables) {
  const {
    data,
    loading
  } = useQuery(TRENDING_WORDS_QUERY, {
    variables
  });
  return useMemo(() => {
    if (!data) {
      return {
        trendingWords: ARRAY,
        words: ARRAY,
        isLoading: loading
      };
    }

    let trendingWords = ARRAY;
    const item = data.getTrendingWords[data.getTrendingWords.length - 1];

    if (item) {
      trendingWords = item.topWords;
    }

    return {
      trendingWords,
      words: trendingWords.map(wordAccessor),
      isLoading: loading
    };
  }, [data]);
}
export function useTrendWordsData(query, words) {
  const {
    data
  } = useQuery(query, {
    variables: {
      words
    },
    skip: words.length === 0
  });
  return useMemo(() => {
    if (!data) return;
    const {
      wordsData
    } = data;
    const WordSocialVolume = {};

    if (wordsData) {
      wordsData.forEach(({
        word,
        data
      }) => {
        WordSocialVolume[word] = data;
      });
    }

    return WordSocialVolume;
  }, [data]);
}
export function useTrendSocialVolume(words, trend) {
  const data = useTrendWordsData(SOCIAL_VOLUME_QUERY, words);
  return useMemo(() => {
    if (!data) return LOADING;
    return {
      data: trend ? data[trend.word].slice(0, -1) : data,
      isLoading: false
    };
  }, [data]);
}
export function useTrendWordContext(words, trend) {
  const data = useTrendWordsData(TRENDING_WORDS_CONTEXT_QUERY, words);
  return useMemo(() => {
    if (!data) return LOADING;
    return {
      data: trend ? data[trend.word] : data,
      isLoading: false
    };
  }, [data]);
}