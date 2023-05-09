function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import Icon from '@santiment-network/ui/Icon';
import Calendar from './Calendar';
import WordCloud from '../../../components/WordCloud/WordCloudWithHeader';
import { INTERVAL_ALIAS } from '../../SANCharts/IntervalSelector';
import { parseIntervalString, ONE_MONTH_IN_MS } from '../../../utils/dates';
import TrendsTable from '../../../ducks/TrendsTable';
import styles from './SocialContext.module.css';

function getTimePeriod(date, interval) {
  const {
    amount,
    format
  } = parseIntervalString(interval);
  const from = new Date(date);
  const to = new Date(date);

  if (format === 'd') {
    from.setDate(to.getDate() - amount);
  } else {
    from.setHours(to.getHours() - amount);
  }

  return {
    from: from.toISOString(),
    to: to.toISOString(),
    interval: '1d'
  };
}

const SocialContext = ({
  interval,
  date,
  project: {
    slug
  }
}) => {
  const [trendDate, setTrendDate] = useState([date]);
  const [contextDate, setContextDate] = useState([date]);
  const [contextPeriod, setContextPeriod] = useState({});
  const [trendPeriod, setTrendPeriod] = useState({});
  const constrainedInterval = INTERVAL_ALIAS[interval] ? '1h' : interval;
  useEffect(() => {
    setContextDate([date]);
    setTrendDate([date]);
    const period = getTimePeriod(date, constrainedInterval);
    setContextPeriod(period);
    setTrendPeriod(period);
  }, [date, interval]);

  function onTrendCalendarChange(datetime) {
    setTrendDate([datetime]);
    setTrendPeriod(getTimePeriod(datetime, constrainedInterval));
  }

  function onContextCalendarChange(datetime) {
    setContextDate([datetime]);
    setContextPeriod(getTimePeriod(datetime, constrainedInterval));
  }

  return /*#__PURE__*/React.createElement("div", {
    className: styles.content
  }, /*#__PURE__*/React.createElement(Calendar, {
    dates: contextDate,
    onChange: onContextCalendarChange,
    className: styles.contextCalendar
  }), /*#__PURE__*/React.createElement(WordCloud, _extends({
    word: slug,
    size: 12,
    className: cx(styles.item, styles.item_cloud),
    infoClassName: styles.cloud__header,
    contentClassName: styles.cloud
  }, contextPeriod)), /*#__PURE__*/React.createElement("div", {
    className: cx(styles.item, styles.item_trends)
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.row
  }, /*#__PURE__*/React.createElement("h3", {
    className: styles.trend
  }, "Trending words ", /*#__PURE__*/React.createElement("span", {
    className: styles.trend__label
  }, "top 10")), /*#__PURE__*/React.createElement(Calendar, {
    dates: trendDate,
    onChange: onTrendCalendarChange
  })), /*#__PURE__*/React.createElement("div", {
    className: styles.trends
  }, /*#__PURE__*/React.createElement(TrendsTable, {
    className: styles.table,
    isCompact: true,
    period: trendPeriod
  }))));
};

SocialContext.Icon = /*#__PURE__*/React.createElement(Icon, {
  type: "cloud-small"
});
SocialContext.defaultProps = {
  date: new Date(Date.now() - ONE_MONTH_IN_MS * 3),
  interval: '1d',
  project: {
    slug: 'bitcoin'
  }
};
export default SocialContext;