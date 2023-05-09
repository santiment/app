function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import HolderDistributionWidget, { holderDistributionBuilder, HoldersDistributionTitle } from './index';
import { HOLDER_DISTRIBUTION_PERCENT_METRICS } from '../../Chart/Sidepanel/HolderDistribution/metrics';
import { TabCombinedBalanceMetrics } from '../../Chart/Sidepanel/HolderDistribution/Tabs';

const HolderDistributionCombinedBalanceWidget = _ref => {
  let props = _extends({}, _ref);

  return /*#__PURE__*/React.createElement(HolderDistributionWidget, _extends({
    isWithTabs: true,
    TabMetrics: TabCombinedBalanceMetrics,
    sidepanelHeader: /*#__PURE__*/React.createElement(HoldersDistributionTitle, {
      ticker: props.settings.ticker,
      description: "by balance of addresses"
    })
  }, props));
};

HolderDistributionCombinedBalanceWidget.new = holderDistributionBuilder(HolderDistributionCombinedBalanceWidget, HOLDER_DISTRIBUTION_PERCENT_METRICS);
export default HolderDistributionCombinedBalanceWidget;