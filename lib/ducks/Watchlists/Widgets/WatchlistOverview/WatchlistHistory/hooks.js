import { useMemo } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { formatNumber } from '../../../../../utils/formatting';
import { calcPercentageChange } from '../../../../../utils/utils';
const EMPTY_OBJ = {};
const formatOptions = {
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
  style: 'decimal'
};
const WATCHLIST_STATS_HISTORY_QUERY = gql`
  query watchlist($id: ID!, $from: DateTime!, $interval: interval) {
    watchlist(id: $id) {
      id
      historicalStats(from: $from, to: "utc_now", interval: $interval) {
        datetime
        marketcapUsd
        volumeUsd
      }
    }
  }
`;
export const useHistoryStats = ({
  variables,
  skip
}) => {
  const {
    data,
    loading
  } = useQuery(WATCHLIST_STATS_HISTORY_QUERY, {
    variables,
    skip
  });
  return useMemo(() => {
    if (!data) return EMPTY_OBJ;
    const {
      historicalStats
    } = data.watchlist;
    const {
      length
    } = historicalStats;
    if (length === 0) return EMPTY_OBJ;
    const {
      marketcapUsd: firstMarketcap,
      volumeUsd: firstVolume
    } = historicalStats[0];
    const {
      marketcapUsd: lastMarketcap,
      volumeUsd: lastVolume
    } = historicalStats[length - 1];
    return {
      loading: loading,
      data: historicalStats,
      marketcap: formatNumber(lastMarketcap, formatOptions),
      volume: formatNumber(lastVolume, formatOptions),
      changeMarketcap: calcPercentageChange(firstMarketcap, lastMarketcap),
      changeVolume: calcPercentageChange(firstVolume, lastVolume)
    };
  }, [data]);
};