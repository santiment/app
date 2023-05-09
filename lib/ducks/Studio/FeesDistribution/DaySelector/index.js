import React, { useState } from 'react';
import cx from 'classnames';
import Calendar from '../../../Studio/AdvancedView/Calendar';
import { getPreviousDays } from './utils';
import styles from './index.module.css';
const MAX_DATE = new Date();
MAX_DATE.setHours(23, 59, 59, 59);

const DaysSelector = ({
  onDayChange,
  className,
  daysClassName
}) => {
  const [selectedDate, setSelectedDate] = useState([MAX_DATE]);
  const [previousDays] = useState(getPreviousDays(7, MAX_DATE));

  function onDateChange(date) {
    const customDate = new Date(date);
    customDate.setHours(23, 59, 59, 59);
    setSelectedDate([customDate]);
    onDayChange(customDate);
  }

  return /*#__PURE__*/React.createElement("div", {
    className: cx(styles.wrapper, className)
  }, /*#__PURE__*/React.createElement("div", {
    className: cx(styles.days, daysClassName)
  }, previousDays.map(({
    label,
    date
  }, idx) => {
    const isSelected = date.getDate() === selectedDate[0].getDate();
    return /*#__PURE__*/React.createElement("div", {
      className: cx(styles.day, isSelected && styles.selected),
      key: idx,
      onClick: () => isSelected ? {} : onDateChange(date)
    }, label);
  })), /*#__PURE__*/React.createElement(Calendar, {
    dates: selectedDate,
    onChange: onDateChange,
    className: styles.calendar,
    maxDate: MAX_DATE
  }));
};

export default DaysSelector;