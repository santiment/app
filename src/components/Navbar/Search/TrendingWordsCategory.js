import React, { useMemo } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import Category from './Category'

const DEFAULT_SUGGESTIONS = []

const fromDate = new Date()
const toDate = new Date()
toDate.setHours(toDate.getHours() + 1, 0, 0, 0)
fromDate.setHours(0, 0, 0, 0)

const TRENDING_WORDS_QUERY = gql`
  query {
    getTrendingWords(size: 20, from: "${fromDate.toISOString()}", to: "${toDate.toISOString()}") {
      topWords {
        word
      }
    }
  }
`

const propsAccessor = ({ word }) => ({
  key: word,
  to: '/labs/trends/explore/' + word
})
const TrendingWord = ({ word }) => word

function trendingWordsPredicate (value) {
  const searchTerm = value.toLowerCase()
  return ({ word }) => word.includes(searchTerm)
}

function useTrendingWords () {
  const { data } = useQuery(TRENDING_WORDS_QUERY)
  return data ? data.getTrendingWords[0].topWords : DEFAULT_SUGGESTIONS
}

const TrendingWordsCategory = ({ searchTerm }) => {
  const trendingWords = useTrendingWords()
  const suggestions = useMemo(
    () => trendingWords.filter(trendingWordsPredicate(searchTerm)).slice(0, 5),
    [searchTerm, trendingWords]
  )

  return (
    <Category
      title='Trending words'
      items={suggestions}
      Item={TrendingWord}
      propsAccessor={propsAccessor}
    />
  )
}

export default TrendingWordsCategory
