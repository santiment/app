const _excluded = ["__typename", "id", "signals", "ethAddresses"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import qs from 'query-string';
import { useCallback, useEffect, useMemo, useState } from 'react';
import queryString from 'query-string';
import { INFOGRAPHICS } from './Widgets/VolumeChart/utils';
import { getAddressInfrastructure } from '../../utils/address';
export const ALL_PROJECTS_WATCHLIST_SLUG = 'projects';
export function getWatchlistId(search) {
  const {
    name: str
  } = qs.parse(search) || {};

  if (str) {
    const [, id] = str.split('@');
    return id;
  }
}
export function hasAssetById({
  id,
  listItems
}) {
  if (!id || !listItems) return;
  return listItems.some(({
    id: projectId
  }) => projectId === id);
}
export function hasAddress(listItems, source) {
  if (!source || !listItems) return;
  return listItems.some(({
    address: target
  }) => target === source.address);
}
export const getWatchlistName = ({
  type,
  location: {
    search
  }
}) => {
  switch (type) {
    case 'screener':
      return 'My Screener';

    case 'list':
      const name = (qs.parse(search).name || '').split('@')[0];
      return name;

    default:
      return 'Assets';
  }
};
export const normalizeCSV = items => {
  return items.map(item => {
    const {
      __typename,
      id,
      signals,
      ethAddresses
    } = item,
          rest = _objectWithoutProperties(item, _excluded);

    const _ethAddresses = ethAddresses ? ethAddresses.map(address => `https://app.santiment.net/balance?address=${address.address}&assets[]=ethereum`) : undefined;

    if (_ethAddresses && _ethAddresses.length > 0) {
      return _objectSpread({
        _ethAddresses
      }, rest);
    }

    return rest;
  });
};
export const getHelmetTags = (isList, listName) => {
  const isWatchlist = isList && listName;
  return {
    title: isWatchlist ? `Crypto Watchlist: ${listName} - Sanbase` : 'All Crypto Assets - Sanbase',
    description: isWatchlist ? 'Santiment Watchlists let you keep track of different crypto projects, and compare their performance, on-chain behavior and development activity.' : 'Financial, on-chain and development data for 1100+ crypto projects in the Santiment database, including BTC, XRP, ETH and 700+ ERC-20 tokens'
  };
};
const DEFAULT_SCREENER_URL_PARAMS = {
  isPriceChartActive: false,
  isPriceTreeMap: false,
  isVolumeTreeMap: false,
  isMovement: false,
  [INFOGRAPHICS.PRICE_BAR_CHART]: {
    interval: '24h'
  },
  [INFOGRAPHICS.SOCIAL_VOLUME_TREE_MAP]: {
    interval: '24h'
  },
  [INFOGRAPHICS.PRICE_TREE_MAP]: {
    interval: '24h'
  }
};
export const useScreenerUrl = ({
  location,
  history,
  defaultParams
}) => {
  const predefined = useMemo(() => {
    return _objectSpread(_objectSpread({}, DEFAULT_SCREENER_URL_PARAMS), defaultParams);
  }, [defaultParams]);
  const [widgets, setWidgets] = useState(predefined);
  const parsedUrl = useMemo(() => queryString.parse(location.search), [location.search]);
  const getCharts = useCallback(() => parsedUrl && parsedUrl.charts ? JSON.parse(parsedUrl.charts) : predefined, [parsedUrl, predefined]);
  useEffect(() => {
    const charts = getCharts();
    if (charts) setWidgets(charts);
  }, []);
  const urlChange = useCallback(data => {
    const oldCharts = getCharts();
    history.replace(`${window.location.pathname}?${queryString.stringify(_objectSpread(_objectSpread({}, parsedUrl), {}, {
      charts: JSON.stringify(_objectSpread(_objectSpread({}, oldCharts), data))
    }))}`);
  }, [parsedUrl]);
  useEffect(() => {
    urlChange(widgets);
  }, [widgets]);
  return {
    widgets,
    setWidgets
  };
};
export const useScreenerUrlUpdaters = (widgets, setWidgets) => {
  const onChangeSettings = useCallback((key, {
    label: interval,
    sorter,
    currency
  }) => {
    const widget = widgets[key];
    setWidgets(_objectSpread(_objectSpread({}, widgets), {}, {
      [key]: _objectSpread(_objectSpread({}, widget), {}, {
        interval: interval || widget.interval,
        sorter: sorter || widget.sorter,
        currency: currency || widget.currency
      })
    }));
  }, [widgets, setWidgets]);
  return {
    onChangeSettings
  };
};
export const mapAddressToAPIType = ({
  address,
  infrastructure,
  notes
}) => {
  return {
    blockchainAddress: {
      address,
      infrastructure: infrastructure || getAddressInfrastructure(address),
      notes
    }
  };
};