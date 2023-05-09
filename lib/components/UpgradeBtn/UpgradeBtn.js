const _excluded = ["variant", "className", "iconClassName", "children", "showCrownIcon"],
      _excluded2 = ["loginRequired", "className", "iconClassName", "variant", "showCrown", "accent"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import Icon from '@santiment-network/ui/Icon';
import Button from '@santiment-network/ui/Button';
import { getAlternativeBillingPlan } from '../../utils/plans';
import PlanPaymentDialog from '../../components/Plans/PlanPaymentDialog';
import { usePlans } from '../../ducks/Plans/hooks';
import { useUserSubscription } from '../../stores/user/subscriptions';
import styles from './UpgradeBtn.module.css';

const Trigger = _ref => {
  let {
    variant,
    className,
    iconClassName,
    children = 'Upgrade',
    showCrownIcon = true
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  return /*#__PURE__*/React.createElement(Button, _extends({
    className: cx(styles.btn, styles[variant], className),
    variant: variant,
    accent: "orange"
  }, props), showCrownIcon && /*#__PURE__*/React.createElement(Icon, {
    type: "crown",
    className: cx(styles.icon, iconClassName)
  }), children);
};

const UpgradeBtn = _ref2 => {
  let {
    loginRequired = true,
    className,
    iconClassName,
    variant = 'fill',
    showCrown = true,
    accent = 'orange'
  } = _ref2,
      props = _objectWithoutProperties(_ref2, _excluded2);

  const {
    loading,
    subscription
  } = useUserSubscription();
  const [plans] = usePlans();

  if (loading) {
    return null;
  }

  if (subscription && subscription.trialEnd) {
    const upgradePlan = getAlternativeBillingPlan(plans, subscription.plan);
    const {
      id,
      name,
      amount,
      interval
    } = upgradePlan || {};
    return /*#__PURE__*/React.createElement(PlanPaymentDialog, {
      subscription: subscription,
      label: /*#__PURE__*/React.createElement(React.Fragment, null, showCrown && /*#__PURE__*/React.createElement(Icon, {
        type: "crown",
        className: cx(styles.icon, iconClassName)
      }), "Upgrade"),
      title: name,
      price: amount,
      planId: +id,
      billing: interval,
      btnProps: {
        fluid: false,
        border: false,
        variant: variant,
        accent: accent,
        className: cx(styles.btn, styles.fill, className)
      }
    });
  }

  return /*#__PURE__*/React.createElement(Trigger, _extends({
    as: Link,
    to: "/pricing",
    className: className,
    iconClassName: iconClassName,
    variant: variant,
    accent: accent
  }, props));
};

export default UpgradeBtn;