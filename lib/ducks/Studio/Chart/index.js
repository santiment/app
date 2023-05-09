function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useState, useEffect, useMemo } from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import { linearScale, logScale } from '@santiment-network/chart/scales';
import ChartMetricSettings from './MetricSettings';
import ChartPaywallInfo from './PaywallInfo';
import ChartActiveMetrics from './ActiveMetrics';
import ChartCanvas from './Canvas';
import SharedAxisToggle from './SharedAxisToggle';
import ContextMenu from './ContextMenu';
import ChartFullscreenBtn from './Fullscreen';
import Controls from './Controls';
import { extractIndicatorDomainGroups } from '../utils';
import { useMetricColor } from '../Widget/ChartWidgetColorProvider';
import { useAllTimeData } from '../timeseries/hooks';
import { useMetricCategories } from '../../Chart/Synchronizer';
import { useDomainGroups } from '../../Chart/hooks';
import { useHighlightMetricColor } from '../../Chart/colors';
import { extractMirrorMetricsDomainGroups } from '../../Chart/utils';
import { CursorType, useChartCursorType } from '../../Chart/cursor';
import { useUser } from '../../../stores/user';
import { getTimeIntervalFromToday, DAY } from '../../../utils/dates';
import styles from './index.module.css';

const Chart = ({
  index,
  widget,
  className,
  chartRef,
  data,
  eventsData,
  settings,
  options,
  loadings,
  eventLoadings,
  metrics,
  activeEvents,
  shareLink,
  ErrorMsg,
  MetricNode,
  toggleMetric,
  toggleMetricLock,
  isICOPriceActive,
  isSingleWidget,
  isSelectingRange,
  changeTimePeriod,
  rerenderWidgets,
  TopLeftComponent = ChartActiveMetrics,
  setIsICOPriceDisabled,
  setOptions,
  onPointMouseUp,
  onRangeSelected,
  onRangeSelecting,
  onDeleteChartClick,
  syncTooltips
}) => {
  const {
    isLoggedIn
  } = useUser();
  const chartCursor = useChartCursorType(CursorType.FREE);
  const isNewDrawingState = useState(false);
  const isDrawingState = useState(false);
  const selectedLineState = useState();
  const categories = useMetricCategories(metrics, MetricNode);
  const [isDomainGroupingActive, setIsDomainGroupingActive] = useState();
  const [focusedMetricKey, setFocusedMetricKey] = useState();
  const [focusTimer, setFocusTimer] = useState();
  const [metricSettings, setMetricSettings] = useState();
  const MetricColor = useMetricColor();
  const HighlightedMetricColor = useHighlightMetricColor(MetricColor, focusedMetricKey);
  const domainGroups = useDomainGroups(metrics);
  const mirrorDomainGroups = useMemo(() => {
    const mirrorDomains = extractMirrorMetricsDomainGroups(domainGroups) || [];
    return mirrorDomains.concat(extractIndicatorDomainGroups(widget.MetricIndicators));
  }, [domainGroups]);
  const [allTimeData] = useAllTimeData(metrics, settings, widget.MetricSettingMap);
  const isBlurred = !isLoggedIn && index > 1;
  const scale = options.isLogScale ? logScale : linearScale;
  useEffect(onMetricHoverEnd, [metrics]);
  useEffect(() => {
    if (!metricSettings || metrics.includes(metricSettings)) return;
    setMetricSettings();
  }, [metrics]);

  function onMetricHover(metric, {
    currentTarget
  }) {
    const {
      parentNode
    } = currentTarget; // HACK: For some reason, fast pointer movement can trigger 'mouseenter' but not 'mouseleave'
    // Hence, a metric might be stucked in the highlighted state [@vanguard | Jun 14, 2020]

    setFocusTimer(setTimeout(() => {
      if (parentNode.querySelector(':hover')) {
        setFocusedMetricKey(metric.key);
      }
    }, 60));
  }

  function onMetricHoverEnd() {
    clearTimeout(focusTimer);
    setFocusedMetricKey();
  }

  function onBrushChangeEnd(startIndex, endIndex) {
    const start = allTimeData[startIndex];
    const end = allTimeData[endIndex];

    if (start && end) {
      const endDate = endIndex === allTimeData.length - 1 ? getTimeIntervalFromToday(0, DAY).to : new Date(end.datetime);
      changeTimePeriod(new Date(start.datetime), endDate);
    }
  }

  function onMetricSettingsClick(metric) {
    setMetricSettings(metric === metricSettings ? undefined : metric);
  }

  function onMetricRemove(metric) {
    if (metric === metricSettings) {
      setMetricSettings();
    }

    toggleMetric(metric);
  }

  return /*#__PURE__*/React.createElement("div", {
    className: cx(styles.wrapper, className)
  }, /*#__PURE__*/React.createElement("div", {
    className: cx(styles.top, isBlurred && styles.blur)
  }, /*#__PURE__*/React.createElement(Controls, {
    chartRef: chartRef,
    chartCursor: chartCursor,
    selectedLineState: selectedLineState,
    isDrawingState: isDrawingState,
    isNewDrawingState: isNewDrawingState,
    rerenderWidgets: rerenderWidgets
  }), /*#__PURE__*/React.createElement("div", {
    className: styles.meta
  }, /*#__PURE__*/React.createElement(ChartPaywallInfo, {
    metrics: metrics
  }), domainGroups && domainGroups.length > mirrorDomainGroups.length && /*#__PURE__*/React.createElement(SharedAxisToggle, {
    isDomainGroupingActive: isDomainGroupingActive,
    setIsDomainGroupingActive: setIsDomainGroupingActive
  }), /*#__PURE__*/React.createElement(ContextMenu, _extends({}, options, {
    classes: styles,
    chartRef: chartRef,
    title: settings.title,
    activeMetrics: metrics,
    data: data,
    shareLink: shareLink,
    MetricNode: MetricNode,
    setOptions: setOptions,
    onDeleteChartClick: isSingleWidget ? undefined : onDeleteChartClick
  })), /*#__PURE__*/React.createElement(ChartFullscreenBtn, {
    widget: widget,
    categories: categories,
    options: options,
    settings: settings,
    metrics: metrics,
    activeEvents: activeEvents,
    scale: scale,
    brushData: allTimeData,
    MetricColor: MetricColor,
    MetricNode: MetricNode,
    ErrorMsg: ErrorMsg,
    shareLink: shareLink,
    drawings: widget.drawings,
    selectedLineState: selectedLineState,
    cursorType: chartCursor.cursorType,
    isDrawingState: isDrawingState,
    isNewDrawingState: isNewDrawingState,
    setIsICOPriceDisabled: setIsICOPriceDisabled
  }))), /*#__PURE__*/React.createElement("div", {
    className: styles.metrics
  }, /*#__PURE__*/React.createElement(TopLeftComponent, {
    isWithSettings: true,
    className: styles.metric,
    settings: settings,
    MetricColor: MetricColor,
    activeMetrics: metrics,
    activeEvents: activeEvents,
    metricSettings: metricSettings,
    loadings: loadings,
    ErrorMsg: ErrorMsg,
    eventLoadings: eventLoadings,
    isSingleWidget: isSingleWidget,
    isLoggedIn: isLoggedIn,
    toggleMetric: onMetricRemove,
    onLockClick: toggleMetricLock,
    onMetricHover: onMetricHover,
    onMetricHoverEnd: onMetricHoverEnd,
    onSettingsClick: onMetricSettingsClick,
    onDeleteChartClick: isSingleWidget ? undefined : onDeleteChartClick
  })), metricSettings && /*#__PURE__*/React.createElement(ChartMetricSettings, {
    className: styles.settings,
    metric: metricSettings,
    interval: settings.interval,
    slug: settings.slug,
    widget: widget,
    from: settings.from,
    to: settings.to,
    MetricNode: MetricNode,
    toggleMetric: onMetricRemove,
    rerenderWidgets: rerenderWidgets
  }), /*#__PURE__*/React.createElement(ChartCanvas, {
    className: cx(styles.chart, isBlurred && styles.blur),
    chartRef: chartRef,
    widget: widget,
    data: data,
    brushData: allTimeData,
    categories: categories,
    colors: HighlightedMetricColor,
    metrics: metrics,
    ErrorMsg: ErrorMsg,
    scale: scale,
    settings: settings,
    options: options,
    cursorType: chartCursor.cursorType,
    drawings: widget.drawings,
    domainGroups: isDomainGroupingActive ? domainGroups : mirrorDomainGroups,
    selectedLineState: selectedLineState,
    isDrawingState: isDrawingState,
    isNewDrawingState: isNewDrawingState,
    isDomainGroupingActive: isDomainGroupingActive,
    isICOPriceActive: isICOPriceActive,
    isSelectingRange: isSelectingRange,
    onBrushChangeEnd: onBrushChangeEnd,
    onPointMouseUp: onPointMouseUp,
    onRangeSelecting: onRangeSelecting,
    onRangeSelected: onRangeSelected,
    syncTooltips: syncTooltips,
    setIsICOPriceDisabled: setIsICOPriceDisabled
  }), isBlurred && /*#__PURE__*/React.createElement("div", {
    className: styles.restriction
  }, /*#__PURE__*/React.createElement(Link, {
    to: "/login",
    className: styles.restriction__link
  }, "Sign in"), ' ', "to unlock all Santiment Chart features"));
};

export default Chart;