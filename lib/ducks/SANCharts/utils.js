const _excluded = ["datetime"],
      _excluded2 = ["label"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import { YAxis, Bar, Line, Area } from 'recharts';
import { formatNumber, millify } from '../../utils/formatting';
import ActiveLine from './tooltip/ActiveLine';
import { Metric } from '../dataHub/metrics';
import { Event } from '../dataHub/events';
import { TooltipSetting } from '../dataHub/tooltipSettings';
const RechartComponent = {
  line: Line,
  filledLine: Line,
  area: Area,
  bar: Bar,
  autoWidthBar: Bar
};
export const mapDatetimeToNumber = timeseries => timeseries.map(_ref => {
  let {
    datetime
  } = _ref,
      rest = _objectWithoutProperties(_ref, _excluded);

  return _objectSpread(_objectSpread({}, rest), {}, {
    datetime: +new Date(datetime)
  });
});

const getEventColor = value => {
  if (value < 4) {
    return 'var(--persimmon)';
  }

  if (value < 7) {
    return 'var(--texas-rose-hover)';
  }

  return 'var(--bright-sun)';
};

export const getEventsTooltipInfo = events => Object.keys(events).map(event => {
  const _Event$event = Event[event],
        {
    label
  } = _Event$event,
        rest = _objectWithoutProperties(_Event$event, _excluded2);

  const value = events[event];
  return _objectSpread({
    value,
    isEvent: true,
    name: label,
    color: getEventColor(value)
  }, rest);
});
const MarketSegments = new Map();
export const getMarketSegment = key => {
  const target = MarketSegments.get(key);

  if (target) {
    return target;
  }

  const label = `Dev. Activity (${key})`;
  TooltipSetting[key] = {
    label,
    formatter: Metric.dev_activity.formatter
  };
  const newSegment = {
    key,
    label,
    transformKey: 'marketSegment',
    type: 'marketSegments',
    category: 'Development',
    Component: Line,
    node: 'line',
    yAxisId: 'axis-activity',
    reqMeta: {
      transform: 'movingAverage',
      movingAverageIntervalBase: 7,
      selector: {
        market_segments: [key]
      }
    }
  };
  MarketSegments.set(key, newSegment);
  return newSegment;
};
export const getMetricCssVarColor = metric => `var(--${Metric[metric].color})`;
export const METRIC_COLORS = ['dodger-blue', 'lima', 'heliotrope', 'waterloo', 'sheets-hover', 'texas-rose'];
export const findYAxisMetric = metrics => metrics.includes(Metric.price_usd) && Metric.price_usd || metrics.find(({
  key,
  Component
}) => key !== 'mvrvRatio' && Component !== Bar) || metrics[0];
export const setupColorGenerator = () => {
  let colorIndex = 0;
  return function (color) {
    return color || METRIC_COLORS[colorIndex++];
  };
};
export const chartBars = new WeakMap();

const StackedLogic = props => {
  const {
    metric,
    fill,
    x,
    y,
    height,
    index,
    barsMap,
    value
  } = props;
  if (value === undefined) return null;
  let obj = barsMap.get(index);

  if (!obj) {
    obj = {
      index,
      metrics: new Map([[metric, {
        fill,
        height,
        y,
        x
      }]])
    };
    barsMap.set(index, obj);
  } else {
    obj.metrics.set(metric, {
      fill,
      height,
      y,
      x
    });
  }

  return null;
};

const barMetricsSorter = ({
  height: a
}, {
  height: b
}) => b - a;

const getBarMargin = diff => {
  if (diff < 1.3) {
    return 0.2;
  }

  if (diff < 2) {
    return 0.5;
  }

  if (diff < 4) {
    return 1;
  }

  if (diff < 10) {
    return 3;
  }

  return 6;
};

export const getMetricYAxisId = ({
  yAxisId,
  key,
  dataKey = key
}) => {
  return yAxisId || `axis-${dataKey}`;
};

const getDayMetricWidth = (bars, dayMetric, margin) => {
  let lastX;

  for (let i = 0; i < bars.length; i++) {
    const metric = bars[i].metrics.get(dayMetric);

    if (metric) {
      if (lastX) {
        return metric.x - lastX - margin - margin;
      }

      lastX = metric.x;
    }
  }
};

export const alignDayMetrics = ({
  chartRef,
  bars,
  dayMetrics,
  margin
}) => {
  const oneDayMetricsKeys = dayMetrics.map(([key]) => key);
  const lastMetrics = {};
  const dayWidth = getDayMetricWidth(bars, oneDayMetricsKeys[0], margin);

  for (let i = 0; i < bars.length; i++) {
    const {
      metrics
    } = bars[i];

    for (let y = 0; y < oneDayMetricsKeys.length; y++) {
      const key = oneDayMetricsKeys[y];
      const metric = metrics.get(key);

      if (metric) {
        metric.width = dayWidth;
        lastMetrics[key] = metric;
      }
    }
  }

  oneDayMetricsKeys.forEach(key => {
    const lastMetric = lastMetrics[key];

    if (lastMetric) {
      const boundWidth = chartRef.offsetWidth - lastMetric.x;
      lastMetric.width = boundWidth < dayWidth ? boundWidth : dayWidth;
    }
  });
};
export const generateMetricsMarkup = (metrics, {
  ref = {},
  isMultiChartsActive,
  chartRef: {
    current: chartRef
  } = {},
  coordinates,
  scale,
  dayMetrics,
  syncedColors,
  activeLineDataKey,
  useShortName,
  hideYAxis,
  activeDotEl: ActiveEl = ActiveLine,
  activeDotColor
} = {}) => {
  const metricWithYAxis = isMultiChartsActive ? metrics[0] : findYAxisMetric(metrics); // HACK(vanguard): Thanks recharts

  let barsMap = chartBars.get(chartRef);

  if (!barsMap && chartRef) {
    barsMap = new Map();
    chartBars.set(chartRef, barsMap);
  }

  let activeDataKey = activeLineDataKey;
  const res = metrics.reduce((acc, metric) => {
    const {
      key,
      node,
      label,
      shortLabel,
      orientation = 'left',
      dataKey = key,
      hideYAxis: metricHideYAxis,
      gradientUrl,
      opacity = 1,
      formatter,
      strokeWidth = 1.5
    } = metric;
    const El = RechartComponent[node];

    if (!activeDataKey && (El === Line || El === Area)) {
      activeDataKey = dataKey;
    }

    const rest = {
      [El === Bar ? 'fill' : 'stroke']: syncedColors[dataKey],
      [El === Area && gradientUrl && 'fill']: gradientUrl,
      [El === Area && gradientUrl && 'fillOpacity']: 1
    };

    if (!isMultiChartsActive && chartRef !== undefined && El === Bar) {
      rest.shape = /*#__PURE__*/React.createElement(StackedLogic, {
        barsMap: barsMap,
        metric: metric.key
      });
    }

    const currentYAxisId = getMetricYAxisId(metric);
    const isHidden = metric !== metricWithYAxis || hideYAxis || metricHideYAxis;
    acc.push( /*#__PURE__*/React.createElement(YAxis, {
      key: `axis-${dataKey}`,
      yAxisId: currentYAxisId,
      type: "number",
      orientation: orientation,
      domain: ['auto', 'dataMax'],
      hide: isHidden,
      tickFormatter: yAxisTickFormatter,
      scale: scale
    }), /*#__PURE__*/React.createElement(El, _extends({
      key: `line-${dataKey}`,
      type: "linear",
      yAxisId: currentYAxisId,
      name: useShortName && shortLabel || label,
      strokeWidth: strokeWidth,
      ref: ref[key],
      dataKey: dataKey,
      dot: false,
      opacity: opacity,
      activeDot: activeDataKey === dataKey && /*#__PURE__*/React.createElement(ActiveEl, {
        activeDotColor: activeDotColor
      }),
      isAnimationActive: false,
      connectNulls: true,
      formatter: formatter
    }, rest)));
    return acc;
  }, []);

  if (coordinates && barsMap && coordinates.length > 1) {
    const [first, second, third] = coordinates;
    let firstX, secondX;

    if (!third) {
      firstX = first.x;
      secondX = second.x;
    } else {
      firstX = second.x;
      secondX = third.x;
    }

    const halfDif = (secondX - firstX) / 2;
    const margin = getBarMargin(halfDif);
    const halfWidth = halfDif - margin;
    const bars = [...barsMap.values()];
    alignDayMetrics({
      chartRef,
      bars,
      dayMetrics,
      margin
    });
    res.unshift( /*#__PURE__*/React.createElement("g", {
      key: "barMetrics"
    }, bars.map(({
      metrics,
      index
    }) => {
      const coor = coordinates[index];
      if (!coor) return null;
      let resX = coor.x - halfWidth;
      let secondWidth = halfWidth;

      if (resX < 40) {
        resX = 40;
        secondWidth = 0;
      } else if (resX + halfWidth * 2 > chartRef.offsetWidth) {
        secondWidth = 0;
      }

      return [...metrics.values()].sort(barMetricsSorter).map(({
        width,
        fill,
        height,
        y
      }) => /*#__PURE__*/React.createElement("rect", {
        key: fill + resX,
        opacity: "1",
        fill: fill,
        width: width || halfWidth + secondWidth,
        height: height,
        x: resX,
        y: y,
        radius: "0"
      }));
    })));
  }

  return res;
};
export const mapToRequestedMetrics = (metrics, {
  interval,
  slug,
  from,
  to,
  timeRange
}) => metrics.map(({
  key,
  alias: name = key,
  reqMeta
}) => _objectSpread({
  name,
  slug,
  from,
  to,
  timeRange,
  interval
}, reqMeta));
export const getSlugPriceSignals = (signals, slug, price = undefined) => signals.filter(({
  settings
}) => {
  const {
    target,
    operation
  } = settings || {};
  const {
    above,
    below
  } = operation || {};
  const {
    slug: signalSlug
  } = target || {};
  let result = (!!above || !!below) && slug === signalSlug;

  if (result && price !== undefined) {
    result = above === price || below === price;
  }

  return result;
});
const MIN_TICK_MILLIFY_VALUE = 1000000;
export const yAxisTickFormatter = value => value > MIN_TICK_MILLIFY_VALUE ? millify(value) : formatNumber(value, {
  minimumFractionDigits: 0
});