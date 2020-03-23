import React from 'react'
import { Query } from 'react-apollo'
import Loader from '@santiment-network/ui/Loader/Loader'
import { INSIGHT_BY_ID_QUERY } from '../../../../../queries/InsightsGQL'
import MetricInsightCard from './MetricInsightCard'

import styles from './MetricInsights.module.scss'

const MetricInsights = ({ insights = [] }) => {
  if (!insights.length) {
    return null
  }

  return (
    <>
      <div className={styles.usecases}>Use cases from Insights</div>
      <div className={styles.container}>
        {insights.map(id => {
          return (
            <Query query={INSIGHT_BY_ID_QUERY} variables={{ id }} key={id}>
              {({ data: { insight } = {}, loading }) => {
                if (loading) {
                  return <Loader className={styles.loader} />
                }

                return <MetricInsightCard insight={insight} />
              }}
            </Query>
          )
        })}
      </div>
    </>
  )
}

export default MetricInsights
