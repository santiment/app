import React from 'react'
import { graphql } from 'react-apollo'
import { compose } from 'recompose'
import { ALL_INSIGHTS_BY_TAG_QUERY } from './../../queries/InsightsGQL'
import { filterInsightsNoDrafts } from '../../pages/Insights/utils'
import { ONE_DAY_IN_MS } from '../../utils/dates'
import Insights from './Insights'

const InsightsTrends = ({ allInsightsByTag, ...props }) => {
  return (
    <Insights
      title='Insights based on last trends'
      insights={allInsightsByTag.filter(filterInsightsNoDrafts)}
      {...props}
    />
  )
}

export const getInsightTrendTagByDate = date =>
  `${date.getUTCDate()}-${date.getUTCMonth()}-${date.getUTCFullYear()}-trending-words`

export const getPast3DaysInsightsByTrendTag = () =>
  [0, ONE_DAY_IN_MS, 2 * ONE_DAY_IN_MS].map(timestamp =>
    graphql(ALL_INSIGHTS_BY_TAG_QUERY, {
      options: () => {
        return {
          variables: {
            tag: getInsightTrendTagByDate(new Date(Date.now() - timestamp))
          },
          fetchPolicy: 'cache-and-network'
        }
      },
      props: ({
        data: { allInsightsByTag = [] },
        ownProps: { allInsightsByTag: ownInsights = [] }
      }) => {
        return {
          allInsightsByTag: allInsightsByTag.concat(ownInsights)
        }
      }
    })
  )

export default compose(...getPast3DaysInsightsByTrendTag())(InsightsTrends)
