function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import gql from 'graphql-tag';
import { useMemo } from 'react';
import { useQuery } from '@apollo/react-hooks';
export const GET_METRIC = metric => gql`
  query getMetric(
    $slug: String
    $from: DateTime!
    $to: DateTime!
    $interval: interval
    $transform: TimeseriesMetricTransformInputObject
    $selector: MetricTargetSelectorInputObject
    $aggregation: Aggregation
  ) {
    getMetric(metric: "${metric}") {
      timeseriesData(slug: $slug,
        from: $from,
        to: $to,
        interval: $interval,
        transform: $transform,
        selector: $selector,
        aggregation: $aggregation
      ) {
        datetime
        ${metric}: value
      }
    }
  }
`;
export const useMetric = (settings, metric) => {
  const query = useMemo(() => GET_METRIC(metric), [metric]);
  const {
    data = {},
    loading
  } = useQuery(query, {
    variables: _objectSpread(_objectSpread({}, settings), {}, {
      metric
    })
  });
  return useMemo(() => {
    return {
      data: data.getMetric ? data.getMetric.timeseriesData.reduce((acc, item) => acc + item[metric], 0) : 0,
      loading
    };
  }, [data, loading]);
};
export const AGGREGATION_TYPES = {
  MAX: 'MAX',
  LAST: 'LAST',
  SUM: 'SUM'
};