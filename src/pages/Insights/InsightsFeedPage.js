import React from 'react'
import { Query } from 'react-apollo'
import { connect } from 'react-redux'
import { baseLocation } from './InsightsPage'
import { INSIGHTS_BY_USERID_QUERY, INSIGHTS_BY_TAG_QUERY } from './InsightsGQL'
import InsightsFeed from '../../components/Insight/InsightsFeed'
import { filterInsightsNoDrafts, sortInsightsByDateDescending } from './utils'
import styles from './InsightsFeedPage.module.scss'

const getQueryParams = (path, { tag, userId: authorId }, userId) => {
  if (path.includes(`${baseLocation}/my`) || authorId) {
    return {
      query: INSIGHTS_BY_USERID_QUERY,
      variables: {
        userId: +authorId || userId
      }
    }
  }

  return {
    query: INSIGHTS_BY_TAG_QUERY,
    variables: {
      tag
    }
  }
}

const InsightsFeedPage = ({ match: { path, params }, userId }) => {
  return (
    <div className={styles.wrapper}>
      <Query
        {...getQueryParams(path, params, +userId)}
        fetchPolicy='cache-and-network'
      >
        {({ data = {} }) => {
          const { insights = [] } = data

          const feedInsights = insights
            .filter(filterInsightsNoDrafts)
            .sort(sortInsightsByDateDescending)

          return <InsightsFeed insights={feedInsights} />
        }}
      </Query>
    </div>
  )
}

const mapStateToProps = ({ user }) => ({
  userId: user.data.id
})

export default connect(mapStateToProps)(InsightsFeedPage)
