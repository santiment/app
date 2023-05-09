function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { Operator, Filter } from './dataHub/types';
const METRIC_PERCENT_SUFFIX = '_change_';
export const isContainMetric = (item, key) => item.includes(`${key}${METRIC_PERCENT_SUFFIX}`) || item === key;
export function extractFilterByMetricType(filters = [], metric) {
  return filters.filter(item => {
    const filterMetric = item.name === 'metric' ? item.args.metric : item.name;
    return isContainMetric(filterMetric, metric.percentMetricKey) || isContainMetric(filterMetric, metric.key);
  }).map(({
    args
  }) => _objectSpread({}, args));
}
export function getFilterType(filter = [], metric) {
  if (filter.length === 0) {
    return metric.isOnlyPercentFilters ? Filter.percent_up : Filter.above;
  }

  const isPercent = checkIsPercentMetric(filter);
  const operators = filter.map(({
    operator
  }) => operator); // x > 30

  if (!isPercent && operators[0] === Operator.more) {
    return Filter.above;
  } // x < 30


  if (!isPercent && operators[0] === Operator.less) {
    return Filter.below;
  } // 5 < x < 30


  if (!isPercent && operators[0] === Operator.inside) {
    return Filter.between;
  } // x < 5 || x > 30


  if (!isPercent && operators[0] === Operator.outside) {
    return Filter.outside;
  } // x +30%


  if (isPercent && operators[0] === Operator.more) {
    return Filter.percent_up;
  } // x -30%


  if (isPercent && operators[0] === Operator.less) {
    return Filter.percent_down;
  } // +5% < x < +30%


  if (isPercent && operators[0] === Operator.inside) {
    return Filter.percent_between;
  } // x +-5%


  if (isPercent && operators[0] === Operator.outside) {
    return Filter.percent_up_or_down;
  }
}

function checkIsPercentMetric(filter = []) {
  const {
    length: totalNumber
  } = filter;
  const {
    length: percentMetricsNumber
  } = filter.filter(({
    metric
  }) => metric.includes(METRIC_PERCENT_SUFFIX));

  if (percentMetricsNumber !== 0 && totalNumber === percentMetricsNumber) {
    return true;
  }

  if (percentMetricsNumber === 0) {
    return false;
  }

  console.error(`Error in ${filter[0].metric} type: ${totalNumber} metrics and ${percentMetricsNumber} with percent type`);
}

export function extractParams(filter = [], filterType, baseMetric) {
  return filter.length === 0 ? {} : {
    isActive: true,
    type: filterType.key,
    firstThreshold: extractThreshold(filter, filterType, baseMetric, 1),
    secondThreshold: extractThreshold(filter, filterType, baseMetric, 2),
    timeRange: extractTimeRange(filter)
  };
}

function extractTimeRange(filter = []) {
  return filter[0].dynamicFrom;
}

function extractThreshold(filter = [], filterType, metric, position) {
  const thresholds = filter.map(({
    threshold
  }) => threshold);
  const withSecondInput = filterType.showSecondInput;
  const threshold = withSecondInput ? thresholds[0][position - 1] : thresholds[0];
  const formatter = filterType.valueFormatter || metric.valueFormatter;
  return formatter ? formatter(threshold) : threshold;
}