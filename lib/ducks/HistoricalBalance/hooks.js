function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { useState, useMemo } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { walletMetricBuilder, priceMetricBuilder } from './utils';
import { WALLET_ASSETS_QUERY, ADDRESS_QUERY, RECENT_TRANSACTIONS_QUERY, TOP_TRANSACTIONS_QUERY } from './queries';
import { getAddressInfrastructure } from '../../utils/address';
import { getValidInterval } from '../SANCharts/IntervalSelector';
const DEFAULT_STATE = [];

const useWalletQuery = (query, variables, skip) => useQuery(query, {
  skip: !variables.infrastructure || skip,
  variables
});

export function getWalletMetrics(walletAssets, priceAssets) {
  const walletMetrics = walletAssets.map(walletMetricBuilder);
  const priceMetrics = priceAssets.map(priceMetricBuilder);
  return walletMetrics.concat(priceMetrics);
}
export const useWalletMetrics = (walletAssets, priceAssets) => useMemo(() => getWalletMetrics(walletAssets, priceAssets), [walletAssets, priceAssets]);
export function useBlockchainAddress(wallet) {
  const {
    data
  } = useWalletQuery(ADDRESS_QUERY, wallet);
  return data ? data.blockchainAddress : DEFAULT_STATE;
}
export const useAddressLabels = wallet => useBlockchainAddress(wallet).labels || DEFAULT_STATE;
export const useAddressNote = wallet => useBlockchainAddress(wallet).notes || '';
export function useWalletAssets(wallet) {
  const {
    data,
    loading,
    error
  } = useWalletQuery(WALLET_ASSETS_QUERY, wallet);
  return {
    walletAssets: data ? data.assetsHeldByAddress : DEFAULT_STATE,
    isLoading: loading,
    isError: error
  };
}
export function useRecentTransactions(wallet, page, skip) {
  const query = RECENT_TRANSACTIONS_QUERY;
  const variables = {
    page,
    address: wallet.address,
    infrastructure: wallet.infrastructure
  };
  const {
    data,
    loading
  } = useWalletQuery(query, variables, skip);
  return {
    transactions: data ? data.transactions : DEFAULT_STATE,
    isLoading: loading
  };
}
export function useTopTransactions(wallet, page, skip, project, dates) {
  const query = TOP_TRANSACTIONS_QUERY;
  const variables = {
    page,
    slug: project ? project.slug : 'ethereum',
    to: dates.to,
    from: dates.from,
    infrastructure: wallet.infrastructure,
    addressSelector: {
      address: wallet.address,
      transactionType: 'ALL'
    }
  };
  const {
    data,
    loading,
    error
  } = useWalletQuery(query, variables, skip);
  return {
    transactions: data && !error ? data.transactions : DEFAULT_STATE,
    isLoading: loading
  };
}
export function useSettings(defaultSettings) {
  const [settings, setSettings] = useState(defaultSettings);
  const {
    address
  } = settings;
  useMemo(() => settings.infrastructure = getAddressInfrastructure(address), [address]);

  function onAddressChange(address) {
    setSettings(_objectSpread(_objectSpread({}, settings), {}, {
      address
    }));
  }

  function changeTimePeriod(from, to, timeRange) {
    setSettings(state => _objectSpread(_objectSpread({}, state), {}, {
      timeRange,
      interval: getValidInterval(from, to),
      from: from.toISOString(),
      to: to.toISOString()
    }));
  }

  return {
    settings,
    changeTimePeriod,
    onAddressChange
  };
}