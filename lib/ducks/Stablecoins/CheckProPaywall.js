import React from 'react';
import { useUserSubscriptionStatus } from '../../stores/user/subscriptions';
import MakeProSubscriptionCard from '../../pages/feed/GeneralFeed/MakeProSubscriptionCard/MakeProSubscriptionCard';

const CheckProPaywall = ({
  children,
  shouldCheck
}) => {
  const {
    isPro
  } = useUserSubscriptionStatus();

  if (!isPro && shouldCheck) {
    return /*#__PURE__*/React.createElement(MakeProSubscriptionCard, null);
  }

  return children;
};

export default CheckProPaywall;