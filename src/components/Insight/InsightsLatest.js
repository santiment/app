import React from 'react'
import { graphql } from 'react-apollo'
import InsightCardSmall from './InsightCardSmall'
import { ALL_INSIGHTS_BY_PAGE_QUERY } from './../../queries/InsightsGQL'

const InsightsLatest = ({ data: { insights = [] }, ...props }) => {
  return insights.map(({ id, ...insight }) => (
    <InsightCardSmall key={id} {...props} id={id} {...insight} />
  ))
}

export default graphql(ALL_INSIGHTS_BY_PAGE_QUERY, {
  fetchPolicy: 'network-only',
  options: () => ({
    variables: { page: 1 }
  })
})(InsightsLatest)
