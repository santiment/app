import React, { useState } from 'react';
import cx from 'classnames';
import Toggle from '@santiment-network/ui/Toggle';
import PricingPlan from '../Plan/PricingPlan';
import { usePlans } from '../../../ducks/Plans/hooks';
import { useUserSubscription } from '../../../stores/user/subscriptions';
import PlanDetails from '../PlanDetails/PlanDetails';
import { getShowingPlans } from '../../../utils/plans';
import { Skeleton } from '../../../components/Skeleton';
import styles from './Plans.module.css';

const Billing = ({
  selected,
  onClick
}) => {
  const isYearSelected = selected === 'year';
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    onClick: () => onClick('month'),
    className: cx(styles.billing__option, styles.billing__montly, !isYearSelected && styles.billing__option_active)
  }, "Monthly"), /*#__PURE__*/React.createElement(Toggle, {
    className: styles.billing__toggle,
    isActive: isYearSelected,
    onClick: () => onClick(isYearSelected ? 'month' : 'year')
  }), /*#__PURE__*/React.createElement("span", {
    className: cx(styles.billing__option, styles.billing__option_year, isYearSelected && styles.billing__option_active),
    onClick: () => onClick('year')
  }, "Yearly"));
};

const Plans = ({
  id,
  classes = {}
}) => {
  const {
    subscription
  } = useUserSubscription();
  const [billing, setBilling] = useState('month');
  const [plans, loading] = usePlans();
  const isSubscriptionCanceled = subscription && subscription.cancelAtPeriodEnd;
  const showingPlans = getShowingPlans(plans, billing);

  if (loading) {
    return /*#__PURE__*/React.createElement(Skeleton, {
      show: loading,
      className: styles.skeleton
    });
  }

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    id: id,
    className: cx(styles.billing, classes.billing)
  }, /*#__PURE__*/React.createElement(Billing, {
    selected: billing,
    onClick: setBilling
  })), /*#__PURE__*/React.createElement("div", {
    className: cx(styles.cards, showingPlans.length === 2 && styles.cards__two)
  }, showingPlans.map(plan => /*#__PURE__*/React.createElement(PricingPlan, {
    key: plan.id,
    plan: plan,
    billing: billing,
    plans: plans,
    subscription: subscription,
    isSubscriptionCanceled: isSubscriptionCanceled
  }))), /*#__PURE__*/React.createElement(PlanDetails, {
    plans: plans,
    billing: billing,
    subscription: subscription
  }));
};

export default Plans;