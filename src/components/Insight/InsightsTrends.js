import React from 'react'
import { graphql } from 'react-apollo'
import Insights from './Insights'
import { allInsightsByTagGQL } from './insightsByTagGQL'

const InsightsTrends = ({ data: { allInsightsByTag }, ...props }) => {
  return <Insights insights={allInsightsByTag} {...props} />
}

export const getCurrentTrendsTag = () => {
  const date = new Date()
  return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}-trending-words`
}

export default graphql(allInsightsByTagGQL, {
  options: () => {
    return {
      variables: {
        tag: getCurrentTrendsTag()
      }
    }
  }
})(InsightsTrends)
