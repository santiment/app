const _excluded = ["defaultSettings", "defaultOptions", "defaultMetrics", "linkedAssets", "allDetectedAssets", "classes"],
      _excluded2 = ["settings", "options", "metrics"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useState, useEffect, useRef, useMemo } from 'react';
import cx from 'classnames';
import { Metric } from '../dataHub/metrics';
import { useTimeseries, useAllTimeData } from '../Studio/timeseries/hooks';
import { generateShareLink } from '../Studio/url/generate';
import { updateHistory } from '../../utils/utils';
import SocialToolChart from './Chart';
import { buildMetrics } from './utils';
import { DEFAULT_SETTINGS, DEFAULT_OPTIONS, DEFAULT_METRICS } from './defaults';
import { getNewInterval, INTERVAL_ALIAS } from '../SANCharts/IntervalSelector';
import { useEdgeGaps } from '../Chart/hooks';
import styles from './index.module.css';

function useSocialTimeseries(activeMetrics, settings, MetricSettingMap) {
  const [metrics, setMetrics] = useState([]); // NOTE(haritonasty): prevent new fetch when not assigned label and map

  const shouldUpdate = useMemo(() => MetricSettingMap && activeMetrics[1].label !== 'Price', [activeMetrics]);
  useEffect(() => {
    if (shouldUpdate) {
      setMetrics(activeMetrics);
    }
  }, [activeMetrics]);
  return useTimeseries(shouldUpdate ? activeMetrics : metrics, settings, MetricSettingMap);
}

const SocialTool = _ref => {
  let {
    defaultSettings,
    defaultOptions,
    defaultMetrics,
    linkedAssets,
    allDetectedAssets,
    classes = {}
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  const defaultTopics = [defaultSettings.slug, ...defaultSettings.addedTopics];
  const defaultActiveMetrics = defaultTopics.length > 1 ? buildMetrics(defaultMetrics, defaultTopics) : defaultMetrics;
  const [settings, setSettings] = useState(defaultSettings);
  const [options, setOptions] = useState(defaultOptions);
  const [metrics, setMetrics] = useState(defaultMetrics);
  const [activeMetrics, setActiveMetrics] = useState(defaultActiveMetrics);
  const [MetricSettingMap, setMetricSettingMap] = useState();
  const [priceAsset, setPriceAsset] = useState();
  const [rawData, loadings] = useSocialTimeseries(activeMetrics, settings, MetricSettingMap);
  const data = useEdgeGaps(rawData);
  const [allTimeData] = useAllTimeData(activeMetrics, settings, MetricSettingMap);
  const [shareLink, setShareLink] = useState('');
  const chartRef = useRef(null);
  useEffect(() => {
    const {
      slug,
      addedTopics
    } = defaultSettings;

    if (slug === settings.slug && addedTopics.length === settings.addedTopics.length) {
      return;
    }

    setSettings(state => _objectSpread(_objectSpread({}, state), {}, {
      slug,
      addedTopics
    }));
    const topics = [slug, ...addedTopics];
    const newMetrics = topics.length > 1 ? buildMetrics(metrics, topics) : metrics;
    setActiveMetrics(newMetrics);
    rebuildMetricSettingMap(newMetrics);
  }, [defaultSettings.slug, defaultSettings.addedTopics]);
  useEffect(() => {
    rebuildMetricSettingMap(activeMetrics);
  }, [linkedAssets]);
  useEffect(() => {
    const {
      slug,
      addedTopics
    } = settings;
    const topics = [slug, ...addedTopics];
    const newMetrics = topics.length > 1 ? buildMetrics(metrics, topics) : metrics;
    setActiveMetrics(newMetrics);
    rebuildMetricSettingMap(newMetrics);
  }, [metrics]);
  useEffect(() => {
    if (priceAsset) {
      const newPriceMetric = _objectSpread(_objectSpread({}, Metric.price_usd), {}, {
        label: priceAsset.label,
        reqMeta: {
          slug: priceAsset.slug
        }
      });

      metrics[1] = newPriceMetric;
      setMetrics([...metrics]);
    }
  }, [priceAsset]);
  useEffect(() => {
    const metricSet = new Set(metrics);
    const metric = Metric.social_dominance_total;

    if (options.isSocialDominanceActive) {
      metricSet.add(metric);
    } else {
      metricSet.delete(metric);
    }

    if (metricSet.size !== metrics.length) {
      setMetrics([...metricSet]);
    }
  }, [options.isSocialDominanceActive]);
  useEffect(() => {
    const queryString = '?' + generateShareLink(settings, options);
    const {
      origin,
      pathname
    } = window.location;
    setShareLink(origin + pathname + queryString);
    updateHistory(queryString);
  }, [settings, options]);

  function rebuildMetricSettingMap(metrics) {
    const newMetricSettingMap = new Map(MetricSettingMap);
    metrics.forEach(metric => {
      const detectedAsset = linkedAssets.get(metric.text || defaultSettings.slug);

      if (metric.key !== Metric.price_usd.key) {
        newMetricSettingMap.set(metric, {
          selector: detectedAsset ? 'slug' : 'text',
          slug: detectedAsset ? detectedAsset.slug : metric.text || defaultSettings.slug
        });
      }
    });
    setMetricSettingMap(newMetricSettingMap);
  }

  function changeTimePeriod(from, to, timeRange) {
    const interval = getNewInterval(from, to);
    setSettings(state => _objectSpread(_objectSpread({}, state), {}, {
      timeRange,
      interval: INTERVAL_ALIAS[interval] || interval,
      from: from.toISOString(),
      to: to.toISOString()
    }));
  }

  return /*#__PURE__*/React.createElement("div", {
    className: cx(styles.wrapper, classes.wrapper)
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.chart
  }, /*#__PURE__*/React.createElement(SocialToolChart, _extends({}, props, {
    className: styles.canvas,
    chartRef: chartRef,
    options: options,
    settings: settings,
    shareLink: shareLink,
    metrics: activeMetrics,
    priceAsset: priceAsset,
    data: data,
    loadings: loadings,
    brushData: allTimeData,
    setOptions: setOptions,
    setSettings: setSettings,
    setPriceAsset: setPriceAsset,
    changeTimePeriod: changeTimePeriod,
    linkedAssets: linkedAssets,
    allDetectedAssets: allDetectedAssets
  }))));
};

export default (_ref2 => {
  let {
    settings,
    options,
    metrics
  } = _ref2,
      props = _objectWithoutProperties(_ref2, _excluded2);

  return /*#__PURE__*/React.createElement(SocialTool, _extends({}, props, {
    defaultSettings: _objectSpread(_objectSpread({}, DEFAULT_SETTINGS), settings),
    defaultOptions: _objectSpread(_objectSpread({}, DEFAULT_OPTIONS), options),
    defaultMetrics: metrics || DEFAULT_METRICS
  }));
});