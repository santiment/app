const _excluded = ["subscription"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import Button from '@santiment-network/ui/Button';
import PlanPaymentDialog from './PlanPaymentDialog';
import PlanChangeDialog from './PlanChangeDialog';
import PlanPipedriveDialog from './PlanPipedriveDialog';
import styles from './Plans.module.css';

const PlanActionDialog = _ref => {
  let {
    subscription
  } = _ref,
      rest = _objectWithoutProperties(_ref, _excluded);

  if (subscription) {
    return subscription.trialEnd ? /*#__PURE__*/React.createElement(PlanPaymentDialog, _extends({
      subscription: subscription
    }, rest, {
      label: `Upgrade to ${rest.title}`
    })) : /*#__PURE__*/React.createElement(PlanChangeDialog, _extends({
      subscription: subscription
    }, rest));
  }

  return /*#__PURE__*/React.createElement(PlanPaymentDialog, _extends({
    subscription: subscription
  }, rest));
};

export const TRIAL_LABEL = 'Start 14-Day Free Trial';
export default {
  FREE: {
    title: 'Free',
    desc: 'For those getting started in crypto',
    discount: 'Free forever',
    link: "Sign up, It's Free",
    Component: () => /*#__PURE__*/React.createElement(Button, {
      accent: "blue",
      border: true,
      fluid: true,
      className: styles.link,
      disabled: true
    }, "Default plan"),
    features: ['All Sanbase metrics - minus last 30 days', 'All Sanbase metrics - up to 2 years of historical data', 'Personalized asset watchlists', 'Access to Sanbase Screener (minus PRO filters and saves)', 'Access to basic coin alerts', 'Up to 10 active coin alerts']
  },
  PRO: {
    title: 'Pro',
    desc: 'Advanced crypto metrics and market insights',
    Component: PlanActionDialog,
    link: TRIAL_LABEL,
    features: ['Sanbase metrics - full historical and present-day data', 'Access to all Sanbase alerts', 'Full access to Santiment Screener', 'Daily market insights', 'Exclusive weekly Pro reports', 'Market segment dashboards - stablecoins, defi, dexes and more']
  },
  PRO_PLUS: {
    title: 'Pro+',
    desc: 'Complete analytics & backtesting framework',
    Component: PlanActionDialog,
    link: TRIAL_LABEL,
    features: [/*#__PURE__*/React.createElement("b", null, "All in PRO and:"), 'Basic API', 'Dedicated Account Manager', 'Google Sheets / Excel Plugin', 'Closed chat with Santiment analytics', 'Tailored market reports and token analysis']
  },
  BASIC: {
    title: 'Basic',
    desc: 'Great for short-term analysis and prototyping',
    link: TRIAL_LABEL,
    Component: PlanActionDialog,
    features: ['Access to all alert types', 'Up to 10 active alerts at a time', 'Sanbase metrics - 2 years of historical data', 'Sanbase metrics - up to last 7 days of data', 'Exclusive market reports']
  },
  ENTERPRISE: {
    title: 'Custom',
    desc: 'For organizations that need advanced data and support',
    discount: 'Based on your needs',
    link: 'Contact us',
    Component: props => /*#__PURE__*/React.createElement(PlanPipedriveDialog, _extends({}, props, {
      title: "EmergencyPlan plan Pipedrive form",
      src: "https://pipedrivewebforms.com/form/0527db4d781f7c4c0760b7bc7a58549c4144829"
    })),
    features: ['Access to all alert types', 'Unlimited active alerts', 'Sanbase metrics - 3 years of historical data', 'Sanbase metrics - including present-day data', 'Exclusive market reports']
  },
  EMERGENCY: {
    title: 'Emergency Plan',
    desc: 'Need access to Sanbase just for a few trades?',
    discount: '9$ / 5 days',
    link: 'Get access now',
    Component: props => /*#__PURE__*/React.createElement(PlanPipedriveDialog, _extends({}, props, {
      title: "EmergencyPlan plan Pipedrive form",
      src: "https://pipedrivewebforms.com/form/0527db4d781f7c4c0760b7bc7a58549c4144829"
    })),
    features: ['No automatic renewal', 'Simple upgrade options']
  }
};