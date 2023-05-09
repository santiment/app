function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import cx from 'classnames';
import { Bar, Cell, CartesianGrid, ComposedChart, ResponsiveContainer, Tooltip, XAxis, YAxis, LabelList } from 'recharts';
import { ProjectsChartTooltip } from '../../../SANCharts/tooltip/CommonChartTooltip';
import Range from '../WatchlistOverview/WatchlistAnomalies/Range';
import Skeleton from '../../../../components/Skeleton/Skeleton';
import NoDataCharts from './NoDataCharts';
import { useProjectRanges } from './hooks';
import { getBarColor, getBarValue, getTooltipLabels, PRICE_CHANGE_RANGES, SORT_RANGES } from './utils';
import { PriceInfographicTitleRanges, useInfographicRanges } from './InfographicTitles';
import styles from './ProjectsChart.module.css';

const renderCustomizedLabel = props => {
  const {
    x,
    y,
    width,
    value: source,
    fill
  } = props;
  const value = source * 100;
  const fontSize = width < 20 ? 7 : 14;
  const position = +value >= 0 ? -1 * (fontSize / 2) : fontSize;
  const xValue = x + width / 2;
  const yValue = y + position;
  const translateY = +value > 0 ? -10 : 8;
  const barValue = getBarValue(+value);
  return /*#__PURE__*/React.createElement("g", {
    style: {
      transform: `translateY(${translateY}px)`
    }
  }, /*#__PURE__*/React.createElement("text", {
    x: xValue,
    y: yValue,
    fill: fill,
    textAnchor: "middle",
    fontSize: fontSize,
    fontWeight: 500,
    "dominant-baseline": 'central',
    transform: `rotate(270, ${xValue}, ${yValue})`
  }, value && barValue));
};

const ProjectsChart = ({
  listId,
  redirect,
  settings,
  onChangeSettings,
  type
}) => {
  const {
    sorter: {
      sortBy = 'marketcapUsd',
      desc: sortDesc
    } = {},
    currency: defaultCurrency
  } = settings;
  const defaultIndex = useMemo(() => {
    const index = SORT_RANGES.findIndex(({
      key,
      desc
    }) => key === sortBy && desc === sortDesc);
    return index >= 0 ? index : 0;
  }, [sortBy, sortDesc]);
  const [sortedByIndex, setSortedByIndex] = useState(defaultIndex);
  const {
    key: sortByKey,
    label: sortLabel,
    desc
  } = SORT_RANGES[sortedByIndex];
  useEffect(() => {
    onChangeSettings(type, {
      sortBy: sortByKey,
      desc
    });
  }, [sortByKey, desc]);
  const {
    currentRanges,
    currency,
    setCurrency
  } = useInfographicRanges({
    type,
    ranges: PRICE_CHANGE_RANGES,
    defaultCurrency,
    onChangeSettings
  });
  const {
    data,
    loading,
    intervalIndex,
    setIntervalIndex,
    label,
    key
  } = useProjectRanges({
    listId,
    ranges: currentRanges,
    sortByMetric: sortByKey,
    desc,
    settings,
    onChangeSettings,
    type: type
  });
  const colored = useMemo(() => {
    return data.map(item => _objectSpread(_objectSpread({}, item), {}, {
      color: getBarColor(item[key])
    }));
  }, [data]);
  const onProjectClick = useCallback(data => {
    const {
      value
    } = data;
    return redirect(`/projects/${value}`);
  }, [redirect]);
  const datakey = 'slug';
  const noData = !loading && data.length === 0;
  return /*#__PURE__*/React.createElement("div", {
    className: styles.container
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.title
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.range
  }, /*#__PURE__*/React.createElement(PriceInfographicTitleRanges, {
    type: "Bar chart",
    title: "Price Changes",
    intervalIndex: intervalIndex,
    label: label,
    ranges: currentRanges,
    setIntervalIndex: setIntervalIndex,
    currency: currency,
    setCurrency: setCurrency
  })), /*#__PURE__*/React.createElement("div", {
    className: cx(styles.range, styles.sortedBy)
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.sortedByLabel
  }, "Sorted by "), /*#__PURE__*/React.createElement(Range, {
    className: styles.rangeValue,
    range: sortLabel,
    changeRange: () => {
      setSortedByIndex((sortedByIndex + 1) % SORT_RANGES.length);
    }
  }))), noData ? /*#__PURE__*/React.createElement("div", {
    className: styles.noData
  }, /*#__PURE__*/React.createElement(NoDataCharts, null)) : /*#__PURE__*/React.createElement("div", {
    className: styles.chartWrapper
  }, /*#__PURE__*/React.createElement(Skeleton, {
    wrapperClassName: styles.skeleton,
    className: styles.ProjectsChart__skeletonTop,
    show: loading,
    repeat: 1
  }), /*#__PURE__*/React.createElement(Skeleton, {
    wrapperClassName: styles.skeleton,
    className: styles.ProjectsChart__skeletonBottom,
    show: loading,
    repeat: 1
  }), !loading && /*#__PURE__*/React.createElement("div", {
    className: styles.chart
  }, /*#__PURE__*/React.createElement(ResponsiveContainer, {
    width: "100%",
    height: "100%"
  }, /*#__PURE__*/React.createElement(ComposedChart, {
    cursor: "pointer",
    data: colored,
    margin: {
      top: 20,
      right: 0,
      left: -20,
      bottom: 0
    }
  }, /*#__PURE__*/React.createElement(CartesianGrid, {
    vertical: false,
    stroke: "var(--athens)"
  }), /*#__PURE__*/React.createElement(YAxis, {
    dataKey: key,
    axisLine: false,
    tickLine: false,
    fontSize: 10,
    fontWeight: 500,
    stroke: 'var(--casper)',
    tickCount: 8,
    tickFormatter: val => `${100 * val} %`
  }), /*#__PURE__*/React.createElement(Bar, {
    dataKey: key
  }, /*#__PURE__*/React.createElement(LabelList, {
    dataKey: key,
    content: renderCustomizedLabel
  }), colored.map((entry, index) => {
    return /*#__PURE__*/React.createElement(Cell, {
      key: `cell-${index}`,
      fill: entry.color,
      onClick: () => onProjectClick({
        value: entry[datakey]
      })
    });
  })), /*#__PURE__*/React.createElement(XAxis, {
    dataKey: datakey,
    minTickGap: 0,
    interval: 0,
    domain: ['auto', 'auto'],
    axisLine: false,
    tickLine: false,
    angle: -90,
    height: 135,
    fontSize: 12,
    fontWeight: 500,
    textAnchor: "end",
    verticalAnchor: "end",
    stroke: 'var(--fiord)',
    onClick: onProjectClick,
    dx: -5
  }), /*#__PURE__*/React.createElement(Tooltip, {
    content: /*#__PURE__*/React.createElement(ProjectsChartTooltip, {
      labelFormatter: (value, payload) => {
        const data = payload[0];

        if (data.payload) {
          return `${data.payload.name} ${data.payload.ticker}`;
        }
      },
      payloadLabels: getTooltipLabels({
        key,
        label
      }),
      classes: styles
    })
  }))))));
};

const mapDispatchToProps = dispatch => ({
  redirect: route => {
    dispatch(push(route));
  }
});

export default connect(null, mapDispatchToProps)(ProjectsChart);