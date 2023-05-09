function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { useMemo, useState, useEffect } from 'react';
import { getValidTooltipKey, findTooltipMetric } from './utils';
import { Node } from './nodes';
import { setupColorGenerator } from '../SANCharts/utils';
import { Metric } from '../dataHub/metrics'; // import COLOR from '@santiment-network/ui/variables.scss'

import { Color as COLOR } from 'san-studio/lib/Chart/theme';
const cache = new Map();
const METRIC_NODE = {};
const allNodes = Object.values(Node).map(node => node + 's');
export function metricsToPlotCategories(metrics, MetricNode = METRIC_NODE) {
  const requestedData = {
    joinedCategories: [],
    areas: [],
    metrics
  };
  allNodes.forEach(node => {
    requestedData[node] = [];
  });
  const {
    joinedCategories
  } = requestedData;
  metrics.forEach(item => {
    const {
      key,
      dataKey = key,
      node
    } = item;
    requestedData[(MetricNode[key] || node) + 's'].push(dataKey);
    joinedCategories.push(dataKey);
  });
  return requestedData;
}
export const clearCache = () => cache.clear();
export const getSyncedColors = metrics => {
  const cacheKey = metrics.map(({
    key
  }) => key).toString();
  const cachedColors = cache.get(cacheKey);

  if (cachedColors) {
    return cachedColors;
  }

  const generateColor = setupColorGenerator();
  const colors = metrics.reduce((acc, {
    key,
    dataKey = key,
    color
  }) => {
    acc[dataKey] = COLOR[generateColor(color)];
    return acc;
  }, {});
  cache.set(cacheKey, colors);
  return colors;
};
const {
  price_usd
} = Metric;

function colorTrend(position) {
  if (position < 4) {
    return COLOR.persimmon;
  }

  if (position < 7) {
    return COLOR['texas-rose-hover'];
  }

  return COLOR['bright-sun'];
}

export function prepareEvents(events) {
  return events.map(({
    datetime,
    position
  }) => {
    const date = +new Date(datetime);
    const color = colorTrend(position);
    return {
      key: 'trendingPosition',
      metric: 'priceUsd',
      datetime: date,
      value: [position, color],
      color
    };
  });
}
export const useMetricCategories = (metrics, MetricNode) => useMemo(() => metricsToPlotCategories(metrics, MetricNode), [metrics, MetricNode]);

const Synchronizer = ({
  children,
  metrics,
  isMultiChartsActive,
  events
}) => {
  const [syncedTooltipDate, syncTooltips] = useState();
  const [syncedEvents, syncEvents] = useState();
  const [syncedCategories, syncCategories] = useState([]);
  const [noPriceMetrics, setNoPriceMetrics] = useState([]);
  const [hasPriceMetric, setHasPriceMetric] = useState();
  const [isValidMulti, setIsValidMulti] = useState();
  useEffect(() => {
    const noPriceMetrics = metrics.filter(metric => metric !== price_usd);
    const hasPriceMetric = metrics.length !== noPriceMetrics.length;
    const isValidMulti = isMultiChartsActive && noPriceMetrics.length > 1;
    const categories = [];

    if (isValidMulti) {
      noPriceMetrics.forEach(metric => categories.push(metricsToPlotCategories(hasPriceMetric ? [metric, price_usd] : [metric])));
    } else {
      categories.push(metricsToPlotCategories(metrics));
    }

    syncCategories(categories);
    syncEvents(events);
    setNoPriceMetrics(noPriceMetrics);
    setHasPriceMetric(hasPriceMetric);
    setIsValidMulti(isValidMulti);
  }, [metrics, events, isMultiChartsActive]);
  useEffect(() => clearCache, []);

  if (syncedCategories.length === 0 || metrics.length === 0) {
    return null;
  }

  return isValidMulti ? syncedCategories.map((categories, i) => {
    const metric = noPriceMetrics[i];

    if (!metric) {
      return null;
    }

    const tooltipKey = getMetricKey(hasPriceMetric ? price_usd : metric);
    return /*#__PURE__*/React.cloneElement(children, _objectSpread(_objectSpread({
      key: metric.key,
      index: i,
      isMultiChartsActive,
      syncedTooltipDate,
      syncTooltips,
      hasPriceMetric,
      tooltipKey
    }, categories), {}, {
      events: syncedEvents
    }));
  }) : /*#__PURE__*/React.cloneElement(children, _objectSpread(_objectSpread({}, syncedCategories[0]), {}, {
    isMultiChartsActive: false,
    hasPriceMetric,
    events: syncedEvents,
    tooltipKey: getValidTooltipKey(getMetricKey(findTooltipMetric(metrics)), syncedCategories[0].joinedCategories)
  }));
};

function getMetricKey({
  key,
  dataKey = key
}) {
  return dataKey;
}

Synchronizer.defaultProps = {
  metrics: []
};
export default Synchronizer;