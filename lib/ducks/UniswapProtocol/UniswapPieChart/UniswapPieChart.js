function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import { useUniswapValueDistribution } from './gql';
import { formatNumber } from '../../../utils/formatting';
import Skeleton from '../../../components/Skeleton/Skeleton';
import { getDateFormats, getTimeFormats, make12Hours, getAmPm } from '../../../utils/dates';
import styles from './UniswapPieChart.module.css';
const obj = {
  centralizedExchanges: {
    label: 'Centralized Exchanges',
    color: '#68DBF4'
  },
  decentralizedExchanges: {
    label: 'Decentralized Exchanges',
    color: '#785549'
  },
  dexTrader: {
    label: 'DEX Traders only',
    color: '#5275FF'
  },
  cexTrader: {
    label: 'CEX Traders only',
    color: '#FFDAC5'
  },
  cexDexTrader: {
    label: 'CEX + DEX Traders',
    color: '#FF5B5B'
  },
  otherTransfers: {
    label: 'Other Addresses',
    color: '#D4E763'
  },
  notMoved: {
    label: 'Not moved',
    color: '#F47BF7'
  }
};

function transformData(data) {
  if (!data && !data.totalMinted) {
    return;
  }

  const total = data.totalMinted;
  const movedSum = data.centralizedExchanges + data.decentralizedExchanges + data.dexTrader + data.cexTrader + data.cexDexTrader + data.otherTransfers;
  const notMoved = total - movedSum;

  const fullData = _objectSpread(_objectSpread({}, data), {}, {
    notMoved
  });

  const items = ['centralizedExchanges', 'decentralizedExchanges', 'dexTrader', 'cexTrader', 'cexDexTrader', 'otherTransfers', 'notMoved'];
  const chartData = items.map(item => {
    const name = obj[item].label;
    const value = fullData[item] * 100 / total || 0;
    return {
      name,
      value,
      rawValue: fullData[item],
      color: obj[item].color
    };
  });
  return {
    total,
    movedSum,
    notMoved,
    chartData
  };
}

function getPercentStr(value = 0, total = 0) {
  if (total === 0) return '';
  return `(${(value * 100 / total).toFixed(2)}%)`;
}

const UniswapPieChart = () => {
  const currDate = new Date();
  const [rawData = {}, loading] = useUniswapValueDistribution();
  const {
    MMM,
    D
  } = getDateFormats(currDate);
  const {
    H,
    mm
  } = getTimeFormats(currDate);
  const {
    total = 0,
    movedSum = 0,
    notMoved = 0,
    chartData = []
  } = transformData(rawData);
  const [isMissedData, setIsMissedData] = useState(false);
  useEffect(() => {
    if (!loading) {
      const noData = chartData.filter(({
        rawValue
      }) => rawValue === undefined);
      const isTotallyEpmty = chartData.filter(({
        rawValue
      }) => rawValue === null);

      if (noData.length > 0 || isTotallyEpmty.length === chartData.length) {
        setIsMissedData(true);
      }
    }
  }, [loading]);
  if (!loading && isMissedData) return null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Skeleton, {
    repeat: 1,
    className: styles.skeleton,
    show: loading
  }), !loading && rawData.totalMinted !== undefined && /*#__PURE__*/React.createElement("div", {
    className: styles.wrapper
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.chart
  }, /*#__PURE__*/React.createElement(PieChart, {
    width: 400,
    height: 300
  }, /*#__PURE__*/React.createElement(Pie, {
    data: chartData,
    cx: 200,
    cy: 140,
    labelLine: false,
    outerRadius: 140,
    dataKey: 'value',
    valueKey: 'value'
  }, chartData.map(({
    color
  }, idx) => /*#__PURE__*/React.createElement(Cell, {
    fill: color,
    key: idx
  })))), /*#__PURE__*/React.createElement("p", {
    className: styles.time
  }, `Last update: ${D} ${MMM}, ${make12Hours(H)}:${mm}${getAmPm(H)}`)), /*#__PURE__*/React.createElement("div", {
    className: styles.text
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.row
  }, /*#__PURE__*/React.createElement("h4", {
    className: styles.title
  }, "Total claimed:"), /*#__PURE__*/React.createElement("span", {
    className: styles.value
  }, formatNumber(total))), /*#__PURE__*/React.createElement("div", {
    className: styles.row
  }, /*#__PURE__*/React.createElement("h4", {
    className: styles.title
  }, "Moved after claimed ", getPercentStr(movedSum, total), ":"), /*#__PURE__*/React.createElement("span", {
    className: styles.value
  }, formatNumber(movedSum))), /*#__PURE__*/React.createElement("ul", {
    className: styles.list
  }, chartData.map(({
    name,
    value,
    rawValue,
    color
  }, idx) => {
    if (name === obj.notMoved.label) return null;
    return /*#__PURE__*/React.createElement("li", {
      key: idx,
      className: styles.item,
      style: {
        '--pie-chart-item-color': color
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: styles.item__name
    }, name, " (", value.toFixed(2), "%):"), /*#__PURE__*/React.createElement("span", {
      className: styles.item__value
    }, formatNumber(rawValue || 0)));
  })), /*#__PURE__*/React.createElement("div", {
    className: styles.row
  }, /*#__PURE__*/React.createElement("h4", {
    className: styles.title
  }, "Dormant after claimed ", getPercentStr(notMoved, total), ":"), /*#__PURE__*/React.createElement("span", {
    className: styles.value
  }, formatNumber(notMoved))), /*#__PURE__*/React.createElement("ul", {
    className: styles.list
  }, chartData.map(({
    name,
    value,
    rawValue,
    color
  }, idx) => {
    if (name !== obj.notMoved.label) return null;
    return /*#__PURE__*/React.createElement("li", {
      key: idx,
      className: styles.item,
      style: {
        '--pie-chart-item-color': color
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: styles.item__name
    }, name, " (", value.toFixed(2), "%):"), /*#__PURE__*/React.createElement("span", {
      className: styles.item__value
    }, formatNumber(rawValue)));
  })))));
};

export default UniswapPieChart;