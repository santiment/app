import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import InfiniteScroll from 'react-infinite-scroller'
import { ALL_INSIGHTS_QUERY } from './InsightsGQL'
import { client } from '../../index'
import Feed from '../../components/Feed/Feed'
import InsightCard from '../../components/Insight/InsightCardWithMarketcap'
import { sortInsightsByDateDescending, popularitySort } from './utils'
import styles from './InsightsFeedPage.module.scss'

class InsightsAllFeedPage extends Component {
  state = {
    nextPage: 2,
    insights: []
  }

  static getDerivedStateFromProps ({ data: { insights } }) {
    if (insights) {
      return {
        insights: insights.slice()
      }
    }

    return null
  }

  loadMore = async () => {
    if (this.props.data.loading) {
      return
    }

    const { nextPage: page } = this.state

    const {
      data: { insights }
    } = await client.query({
      query: ALL_INSIGHTS_QUERY,
      variables: {
        page
      }
    })

    this.setState(({ insights: ownInsights, nextPage }) => {
      const newInsights = ownInsights.concat(insights)

      return {
        insights: newInsights,
        nextPage: nextPage + 1
      }
    })
  }

  render () {
    const { insights } = this.state
    const { sortReducer } = this.props

    const sortedInsights = sortReducer(insights)

    return (
      <div className={styles.wrapper}>
        <InfiniteScroll
          pageStart={0}
          hasMore
          loadMore={this.loadMore}
          loader='Loading more insights...'
        >
          <Feed
            data={sortedInsights}
            component={InsightCard}
            dateKey='createdAt'
          />
        </InfiniteScroll>
      </div>
    )
  }
}

export default graphql(ALL_INSIGHTS_QUERY, {
  options: () => ({
    variables: {
      page: 1
    },
    fetchPolicy: 'cache-and-network'
  })
})(InsightsAllFeedPage)
