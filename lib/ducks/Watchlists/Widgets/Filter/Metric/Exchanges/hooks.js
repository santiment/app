import { useMemo } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
const ARRAY = [];
const EXCHANGES_QUERY = gql`
  query getMarketExchanges {
    getMarketExchanges {
      exchange
      assetsCount
      pairsCount
    }
  }
`;
const TOP_EXCHANGES = new Set(['binance', 'ftx', 'coinbase', 'bitfinex', 'kucoin', 'huobi', 'okex', 'bitmex', 'bybit', 'bitstamp', 'bittrex', 'gemini', 'kraken']);

const sortExchanges = (a, b) => {
  const isTopA = TOP_EXCHANGES.has(a.exchange.toLowerCase());
  const isTopB = TOP_EXCHANGES.has(b.exchange.toLowerCase());

  if (isTopA) {
    return isTopB ? 0 : -1;
  } else return isTopB ? 1 : 0;
};

export function useMarketExchanges() {
  const {
    data,
    loading
  } = useQuery(EXCHANGES_QUERY);
  return useMemo(() => [data ? data.getMarketExchanges.sort(sortExchanges) : ARRAY, loading], [data]);
}