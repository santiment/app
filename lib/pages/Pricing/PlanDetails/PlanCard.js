import React from 'react';
import cx from 'classnames';
import PLANS from '../../../components/Plans/list';
import { getAltPrice, isSameAsUserPlan, PlanBtn } from '../../../components/Plans/Plan';
import { formatPrice } from '../../../utils/plans';
import styles from './PlanDetails.module.css';
export const PlanCard = ({
  plan,
  plans,
  subscription,
  userPlan,
  billing,
  as: El = 'div',
  classes = {}
}) => {
  const {
    id,
    name,
    amount
  } = plan;
  const card = PLANS[name];
  const isFree = name === 'FREE';
  const sameAsUserPlan = isSameAsUserPlan(subscription, id, userPlan);
  const {
    altPrice
  } = getAltPrice(plans, billing, name);
  const [price, priceType] = formatPrice(amount, name, billing);
  return /*#__PURE__*/React.createElement(El, {
    key: id,
    className: cx(styles.th, styles.cell, classes.cell)
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.title
  }, /*#__PURE__*/React.createElement("div", {
    className: cx(styles.name, classes.name)
  }, card.title), /*#__PURE__*/React.createElement("div", {
    className: cx(styles.description, classes.description)
  }, card.discount || /*#__PURE__*/React.createElement("div", null, price, " ", priceType))), /*#__PURE__*/React.createElement(PlanBtn, {
    subscription: subscription,
    sameAsUserPlan: sameAsUserPlan,
    card: card,
    altPrice: altPrice,
    amount: amount,
    billing: billing,
    id: id,
    btnProps: {
      accent: 'orange'
    },
    className: classes.planBtn,
    showCreditMsg: !isFree
  }));
};