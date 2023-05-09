const _excluded = ["dates", "isFullDate", "className", "isDesktop"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useState } from 'react';
import cx from 'classnames';
import Dialog from '@santiment-network/ui/Dialog';
import ContextMenu from '@santiment-network/ui/ContextMenu';
import Icon from '@santiment-network/ui/Icon';
import Button from '@santiment-network/ui/Button';
import Calendar from '../../../components/Calendar/Calendar';
import { getDateFormats } from '../../../utils/dates';
import styles from './Calendar.module.css';

const getDateLabel = (date, isFullDate) => {
  const {
    DD,
    MMM,
    YY,
    MMMM,
    YYYY
  } = getDateFormats(date);
  if (isFullDate) return `${DD} ${MMMM}, ${YYYY}`;
  return `${DD} ${MMM} ${YY}`;
};

const checkSameDates = ([from, to]) => !to || from.getDate() === to.getDate() && from.getMonth() === to.getMonth() && from.getFullYear() === to.getFullYear();

const AdvancedViewCalendar = _ref => {
  let {
    dates,
    isFullDate,
    className,
    isDesktop = true
  } = _ref,
      rest = _objectWithoutProperties(_ref, _excluded);

  const [isOpen, setIsOpen] = useState(false);
  const label = checkSameDates(dates) ? getDateLabel(dates[0], isFullDate) : `${getDateLabel(dates[0])} - ${getDateLabel(dates[1])}`;
  const trigger = isFullDate ? /*#__PURE__*/React.createElement(Button, {
    border: true,
    classes: styles,
    className: cx(styles.btn, className)
  }, /*#__PURE__*/React.createElement(Icon, {
    type: "calendar",
    className: styles.leftIcon
  }), label) : /*#__PURE__*/React.createElement(Button, {
    border: true,
    classes: styles,
    className: cx(styles.btn, className)
  }, label, /*#__PURE__*/React.createElement(Icon, {
    type: "calendar",
    className: styles.icon
  }));

  if (!isDesktop) {
    return /*#__PURE__*/React.createElement(Dialog, {
      title: "Choose a date",
      passOpenStateAs: "isActive",
      trigger: trigger,
      open: isOpen,
      onOpen: () => setIsOpen(true),
      onClose: () => setIsOpen(false),
      classes: {
        dialog: styles.dialog,
        title: cx(styles.dialogTitle, 'row v-center body-2 txt-m')
      }
    }, /*#__PURE__*/React.createElement(Calendar, _extends({
      value: dates,
      isDesktop: isDesktop
    }, rest)), /*#__PURE__*/React.createElement("button", {
      className: cx(styles.apply, 'btn-1 row hv-center body-2'),
      onClick: () => setIsOpen(false)
    }, "Apply"));
  }

  return /*#__PURE__*/React.createElement(ContextMenu, {
    passOpenStateAs: "isActive",
    position: "bottom",
    align: "end",
    trigger: trigger
  }, /*#__PURE__*/React.createElement(Calendar, _extends({
    value: dates
  }, rest)));
};

AdvancedViewCalendar.defaultProps = {
  dates: [new Date()]
};
export default AdvancedViewCalendar;