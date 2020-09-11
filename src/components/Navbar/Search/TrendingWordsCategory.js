import React, { useMemo } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import Icon from '@santiment-network/ui/Icon'
import Category, { Button } from './Category'
import styles from './Category.module.scss'

const DEFAULT_SUGGESTIONS = []

const fromDate = new Date()
const toDate = new Date()
fromDate.setHours(0, 0, 0, 0)
toDate.setHours(toDate.getHours() + 1, 0, 0, 0)

const TRENDING_WORDS_QUERY = gql`
  query {
    getTrendingWords(size: 20, from: "${fromDate.toISOString()}", to: "${toDate.toISOString()}") {
      topWords {
        word
      }
    }
  }
`

const TREND_LINK = '/labs/trends/explore/'

const propsAccessor = ({ word }) => ({
  key: word,
  to: TREND_LINK + word
})

function trendingWordsPredicate (value) {
  const searchTerm = value.toLowerCase()
  return ({ word }) => word.includes(searchTerm)
}

function useTrendingWords () {
  const { data } = useQuery(TRENDING_WORDS_QUERY)
  return data ? data.getTrendingWords[0].topWords : DEFAULT_SUGGESTIONS
}

const TrendingWord = ({ word }) => word

const Lookup = ({ searchTerm }) => (
  <Button to={TREND_LINK + searchTerm}>
    <Icon type='fire' className={styles.icon} />
    Lookup as trend
  </Button>
)

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
    >
      {suggestions.length < 5 && <Lookup searchTerm={searchTerm} />}
    </Category>
  )
}

export default TrendingWordsCategory
