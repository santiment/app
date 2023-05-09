function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { useCallback } from 'react';
import { Metric } from '../dataHub/metrics';
export function mapDEXMetrics({
  metrics,
  measurement,
  slug: priceSlug,
  ticker = priceSlug
}) {
  const measurementSlug = measurement.slug.replace(/-/g, '_');
  const dexMetrics = metrics.map(({
    key,
    label
  }) => {
    return {
      key: `${measurementSlug}_${key}`,
      queryKey: key,
      label,
      node: 'bar',
      fill: true,
      domainGroup: 'decentralized_exchanges',
      reqMeta: {
        slug: measurement.slug
      }
    };
  });

  if (priceSlug) {
    dexMetrics.push(_objectSpread(_objectSpread({}, Metric.price_usd), {}, {
      label: `Price (${ticker})`,
      reqMeta: {
        slug: priceSlug
      }
    }));
  }

  return dexMetrics;
}
export const DEFAULT_DEX_PROJECT = {
  slug: 'ethereum',
  ticker: 'Ethereum'
};
export const useProjectMetricBuilder = ({
  measurement,
  baseMetrics
}) => {
  return useCallback(({
    slug,
    ticker
  }) => {
    if (!slug) {
      return [];
    }

    return mapDEXMetrics({
      metrics: baseMetrics,
      measurement,
      slug,
      ticker
    });
  }, [measurement]);
};