import React from 'react'
import { graphql } from 'react-apollo'
import Insights from './Insights'
import { ALL_INSIGHTS_BY_TAG_QUERY } from './insightsGQL'

const InsightsTrends = ({ data: { allInsightsByTag }, ...props }) => {
  return <Insights insights={allInsightsByTag} {...props} />
}

export const getCurrentTrendsTag = () => {
  const date = new Date()
  return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}-trending-words`
}

export default graphql(ALL_INSIGHTS_BY_TAG_QUERY, {
  options: () => {
    return {
      variables: {
        tag: getCurrentTrendsTag()
      }
    }
  }
})(InsightsTrends)
