import React from 'react';
import cx from 'classnames';
import Tooltip from '@santiment-network/ui/Tooltip';
import Icon from '@santiment-network/ui/Icon';
import { Checkbox } from '@santiment-network/ui/Checkboxes/Checkboxes';
import styles from '../ChannelsSelector.module.css';

const SourceToggle = ({
  isWebhook,
  disabled,
  isActive,
  onChange,
  label,
  children,
  tooltipText
}) => /*#__PURE__*/React.createElement("div", {
  className: styles.sourceWrapper
}, /*#__PURE__*/React.createElement("div", {
  className: cx(styles.inputsRow, !isWebhook && disabled && styles.disabled)
}, /*#__PURE__*/React.createElement(Checkbox, {
  disabled: !isWebhook && disabled,
  isActive: isWebhook ? isActive : !disabled && isActive,
  onClick: isWebhook ? onChange : disabled ? null : onChange
}), /*#__PURE__*/React.createElement("div", {
  className: styles.checkInfo
}, /*#__PURE__*/React.createElement("div", {
  className: styles.labelRow
}, label), tooltipText && /*#__PURE__*/React.createElement(Tooltip, {
  position: "bottom",
  trigger: /*#__PURE__*/React.createElement(Icon, {
    type: "info-round",
    className: styles.info
  }),
  className: styles.tooltip
}, /*#__PURE__*/React.createElement("div", {
  className: styles.tooltip__content
}, tooltipText)))), /*#__PURE__*/React.createElement("div", {
  className: styles.content
}, children));

export default SourceToggle;