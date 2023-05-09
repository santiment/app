function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { tableQuery } from '../../gql';
import { DEFAULT_SCREENER_FN } from '../../../Screener/utils';
export function getNewFunction(filter, baseProjects = []) {
  const args = {
    filters: filter
  };

  if (baseProjects.length > 0) {
    args.baseProjects = baseProjects;
  }

  return filter.length > 0 || baseProjects.length > 0 ? {
    args,
    name: 'selector'
  } : DEFAULT_SCREENER_FN;
} // for screeners that created with old way
// we still have some old-design screeners on prod
// before delete need to migrate on backend first

function reconstructFilters(filters) {
  return filters.map(filter => ({
    args: filter,
    name: 'metric'
  }));
}

export function extractFilters({
  filters = []
}) {
  if (filters.length === 0) {
    return filters;
  }

  if (!filters[0].name && !filters[0].args) {
    return reconstructFilters(filters);
  } else {
    return filters;
  }
}
export function filterMetricsBySearch(value = '', metrics) {
  if (!value) {
    return metrics;
  }

  const chars = value.toLowerCase().split('');
  const passedMetrics = [];
  metrics.forEach(metric => {
    const str = metric.label.toLowerCase();
    const foundChars = chars.filter(char => str.includes(char));

    if (foundChars.length === chars.length) {
      passedMetrics.push(metric);
    }
  });
  return passedMetrics;
}

function buildFunction({
  fn,
  pagination,
  orderBy
}) {
  if (fn.name === DEFAULT_SCREENER_FN.name) {
    return {
      args: {
        pagination,
        orderBy,
        filters: []
      },
      name: 'selector'
    };
  } else {
    return _objectSpread(_objectSpread({}, fn), {}, {
      args: _objectSpread({
        pagination,
        orderBy
      }, fn.args)
    });
  }
}

export function buildFunctionQuery({
  fn,
  pagination,
  orderBy,
  activeColumns
}) {
  return [buildFunction({
    fn,
    pagination,
    orderBy
  }), tableQuery(activeColumns)];
}