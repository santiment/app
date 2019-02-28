import React from 'react'
import { Query } from 'react-apollo'
import { connect } from 'react-redux'
import { baseLocation } from './InsightsPage'
import {
  ALL_INSIGHTS_QUERY,
  INSIGHTS_BY_USERID_QUERY,
  INSIGHTS_BY_TAG_QUERY
} from './InsightsGQL'
import InsightCard from '../../components/Insight/InsightCardWithMarketcap'
import Feed from '../../components/Feed/Feed'
import { filterInsightsNoDrafts, sortInsightsByDateDescending } from './utils'
import styles from './InsightsFeedPage.module.scss'

const getQueryParams = (path, { tag, userId: authorId }, userId) => {
  if (path === baseLocation) {
    return {
      query: ALL_INSIGHTS_QUERY
    }
  }

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

const InsightsFeedPage = ({
  location: { pathname },
  match: { path, params },
  userId,
  ...props
}) => {
  console.log(props, userId)
  return (
    <div className={styles.wrapper}>
      <Query
        {...getQueryParams(path, params, +userId)}
        fetchPolicy='cache-and-network'
      >
        {({ data = {}, ...gprops }) => {
          const { insights = [] } = data

          let feedInsights = insights
            .filter(filterInsightsNoDrafts)
            .sort(sortInsightsByDateDescending)

          console.log(feedInsights)

          return (
            <Feed
              data={feedInsights}
              component={InsightCard}
              dateKey='createdAt'
            />
          )
        }}
      </Query>
    </div>
  )
}

const mapStateToProps = ({ user }) => ({
  userId: user.data.id
})

export default connect(mapStateToProps)(InsightsFeedPage)
