function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import cx from 'classnames';
import RestrictBtn from './RestrictBtn';
import Features from './Features';
import PLANS, { TRIAL_LABEL } from './list';
import { formatPrice, getAlternativeBillingPlan } from '../../utils/plans';
import { useUser } from '../../stores/user';
import { useUserSubscriptionStatus } from '../../stores/user/subscriptions';
import styles from './Plan.module.css';
export const getAltPrice = (plans, billing, name) => {
  const {
    amount: altAmount,
    interval: altInterval
  } = getAlternativeBillingPlan(plans, {
    name,
    interval: billing
  }) || {};
  const [altPrice] = formatPrice(altAmount, null, altInterval);
  return {
    altPrice,
    altInterval
  };
};
export const isSameAsUserPlan = (subscription, id, userPlan) => subscription && !subscription.trialEnd && id === userPlan;
export const PlanDiscontBlock = ({
  card,
  altPrice,
  altInterval
}) => {
  return card.discount || `${altPrice} if billed ${altInterval}ly`;
};

const Plan = ({
  plan,
  billing,
  plans,
  className,
  onDialogClose,
  subscription,
  classes = {},
  btnProps
}) => {
  const {
    id,
    name,
    amount
  } = plan;
  const card = PLANS[name];
  const userPlan = subscription && subscription.plan.id;
  const {
    isTrial
  } = useUserSubscriptionStatus();
  const [price, priceType] = formatPrice(amount, name, billing);
  const sameAsUserPlan = isSameAsUserPlan(subscription, id, userPlan);
  const {
    altPrice,
    altInterval
  } = getAltPrice(plans, billing, name);

  if (!card) {
    return null;
  }

  const isCustom = price === 'Custom';
  const isFree = name === 'FREE';
  return /*#__PURE__*/React.createElement("div", {
    className: cx(styles.card, className, classes.wrapper, card.isPopular && styles.card_popular, sameAsUserPlan && styles.card_active, sameAsUserPlan && classes.wrapper_active)
  }, /*#__PURE__*/React.createElement("div", {
    className: cx(styles.card__top, classes.top)
  }, /*#__PURE__*/React.createElement("h3", {
    className: cx(styles.card__title, isFree && styles.card__title__free)
  }, card.title, " ", sameAsUserPlan && isTrial ? 'Trial' : '')), /*#__PURE__*/React.createElement("div", {
    className: styles.desc
  }, card.desc), /*#__PURE__*/React.createElement("div", {
    className: cx(styles.details, isCustom && styles.details_custom)
  }, !isCustom && /*#__PURE__*/React.createElement("div", {
    className: cx(styles.price, classes.price)
  }, price, /*#__PURE__*/React.createElement("span", {
    className: styles.price__type
  }, priceType)), /*#__PURE__*/React.createElement("div", {
    className: styles.discount
  }, /*#__PURE__*/React.createElement(PlanDiscontBlock, {
    card: card,
    altPrice: altPrice,
    altInterval: altInterval
  })), /*#__PURE__*/React.createElement(PlanBtn, {
    onDialogClose: onDialogClose,
    subscription: subscription,
    btnProps: btnProps,
    sameAsUserPlan: sameAsUserPlan,
    card: card,
    altPrice: altPrice,
    amount: amount,
    billing: billing,
    id: id,
    showCreditMsg: !isFree
  }), /*#__PURE__*/React.createElement(Features, {
    isGreen: isFree,
    data: card.features,
    classes: _objectSpread(_objectSpread({}, styles), classes)
  })));
};

export const PlanBtn = ({
  onDialogClose,
  subscription,
  btnProps,
  sameAsUserPlan,
  card,
  altPrice,
  amount,
  billing,
  id,
  className,
  showCreditMsg,
  onOpen
}) => {
  const {
    isLoggedIn
  } = useUser();
  const {
    isEligibleForSanbaseTrial
  } = useUserSubscriptionStatus();
  const isSubscriptionCanceled = subscription && subscription.cancelAtPeriodEnd;
  const label = isLoggedIn && card.link === TRIAL_LABEL ? isEligibleForSanbaseTrial ? card.link : 'Pay' : card.link;
  return /*#__PURE__*/React.createElement("div", {
    className: className
  }, !isLoggedIn || sameAsUserPlan || isSubscriptionCanceled ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(RestrictBtn, {
    showCreditMsg: showCreditMsg,
    sameAsUserPlan: sameAsUserPlan,
    isSubscriptionCanceled: isSubscriptionCanceled,
    label: label
  })) : /*#__PURE__*/React.createElement(card.Component, {
    title: card.title,
    label: label,
    price: amount,
    billing: billing,
    planId: +id,
    subscription: subscription,
    onDialogClose: onDialogClose,
    btnProps: btnProps,
    altPrice: altPrice,
    onOpen: onOpen
  }));
};
export default Plan;