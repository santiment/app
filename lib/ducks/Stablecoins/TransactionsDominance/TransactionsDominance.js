function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { useMemo, useState } from 'react';
import { Toggle } from '@santiment-network/ui';
import ProjectsBarChartWrapper from '../ProjectsBarChart/ProjectsBarChartWrapper';
import PageLoader from '../../../components/Loader/PageLoader';
import { sortByValue, useAggregatedProjects } from '../utils';
import { millify } from '../../../utils/formatting';
import styles from './TransactionsDominance.module.css';
const DEFAULT_SETTINGS = {
  metric: 'transaction_volume'
};

const calculatePercentValues = data => {
  const sum = data.reduce((acc, {
    value
  }) => {
    return acc + value;
  }, 0);
  return data.map(item => _objectSpread(_objectSpread({}, item), {}, {
    value: 100 * item.value / sum
  }));
};

const TransactionsDominance = ({
  settings
}) => {
  const {
    data,
    loading
  } = useAggregatedProjects(_objectSpread(_objectSpread({}, DEFAULT_SETTINGS), settings));
  const [isDominance, setIsDominance] = useState(false);
  const prepared = useMemo(() => {
    const filtered = data.filter(({
      value
    }) => value > 0);
    const newData = isDominance ? calculatePercentValues(filtered) : filtered;
    return newData.sort(sortByValue).map(item => _objectSpread(_objectSpread({}, item), {}, {
      key: item.slug
    }));
  }, [data, isDominance]);
  return /*#__PURE__*/React.createElement("div", {
    className: styles.container
  }, loading && /*#__PURE__*/React.createElement(PageLoader, null), !loading && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: styles.toggle,
    onClick: () => setIsDominance(!isDominance)
  }, /*#__PURE__*/React.createElement(Toggle, {
    isActive: isDominance
  }), /*#__PURE__*/React.createElement("div", {
    className: styles.toggleText
  }, "Switch to transaction dominance")), /*#__PURE__*/React.createElement(ProjectsBarChartWrapper, {
    data: prepared,
    settings: {
      valueFormatter: val => isDominance ? `${millify(val)} %` : `${millify(val)}`
    }
  })));
};

export default TransactionsDominance;