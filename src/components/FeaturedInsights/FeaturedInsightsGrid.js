import React from 'react'
import { graphql } from 'react-apollo'
import { FEATURED_INSIGHTS_QUERY } from './../../queries/InsightsGQL'
import { creationDateSort } from '../Insight/utils'
import InsightsWrap from '../Insight/InsightsWrap'

const FeaturedInsightsGrid = ({
  data: { insights = [] },
  withAuthorPic,
  classes,
  limit = 6
}) => {
  const sortedInsights = insights.sort(creationDateSort).slice(0, limit)
  return (
    <InsightsWrap
      insights={sortedInsights}
      classes={classes}
      withAuthorPic={withAuthorPic}
    />
  )
}

export default graphql(FEATURED_INSIGHTS_QUERY, {
  fetchPolicy: 'cache-and-network'
})(FeaturedInsightsGrid)
