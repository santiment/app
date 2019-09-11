import React from 'react'
import { graphql } from 'react-apollo'
import InsightsFeed from '../../../components/Insight/InsightsFeed'
import { INSIGHTS_BY_USERID_QUERY } from '../../../queries/InsightsGQL'
import { BlocksLoader } from './../ProfilePage'
import styles from './../ProfilePage.module.scss'
import publicInsightStyles from './PublicInsights.module.scss'

const PublicInsights = props => {
  const { data: { insights = [], loading } = {} } = props

  if (loading) {
    return <BlocksLoader />
  }

  return (
    <div className={styles.block}>
      <div className={styles.title}>Public insights ({insights.length})</div>
      <div className={publicInsightStyles.insightsFeed}>
        <InsightsFeed
          showDate={false}
          insights={insights}
          classes={publicInsightStyles}
        />
      </div>
    </div>
  )
}

export default graphql(INSIGHTS_BY_USERID_QUERY, {
  skip: ({ userId }) => {
    return !userId
  },
  options: props => {
    const { userId } = props
    return {
      fetchPolicy: 'cache-and-network',
      variables: {
        userId: +userId
      }
    }
  }
})(PublicInsights)
