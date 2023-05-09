import React from 'react';
import { ResponsiveContainer, ComposedChart, Legend, Area, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { getDateFormats } from '../../utils/dates';
import { formatNumber, millify } from './../../utils/formatting';

const labelFormatter = date => {
  const {
    dddd,
    MMM,
    DD,
    YYYY
  } = getDateFormats(new Date(date));
  return `${dddd}, ${MMM} ${DD} ${YYYY}`;
};

const tickFormatter = date => {
  const {
    DD,
    MMM,
    YY
  } = getDateFormats(new Date(date));
  return `${DD} ${MMM} ${YY}`;
};

const SignalsChart = ({
  chartData = []
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: "TrendsExploreChart"
  }, /*#__PURE__*/React.createElement(ResponsiveContainer, {
    width: "100%",
    height: 300
  }, /*#__PURE__*/React.createElement(ComposedChart, {
    data: chartData
  }, /*#__PURE__*/React.createElement(XAxis, {
    dataKey: "datetime",
    tickLine: false,
    minTickGap: 100,
    tickFormatter: tickFormatter
  }), /*#__PURE__*/React.createElement(YAxis, {
    yAxisId: "axis-price",
    type: "number",
    domain: ['auto', 'auto'],
    axisLine: false,
    tickLine: false
  }), /*#__PURE__*/React.createElement(YAxis, {
    yAxisId: "axis-volume",
    orientation: "right",
    domain: ['auto', 'auto'],
    tickFormatter: millify,
    tickLine: false,
    axisLine: false
  }), /*#__PURE__*/React.createElement(Area, {
    type: "linear",
    yAxisId: "axis-price",
    name: 'Price',
    dot: false,
    strokeWidth: 1.5,
    stroke: "#70dbed",
    fill: "#70dbed55",
    dataKey: "priceUsd",
    isAnimationActive: false
  }), /*#__PURE__*/React.createElement(Area, {
    type: "linear",
    yAxisId: "axis-volume",
    name: 'Volume',
    stroke: "#e0752d",
    fill: "#e0752d55",
    dot: false,
    strokeWidth: 1.5,
    isAnimationActive: false,
    dataKey: "volume"
  }), /*#__PURE__*/React.createElement(Tooltip, {
    labelFormatter: labelFormatter,
    formatter: (value, name) => formatNumber(value, {
      currency: 'USD'
    })
  }), /*#__PURE__*/React.createElement(CartesianGrid, {
    stroke: "rgba(200, 200, 200, .2)"
  }), /*#__PURE__*/React.createElement(Legend, null))));
};

SignalsChart.defaultProps = {
  data: {},
  isLoading: true
};
export default SignalsChart;