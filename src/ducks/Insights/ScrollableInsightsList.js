import React, { useCallback, useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { DEFAULT_INSIGHTS_PER_PAGE, useInsightsBy } from '../../hooks/insights'
import NoInsights from '../Studio/RelatedInsights/NoInsights'
import PageLoader from '../../components/Loader/PageLoader'
import InsightsFeed from '../../components/Insight/InsightsFeed'
import styles from '../Studio/RelatedInsights/RelatedInsights.module.scss'

export const useScrollabelPages = () => {
  const [page, setPage] = useState(1)

  return { page, setPage }
}

export const ScrollableInsightsList = ({
  variables,
  query,
  setPage,
  page,
  settings
}) => {
  const [insights, setInsights] = useState([])

  const { data, loading: isLoading } = useInsightsBy(variables, query)

  useEffect(
    () => {
      setPage(1)
      setInsights([])
    },
    [settings]
  )

  useEffect(
    () => {
      if (data.length > 0) {
        setInsights([...insights, ...data])
      }
    },
    [data]
  )
  const canLoad =
    insights.length > 0 && insights.length % DEFAULT_INSIGHTS_PER_PAGE === 0

  const loadMore = useCallback(
    () => {
      if (!isLoading) {
        setPage(page + 1)
      }
    },
    [isLoading, setPage, page]
  )

  return (
    <>
      {!isLoading && insights.length === 0 && data.length === 0 && (
        <NoInsights />
      )}

      <InfiniteScroll
        pageStart={0}
        loadMore={loadMore}
        hasMore={!isLoading && canLoad}
        loader={<PageLoader key='loader' />}
        threshold={0}
      >
        <InsightsFeed key='feed' insights={insights} classes={styles} />
      </InfiniteScroll>
    </>
  )
}

export default ScrollableInsightsList
