function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { Metric } from '../../ducks/dataHub/metrics';

const buildKey = (metric, suffix) => `${metric.key}_${suffix.replace(/[^a-zA-Z0-9]+/g, '')}`;

export function buildExploredMetric(text) {
  const key = buildKey(Metric.social_volume_total, text);
  return _objectSpread(_objectSpread({}, Metric.social_volume_total), {}, {
    queryKey: Metric.social_volume_total.key,
    key,
    text
  });
}
export function calcAverage(metrics, data) {
  const initialValue = {};
  const avg = [];
  metrics.forEach(({
    key
  }) => initialValue[key] = {
    sum: 0,
    amount: 0
  });
  const sum = data.reduce(function (acc, val) {
    metrics.forEach(({
      key
    }) => {
      if (val[key] !== undefined) {
        acc[key].sum = acc[key].sum + val[key];
        acc[key].amount++;
      }
    });
    return acc;
  }, initialValue);
  metrics.forEach(({
    key
  }) => {
    if (sum[key].amount !== 0) {
      avg.push(parseInt(sum[key].sum / sum[key].amount));
    }
  });
  return avg;
}
export function calcPercentage(total, number) {
  return (number * 100 / total).toFixed(2);
}
export const PERIODS = [{
  label: '1D',
  query: '1d',
  text: '1 day'
}, {
  label: '7D',
  query: '7d',
  text: '7 days'
}, {
  label: '30D',
  query: '1m',
  text: '30 days'
}, {
  label: '3M',
  query: '3m',
  text: '3 months'
}, {
  label: '6M',
  query: '6m',
  text: '6 months'
}];