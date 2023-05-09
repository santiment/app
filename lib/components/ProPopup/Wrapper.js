function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ProPopup from './index';
import { useUserSubscriptionStatus } from '../../stores/user/subscriptions';
const TypeAlias = {
  SCREENER: 'screener',
  PROJECT: 'watchlist',
  BLOCKCHAIN_ADDRESS: 'blockchain_address_watchlist'
};
const MODULE = {
  screener: {
    title: 'Go Pro for full Screener access',
    description: 'Sanbase Pro includes advanced Screener features and access to the full Santiment platform!',
    features: ['Unlock ‘% change’ filters for all metrics', 'Create and save unlimited screeners', 'Export the Screener as .csv', 'Full access to all Santiment metrics and market insights']
  },
  watchlist: {
    title: 'Go Pro for full watchlist access',
    description: 'Sanbase Pro includes advanced watchlist features and access to the full Santiment platform!',
    features: ['Unlock all metrics in watchlist table', 'Export the watchlist as .csv', 'Full access to all Santiment metrics and market insights']
  },
  blockchain_address_watchlist: {
    title: 'Go Pro for full blockchain addresses watchlist access',
    description: 'Sanbase Pro includes advanced watchlist features and access to the full Santiment platform!',
    features: ['Export the watchlist as .csv', 'Full access to all Santiment metrics and market insights']
  }
};

const ProPopupWrapper = ({
  type,
  trigger: Trigger,
  children,
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    isPro
  } = useUserSubscriptionStatus();
  const module = TypeAlias[type] || type;

  if (isPro) {
    return children;
  }

  return /*#__PURE__*/React.createElement(ProPopup, _extends({
    trigger: Trigger ? /*#__PURE__*/React.createElement(Trigger, null) : /*#__PURE__*/React.createElement("div", {
      className: className
    }, children),
    isOpen: isOpen,
    onClose: () => setIsOpen(false),
    onOpen: () => setIsOpen(true)
  }, MODULE[module]));
};

ProPopupWrapper.propTypes = {
  type: PropTypes.string.isRequired
};
export default ProPopupWrapper;