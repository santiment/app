function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import cx from 'classnames';
import Input from '@santiment-network/ui/Input';
import { CardElement } from 'react-stripe-elements';
import COLOR from '@santiment-network/ui/variables.scss';
import Confirmation from './Confirmation';
import { useTheme } from '../../stores/ui/theme';
import styles from './CheckoutForm.module.css';
const style = {
  base: {
    fontSize: '14px',
    color: COLOR.rhino,
    fontFamily: 'Proxima Nova, sans-serif',
    '::placeholder': {
      color: COLOR.casper
    }
  },
  invalid: {
    color: COLOR.persimmon
  }
};

const nightStyle = _objectSpread(_objectSpread({}, style), {}, {
  base: _objectSpread(_objectSpread({}, style.base), {}, {
    color: COLOR.mystic
  })
});

const CardInformation = () => {
  const {
    isNightMode
  } = useTheme();
  return /*#__PURE__*/React.createElement("div", {
    className: styles.card
  }, /*#__PURE__*/React.createElement("label", {
    className: cx(styles.label, styles.label_card)
  }, "Full name", /*#__PURE__*/React.createElement(Input, {
    className: styles.input,
    placeholder: "John Doe",
    required: true,
    name: "name"
  })), /*#__PURE__*/React.createElement("label", {
    className: cx(styles.label, styles.label_card)
  }, "Card number", /*#__PURE__*/React.createElement(CardElement, {
    style: isNightMode ? nightStyle : style
  })));
};

const BillingAddress = () => /*#__PURE__*/React.createElement("div", {
  className: styles.address
}, /*#__PURE__*/React.createElement("label", {
  className: cx(styles.label, styles.label_card)
}, "Country", /*#__PURE__*/React.createElement(Input, {
  className: styles.input,
  name: "address_country",
  placeholder: "US",
  required: true
})), /*#__PURE__*/React.createElement("label", {
  className: cx(styles.label, styles.label_card)
}, "State / Region", /*#__PURE__*/React.createElement(Input, {
  className: styles.input,
  placeholder: "e.g. California",
  name: "address_state",
  required: true
})), /*#__PURE__*/React.createElement("label", {
  className: cx(styles.label, styles.label_card)
}, "City", /*#__PURE__*/React.createElement(Input, {
  className: styles.input,
  placeholder: "e.g. Sacramento",
  name: "address_city",
  required: true
})), /*#__PURE__*/React.createElement("label", {
  className: cx(styles.label, styles.label_card)
}, "Street Address", /*#__PURE__*/React.createElement(Input, {
  className: cx(styles.input, styles.input_last),
  placeholder: "e.g. 1483 Pearl Street",
  name: "address_line1",
  required: true
})));

const CheckoutForm = ({
  plan,
  loading,
  billing,
  price,
  changeSelectedPlan,
  hasCompletedTrial,
  subscription
}) => /*#__PURE__*/React.createElement("div", {
  className: styles.wrapper
}, /*#__PURE__*/React.createElement("div", {
  className: styles.card
}, /*#__PURE__*/React.createElement(CardInformation, null), /*#__PURE__*/React.createElement(BillingAddress, null)), /*#__PURE__*/React.createElement(Confirmation, {
  plan: plan,
  billing: billing,
  loading: loading,
  price: price,
  changeSelectedPlan: changeSelectedPlan,
  hasCompletedTrial: hasCompletedTrial,
  subscription: subscription
}));

export default CheckoutForm;