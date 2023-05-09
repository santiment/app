import React from 'react';
import Icon from '@santiment-network/ui/Icon';
import StepTitle from '../../StepTitle/StepTitle';
import NextStep from '../../NextStep/NextStep';
import { getSelectedAssetMetricCardDescription } from '../../../../../utils';
import styles from './ConditionsTitle.module.css';

const ConditionsTitle = ({
  metric,
  onClick,
  handleNextClick
}) => /*#__PURE__*/React.createElement("div", {
  className: styles.wrapper
}, /*#__PURE__*/React.createElement("div", {
  className: styles.titleWrapper
}, /*#__PURE__*/React.createElement(StepTitle, {
  title: "Choose Metric"
}), /*#__PURE__*/React.createElement(NextStep, {
  label: "Notification & Privacy",
  onClick: handleNextClick
})), /*#__PURE__*/React.createElement("div", {
  className: styles.selected,
  onClick: onClick
}, /*#__PURE__*/React.createElement("div", {
  className: styles.title
}, metric.label, /*#__PURE__*/React.createElement(Icon, {
  type: "edit",
  className: styles.icon
})), /*#__PURE__*/React.createElement("div", {
  className: styles.description
}, getSelectedAssetMetricCardDescription(metric))));

export default ConditionsTitle;