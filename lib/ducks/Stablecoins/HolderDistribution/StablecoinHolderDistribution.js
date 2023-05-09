function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { useCallback, useEffect, useState } from 'react';
import cx from 'classnames';
import withSizes from 'react-sizes';
import { mapSizesToProps } from '../../../utils/withSizes';
import { HolderDistributionMetric } from '../../Studio/Chart/Sidepanel/HolderDistribution/metrics';
import TopHolders from '../../Studio/Chart/Sidepanel/HolderDistribution';
import { useAllTimeData, useTimeseries } from '../../Studio/timeseries/hooks';
import { useChartColors } from '../../Chart/colors';
import Chart from '../../Chart';
import { useAxesMetricsKey } from '../../Chart/hooks';
import { metricsToPlotCategories } from '../../Chart/Synchronizer';
import { StablecoinsSelector } from '../StablecoinSelector/ProjectsSelectors';
import { MobileOnly } from '../../../components/Responsive';
import DashboardChartHeaderWrapper, { DashboardIntervals } from '../../../components/DashboardMetricChart/DashboardChartHeader/DashboardChartHeaderWrapper';
import { HOLDERS_DISTRIBUTION_6M, HOLDERS_DISTRIBUTION_MOBILE_INTERVALS } from '../StablecoinsMarketCap/utils';
import { getIntervalByTimeRange } from '../../../utils/dates';
import PaywallInfo from '../../Studio/Chart/PaywallInfo';
import { usePhase, Phase } from '../../Studio/phases';
import { checkIfWasNotMerged, buildMergedMetric } from '../../Studio/Widget/HolderDistributionWidget/utils';
import styles from './StablecoinHolderDistribution.module.css';
const DEFAULT_CHECKED_METRICS = new Set();
const CHART_HEIGHT = 524;
const CHART_PADDING_MOBILE = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0
};
export const DEFAULT_STABLECOIN = {
  id: '1552',
  name: 'Tether',
  slug: 'tether',
  ticker: 'USDT',
  rank: 4,
  marketcapUsd: 10010463777.928583,
  __typename: 'Project'
};

const DEFAULT_SETTINGS = _objectSpread(_objectSpread({}, getIntervalByTimeRange('183d')), {}, {
  interval: '1d'
});

const StablecoinHolderDistribution = ({
  isDesktop,
  className
}) => {
  const [interval, setInterval] = useState(HOLDERS_DISTRIBUTION_6M);
  const [asset, setAsset] = useState(DEFAULT_STABLECOIN);
  const [checkedMetrics, setSelectedMetrics] = useState(DEFAULT_CHECKED_METRICS);
  const [metrics, setMetrics] = useState([HolderDistributionMetric.holders_distribution_100_to_1k, HolderDistributionMetric.holders_distribution_1k_to_10k]);
  const [mergedMetrics, setMergedMetrics] = useState([]);
  const {
    currentPhase,
    setPhase
  } = usePhase();
  const [settings, setSettings] = useState(_objectSpread(_objectSpread({}, DEFAULT_SETTINGS), {}, {
    slug: asset.slug
  }));
  const MetricColor = useChartColors(metrics);
  useEffect(() => {
    setSettings(_objectSpread(_objectSpread({}, settings), {}, {
      slug: asset.slug
    }));
  }, [asset]);
  const [data] = useTimeseries(metrics, settings);
  const [allTimeData] = useAllTimeData(metrics, {
    slug: asset.slug
  });
  const onBrushChangeEnd = useCallback((startIndex, endIndex) => {
    const from = new Date(allTimeData[startIndex].datetime);
    const to = new Date(allTimeData[endIndex].datetime);
    setSettings(_objectSpread(_objectSpread({}, settings), {}, {
      from,
      to
    }));
  }, [data, setSettings, settings, allTimeData]);
  const onChangeInterval = useCallback(interval => {
    setInterval(interval);
    setSettings(_objectSpread(_objectSpread({}, settings), getIntervalByTimeRange(interval.value)));
  }, [settings, setSettings, setInterval]);
  const axesMetricKeys = useAxesMetricsKey([...metrics].reverse());
  const categories = metricsToPlotCategories(metrics, {});
  const toggleMetric = useCallback(metric => {
    if (currentPhase !== Phase.IDLE) {
      return checkMetric(metric);
    }

    const found = metrics.find(x => x === metric);

    if (found) {
      setMetrics(metrics.filter(x => x !== metric));
    } else {
      setMetrics([...metrics, metric]);
    }
  }, [metrics, setMetrics, currentPhase, checkMetric]);

  function checkMetric(metric) {
    const newCheckedMetrics = new Set(checkedMetrics);

    if (checkedMetrics.has(metric)) {
      newCheckedMetrics.delete(metric);
    } else {
      newCheckedMetrics.add(metric);
    }

    setSelectedMetrics(newCheckedMetrics);
  }

  function onMergeClick() {
    setPhase(Phase.MAPVIEW);
  }

  function onMergeConfirmClick() {
    if (checkedMetrics.size > 1) {
      const metric = buildMergedMetric([...checkedMetrics]);

      if (checkIfWasNotMerged(metric.key, mergedMetrics)) {
        setMetrics([...metrics, metric]);
        setMergedMetrics([...mergedMetrics, metric]);
      }
    }

    setPhase(Phase.IDLE);
    setSelectedMetrics(DEFAULT_CHECKED_METRICS);
  }

  function onUnmergeClick(metric) {
    const metricFilter = m => m !== metric;

    setMetrics(metrics.filter(metricFilter));
    setMergedMetrics(mergedMetrics.filter(metricFilter));
  }

  return /*#__PURE__*/React.createElement("div", {
    className: cx(styles.container, className)
  }, /*#__PURE__*/React.createElement(MobileOnly, null, /*#__PURE__*/React.createElement(DashboardChartHeaderWrapper, {
    title: "Holder Distribution"
  })), /*#__PURE__*/React.createElement("div", {
    className: styles.chartContainer
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.header
  }, /*#__PURE__*/React.createElement(StablecoinsSelector, {
    asset: asset,
    setAsset: setAsset
  }), /*#__PURE__*/React.createElement("div", {
    className: styles.gaps
  }, /*#__PURE__*/React.createElement(PaywallInfo, {
    metrics: metrics
  }))), /*#__PURE__*/React.createElement(Chart, _extends({}, settings, categories, {
    data: data,
    brushData: allTimeData,
    hideBrush: !isDesktop,
    onBrushChangeEnd: onBrushChangeEnd,
    chartHeight: CHART_HEIGHT,
    metrics: metrics,
    isCartesianGridActive: isDesktop,
    MetricColor: MetricColor,
    tooltipKey: axesMetricKeys[0],
    hideWatermark: !isDesktop,
    axesMetricKeys: isDesktop ? axesMetricKeys : [],
    resizeDependencies: isDesktop ? [axesMetricKeys] : [],
    className: styles.chart,
    chartPadding: isDesktop ? undefined : CHART_PADDING_MOBILE
  }))), /*#__PURE__*/React.createElement(MobileOnly, null, /*#__PURE__*/React.createElement(DashboardIntervals, {
    setInterval: onChangeInterval,
    interval: interval,
    intervals: HOLDERS_DISTRIBUTION_MOBILE_INTERVALS
  })), /*#__PURE__*/React.createElement("div", {
    className: styles.metrics
  }, /*#__PURE__*/React.createElement(TopHolders, {
    toggleMetric: toggleMetric,
    MetricColor: MetricColor,
    metrics: metrics,
    currentPhase: currentPhase,
    checkedMetrics: checkedMetrics,
    mergedMetrics: mergedMetrics,
    onMergeClick: onMergeClick,
    onMergeConfirmClick: onMergeConfirmClick,
    onUnmergeClick: onUnmergeClick
  })));
};

export default withSizes(mapSizesToProps)(StablecoinHolderDistribution);