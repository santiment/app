import React, { useState } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Icon from '@santiment-network/ui/Icon';
import Input from '@santiment-network/ui/Input';
import Dialog from '@santiment-network/ui/Dialog';
import { useDebounce } from '../../hooks';
import { formatOnlyPrice, getAlternativeBillingPlan } from '../../utils/plans';
import { usePlans } from '../../ducks/Plans/hooks';
import { useUserSubscriptionStatus } from '../../stores/user/subscriptions';
import PlansDropdown from './PlansDropdown';
import sharedStyles from './CheckoutForm.module.css';
import styles from './Confirmation.module.css';
const CHECK_COUPON_QUERY = gql`
  query getCoupon($coupon: String!) {
    getCoupon(coupon: $coupon) {
      amountOff
      id
      isValid
      name
      percentOff
    }
  }
`;

const mapStateToProps = state => ({
  hasSanDiscount: state.user.data.sanBalance >= 1000
});

const TotalPrice = connect(mapStateToProps)(({
  price,
  planWithBilling,
  percentOff,
  hasSanDiscount
}) => {
  const resultPercentOff = percentOff || hasSanDiscount && 20;
  const priceInt = +price.slice(1);
  const amountOff = resultPercentOff ? Math.floor(priceInt * (resultPercentOff / 100)) : 0;
  const discountMsg = percentOff ? 'Discount code' : hasSanDiscount && 'SAN Holder discount';
  return /*#__PURE__*/React.createElement("div", {
    className: styles.check
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.check__label
  }, planWithBilling, /*#__PURE__*/React.createElement("div", null, price)), resultPercentOff && /*#__PURE__*/React.createElement("div", {
    className: styles.check__label
  }, discountMsg, " ", resultPercentOff, "%", /*#__PURE__*/React.createElement("div", {
    className: styles.check__discount
  }, "-$", amountOff)), /*#__PURE__*/React.createElement("div", {
    className: styles.check__total
  }, "Total due", /*#__PURE__*/React.createElement("div", {
    className: styles.check__price
  }, "$", priceInt - amountOff)));
});

const DiscountIcon = ({
  isValid
}) => {
  if (isValid === undefined) return null;
  return /*#__PURE__*/React.createElement(Icon, {
    type: isValid ? 'success-round' : 'error',
    className: cx(styles.discount__icon, isValid && styles.valid)
  });
};

const DiscountInput = ({
  setCoupon,
  isValid
}) => {
  const setCouponDebounced = useDebounce(value => setCoupon(value), 500);
  return /*#__PURE__*/React.createElement("label", {
    className: cx(styles.label, styles.label_card)
  }, "Discount code", /*#__PURE__*/React.createElement("div", {
    className: styles.discount
  }, /*#__PURE__*/React.createElement(Input, {
    className: styles.input,
    placeholder: "2H8vZG5P",
    name: "coupon",
    "data-is-valid": isValid,
    onChange: ({
      currentTarget: {
        value
      }
    }) => setCouponDebounced(value)
  }), /*#__PURE__*/React.createElement(DiscountIcon, {
    isValid: isValid
  })));
};

const Confirmation = ({
  plan: name,
  billing,
  price,
  loading,
  changeSelectedPlan,
  subscription
}) => {
  const [plans] = usePlans();
  const [coupon, setCoupon] = useState('');
  const planWithBilling = `${name} ${billing}ly`;
  const plan = {
    name: name.toUpperCase(),
    interval: billing,
    amount: price
  };
  const altPlan = getAlternativeBillingPlan(plans, plan) || {};
  const {
    isEligibleForSanbaseTrial
  } = useUserSubscriptionStatus();
  return /*#__PURE__*/React.createElement("div", {
    className: sharedStyles.confirmation
  }, /*#__PURE__*/React.createElement("div", {
    className: cx(sharedStyles.form, styles.form)
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.plan
  }, /*#__PURE__*/React.createElement(PlansDropdown, {
    title: planWithBilling,
    plan: plan,
    altPlan: altPlan,
    onBillingSelect: changeSelectedPlan
  }), /*#__PURE__*/React.createElement("div", {
    className: styles.plan__right
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", {
    className: styles.plan__year
  }, formatOnlyPrice(price)), " / ", billing))), /*#__PURE__*/React.createElement(Query, {
    skip: !coupon,
    query: CHECK_COUPON_QUERY,
    variables: {
      coupon
    },
    fetchPolicy: "no-cache"
  }, ({
    loading: couponLoading,
    error,
    data: {
      getCoupon
    } = {}
  }) => {
    // NOTE: Seems like graphql is caching the last value after error even with no-cache [@vanguard | Dec 16, 2019]
    const {
      isValid,
      percentOff
    } = error ? {} : getCoupon || {};
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(DiscountInput, {
      isValid: !error && isValid,
      setCoupon: setCoupon
    }), /*#__PURE__*/React.createElement("div", {
      className: styles.hold
    }, /*#__PURE__*/React.createElement(Icon, {
      className: styles.hold__icon,
      type: "info-round"
    }), "Holding 1000 SAN tokens will result in a 20% discount.", /*#__PURE__*/React.createElement("a", {
      href: "https://santiment.net/about-santiment/how-to-buy-san/",
      target: "_blank",
      rel: "noopener noreferrer",
      className: styles.learn
    }, "Learn how to buy SAN.")), /*#__PURE__*/React.createElement("div", {
      className: styles.price
    }, /*#__PURE__*/React.createElement(TotalPrice, {
      error: error,
      percentOff: isValid && percentOff,
      price: formatOnlyPrice(price),
      planWithBilling: planWithBilling
    })));
  }), /*#__PURE__*/React.createElement(Dialog.Approve, {
    variant: "fill",
    accent: "positive",
    isLoading: loading,
    type: "submit",
    className: styles.btn,
    fluid: true
  }, isEligibleForSanbaseTrial ? 'Start 14-Day Free Trial' : 'Pay')));
};

export default Confirmation;