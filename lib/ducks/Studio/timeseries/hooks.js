function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { useState, useEffect, useMemo } from 'react';
import { getData, getQuery, getPreTransform } from './fetcher';
import { normalizeDatetimes, mergeTimeseries } from './utils';
import { substituteErrorMsg } from './errors';
import { client } from '../../../apollo';
import { getIntervalByTimeRange } from '../../../utils/dates'; // NOTE: Polyfill for a PingdomBot 0.8.5 browser (/sentry/sanbase-frontend/issues/29459/) [@vanguard | Feb 6, 2020]

window.AbortController = window.AbortController || function () {
  return {
    abort() {}

  };
};

const DEFAULT_TS = [];
const DEFAULT_ERROR_MSG = Object.create(null);
const DEFAULT_METRIC_TRANSFORMER = Object.create(null);
const DEFAULT_ABORTABLES = new Map();
const DEFAULT_METRIC_SETTINGS_MAP = new Map();
const ABORTABLE_METRIC_SETTINGS_INDEX = 2;

const noop = v => v;

const hashMetrics = metrics => metrics.reduce((acc, {
  key
}) => acc + key, '');

export const cancelQuery = ([controller, id]) => {
  const {
    queryManager
  } = client;
  controller.abort();
  const query = queryManager.queries.get(id.toString());

  if (query) {
    queryManager.inFlightLinkObservables.delete(query.document);
  }

  queryManager.stopQuery(id);
};

function abortRemovedMetrics(abortables, newMetrics, MetricSettingMap) {
  const toAbort = new Map(abortables);
  newMetrics.forEach(metric => {
    const abortable = abortables.get(metric);

    if (abortable && abortable[ABORTABLE_METRIC_SETTINGS_INDEX] === MetricSettingMap.get(metric)) {
      toAbort.delete(metric);
    }
  });
  const abortableEntries = [...toAbort.entries()];
  const reducedAbortables = new Map(abortables);
  abortableEntries.forEach(([metric, query]) => {
    cancelQuery(query);
    reducedAbortables.delete(metric);
  });
  return reducedAbortables;
}

function abortAllMetrics(abortables) {
  return [...abortables.values()].forEach(cancelQuery);
}

const NO_DATA_MSG = 'No data for the requested period';
export function useTimeseries(metrics, settings, MetricSettingMap = DEFAULT_METRIC_SETTINGS_MAP, MetricTransformer = DEFAULT_METRIC_TRANSFORMER) {
  const [timeseries, setTimeseries] = useState(DEFAULT_TS);
  const [loadings, setLoadings] = useState(metrics);
  const [ErrorMsg, setErrorMsg] = useState(DEFAULT_ERROR_MSG);
  const [abortables, setAbortables] = useState(DEFAULT_ABORTABLES);
  const metricsHash = hashMetrics(metrics);
  const {
    slug,
    from,
    to,
    interval,
    address
  } = settings;
  useEffect(() => {
    if (!metricsHash) {
      setTimeseries([]);
    }

    const metricsSet = new Set(metrics);
    setLoadings(loadings => loadings.filter(loading => metricsSet.has(loading)));
    setAbortables(abortRemovedMetrics(abortables, metrics, MetricSettingMap));
  }, [metricsHash, MetricSettingMap]);
  useEffect(() => {
    abortAllMetrics(abortables);
    setAbortables(new Map());
    setLoadings([...metrics]);
    setErrorMsg({});
  }, [slug, from, to, interval, address]);
  useEffect(() => {
    let raceCondition = false;
    let mergedData = [];
    metrics.forEach(metric => {
      const {
        key,
        queryKey = key,
        reqMeta,
        fetch
      } = metric;
      const metricSettings = MetricSettingMap.get(metric);
      const queryId = client.queryManager.idCounter;
      const abortController = new AbortController();
      const {
        query: metricQuery,
        preTransform: metricPreTransform
      } = metricSettings || {};
      const query = metricQuery || getQuery(metric, metricSettings);

      if (!fetch) {
        if (!query) {
          return setErrorMsg(state => {
            state[key] = NO_DATA_MSG;
            return _objectSpread({}, state);
          });
        }

        setAbortables(state => {
          const newState = new Map(state);
          newState.set(metric, [abortController, queryId, metricSettings]);
          return newState;
        });
      }

      setLoadings(state => {
        const loadingsSet = new Set(state);
        loadingsSet.add(metric);
        return [...loadingsSet];
      });

      const variables = _objectSpread(_objectSpread({
        metric: queryKey,
        interval,
        from,
        to,
        slug,
        address
      }, reqMeta), metricSettings);

      let attempt = 1;
      getTimeseries();

      function getTimeseries() {
        if (raceCondition) return;
        const request = fetch ? fetch(metric, variables) : getData(query, variables, abortController.signal).then(metricPreTransform || getPreTransform(metric)).then(MetricTransformer[metric.key] || noop);
        request.then(data => {
          if (raceCondition) return;

          if (!data.length) {
            throw new Error(NO_DATA_MSG);
          }

          setErrorMsg(state => {
            if (!state[key]) return state;

            const newState = _extends({}, state);

            delete newState[key];
            return newState;
          });
          setTimeseries(() => {
            mergedData = mergeTimeseries([mergedData, data.map(normalizeDatetimes)]);
            return mergedData;
          });
        }).catch(({
          message
        }) => {
          if (raceCondition) return;

          if (attempt < 5 && message.includes('JSON')) {
            attempt += 1;
            return setTimeout(getTimeseries, 2000);
          }

          setTimeseries(() => mergedData);
          setErrorMsg(state => {
            state[key] = substituteErrorMsg(message);
            return _objectSpread({}, state);
          });
        }).finally(() => {
          if (raceCondition) return;
          setAbortables(state => {
            const newState = new Map(state);
            newState.delete(metric);
            return newState;
          });
          setLoadings(state => state.filter(loadable => loadable !== metric));
        });
      }
    });
    return () => {
      raceCondition = true;
    };
  }, [metricsHash, settings, MetricSettingMap, MetricTransformer]);
  return [timeseries, loadings, ErrorMsg];
}

const DEFAULT_BRUSH_SETTINGS = _objectSpread({
  interval: '4d'
}, getIntervalByTimeRange('all'));

export function useAllTimeData(metrics, {
  slug
}, MetricSettingMap) {
  const brushSettings = useMemo(() => _objectSpread(_objectSpread({}, DEFAULT_BRUSH_SETTINGS), {}, {
    slug
  }), [slug]);
  return useTimeseries(metrics, brushSettings, MetricSettingMap);
}