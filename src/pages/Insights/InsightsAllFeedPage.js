import React, { Component } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { ALL_INSIGHTS_QUERY } from './InsightsGQL'
import { client } from '../../index'
import InsightsFeed from '../../components/Insight/InsightsFeed'
import styles from './InsightsFeedPage.module.scss'

class InsightsAllFeedPage extends Component {
  state = {
    nextPage: 1,
    insights: []
  }

  loadMore = async () => {
    const { nextPage: page, loading } = this.state

    if (loading) {
      return
    }

    this.setState({ loading: true })
    const {
      data: { insights }
    } = await client.query({
      query: ALL_INSIGHTS_QUERY,
      fetchPolicy: 'network-only',
      variables: {
        page
      }
    })

    this.setState(({ insights: ownInsights, nextPage }) => {
      const newInsights = ownInsights.concat(insights)

      return {
        loading: false,
        insights: newInsights,
        nextPage: nextPage + 1
      }
    })
  }

  render () {
    const { insights, loading } = this.state
    const { sortReducer } = this.props

    return (
      <div className={styles.wrapper}>
        <InfiniteScroll
          pageStart={0}
          hasMore={!loading}
          initialLoad
          loadMore={this.loadMore}
          loader='Loading more insights...'
        >
          <InsightsFeed insights={sortReducer(insights)} />
        </InfiniteScroll>
      </div>
    )
  }
}

export default InsightsAllFeedPage
