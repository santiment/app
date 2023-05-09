const _excluded = ["className"],
      _excluded2 = ["className"];

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { useRef, useCallback, useEffect, useMemo, useState } from 'react';
import cx from 'classnames';
import { useRenderQueueItem } from '../../ducks/renderQueue/viewport';
import { Skeleton } from '../Skeleton';
import { useAllTimeData, useTimeseries } from '../../ducks/Studio/timeseries/hooks';
import DashboardChartHeaderWrapper, { DashboardCalendar } from './DashboardChartHeader/DashboardChartHeaderWrapper';
import SharedAxisToggle from '../../ducks/Studio/Chart/SharedAxisToggle';
import { DesktopOnly, MobileOnly } from '../Responsive';
import { updateTooltipSettings } from '../../ducks/dataHub/tooltipSettings';
import { useChartColors } from '../../ducks/Chart/colors';
import { DEFAULT_INTERVAL_SELECTORS, INTERVAL_30_DAYS } from './utils';
import DashboardChartMetrics from './DashboardChartMetrics/DashboardChartMetrics';
import DashboardMetricChartWrapper from './DashboardMetricChartWrapper';
import DashboardMetricSelectors from './DashboardMetricSelectors/DashboardMetricSelectors';
import { getNewInterval, INTERVAL_ALIAS } from '../../ducks/SANCharts/IntervalSelector';
import { useMirroredTransformer } from '../../ducks/Studio/Widget/utils';
import { useDomainGroups } from '../../ducks/Chart/hooks';
import { extractMirrorMetricsDomainGroups } from '../../ducks/Chart/utils';
import PaywallInfo from '../../ducks/Studio/Chart/PaywallInfo';
import DexPriceMeasurement from '../../ducks/Dexs/PriceMeasurement/DexPriceMeasurement';
import DashIntervalSettings from './DashIntervalSettings/DashIntervalSettings';
import ContextMenu from '../../ducks/Studio/Chart/ContextMenu';
import { DEFAULT_OPTIONS } from '../../ducks/Studio/defaults';
import styles from './DashboardMetricChart.module.css';

const useBrush = ({
  data,
  settings,
  setSettings,
  metrics,
  slug
}) => {
  const [allTimeData, allTimeDataLoadings] = useAllTimeData(metrics, {
    slug
  });
  const onBrushChangeEnd = useCallback((startIndex, endIndex) => {
    const from = new Date(allTimeData[startIndex].datetime);
    const to = new Date(allTimeData[endIndex].datetime);
    const interval = getNewInterval(from, to);
    setSettings(_objectSpread(_objectSpread({}, settings), {}, {
      from,
      to,
      interval: INTERVAL_ALIAS[interval] || interval
    }));
  }, [data, setSettings, settings, allTimeData]);
  return {
    allTimeData,
    allTimeDataLoadings,
    onBrushChangeEnd
  };
};

export const useChartSettings = (defaultInterval, metric) => {
  const [settings, setSettings] = useState(_objectSpread({
    metric
  }, defaultInterval.requestParams));
  const [intervalSelector, setIntervalSelector] = useState(defaultInterval);
  const onChangeInterval = useCallback(value => {
    setSettings(data => {
      return _objectSpread(_objectSpread({}, data), value.requestParams);
    });
    setIntervalSelector(value);
  }, [setSettings, setIntervalSelector]);
  return {
    settings,
    intervalSelector,
    setSettings,
    onChangeInterval
  };
};

const DashboardMetricChart = ({
  metrics,
  defaultInterval = INTERVAL_30_DAYS,
  intervals = DEFAULT_INTERVAL_SELECTORS,
  metricSelectors,
  setRootMetric,
  rootMetric,
  metricsColor,
  setMeasurement,
  measurement,
  sliceMetricsCount = 1,
  onLoad,
  projectSelector,
  canvasSettings,
  useMetricsData = useTimeseries,
  noBrush = false,
  noIntervals = false,
  isSharedAxisDefault = false
}) => {
  const MetricTransformer = useMirroredTransformer(metrics);
  const [MetricSettingsMap] = useState(new Map());
  const [options, setOptions] = useState(DEFAULT_OPTIONS);
  const chartRef = useRef(null);
  const domainGroups = useDomainGroups(metrics);
  const mirrorDomainGroups = useMemo(() => extractMirrorMetricsDomainGroups(domainGroups), [domainGroups]);
  useEffect(() => {
    updateTooltipSettings(metrics);
  }, [metrics]);
  const {
    intervalSelector,
    settings,
    setSettings,
    onChangeInterval
  } = useChartSettings(defaultInterval);

  function updateSettingsMap({
    interval
  } = {}) {
    setSettings(_objectSpread(_objectSpread({}, settings), {}, {
      interval: interval || settings.interval
    }));
  }

  const [disabledMetrics, setDisabledMetrics] = useState({});
  const activeMetrics = useMemo(() => metrics.filter(({
    key
  }) => !disabledMetrics[key]), [metrics, disabledMetrics]);
  const [data, loadings] = useMetricsData(activeMetrics, settings, MetricSettingsMap, MetricTransformer);
  const {
    allTimeData = data,
    allTimeDataLoadings = [],
    onBrushChangeEnd
  } = noBrush ? {} : useBrush({
    settings,
    setSettings,
    data,
    metrics,
    slug: metrics[0].reqMeta.slug
  });
  const [isDomainGroupingActive, setIsDomainGroupingActive] = useState(isSharedAxisDefault || domainGroups && domainGroups.length > mirrorDomainGroups.length);
  const MetricColor = useChartColors(activeMetrics, metricsColor);
  useEffect(() => {
    if (onLoad && allTimeDataLoadings.length === 0 && loadings.length === 0) {
      onLoad();
    }
  }, [loadings, allTimeDataLoadings]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(DashboardChartHeaderWrapper, null, projectSelector, /*#__PURE__*/React.createElement(DashboardMetricSelectors, {
    metricSelectors: metricSelectors,
    rootMetric: rootMetric,
    setRootMetric: setRootMetric
  }), setMeasurement && /*#__PURE__*/React.createElement(DexPriceMeasurement, {
    onSelect: setMeasurement,
    defaultSelected: measurement,
    className: styles.measurements
  }), /*#__PURE__*/React.createElement("div", {
    className: styles.right
  }, domainGroups && domainGroups.length > mirrorDomainGroups.length && /*#__PURE__*/React.createElement(SharedAxisToggle, {
    isDomainGroupingActive: isDomainGroupingActive,
    setIsDomainGroupingActive: setIsDomainGroupingActive,
    className: styles.sharedAxisToggle
  }), /*#__PURE__*/React.createElement("div", {
    className: styles.gaps
  }, /*#__PURE__*/React.createElement(PaywallInfo, {
    metrics: activeMetrics
  })), /*#__PURE__*/React.createElement(DesktopOnly, null, /*#__PURE__*/React.createElement(DashboardCalendar, {
    interval: intervalSelector,
    setInterval: onChangeInterval,
    intervals: intervals
  })), /*#__PURE__*/React.createElement(ContextMenu, _extends({
    showDownload: true,
    setOptions: setOptions
  }, options, {
    data: data,
    activeMetrics: activeMetrics,
    chartRef: chartRef,
    classses: {
      settingsBtn: styles.settingsBtn
    },
    title: "Export"
  })))), /*#__PURE__*/React.createElement(DesktopOnly, null, /*#__PURE__*/React.createElement("div", {
    className: styles.settings
  }, /*#__PURE__*/React.createElement(DashboardChartMetrics, {
    metrics: metrics,
    loadings: loadings,
    toggleDisabled: setDisabledMetrics,
    disabledMetrics: disabledMetrics,
    colors: MetricColor
  }), noIntervals ? null : /*#__PURE__*/React.createElement(DashIntervalSettings, {
    metrics: metrics,
    settings: settings,
    updateInterval: updateSettingsMap
  }))), /*#__PURE__*/React.createElement(DashboardMetricChartWrapper, {
    metrics: activeMetrics,
    data: data,
    allTimeData: allTimeData,
    onBrushChangeEnd: onBrushChangeEnd,
    settings: settings,
    MetricColor: MetricColor,
    isDomainGroupingActive: isDomainGroupingActive,
    loadings: loadings,
    domainGroups: domainGroups,
    mirrorDomainGroups: mirrorDomainGroups,
    sliceMetricsCount: sliceMetricsCount,
    options: options,
    chartRef: chartRef,
    canvasSettings: canvasSettings
  }), /*#__PURE__*/React.createElement(MobileOnly, null, /*#__PURE__*/React.createElement(DashboardCalendar, {
    interval: intervalSelector,
    setInterval: onChangeInterval,
    intervals: intervals
  }), noIntervals ? null : /*#__PURE__*/React.createElement(DashIntervalSettings, {
    metrics: metrics,
    settings: settings,
    updateInterval: updateSettingsMap
  }), /*#__PURE__*/React.createElement(DashboardChartMetrics, {
    metrics: metrics,
    loadings: loadings,
    toggleDisabled: setDisabledMetrics,
    disabledMetrics: disabledMetrics,
    colors: MetricColor
  })));
};

export const QueuedDashboardMetricChart = _ref => {
  let {
    className
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  const containerRef = useRef();
  const {
    isRendered,
    onLoad
  } = useRenderQueueItem(containerRef);
  return /*#__PURE__*/React.createElement("div", {
    ref: containerRef,
    className: cx(styles.container, className)
  }, isRendered && /*#__PURE__*/React.createElement(DashboardMetricChart, _extends({}, props, {
    onLoad: onLoad
  })), /*#__PURE__*/React.createElement(Skeleton, {
    show: !isRendered,
    className: styles.skeleton
  }));
};
export default (_ref2 => {
  let {
    className
  } = _ref2,
      props = _objectWithoutProperties(_ref2, _excluded2);

  return /*#__PURE__*/React.createElement("div", {
    className: cx(styles.container, className)
  }, /*#__PURE__*/React.createElement(DashboardMetricChart, props));
});