import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import Icon from '@santiment-network/ui/Icon';
import { getYearMonthPrices } from '../../utils/plans';
import styles from './PlansDropdown.module.css'; // TODO: refactor component to be used generally [@vanguard | March 5, 2020]

const PlansDropdown = ({
  title,
  plan,
  altPlan,
  onBillingSelect
}) => {
  const [isOpened, setIsOpened] = useState(false);
  const isYearBilling = plan.interval === 'year';
  const [, monthPrice] = getYearMonthPrices(plan.amount, plan.interval);
  const [, altMonthPrice] = getYearMonthPrices(altPlan.amount, altPlan.interval);
  const [monthPlanPrice, yearPlanPrice] = isYearBilling ? [altMonthPrice, monthPrice] : [monthPrice, altMonthPrice];
  useEffect(() => {
    if (isOpened) {
      window.addEventListener('click', closeDropdown);
      return () => window.removeEventListener('click', closeDropdown);
    }
  }, [isOpened]);

  function closeDropdown() {
    setIsOpened(false);
  }

  return /*#__PURE__*/React.createElement("div", {
    className: styles.wrapper
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.holder,
    onClick: () => setIsOpened(true)
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.title
  }, title), /*#__PURE__*/React.createElement("div", {
    className: styles.icon
  }, /*#__PURE__*/React.createElement(Icon, {
    type: "arrow-down",
    className: cx(isOpened && styles.icon_active)
  })), isOpened && /*#__PURE__*/React.createElement("div", {
    className: styles.dropdown
  }, /*#__PURE__*/React.createElement("div", {
    className: cx(styles.option, !isYearBilling && styles.active),
    onClick: () => onBillingSelect('month')
  }, "Bill monthly - ", /*#__PURE__*/React.createElement("span", {
    className: styles.price
  }, monthPlanPrice, "/mo")), /*#__PURE__*/React.createElement("div", {
    className: cx(styles.option, isYearBilling && styles.active),
    onClick: () => onBillingSelect('year')
  }, "Bill yearly - ", /*#__PURE__*/React.createElement("span", {
    className: styles.price
  }, yearPlanPrice, "/mo"), /*#__PURE__*/React.createElement("span", {
    className: cx(styles.save, styles.save_drop)
  }, "Save 10%", ' ', /*#__PURE__*/React.createElement("span", {
    role: "img",
    "aria-label": "nice"
  }, "\uD83C\uDF89"))))), /*#__PURE__*/React.createElement("span", {
    className: styles.save
  }, "Save 10% ", isYearBilling ? '🎉' : 'with yearly billing'));
};

export default PlansDropdown;