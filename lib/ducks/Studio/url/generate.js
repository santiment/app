const _excluded = ["projectId", "ticker", "title", "name"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import { stringify } from 'query-string';
import { WidgetToTypeMap } from '../Widget/types';

const keyExtractor = ({
  key
}) => key;

const getMetricsKeys = metrics => metrics.map(keyExtractor);

function shareMetricSettings(MetricSettingMap) {
  const sharedMetricSettings = {};
  MetricSettingMap.forEach(({
    node,
    interval
  }, {
    key
  }) => {
    sharedMetricSettings[key] = {
      node,
      interval
    };
  });
  return sharedMetricSettings;
}

function shareMetricIndicators(MetricIndicators) {
  const sharedMetricIndicators = {};
  Object.keys(MetricIndicators).forEach(metricKey => {
    sharedMetricIndicators[metricKey] = getMetricsKeys([...MetricIndicators[metricKey]]);
  });
  return sharedMetricIndicators;
}

const normalizeConnectedWidget = ({
  Widget,
  datesRange
}) => ({
  widget: WidgetToTypeMap.get(Widget),
  from: datesRange[0].toISOString(),
  to: datesRange[1].toISOString()
});

export const normalizeDrawing = ({
  color,
  relCoor
}) => ({
  color,
  relCoor
});

function shareDrawings(drawings, chart) {
  if (!chart || !chart.drawer || !chart.minMaxes) {
    return drawings && drawings.map(normalizeDrawing);
  }

  return chart.drawer.drawings.map(normalizeDrawing);
}

export const normalizeWidget = ({
  Widget,
  metrics,
  connectedWidgets,
  MetricColor,
  MetricSettingMap,
  MetricIndicators,
  drawings,
  axesMetricSet,
  chartRef
}) => ({
  widget: WidgetToTypeMap.get(Widget),
  metrics: metrics.map(({
    key
  }) => key),
  connectedWidgets: connectedWidgets ? connectedWidgets.map(normalizeConnectedWidget) : undefined,
  colors: MetricColor,
  settings: shareMetricSettings(MetricSettingMap),
  indicators: shareMetricIndicators(MetricIndicators),
  drawings: shareDrawings(drawings, chartRef.current),
  axesMetrics: axesMetricSet && getMetricsKeys([...axesMetricSet].filter(Boolean))
});
export const normalizeWidgets = widgets => widgets.map(normalizeWidget);

const normalizeSettings = _ref => {
  let {
    projectId,
    ticker,
    title,
    name
  } = _ref,
      settings = _objectWithoutProperties(_ref, _excluded);

  return settings;
};

export function buildShareConfig({
  settings,
  widgets,
  sidepanel
}) {
  return {
    settings: JSON.stringify(normalizeSettings(settings)),
    widgets: JSON.stringify(normalizeWidgets(widgets)),
    sidepanel: sidepanel ? JSON.stringify({
      type: sidepanel
    }) : undefined
  };
}
export function generateShareLink(settings, options, metrics = [], events = []) {
  const Shareable = _objectSpread(_objectSpread(_objectSpread({}, settings), options), {}, {
    metrics: getMetricsKeys(metrics)
  });

  return stringify(Shareable, {
    arrayFormat: 'comma'
  });
}
export const generateUrlV2 = config => stringify(buildShareConfig(config));