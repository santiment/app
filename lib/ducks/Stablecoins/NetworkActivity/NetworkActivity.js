function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { useMemo, useState } from 'react';
import Tabs from '@santiment-network/ui/Tabs';
import ProjectsBarChartWrapper from '../ProjectsBarChart/ProjectsBarChartWrapper';
import PageLoader from '../../../components/Loader/PageLoader';
import { sortByValue, useAggregatedProjects } from '../utils';
import { millify } from '../../../utils/formatting';
import styles from './NetworkActivity.module.css';
const TABS = {
  'Daily Addresses': {
    metric: 'daily_active_addresses'
  },
  'Token Velocity': {
    metric: 'velocity'
  },
  'Network Growth': {
    metric: 'network_growth'
  }
};

const NetworkActivity = ({
  settings
}) => {
  const [tab, setTab] = useState('Daily Addresses');
  const {
    data,
    loading
  } = useAggregatedProjects(_objectSpread(_objectSpread({}, TABS[tab]), settings));
  return /*#__PURE__*/React.createElement("div", {
    className: styles.container
  }, /*#__PURE__*/React.createElement(Tabs, {
    className: styles.tabs,
    options: Object.keys(TABS),
    defaultSelectedIndex: tab,
    onSelect: tab => setTab(tab),
    classes: styles
  }), /*#__PURE__*/React.createElement("div", {
    className: styles.chart
  }, loading ? /*#__PURE__*/React.createElement(PageLoader, {
    className: styles.loader
  }) : /*#__PURE__*/React.createElement(ProjectsPreparedChart, {
    data: data,
    logScale: true
  })));
};

export const ProjectsPreparedChart = ({
  data,
  logScale = false
}) => {
  const prepared = useMemo(() => {
    return data.sort(sortByValue).filter(({
      value
    }) => +value !== 0).map(item => {
      return _objectSpread(_objectSpread({}, item), {}, {
        key: item.slug,
        logValue: logScale ? Math.log(+item.value) : item.value
      });
    });
  }, [data]);
  return /*#__PURE__*/React.createElement(ProjectsBarChartWrapper, {
    data: prepared,
    dataKey: 'logValue',
    settings: {
      valueFormatter: val => `${millify(val)}`
    }
  });
};
export default NetworkActivity;