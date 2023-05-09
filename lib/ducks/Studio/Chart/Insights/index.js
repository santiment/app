function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useMemo, useState, useCallback } from 'react';
import Point from './Point';
import { withViewportFilter } from './withViewportFilter';
import { useInsights, useActiveToggleInsight } from '../../insights/context';
import { findPointByDate } from '../../../Chart/utils';
import { useChart } from '../../../Chart/context';
import { useUser } from '../../../../stores/user';
const POINT_MARGIN = 13;

const newPoint = (insight, top, left) => _extends({}, insight, {
  top,
  left
});

function getStackOffset(stack, x) {
  const offset = stack[x] || 0;
  stack[x] = offset ? offset + POINT_MARGIN : POINT_MARGIN;
  return offset;
}

function buildInsightPoints(chart, insights) {
  const points = [];
  const stack = {};

  for (let i = insights.length - 1; i > -1; i--) {
    const insight = insights[i];
    const point = findPointByDate(chart.points, +new Date(insight.publishedAt));
    if (!point) continue;
    const {
      x
    } = point;
    points.push(newPoint(insight, chart.bottom - getStackOffset(stack, x), x));
  }

  return points;
}

const Insights = ({
  chart,
  insights
}) => {
  const isAnon = !useUser().isLoggedIn;
  const activeInsightType = useActiveToggleInsight();
  const isPulseInsights = activeInsightType && activeInsightType.key === 'pulse';
  const points = useMemo(() => chart.points.length ? buildInsightPoints(chart, insights) : [], [chart.points, insights]);
  const [openedIndex, setOpenedIndex] = useState();
  const onPrevClick = useCallback(() => setOpenedIndex(i => i - 1), []);
  const onNextClick = useCallback(() => setOpenedIndex(i => i + 1), []);
  const lastIndex = points.length - 1;
  return points.map((point, i) => /*#__PURE__*/React.createElement(Point, _extends({
    key: point.id,
    index: i,
    isOpened: i === openedIndex,
    isFirst: i === 0,
    isLast: i === lastIndex,
    isPulseInsights: isPulseInsights,
    isAnon: isAnon,
    onPrevClick: onPrevClick,
    onNextClick: onNextClick,
    setOpenedIndex: setOpenedIndex
  }, point)));
};

const withOnlyIfInsights = Component => props => {
  const chart = props.chart || useChart();
  const insights = props.insights || useInsights();
  return insights.length ? /*#__PURE__*/React.createElement(Component, _extends({}, props, {
    chart: chart,
    insights: insights
  })) : null;
};

export default withOnlyIfInsights(withViewportFilter(Insights));