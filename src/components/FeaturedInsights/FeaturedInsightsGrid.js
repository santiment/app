import React from 'react'
import { graphql } from 'react-apollo'
import { FEATURED_INSIGHTS_QUERY } from './../../queries/InsightsGQL'
import { creationDateSort } from '../../pages/Insights/utils'
import InsightsWrap from '../Insight/InsightsWrap'

const FeaturedInsightsGrid = ({ data: { insights = [] } }) => {
  const sortedInsights = insights.sort(creationDateSort).slice(0, 6)
  return <InsightsWrap insights={sortedInsights} />
}

export default graphql(FEATURED_INSIGHTS_QUERY, {
  fetchPolicy: 'cache-and-network'
})(FeaturedInsightsGrid)
