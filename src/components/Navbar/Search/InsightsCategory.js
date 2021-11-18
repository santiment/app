import React, { useState, useEffect, useMemo } from 'react'
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

const propsAccessor = ({ id, href }) => ({
  key: id,
  href: href || 'https://insights.santiment.net/read/' + id,
  As: 'a'
})

const Insight = ({ title }) => title

const InsightsCategory = ({ searchTerm, ...props }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [insights, setInsights] = useState(DEFAULT_SUGGESTIONS)
  const hasMoreSuggestions = searchTerm && insights.length > 5
  const suggestions = useMemo(() => {
    if (hasMoreSuggestions) {
      return insights.slice(0, 4).concat({
        id: 'show more',
        title: 'Show more results',
        href:
          'https://insights.santiment.net/search?t=' +
          encodeURIComponent(searchTerm)
      })
    }
    return insights.slice(0, 5)
  }, [insights, hasMoreSuggestions])

  useEffect(() => {
    const query = searchTerm ? getInsightsBySearchTerm : getInsights
    query(searchTerm).then(setInsights)
  }, [])

  useEffect(() => {
    if (!searchTerm) {
      getInsights().then(setInsights)
      return setIsLoading(false)
    }

    setIsLoading(true)
    const timer = setTimeout(
      () =>
        getInsightsBySearchTerm(searchTerm).then(insights => {
          setInsights(insights)
          setIsLoading(false)
        }),
      250
    )

    return () => clearTimeout(timer)
  }, [searchTerm])

  return suggestions.length ? (
    <Category
      {...props}
      className={styles.category_insights}
      title='Insights'
      items={suggestions}
      Item={Insight}
      propsAccessor={propsAccessor}
      isLoading={isLoading}
    />
  ) : null
}

export default InsightsCategory
