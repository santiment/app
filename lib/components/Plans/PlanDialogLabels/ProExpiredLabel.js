import React from 'react';
import cx from 'classnames';
import ContactUs from '../../ContactUs/ContactUs';
import { formatOnlyPrice } from '../../../utils/plans';
import styles from './PlanDialogLabels.module.css';

const ProExpiredLabel = ({
  price,
  nextPaymentDate,
  period,
  trialDaysLeft
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: cx(styles.container, styles.expired)
  }, trialDaysLeft < 1 ? /*#__PURE__*/React.createElement("div", {
    className: styles.title
  }, "Your Pro trial has expired! If you have accidentally bypassed the free trial, please get in touch with", ' ', /*#__PURE__*/React.createElement(ContactUs, {
    as: "a",
    className: styles.contact
  }, "our support team")) : /*#__PURE__*/React.createElement("div", {
    className: styles.title
  }, "Your trial will end in ", trialDaysLeft, " day", trialDaysLeft === 1 ? '' : 's', ", you are free to upgrade it right now."), /*#__PURE__*/React.createElement("div", {
    className: styles.description
  }, "Your card will be charged ", /*#__PURE__*/React.createElement("span", {
    className: styles.highline
  }, formatOnlyPrice(price)), ' ', "every ", period, " until your decide to unsubscribe. Your next payment:", ' ', /*#__PURE__*/React.createElement("span", {
    className: styles.highline
  }, nextPaymentDate), "."));
};

export default ProExpiredLabel;