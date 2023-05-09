const _excluded = ["settings", "widget", "isSingleWidget", "toggleWidgetMetric", "deleteWidget", "rerenderWidgets", "observeSyncDate", "onLoad"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useEffect, useState } from 'react';
import Widget from './Widget';
import ColorProvider from './ChartWidgetColorProvider';
import { newWidget, useMetricNodeOverwrite, useMirroredTransformer, useWidgetMetricLabeling } from './utils';
import StudioChart from '../Chart';
import { dispatchWidgetMessage } from '../widgetMessage';
import { DEFAULT_OPTIONS } from '../defaults';
import { getMetricSetting, calculateMovingAverageFromInterval } from '../utils';
import { useMetricSettingsAdjuster } from '../hooks';
import { convertBaseProjectMetric } from '../metrics';
import { useTimeseries } from '../timeseries/hooks';
import { useEdgeGaps, useClosestValueData } from '../../Chart/hooks';
import { useSyncDateEffect } from '../../Chart/sync';
import { Metric } from '../../dataHub/metrics';
import { useRenderQueueItem } from '../../renderQueue/sized';
const EMPTY_ARRAY = [];
export const Chart = _ref => {
  let {
    settings,
    widget,
    isSingleWidget,
    toggleWidgetMetric,
    deleteWidget,
    rerenderWidgets,
    observeSyncDate,
    onLoad
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  const {
    metrics,
    chartRef
  } = widget;
  const [options, setOptions] = useState(DEFAULT_OPTIONS);
  const MetricSettingMap = useMetricSettingsAdjuster(widget.MetricSettingMap, settings, metrics);
  const MetricTransformer = useMirroredTransformer(metrics);
  const MetricNode = useMetricNodeOverwrite(MetricSettingMap);
  const [rawData, loadings, ErrorMsg] = useTimeseries(metrics, settings, MetricSettingMap, MetricTransformer);
  const data = useEdgeGaps(useClosestValueData(rawData, metrics, options.isClosestDataActive, MetricNode)); // TODO: Solve the webpack circular dependency issue to share singular chart [@vanguard | Jul 1, 2020]
  // const shareLink = useMemo(
  // () => buildChartShareLink({ settings, widgets: [widget] }),
  // [settings, metrics, comparables],
  // )

  useSyncDateEffect(chartRef, observeSyncDate);
  useEffect(() => {
    const {
      length
    } = loadings;
    const phase = length ? 'loading' : 'loaded';
    if (length === 0 && onLoad) onLoad();
    dispatchWidgetMessage(widget, phase);
  }, [loadings]);
  useEffect(() => {
    if (!chartRef.current) return;

    if (widget.scrollIntoViewOnMount) {
      chartRef.current.canvas.scrollIntoView();
      widget.scrollIntoViewOnMount = false;
    }
  }, [chartRef.current]);
  useWidgetMetricLabeling(chartRef, metrics, settings);
  useEffect(() => {
    let modified = false;
    metrics.forEach(metric => {
      if ((metric.base || metric) !== Metric.dev_activity) return;
      const newMap = new Map(widget.MetricSettingMap);
      const metricSetting = getMetricSetting(newMap, metric);
      metricSetting.transform = {
        type: 'moving_average',
        movingAverageBase: calculateMovingAverageFromInterval(settings.interval)
      };
      widget.MetricSettingMap = newMap;
      modified = true;
    });
    if (modified) rerenderWidgets();
  }, [metrics, settings.interval]);

  function toggleIndicatorMetric({
    indicator,
    base
  }) {
    const {
      MetricIndicators
    } = widget;
    let indicatorsSet = MetricIndicators[base.key];

    if (!indicatorsSet) {
      indicatorsSet = new Set();
      MetricIndicators[base.key] = indicatorsSet;
    }

    if (indicatorsSet.has(indicator)) {
      indicatorsSet.delete(indicator);
    } else {
      indicatorsSet.add(indicator);
    }

    widget.MetricIndicators = _extends({}, MetricIndicators);
  }

  function toggleMetric(metric) {
    if (metric.indicator) {
      toggleIndicatorMetric(metric);
    }

    toggleWidgetMetric(widget, metric);
  }

  function toggleMetricLock(metric) {
    const newMetric = convertBaseProjectMetric(metric, settings);
    if (metrics.includes(newMetric)) return;

    if (metric.indicator) {
      toggleIndicatorMetric(metric);
    }

    if (newMetric.indicator) {
      toggleIndicatorMetric(newMetric);
    }

    if (widget.axesMetricSet.has(metric)) {
      widget.axesMetricSet.delete(metric);
      widget.axesMetricSet.add(newMetric);
    } else {
      widget.disabledAxesMetricSet.delete(metric);
      widget.disabledAxesMetricSet.add(newMetric);
    }

    const newMap = new Map(widget.MetricSettingMap);
    newMap.set(newMetric, getMetricSetting(newMap, metric));
    newMap.delete(metric);
    widget.MetricSettingMap = newMap;

    for (let i = 0; i < metrics.length; i++) {
      if (metrics[i] !== metric) continue;
      metrics[i] = newMetric;
      widget.metrics = metrics.slice();
      return rerenderWidgets();
    }
  }

  return /*#__PURE__*/React.createElement(ColorProvider, {
    widget: widget,
    rerenderWidgets: rerenderWidgets
  }, /*#__PURE__*/React.createElement(StudioChart, _extends({}, props, {
    data: data,
    widget: widget,
    chartRef: chartRef,
    metrics: metrics,
    eventsData: EMPTY_ARRAY,
    activeEvents: EMPTY_ARRAY,
    ErrorMsg: ErrorMsg,
    MetricNode: MetricNode,
    settings: settings,
    loadings: loadings,
    options: options,
    isSingleWidget: isSingleWidget,
    setOptions: setOptions,
    toggleMetric: toggleMetric,
    toggleMetricLock: toggleMetricLock,
    rerenderWidgets: rerenderWidgets,
    onDeleteChartClick: () => deleteWidget(widget)
  })));
};

const ChartWidget = props => {
  const {
    isRendered,
    onLoad
  } = useRenderQueueItem();
  return /*#__PURE__*/React.createElement(Widget, null, " ", isRendered ? /*#__PURE__*/React.createElement(Chart, _extends({}, props, {
    onLoad: onLoad
  })) : null);
};

const newChartWidget = (props, widget = ChartWidget) => newWidget(widget, _objectSpread({
  metrics: [Metric.price_usd],
  comparedMetrics: [],
  axesMetricSet: new Set(),
  disabledAxesMetricSet: new Set(),
  MetricSettingMap: new Map(),
  MetricIndicators: {},
  MetricColor: {},
  connectedWidgets: [],
  drawings: []
}, props));

ChartWidget.new = newChartWidget;
export default ChartWidget;