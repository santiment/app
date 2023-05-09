function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import Plan from '../../../components/Plans/Plan';
import styles from './Plan.module.css';
const PLAN_CLASSES = {
  wrapper: styles.card,
  wrapper_active: styles.card_active,
  top: styles.card__top,
  price: styles.card__price,
  feature: styles.feature,
  feature__icon: styles.feature__icon,
  popular: styles.card__popular
};

const PricingPlan = _ref => {
  let props = _extends({}, _ref);

  return /*#__PURE__*/React.createElement(Plan, _extends({}, props, {
    classes: PLAN_CLASSES,
    btnProps: {
      border: undefined,
      variant: 'fill',
      accent: 'orange'
    }
  }));
};

export default PricingPlan;