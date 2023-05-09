function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import cx from 'classnames';
import Label from '@santiment-network/ui/Label';
import { addDays, addMinutes, dateDifferenceInWords } from '../../utils/dates';
import DarkTooltip from '../Tooltip/DarkTooltip';
import styles from './NewLabel.module.css';
const offset = new Date().getTimezoneOffset();
const NOW_WITH_OFFSET = addMinutes(new Date(), offset);
const NOW = new Date();
window.dateDifferenceInWords = dateDifferenceInWords;
export const NewLabelTemplate = ({
  className,
  rest
}) => /*#__PURE__*/React.createElement(Label, _extends({}, rest, {
  className: cx(styles.label, className),
  accent: "jungle-green",
  variant: "fill"
}), "NEW");

const showNewLabel = ({
  date,
  limitDays = 7,
  checkingTime
}) => {
  if (!date) {
    return false;
  }

  return addDays(date, limitDays).getTime() > checkingTime.getTime();
};

const NewLabel = ({
  date,
  className,
  withOffset = true,
  limitDays
}) => {
  const checkingTime = withOffset ? NOW_WITH_OFFSET : NOW;

  if (!showNewLabel({
    date,
    checkingTime,
    limitDays
  })) {
    return null;
  }

  return /*#__PURE__*/React.createElement(DarkTooltip, {
    position: "top",
    align: "start",
    on: "hover",
    className: styles.tooltip,
    trigger: /*#__PURE__*/React.createElement("span", {
      className: className
    }, /*#__PURE__*/React.createElement(NewLabelTemplate, null))
  }, "Created", ' ', dateDifferenceInWords({
    from: new Date(date),
    to: checkingTime,
    format: 'd'
  }));
};

export default NewLabel;