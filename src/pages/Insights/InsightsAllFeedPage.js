import React from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import withSizes from 'react-sizes'
import { mapSizesToProps } from '../../App'
import { client } from '../../index'
import { ALL_INSIGHTS_BY_PAGE_QUERY } from './../../queries/InsightsGQL'
import InsightsFeed from '../../components/Insight/InsightsFeed'
import InsightsFeatured from '../../components/Insight/InsightsFeatured'
import styles from './InsightsAllFeedPage.module.scss'

class InsightsAllFeedPage extends React.PureComponent {
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
      query: ALL_INSIGHTS_BY_PAGE_QUERY,
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
    const { sortReducer, isPhone, isTablet } = this.props

    return (
      <div className={styles.wrapper}>
        <div className={styles.insights}>
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
        {!isPhone && !isTablet && (
          <div className={styles.featuredInsights}>
            <h4 className={styles.featuredInsights__title}>
              Featured insights
            </h4>
            <div>
              <InsightsFeatured
                maxLines={2}
                multilineTextId='SidebarInsights'
                className={styles.featuredInsights__card}
              />
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default withSizes(mapSizesToProps)(InsightsAllFeedPage)
