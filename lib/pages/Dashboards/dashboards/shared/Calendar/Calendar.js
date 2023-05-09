import React, { useState } from 'react';
import cx from 'classnames';
import Icon from '@santiment-network/ui/Icon';
import AdvancedCalendar from '../../../../../ducks/Studio/AdvancedView/Calendar';
import { getTimePeriod } from '../../../../TrendsExplore/utils';
import { addDays, checkIsToday } from '../../../../../utils/dates';
import styles from './Calendar.module.css';
const MAX_DATE = new Date();

const Calendar = ({
  setTrendPeriod
}) => {
  const [trendDate, setTrendDate] = useState([MAX_DATE]);

  function onTrendCalendarChange(date) {
    setTrendDate([date]);
    let period;

    if (!checkIsToday(date)) {
      period = getTimePeriod(date);
      period.interval = '1d';
    }

    setTrendPeriod(period);
  }

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
    className: cx(styles.action, 'btn-2 row hv-center mrg-s mrg--r expl-tooltip'),
    onClick: () => onTrendCalendarChange(addDays(trendDate, -1)),
    "aria-label": "Previous day"
  }, /*#__PURE__*/React.createElement(Icon, {
    type: "arrow-left-big"
  })), /*#__PURE__*/React.createElement("button", {
    className: cx(styles.action, 'btn-2 row hv-center expl-tooltip'),
    disabled: checkIsToday(trendDate[0]),
    onClick: () => onTrendCalendarChange(addDays(trendDate, 1)),
    "aria-label": "Next day"
  }, /*#__PURE__*/React.createElement(Icon, {
    type: "arrow-right-big"
  })), /*#__PURE__*/React.createElement(AdvancedCalendar, {
    dates: trendDate,
    onChange: onTrendCalendarChange,
    className: "row justify v-center mrg-m mrg--l",
    maxDate: MAX_DATE,
    isFullDate: true
  }));
};

export default Calendar;