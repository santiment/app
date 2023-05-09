const _excluded = ["className", "chartRef", "data", "brushData", "settings", "options", "setOptions", "loadings", "metrics", "boundaries", "setSettings", "linkedAssets", "allDetectedAssets"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useState, useMemo } from 'react';
import cx from 'classnames';
import { linearScale, logScale } from '@santiment-network/chart/scales';
import ChartHeader from './Header';
import Canvas from './Canvas';
import DetailedBlock from './Detailed';
import SocialDominanceToggle from './SocialDominanceToggle';
import { useChartColors } from './colors';
import { useMetricCategories } from '../../Chart/Synchronizer';
import PaywallInfo from '../../Studio/Chart/PaywallInfo';
import { useDomainGroups } from '../../Chart/hooks';
import { extractMirrorMetricsDomainGroups } from '../../Chart/utils';
import ChartActiveMetrics from '../../Studio/Chart/ActiveMetrics';
import styles from './index.module.css';
import SharedAxisToggle from '../../Studio/Chart/SharedAxisToggle';

const Chart = _ref => {
  let {
    className,
    chartRef,
    data,
    brushData,
    settings,
    options,
    setOptions,
    loadings,
    metrics,
    boundaries,
    setSettings,
    linkedAssets,
    allDetectedAssets
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  const [FocusedMetric, setFocusedMetric] = useState();
  const MetricColor = useChartColors(metrics, FocusedMetric);
  const categories = useMetricCategories(metrics);
  const domainGroups = useDomainGroups(metrics);
  const mirrorDomainGroups = useMemo(() => extractMirrorMetricsDomainGroups(domainGroups), [domainGroups]);
  const [isDomainGroupingActive, setIsDomainGroupingActive] = useState(domainGroups && domainGroups.length > mirrorDomainGroups.length);
  const scale = options.isLogScale ? logScale : linearScale;
  const detectedAsset = allDetectedAssets.get(settings.slug) || {};

  function onMetricHover(metric) {
    setFocusedMetric(metric);
  }

  function onMetricHoverEnd() {
    setFocusedMetric();
  }

  function onBrushChangeEnd(startIndex, endIndex) {
    props.changeTimePeriod(new Date(brushData[startIndex].datetime), new Date(brushData[endIndex].datetime));
  }

  const {
    priceAsset
  } = props;
  return /*#__PURE__*/React.createElement("div", {
    className: cx(styles.wrapper, className)
  }, /*#__PURE__*/React.createElement(ChartHeader, _extends({}, props, {
    chartRef: chartRef,
    data: data,
    allDetectedAssets: allDetectedAssets,
    activeMetrics: metrics,
    options: options,
    settings: settings,
    setOptions: setOptions,
    setSettings: setSettings,
    className: styles.top
  }), /*#__PURE__*/React.createElement("h3", {
    className: styles.title
  }, "Social Volume"), domainGroups && domainGroups.length > mirrorDomainGroups.length && /*#__PURE__*/React.createElement(SharedAxisToggle, {
    isDomainGroupingActive: isDomainGroupingActive,
    setIsDomainGroupingActive: setIsDomainGroupingActive,
    className: styles.sharedAxisToggle
  })), /*#__PURE__*/React.createElement("div", {
    className: styles.bottom
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.metrics
  }, /*#__PURE__*/React.createElement(ChartActiveMetrics, {
    className: styles.metric,
    MetricColor: MetricColor,
    activeMetrics: metrics,
    loadings: loadings,
    onMetricHover: onMetricHover,
    onMetricHoverEnd: onMetricHoverEnd,
    project: priceAsset
  })), /*#__PURE__*/React.createElement(PaywallInfo, {
    boundaries: boundaries,
    metrics: metrics
  }), /*#__PURE__*/React.createElement(SocialDominanceToggle, {
    className: styles.dominance,
    options: options,
    setOptions: setOptions
  })), /*#__PURE__*/React.createElement(Canvas, {
    chartRef: chartRef,
    scale: scale,
    data: data,
    brushData: brushData,
    options: options,
    settings: settings,
    domainGroups: isDomainGroupingActive ? domainGroups : mirrorDomainGroups,
    categories: categories,
    metrics: metrics,
    colors: MetricColor,
    onBrushChangeEnd: onBrushChangeEnd
  }), settings.addedTopics.length === 0 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(DetailedBlock, _extends({}, options, props, {
    options: options,
    scale: scale,
    type: "general",
    MetricColor: MetricColor,
    settings: settings,
    allDetectedAssets: allDetectedAssets,
    linkedAssets: linkedAssets
  }), /*#__PURE__*/React.createElement(ChartHeader, _extends({}, props, {
    chartRef: chartRef,
    data: data,
    allDetectedAssets: allDetectedAssets,
    activeMetrics: metrics,
    options: options,
    settings: settings,
    setOptions: setOptions,
    setSettings: setSettings,
    className: cx(styles.top, styles.detailed)
  }), /*#__PURE__*/React.createElement("h3", {
    className: styles.title
  }, "Detailed charts"))), /*#__PURE__*/React.createElement(DetailedBlock, _extends({}, options, props, {
    options: options,
    scale: scale,
    type: "community",
    MetricColor: MetricColor,
    settings: settings,
    linkedAssets: linkedAssets,
    allDetectedAssets: allDetectedAssets
  }), /*#__PURE__*/React.createElement(ChartHeader, _extends({}, props, {
    chartRef: chartRef,
    data: data,
    allDetectedAssets: allDetectedAssets,
    activeMetrics: metrics,
    options: options,
    settings: settings,
    setOptions: setOptions,
    setSettings: setSettings,
    className: cx(styles.top, styles.detailed)
  }), /*#__PURE__*/React.createElement("h3", {
    className: styles.title
  }, detectedAsset.ticker, " own community charts")))));
};

export default Chart;