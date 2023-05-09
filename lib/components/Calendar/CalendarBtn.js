const _excluded = ["onChange", "className", "value"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import cx from 'classnames';
import ContextMenu from '@santiment-network/ui/ContextMenu';
import Icon from '@santiment-network/ui/Icon';
import Button from '@santiment-network/ui/Button';
import Calendar from './Calendar';
import { getDateFormats } from '../../utils/dates';
import styles from './CalendarBtn.module.css';

const getDateLabel = date => {
  const {
    DD,
    MM,
    YY
  } = getDateFormats(date);
  return `${DD}.${MM}.${YY}`;
};

const CalendarBtn = _ref => {
  let {
    onChange,
    className,
    value = [new Date(), new Date()]
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  const fromDate = getDateLabel(value[0]);
  const toDate = getDateLabel(value[1]);
  return /*#__PURE__*/React.createElement(ContextMenu, {
    passOpenStateAs: "isActive",
    position: "bottom",
    align: "end",
    trigger: /*#__PURE__*/React.createElement(Button, {
      border: true,
      classes: styles,
      className: cx(styles.btn, className)
    }, fromDate, " - ", toDate, " ", /*#__PURE__*/React.createElement(Icon, {
      type: "arrow-down",
      className: styles.icon
    }))
  }, /*#__PURE__*/React.createElement(Calendar, _extends({
    onChange: onChange,
    value: value,
    selectRange: true
  }, props)));
};

CalendarBtn.defaultProps = {
  onChange: () => {}
};
export default CalendarBtn;