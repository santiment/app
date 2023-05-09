function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useState, useEffect, useRef } from 'react';
import { linearScale, logScale } from '@santiment-network/chart/scales';
import Header from './Header';
import ChartCanvas from '../Canvas';
import { useTimeseries } from '../../timeseries/hooks';
import { extractMirrorMetricsDomainGroups } from '../../../Chart/utils';
import { MirroredMetric } from '../../../dataHub/metrics/mirrored';
import { useEdgeGaps, useClosestValueData, useDomainGroups } from '../../../Chart/hooks';
import { getNewInterval, INTERVAL_ALIAS } from '../../../SANCharts/IntervalSelector';
import { ONE_HOUR_IN_MS } from '../../../../utils/dates';
import FullscreenDialogBtn from '../../../../components/FullscreenDialogBtn';
import styles from './index.module.css';
const EMPTY_ARRAY = [];

const FullscreenChart = ({
  widget,
  settings: studioSettings,
  options: studioOptions,
  categories,
  metrics,
  brushData,
  MetricColor,
  MetricNode,
  ErrorMsg,
  shareLink,
  drawings,
  selectedLineState,
  isDrawingState,
  isNewDrawingState,
  setIsICOPriceDisabled,
  cursorType
}) => {
  const [settings, setSettings] = useState(studioSettings);
  const [options, setOptions] = useState(studioOptions);
  const [isDomainGroupingActive] = useState();
  const [MetricTransformer, setMetricTransformer] = useState({});
  const [rawData] = useTimeseries(metrics, settings, widget.MetricSettingMap, MetricTransformer);
  const data = useEdgeGaps(useClosestValueData(rawData, metrics, options.isClosestDataActive, MetricNode));
  const domainGroups = useDomainGroups(metrics);
  const chartRef = useRef(null);
  const mirrorDomainGroups = extractMirrorMetricsDomainGroups(domainGroups);
  useEffect(() => () => {
    const {
      drawer
    } = widget.chartRef.current;
    return drawer && drawer.recalcAbsCoor();
  }, []);
  useEffect(() => {
    const metricTransformer = _extends({}, MetricTransformer);

    metrics.forEach(metric => {
      const mirrorOf = MirroredMetric[metric.key];

      if (mirrorOf) {
        const {
          key,
          preTransformer
        } = metric;

        if (metrics.includes(mirrorOf)) {
          metricTransformer[key] = preTransformer;
        } else {
          metricTransformer[key] = undefined;
        }
      }
    });
    setMetricTransformer(metricTransformer);
  }, [metrics]);

  function changeTimePeriod(fromDate, toDate) {
    const interval = getNewInterval(fromDate, toDate);
    setSettings(state => _objectSpread(_objectSpread({}, state), {}, {
      interval: INTERVAL_ALIAS[interval] || interval,
      from: fromDate.toISOString(),
      to: toDate.toISOString()
    }));
  }

  function onBrushChangeEnd(startIndex, endIndex) {
    const start = brushData[startIndex];
    const end = brushData[endIndex];

    if (start && end) {
      changeTimePeriod(new Date(start.datetime), new Date(end.datetime));
    }
  }

  function onRangeSelect({
    value: leftDate
  }, {
    value: rightDate
  }) {
    if (leftDate === rightDate) return;
    const dates = leftDate < rightDate ? [leftDate, rightDate] : [rightDate, leftDate];
    const from = new Date(dates[0]);
    const to = new Date(dates[1]);

    if (to - from >= ONE_HOUR_IN_MS) {
      changeTimePeriod(from, to);
    }
  }

  return /*#__PURE__*/React.createElement("div", {
    className: styles.content
  }, /*#__PURE__*/React.createElement(Header, {
    className: styles.settings,
    chartRef: chartRef,
    settings: settings,
    options: options,
    shareLink: shareLink,
    activeMetrics: metrics,
    activeEvents: EMPTY_ARRAY,
    data: data,
    setSettings: setSettings,
    setOptions: setOptions,
    changeTimePeriod: changeTimePeriod
  }), /*#__PURE__*/React.createElement(ChartCanvas, {
    className: styles.chart,
    widget: widget,
    options: options,
    settings: settings,
    categories: categories,
    chartRef: chartRef,
    scale: options.isLogScale ? logScale : linearScale,
    colors: MetricColor,
    metrics: metrics,
    data: data,
    brushData: brushData,
    drawings: drawings,
    ErrorMsg: ErrorMsg,
    domainGroups: isDomainGroupingActive ? domainGroups : mirrorDomainGroups,
    selectedLineState: selectedLineState,
    cursorType: cursorType,
    isDrawingState: isDrawingState,
    isNewDrawingState: isNewDrawingState,
    isFullscreen: true,
    onPointHover: undefined,
    onBrushChangeEnd: onBrushChangeEnd,
    onRangeSelect: onRangeSelect,
    setIsICOPriceDisabled: setIsICOPriceDisabled,
    syncTooltips: undefined
  }));
};

export default (props => /*#__PURE__*/React.createElement(FullscreenDialogBtn, {
  title: props.settings.title,
  className: styles.btn,
  iconClassName: styles.icon,
  dialogClasses: styles
}, /*#__PURE__*/React.createElement(FullscreenChart, props)));