import React, { useState } from 'react';
import cx from 'classnames';
import Icon from '@santiment-network/ui/Icon';
import { Checkbox } from '@santiment-network/ui/Checkboxes';
import { Metric } from '../../../../../../dataHub/metrics';
import MetricExplanation from '../../../../../../SANCharts/MetricExplanation';
import styles from './Column.module.css';
const EMPTY_OBJ = {};

const Column = ({
  onColumnToggle,
  column,
  isActive,
  className,
  draggable,
  DragHandle,
  isHide
}) => {
  const [active, setActive] = useState(isActive);
  const {
    key,
    descriptionKey = key,
    label
  } = column;
  const metricForDescription = Metric[descriptionKey] || EMPTY_OBJ;

  const onClick = () => {
    setActive(!active);
    onColumnToggle(key, !active);
  };

  return /*#__PURE__*/React.createElement("div", {
    className: cx(styles.column, isHide && draggable && styles.column__hide, className)
  }, draggable && /*#__PURE__*/React.createElement(DragHandle, null), /*#__PURE__*/React.createElement("div", {
    className: styles.clickableZone,
    onClick: onClick
  }, /*#__PURE__*/React.createElement(Checkbox, {
    className: styles.checkbox,
    isActive: active
  }), /*#__PURE__*/React.createElement("span", {
    className: styles.name
  }, label)), /*#__PURE__*/React.createElement(MetricExplanation, {
    on: "click",
    metric: metricForDescription,
    position: "bottom",
    align: "center"
  }, /*#__PURE__*/React.createElement(Icon, {
    type: "info-round",
    className: styles.info
  })));
};

export default Column;