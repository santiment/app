import React from 'react'
import { graphql } from 'react-apollo'
import Insights from './Insights'
import { allInsightsByTagGQL } from './insightsByTagGQL'

const InsightsTrends = ({ data: { allInsightsByTag }, ...props }) => {
  return <Insights insights={allInsightsByTag} {...props} />
}

export default graphql(allInsightsByTagGQL, {
  options: () => {
    const date = new Date()
    return {
      variables: {
        /* tag: `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}-trending-words` */
        tag: 'Crypto Market'
      }
    }
  }
})(InsightsTrends)
