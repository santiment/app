import React from 'react';
import cx from 'classnames';
import { formatOnlyPrice } from '../../../utils/plans';
import styles from './PlanDialogLabels.module.css';

const FreeTrialLabel = ({
  price,
  trialEndData
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: cx(styles.container, styles.free)
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.title
  }, "Enjoy your 14-day free trial of Sanbase Pro!"), /*#__PURE__*/React.createElement("div", {
    className: styles.description
  }, "Your card will be charged ", /*#__PURE__*/React.createElement("span", {
    className: styles.highline
  }, formatOnlyPrice(price)), ' ', "after the trial period ends. You won't be charged if you cancel anytime before", ' ', /*#__PURE__*/React.createElement("span", {
    className: styles.highline
  }, trialEndData)));
};

export default FreeTrialLabel;