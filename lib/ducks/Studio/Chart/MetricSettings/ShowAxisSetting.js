import React from 'react';
import { Checkbox } from '@santiment-network/ui/Checkboxes';
import Setting from './Setting';
import styles from './index.module.css';
export const ShowAxisSetting = ({
  metric,
  widget,
  rerenderWidgets
}) => {
  const {
    axesMetricSet
  } = widget;
  const isActive = axesMetricSet.has(metric);
  const isDisabled = isActive && axesMetricSet.size < 2;

  function onClick() {
    if (isDisabled) return;
    const newSet = new Set(axesMetricSet);

    if (isActive) {
      newSet.delete(metric);
      widget.disabledAxesMetricSet.add(metric);
    } else {
      newSet.add(metric);
      widget.disabledAxesMetricSet.delete(metric);
    }

    widget.axesMetricSet = newSet;
    rerenderWidgets();
  }

  return /*#__PURE__*/React.createElement(Setting, {
    isDropdown: false,
    onClick: onClick
  }, "Show axis", /*#__PURE__*/React.createElement(Checkbox, {
    isActive: isActive,
    disabled: isDisabled,
    className: styles.arrow
  }));
};
export default ShowAxisSetting;