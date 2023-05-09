const _excluded = ["className"],
      _excluded2 = ["from", "to", "timeRange", "onCalendarChange", "onTimerangeChange", "options", "minDate", "maxDate"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import cx from 'classnames';
import ContextMenu from '@santiment-network/ui/ContextMenu';
import Panel from '@santiment-network/ui/Panel';
import Button from '@santiment-network/ui/Button';
import Calendar from '../Calendar/Calendar';
import styles from './Popup.module.css';
const DEFAULT_OPTIONS = [{
  index: '1d',
  label: 'Last day'
}, {
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

const Option = _ref => {
  let {
    className
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  return /*#__PURE__*/React.createElement(Button, _extends({}, props, {
    variant: "ghost",
    fluid: true,
    className: cx(styles.btn, className)
  }));
};

const Popup = _ref2 => {
  let {
    from,
    to,
    timeRange,
    onCalendarChange,
    onTimerangeChange,
    options = DEFAULT_OPTIONS,
    minDate,
    maxDate
  } = _ref2,
      props = _objectWithoutProperties(_ref2, _excluded2);

  return /*#__PURE__*/React.createElement(ContextMenu, _extends({
    passOpenStateAs: "isActive",
    position: "bottom",
    align: "end"
  }, props), /*#__PURE__*/React.createElement(Panel, {
    variant: "modal",
    className: styles.wrapper
  }, /*#__PURE__*/React.createElement(Calendar, {
    onChange: onCalendarChange,
    value: [from, to],
    selectRange: true,
    className: styles.calendar,
    maxDate: maxDate,
    minDate: minDate
  }), onTimerangeChange && /*#__PURE__*/React.createElement("div", {
    className: styles.right
  }, options.map(({
    index,
    label
  }) => /*#__PURE__*/React.createElement(Option, {
    key: index,
    isActive: timeRange === index,
    onClick: () => onTimerangeChange(index)
  }, label)))));
};

export default Popup;