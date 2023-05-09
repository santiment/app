function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { useMemo } from 'react';
import VisualBacktestChart from '../../../../../ducks/Signals/chart/VisualBacktestChart';
import { Metric } from '../../../../../ducks/dataHub/metrics';
import { useTimeseries } from '../../../../../ducks/Studio/timeseries/hooks';
import { getMetricYAxisId } from '../../../../../ducks/SANCharts/utils';
import Skeleton from '../../../../../components/Skeleton/Skeleton';
import { mapWithTimeseriesAndYCoord } from '../../../../../ducks/Signals/chart/preview/utils';
import { getNearestPricePoint, GetReferenceDots, useMinMaxValues } from '../utils';
import styles from './StakeholderChartPreview.module.css';

const PRICE_METRIC = _objectSpread(_objectSpread({}, Metric.price_usd), {}, {
  node: 'area',
  gradientUrl: 'url(#totalUp)',
  historicalTriggersDataKey: undefined
});

const METRICS_COLOR = {
  [PRICE_METRIC.key]: 'var(--mystic)'
};

const StakeholderChartPreview = ({
  data,
  project,
  settings
}) => {
  const {
    datetime,
    slug: targetSlug,
    signal
  } = data;
  const {
    slug,
    ticker
  } = useMemo(() => {
    if (signal === 'dai_mint') {
      return {
        slug: 'ethereum',
        ticker: 'ETH'
      };
    }

    return project || {
      slug: targetSlug
    };
  }, [project, targetSlug]);
  const metricSettings = useMemo(() => _objectSpread(_objectSpread({}, settings), {}, {
    slug
  }), [settings, slug]);
  const metrics = useMemo(() => {
    return [_objectSpread(_objectSpread({}, PRICE_METRIC), {}, {
      label: `Price (${ticker})`
    })];
  }, [slug, ticker]);
  const [timeseries, loadings] = useTimeseries(metrics, metricSettings);
  const alertPoints = useMemo(() => {
    const nearestPoint = getNearestPricePoint(timeseries, datetime);
    return nearestPoint ? mapWithTimeseriesAndYCoord([nearestPoint], PRICE_METRIC, timeseries, false) : [];
  }, [timeseries, datetime]);
  const referenceDots = useMemo(() => {
    return alertPoints.length > 0 ? GetReferenceDots(alertPoints, getMetricYAxisId(PRICE_METRIC)) : [];
  }, [alertPoints]);
  const {
    min,
    max
  } = useMinMaxValues(timeseries, PRICE_METRIC.key);
  const alertsDataPoints = useMemo(() => {
    return alertPoints.reduce((acc, item, currentIndex) => {
      const firstPoint = {
        ['price_usd_' + currentIndex]: min,
        datetime: item.datetime
      };
      const secoindPoint = {
        ['price_usd_' + currentIndex]: max,
        datetime: item.datetime
      }; // GarageInc | 12.04.2021: need a third false point for correct gradient of vertical line

      const thirdPoint = {
        ['price_usd_' + currentIndex]: max,
        datetime: item.datetime + 1000
      };
      return [...acc, firstPoint, secoindPoint, thirdPoint];
    }, []);
  }, [alertPoints, min, max]);
  const loading = loadings.length > 0;
  const merged = useMemo(() => {
    return [...timeseries, ...alertsDataPoints];
  }, [timeseries, alertsDataPoints]);
  return /*#__PURE__*/React.createElement("div", {
    className: styles.container
  }, !loading && /*#__PURE__*/React.createElement(VisualBacktestChart, {
    data: merged,
    dataKeys: PRICE_METRIC,
    metrics: metrics,
    referenceDots: referenceDots,
    classes: styles,
    height: 100,
    metricsColor: METRICS_COLOR,
    activeDotColor: "var(--waterloo)",
    gradientParams: {
      upColor: 'var(--mystic)'
    }
  }), loading && /*#__PURE__*/React.createElement(Skeleton, {
    repeat: 1,
    show: loading,
    className: styles.skeleton,
    wrapperClassName: styles.skeletonWrapper
  }));
};

export default StakeholderChartPreview;