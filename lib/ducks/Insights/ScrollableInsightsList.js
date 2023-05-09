import React, { useCallback, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { DEFAULT_INSIGHTS_PER_PAGE, useInsightsBy } from '../../hooks/insights';
import NoEntries from '../../components/EmptySection/NoEntries';
import InsightsFeed from '../../components/Insight/InsightsFeed';
import { Skeleton } from '../../components/Skeleton';
import styles from '../Studio/RelatedInsights/RelatedInsights.module.css';
export const useScrollabelPages = () => {
  const [page, setPage] = useState(1);
  return {
    page,
    setPage
  };
};
export const ScrollableInsightsList = ({
  variables,
  query,
  setPage,
  page,
  settings,
  target
}) => {
  const [insights, setInsights] = useState([]);
  const [canLoad, setCanLoad] = useState(true);
  const {
    data,
    loading: isLoading
  } = useInsightsBy(variables, query);
  useEffect(() => {
    setPage(1);
    setInsights([]);
  }, [settings]);
  useEffect(() => {
    if (data.length > 0) {
      setInsights([...insights, ...data]);
    }

    if (!isLoading && (data.length === 0 || data.length < DEFAULT_INSIGHTS_PER_PAGE)) {
      setCanLoad(false);
    }
  }, [data]);
  const loadMore = useCallback(() => {
    if (!isLoading && canLoad) {
      setPage(page + 1);
    }
  }, [isLoading, canLoad, setPage, page]);
  const {
    isOwner
  } = settings;
  return /*#__PURE__*/React.createElement(React.Fragment, null, !isLoading && insights.length === 0 && data.length === 0 && /*#__PURE__*/React.createElement(NoEntries, {
    maxWidth: "358px",
    title: isOwner && 'No Insights yet',
    desc: isOwner ? 'Use Insights to journal your ideas, perform research, or share with others' : "This user doesn't have any insights yet"
  }, isOwner && /*#__PURE__*/React.createElement("a", {
    href: "https://insights.santiment.net/new",
    className: "btn-1 body-3"
  }, "Add insight")), /*#__PURE__*/React.createElement(InfiniteScroll, {
    pageStart: 0,
    loadMore: loadMore,
    hasMore: !isLoading && canLoad,
    loader: /*#__PURE__*/React.createElement(Skeleton, {
      show: isLoading,
      key: "loader",
      className: styles.skeleton
    }),
    threshold: 0
  }, /*#__PURE__*/React.createElement(InsightsFeed, {
    key: "feed",
    insights: insights,
    classes: styles
  })));
};
export default ScrollableInsightsList;