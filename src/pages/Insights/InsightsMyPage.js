import React from 'react'
import { graphql } from 'react-apollo'
import InsightsFeed from '../../components/Insight/InsightsFeed'
import { CURRENT_USER_INSIGHTS_QUERY } from './../../queries/InsightsGQL'
import styles from './InsightsFeedPage.module.scss'

const InsightsAllFeedPage = ({
  sortReducer,
  data: { currentUser: { insights = [] } = {} }
}) => {
  return (
    <div className={styles.wrapper}>
      <InsightsFeed insights={sortReducer(insights)} />
    </div>
  )
}

export default graphql(CURRENT_USER_INSIGHTS_QUERY)(InsightsAllFeedPage)
