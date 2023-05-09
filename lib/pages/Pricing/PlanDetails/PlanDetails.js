import React from 'react';
import { getShowingPlans } from '../../../utils/plans';
import { DesktopOnly, MobileOnly } from '../../../components/Responsive';
import PlanDetailsDesktop from './PlanDetailsDesktop';
import PlanDetailsMobile from './PlanDetailsMobile';

const PlanDetails = ({
  billing,
  plans,
  subscription
}) => {
  const showingPlans = getShowingPlans(plans, billing);
  const userPlan = subscription && subscription.plan.id;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(DesktopOnly, null, /*#__PURE__*/React.createElement(PlanDetailsDesktop, {
    showingPlans: showingPlans,
    userPlan: userPlan,
    billing: billing,
    plans: plans,
    subscription: subscription
  })), /*#__PURE__*/React.createElement(MobileOnly, null, /*#__PURE__*/React.createElement(PlanDetailsMobile, {
    showingPlans: showingPlans,
    userPlan: userPlan,
    billing: billing,
    plans: plans,
    subscription: subscription
  })));
};

export default PlanDetails;