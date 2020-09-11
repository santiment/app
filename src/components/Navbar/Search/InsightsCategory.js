import React, { useState, useEffect } from 'react'
import gql from 'graphql-tag'
import Category from './Category'
import { client } from '../../../apollo'
import styles from './Category.module.scss'

const DEFAULT_SUGGESTIONS = []

const INSIGHTS_QUERY = gql`
  query {
    insights: allInsights(pageSize: 5) {
      id
      title
    }
  }
`

const INSIGHTS_BY_SEARCH_TERM_QUERY = gql`
  query allInsightsBySearchTerm($searchTerm: String!) {
    insights: allInsightsBySearchTerm(searchTerm: $searchTerm) {
      id
      title
    }
  }
`

const insightsAccessor = ({ data: { insights } }) => insights

function getInsights () {
  return client
    .query({
      query: INSIGHTS_QUERY
    })
    .then(insightsAccessor)
}

function getInsightsBySearchTerm (searchTerm) {
  return client
    .query({
      query: INSIGHTS_BY_SEARCH_TERM_QUERY,
      variables: { searchTerm }
    })
    .then(insightsAccessor)
}

const propsAccessor = ({ id }) => ({
  key: id,
  to: 'https://insights.santiment.net/read/' + id
})

const Insight = ({ title }) => title

const InsightsCategory = ({ searchTerm }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [suggestions, setSuggestions] = useState(DEFAULT_SUGGESTIONS)

  useEffect(() => {
    const query = searchTerm ? getInsightsBySearchTerm : getInsights
    query(searchTerm).then(setSuggestions)
  }, [])

  useEffect(
    () => {
      if (!searchTerm) {
        getInsights().then(setSuggestions)
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      const timer = setTimeout(
        () =>
          getInsightsBySearchTerm(searchTerm).then(insights => {
            setSuggestions(insights)
            setIsLoading(false)
          }),
        250
      )

      return () => clearTimeout(timer)
    },
    [searchTerm]
  )

  return suggestions.length ? (
    <Category
      className={styles.category_insights}
      title='Insights'
      items={suggestions.slice(0, 5)}
      Item={Insight}
      propsAccessor={propsAccessor}
      isLoading={isLoading}
    />
  ) : null
}

export default InsightsCategory
