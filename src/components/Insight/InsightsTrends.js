import React from 'react'
import { graphql } from 'react-apollo'
import { compose } from 'recompose'
import Insights from './Insights'
import { allInsightsByTagGQL } from './insightsByTagGQL'

const oneDayTimeStamp = 1000 * 60 * 60 * 24

const InsightsTrends = ({ allInsightsByTag, ...props }) => {
  return <Insights insights={allInsightsByTag} {...props} />
}

export const getInsightTrendTagByDate = date =>
  `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}-trending-words`

const getPast3DaysInsightsByTrendTag = () =>
  [0, oneDayTimeStamp, 2 * oneDayTimeStamp].map(timestamp =>
    graphql(allInsightsByTagGQL, {
      options: () => {
        return {
          variables: {
            tag: getInsightTrendTagByDate(new Date(Date.now() - timestamp))
          }
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
