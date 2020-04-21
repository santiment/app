import React from 'react'
import { graphql } from 'react-apollo'
import { FEATURED_INSIGHTS_QUERY } from './../../queries/InsightsGQL'
import { creationDateSort } from '../Insight/utils'
import InsightsWrap from '../Insight/InsightsWrap'

const FeaturedInsightsGrid = ({ data: { insights = [] }, classes }) => {
  const sortedInsights = insights.sort(creationDateSort).slice(0, 6)
  return <InsightsWrap insights={sortedInsights} classes={classes} />
}

export default graphql(FEATURED_INSIGHTS_QUERY, {
  fetchPolicy: 'cache-and-network'
})(FeaturedInsightsGrid)
