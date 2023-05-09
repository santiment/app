const _excluded = ["settings", "changeTimePeriod"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import Selector from '@santiment-network/ui/Selector/Selector';
import AdvancedCalendar from '../../../components/AdvancedCalendar';
import { getIntervalByTimeRange } from '../../../utils/dates';
import styles from './index.module.css';
const TIMERANGES = ['1D', '1W', '1M', '3M', '6M', 'All'];

const TimeRanges = ({
  timeRange,
  onTimerangeChange
}) => /*#__PURE__*/React.createElement(Selector, {
  className: styles.timeranges,
  options: TIMERANGES,
  defaultSelected: timeRange,
  onSelectOption: onTimerangeChange
});

export const Calendar = _ref => {
  let {
    settings,
    changeTimePeriod
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  const {
    from,
    to,
    timeRange
  } = settings;

  function onCalendarChange([from, to]) {
    changeTimePeriod(from, to);
  }

  return /*#__PURE__*/React.createElement(AdvancedCalendar, _extends({}, props, {
    from: new Date(from),
    to: new Date(to),
    timeRange: timeRange,
    onCalendarChange: onCalendarChange
  }));
};

const DatePicker = ({
  settings,
  isPhone,
  changeTimePeriod
}) => {
  function onTimerangeChange(timeRange) {
    const {
      from,
      to
    } = getIntervalByTimeRange(timeRange.toLowerCase());
    changeTimePeriod(from, to, timeRange);
  }

  return isPhone ? /*#__PURE__*/React.createElement(TimeRanges, {
    timeRange: settings.timeRange,
    onTimerangeChange: onTimerangeChange
  }) : /*#__PURE__*/React.createElement(Calendar, {
    className: styles.calendar,
    settings: settings,
    changeTimePeriod: changeTimePeriod,
    onTimerangeChange: onTimerangeChange
  });
};

export default DatePicker;