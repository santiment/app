function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import cx from 'classnames';
import { ResponsiveContainer } from 'recharts';
import { useWhaleTrends, WHALES_DEFAULT_SETTINGS } from './utils';
import { useProject } from '../../../hooks/project';
import ProjectIcon from '../../../components/ProjectIcon/ProjectIcon';
import PercentChanges from '../../../components/PercentChanges';
import Skeleton from '../../../components/Skeleton/Skeleton';
import { ChangeChartTemplate, useAreaData } from '../../Watchlists/Widgets/Table/PriceGraph/ChangeChart';
import styles from './WhalesTrend.module.css';

const WhalesTrend = ({
  item: {
    slug
  }
}) => {
  const {
    data,
    loading
  } = useWhaleTrends(_objectSpread({
    slug
  }, WHALES_DEFAULT_SETTINGS));
  const [project = {}] = useProject(slug);
  const area = useAreaData(data);
  const {
    change,
    chartStats
  } = area;
  const isAccumulating = change > 0;
  return /*#__PURE__*/React.createElement("div", {
    className: styles.container
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.title
  }, /*#__PURE__*/React.createElement(ProjectIcon, {
    size: 36,
    slug: slug,
    logoUrl: project.logoUrl
  }), /*#__PURE__*/React.createElement("div", {
    className: styles.ticker
  }, project.ticker), /*#__PURE__*/React.createElement(PercentChanges, {
    changes: change,
    className: styles.change
  })), /*#__PURE__*/React.createElement(Skeleton, {
    className: styles.skeleton,
    show: loading,
    repeat: 1
  }), !loading && /*#__PURE__*/React.createElement(React.Fragment, null, chartStats.length > 0 ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ResponsiveContainer, {
    height: 56,
    className: styles.chart
  }, /*#__PURE__*/React.createElement(ChangeChartTemplate, _extends({}, area, {
    width: '100%',
    showTooltip: true
  }))), /*#__PURE__*/React.createElement("div", {
    className: styles.footer
  }, "Status:", /*#__PURE__*/React.createElement("div", {
    className: cx(styles.status, isAccumulating ? styles.accumulating : styles.distributing)
  }, isAccumulating ? 'Accumulating' : 'Distributing'))) : /*#__PURE__*/React.createElement(NoData, null)));
};

const NoData = () => /*#__PURE__*/React.createElement("div", {
  className: styles.noData
}, "No Data");

export default WhalesTrend;