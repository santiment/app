const _excluded = ["settings", "options", "setOptions", "setSettings", "changeTimePeriod", "className", "shareLink"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import cx from 'classnames';
import AdvancedCalendar from '../../../../components/AdvancedCalendar';
import ContextMenu from '../../../Studio/Chart/ContextMenu';
import { ShareButton } from '../../../Studio/Header/Settings';
import PricePairsDropdown from '../PricePairsDropdown';
import { getIntervalByTimeRange } from '../../../../utils/dates';
import styles from './Settings.module.css';
const TIMERANGE_OPTIONS = [{
  index: '1w',
  label: 'Last week'
}, {
  index: '1m',
  label: 'Last month'
}, {
  index: '3m',
  label: 'Last 3 months'
}, {
  index: '6m',
  label: 'Last 6 months'
}, {
  index: '1y',
  label: 'Last year'
}, {
  index: 'all',
  label: 'All time'
}];
export default (_ref => {
  let {
    settings,
    options,
    setOptions,
    setSettings,
    changeTimePeriod,
    className,
    shareLink
  } = _ref,
      rest = _objectWithoutProperties(_ref, _excluded);

  const {
    timeRange = '',
    from,
    to,
    slug
  } = settings;

  function onTimerangeChange(timeRange) {
    const {
      from,
      to
    } = getIntervalByTimeRange(timeRange.toLowerCase());
    changeTimePeriod(from, to, timeRange);
  }

  function onCalendarChange([from, to]) {
    changeTimePeriod(from, to);
  }

  return /*#__PURE__*/React.createElement("div", {
    className: cx(styles.wrapper, className)
  }, /*#__PURE__*/React.createElement(AdvancedCalendar, {
    className: styles.calendar,
    from: new Date(from),
    to: new Date(to),
    timeRange: timeRange,
    options: TIMERANGE_OPTIONS,
    onCalendarChange: onCalendarChange,
    onTimerangeChange: onTimerangeChange
  }), /*#__PURE__*/React.createElement(PricePairsDropdown, _extends({}, rest, {
    settings: settings,
    setSettings: setSettings
  })), /*#__PURE__*/React.createElement(ShareButton, null), /*#__PURE__*/React.createElement(ContextMenu, _extends({
    classes: {
      settingsBtn: styles.settings
    },
    title: slug,
    setOptions: setOptions
  }, options, rest)));
});