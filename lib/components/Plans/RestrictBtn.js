function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import Button from '@santiment-network/ui/Button';
import { useUser } from '../../stores/user';
import { PATHS } from '../../paths';
import sharedStyles from './Plans.module.css';
import styles from './Plan.module.css';

const getProps = ({
  isLoggedIn,
  label,
  sameAsUserPlan,
  isSubscriptionCanceled
}) => {
  if (!isLoggedIn) {
    return {
      children: label || 'Start free trial',
      as: Link,
      to: PATHS.CREATE_ACCOUNT,
      variant: 'fill'
    };
  }

  return sameAsUserPlan ? {
    children: 'Your current plan',
    disabled: true
  } : isSubscriptionCanceled ? {
    children: 'Upgrade now',
    as: Link,
    to: '/account#subscription?renew'
  } : {
    children: 'Upgrade now',
    as: Link,
    to: '/account',
    variant: 'fill'
  };
};

const RestrictBtn = ({
  showCreditMsg,
  label,
  sameAsUserPlan,
  isSubscriptionCanceled
}) => {
  const {
    isLoggedIn
  } = useUser();
  const props = getProps({
    isLoggedIn,
    label,
    sameAsUserPlan,
    isSubscriptionCanceled
  });
  return /*#__PURE__*/React.createElement(Button, _extends({
    fluid: true,
    accent: "orange",
    border: true
  }, props, {
    className: cx(sharedStyles.link, styles.restrictBtn)
  }));
};

export default RestrictBtn;