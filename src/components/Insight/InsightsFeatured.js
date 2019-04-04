import React from 'react'
import { graphql } from 'react-apollo'
import InsightCard from './InsightCard'
import { FEATURED_INSIGHTS_QUERY } from './insightsGQL'

const InsightsTrends = ({ data: { insights = [] }, ...props }) => {
  return insights.map(({ id, ...insight }) => (
    <InsightCard
      key={id}
      {...props}
      id={id}
      {...insight}
      withAuthorPic={false}
    />
  ))
}

export default graphql(FEATURED_INSIGHTS_QUERY, {
  fetchPolicy: 'cache-and-network'
})(InsightsTrends)
