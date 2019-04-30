import React from 'react'
import { graphql } from 'react-apollo'
import { compose } from 'recompose'
import Insights from './Insights'
import { ALL_INSIGHTS_BY_TAG_QUERY } from './../../queries/InsightsGQL'
import { filterInsightsNoDrafts } from '../../pages/Insights/utils'

const oneDayTimeStamp = 1000 * 60 * 60 * 24

const InsightsTrends = ({ allInsightsByTag, ...props }) => {
  return (
    <Insights
      title='Insights based on last trends'
      insights={allInsightsByTag.filter(filterInsightsNoDrafts)}
      {...props}
    />
  )
}

export const oneDayTimestamp = 1000 * 60 * 60 * 24

export const getInsightTrendTagByDate = date =>
  `${date.getUTCDate()}-${date.getUTCMonth()}-${date.getUTCFullYear()}-trending-words`

const getPast3DaysInsightsByTrendTag = () =>
  [0, oneDayTimeStamp, 2 * oneDayTimeStamp].map(timestamp =>
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
