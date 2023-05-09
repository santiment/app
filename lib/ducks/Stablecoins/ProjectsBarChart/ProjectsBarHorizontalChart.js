function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import cx from 'classnames';
import { CartesianGrid, ComposedChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { SanWatermark } from './resources';
import { HorizontalCategoryTick, getProjectsMarkup } from './utils';
import styles from './ProjectsBarChart.module.css';
const DESKTOP_MARGIN = {
  top: 20,
  right: 0,
  left: -20,
  bottom: 50
};
const MOBILE_MARGIN = {
  top: 0,
  right: 16,
  left: 0,
  bottom: 50
};

const ProjectsBarHorizontalChart = ({
  isDesktop,
  data,
  dataKey = 'value',
  onProjectClick,
  MetricColor,
  settings: {
    valueFormatter = v => v
  } = {}
}) => {
  const markup = getProjectsMarkup({
    MetricColor,
    data: data,
    dataKey,
    onProjectClick,
    barSize: 40,
    maxBarSize: 40
  });
  return /*#__PURE__*/React.createElement("div", {
    className: cx(styles.chart, styles.horizontalChart)
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.watermark
  }, SanWatermark), /*#__PURE__*/React.createElement(ResponsiveContainer, {
    width: "100%",
    height: "100%"
  }, /*#__PURE__*/React.createElement(ComposedChart, {
    cursor: "pointer",
    data: data,
    margin: isDesktop ? DESKTOP_MARGIN : MOBILE_MARGIN
  }, isDesktop && /*#__PURE__*/React.createElement(CartesianGrid, {
    vertical: false,
    stroke: "var(--porcelain)"
  }), /*#__PURE__*/React.createElement(YAxis, {
    dataKey: dataKey,
    fontSize: 10,
    fontWeight: 500,
    stroke: 'var(--casper)',
    tickCount: 6,
    tickFormatter: valueFormatter,
    hide: !isDesktop
  }), markup, /*#__PURE__*/React.createElement(XAxis, {
    dataKey: 'slug',
    tick: props => /*#__PURE__*/React.createElement(HorizontalCategoryTick, _extends({}, props, {
      data: data
    })),
    minTickGap: 8,
    interval: 0,
    domain: ['auto', 'auto'],
    tickLine: false,
    axisLine: isDesktop,
    height: 40,
    textAnchor: "end",
    verticalAnchor: "end",
    onClick: onProjectClick
  }))));
};

export default ProjectsBarHorizontalChart;