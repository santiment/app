import React, { useCallback, useEffect, useState } from 'react'
import {
  DEFAULT_INSIGHTS_PER_PAGE,
  useInsightsByTag
} from '../../../hooks/insights'
import PageLoader from '../../../components/Loader/PageLoader'
import NoInsights from './NoInsights'
import InsightsFeed from '../../../components/Insight/InsightsFeed'
import InfiniteScroll from 'react-infinite-scroller'
import styles from './RelatedInsights.module.scss'

const RelatedInsights = ({ settings }) => {
  const { ticker } = settings

  const [page, setPage] = useState(1)

  useEffect(
    () => {
      setPage(1)
      setInsights([])
    },
    [ticker]
  )

  const [insights, setInsights] = useState([])
  const { data, loading: isLoading } = useInsightsByTag({
    tags: [ticker],
    page: page,
    pageSize: DEFAULT_INSIGHTS_PER_PAGE
  })

  useEffect(
    () => {
      if (data.length > 0) {
        setInsights([...insights, ...data])
      }
    },
    [data]
  )

  const loadMore = useCallback(
    () => {
      if (!isLoading) {
        setPage(page + 1)
      }
    },
    [isLoading, setPage, page]
  )

  const canLoad =
    insights.length > 0 && insights.length % DEFAULT_INSIGHTS_PER_PAGE === 0

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.title}>Related Insights</div>
        </div>

        <div className={styles.insights}>
          {!isLoading && insights.length === 0 && data.length === 0 && (
            <NoInsights />
          )}

          <InfiniteScroll
            pageStart={0}
            loadMore={loadMore}
            hasMore={!isLoading && canLoad}
            loader={PageLoader}
            threshold={0}
          >
            <InsightsFeed insights={insights} classes={styles} />
          </InfiniteScroll>
        </div>
      </div>
    </div>
  )
}

export default RelatedInsights
