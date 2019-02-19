import React from 'react'
import { graphql } from 'react-apollo'
import { compose } from 'recompose'
import Insights from './Insights'
import { ALL_INSIGHTS_BY_TAG_QUERY } from './insightsGQL'

const oneDayTimeStamp = 1000 * 60 * 60 * 24

const InsightsTrends = ({ allInsightsByTag, ...props }) => {
  return <Insights insights={allInsightsByTag} {...props} />
}

export const getInsightTrendTagByDate = date =>
  `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}-trending-words`

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
