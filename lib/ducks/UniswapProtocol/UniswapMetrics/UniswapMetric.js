function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { useEffect, useMemo, useState } from 'react';
import { useTimeseries } from '../../Studio/timeseries/hooks';
import { formIntervalSettings } from '../../SANCharts/IntervalSelector';
import DashboardCounter from '../../../components/DasboardCounter/DashboardCounter';
import styles from './UniswapMetric.module.css';
const INTERVAL = '1d';

const UniswapMetric = ({
  metric
}) => {
  const {
    human_readable_name,
    key,
    formatter
  } = metric;
  const [settings, setSettings] = useState(_objectSpread({
    slug: 'uniswap'
  }, formIntervalSettings(INTERVAL)));
  const metrics = useMemo(() => {
    return [metric];
  }, [metric]);
  const [data, loadings] = useTimeseries(metrics, settings);
  const sum = useMemo(() => {
    const last = data && data.length > 0 ? data[data.length - 1] : {};
    return last[key] || 0;
  }, [data, key]);
  const isLoading = loadings.length > 0;
  useEffect(() => {
    const interval = setInterval(() => {
      !isLoading && setSettings(_objectSpread(_objectSpread({}, settings), formIntervalSettings(INTERVAL)));
    }, 120000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return /*#__PURE__*/React.createElement(DashboardCounter, {
    title: human_readable_name,
    value: sum,
    loadings: isLoading,
    formatter: formatter,
    classes: styles
  });
};

export default UniswapMetric;