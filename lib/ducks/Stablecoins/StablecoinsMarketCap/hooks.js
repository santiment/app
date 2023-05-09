function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { Metric } from '../../dataHub/metrics';
import { useMemo } from 'react';
import { CHECKING_STABLECOINS } from './utils';

function buildStablecoinMetrics(rootMetric) {
  const {
    key: queryKey,
    node
  } = rootMetric;
  const metrics = CHECKING_STABLECOINS.filter(metric => queryKey === Metric.price_usd.key ? metric.key !== 'TOTAL_MARKET' : metric.key !== 'BTC');
  return metrics.map(metric => _objectSpread(_objectSpread({}, metric), {}, {
    node,
    queryKey,
    domainGroup: metric.key === 'TOTAL_MARKET' || metric.key === 'BTC' ? 'total' : 'stablecoins'
  }));
}

export const useStablecoinMetrics = rootMetric => useMemo(() => buildStablecoinMetrics(rootMetric), [rootMetric]);