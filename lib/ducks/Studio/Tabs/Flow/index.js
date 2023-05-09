import React, { useState } from 'react';
import Chord from './Chord';
import { getDateByDayIndex, getDaysAmount } from './utils';
import { usePeriodMatrix, useDayMatrix, useAnimatedDayIndex } from './hooks';
import Calendar from '../../AdvancedView/Calendar';
import { getTimeIntervalFromToday, DAY, ONE_DAY_IN_MS } from '../../../../utils/dates';
import styles from './index.module.css';
const DEFAULT_DAYS_AMOUNT = 7;
const {
  from,
  to
} = getTimeIntervalFromToday(-DEFAULT_DAYS_AMOUNT + 1, DAY);
const DEFAULT_DATES = [from, to];

const FlowBalances = ({
  slug,
  ticker,
  defaultDates,
  defaultDaysAmount
}) => {
  const [dates, setDates] = useState(defaultDates);
  const [daysAmount, setDaysAmount] = useState(defaultDaysAmount);
  const {
    periodMatrix,
    isLoading
  } = usePeriodMatrix(slug, dates, daysAmount);
  const [dayIndex] = useAnimatedDayIndex(daysAmount, isLoading);
  const {
    matrix,
    isEmpty
  } = useDayMatrix(periodMatrix, dayIndex);

  function onCalendarChange(dates) {
    setDaysAmount(getDaysAmount(dates[0], dates[1]));
    setDayIndex(0);
    setDates(dates);
  }

  return /*#__PURE__*/React.createElement("div", {
    className: styles.wrapper
  }, /*#__PURE__*/React.createElement(Calendar, {
    selectRange: true,
    dates: dates,
    onChange: onCalendarChange,
    className: styles.calendar,
    maxDate: to
  }), /*#__PURE__*/React.createElement("div", {
    className: styles.title
  }, ticker, " Flow Balances on ", getDateByDayIndex(dates, dayIndex)), /*#__PURE__*/React.createElement(Chord, {
    matrix: matrix,
    isLoading: isLoading,
    isEmpty: isEmpty
  }));
};

FlowBalances.defaultProps = {
  defaultDates: DEFAULT_DATES,
  defaultDaysAmount: DEFAULT_DAYS_AMOUNT
};
export default FlowBalances;