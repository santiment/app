import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import { useUniswapWhoMoved } from './gql';
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
  cexTrader: {
    label: 'CEX Traders',
    color: '#FFDAC5'
  },
  otherAddresses: {
    label: 'Other Addresses',
    color: '#D4E763'
  }
};

function transformData(data) {
  if (!data && !data.otherAddresses) {
    return;
  }

  const total = data.centralizedExchanges + data.decentralizedExchanges + data.otherAddresses + data.cexTrader;
  const items = ['centralizedExchanges', 'decentralizedExchanges', 'cexTrader', 'otherAddresses'];
  const chartData = items.map(item => {
    const name = obj[item].label;
    const value = data[item] * 100 / total || 0;
    return {
      name,
      value,
      rawValue: data[item],
      color: obj[item].color
    };
  });
  return {
    chartData
  };
}

const WhoClaimedChart = () => {
  const currDate = new Date();
  const [rawData = {}, loading] = useUniswapWhoMoved();
  const {
    MMM,
    D
  } = getDateFormats(currDate);
  const {
    H,
    mm
  } = getTimeFormats(currDate);
  const {
    chartData
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
  }), !loading && rawData.otherAddresses !== undefined && /*#__PURE__*/React.createElement("div", {
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
  }, /*#__PURE__*/React.createElement("ul", {
    className: styles.list
  }, chartData.map(({
    name,
    value,
    rawValue,
    color
  }, idx) => /*#__PURE__*/React.createElement("li", {
    key: idx,
    className: styles.item,
    style: {
      '--pie-chart-item-color': color
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: styles.item__name
  }, name, " (", value.toFixed(2), "%):"), /*#__PURE__*/React.createElement("span", {
    className: styles.item__value
  }, formatNumber(rawValue || 0))))))));
};

export default WhoClaimedChart;