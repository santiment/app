import React from 'react';
import SocialTrendsSelector from './entities/SocialTrendsSelector/SocialTrendsSelector';
import WalletAndConditionsSelector from './entities/WalletAndConditionsSelector/WalletAndConditionsSelector';
import WatchlistAndScreenerSelector from './entities/WatchlistAndScreenerSelector/WatchlistAndScreenerSelector';
import AssetSelector from './entities/AssetSelector/AssetSelector';
import MetricAndConditions from './MetricAndConditions/MetricAndConditions';
import NotificationAndPrivacy from './NotificationAndPrivacy/NotificationAndPrivacy';
import NameAndDescription from './NameAndDescription/NameAndDescription';

const StepsContent = ({
  selectorSettings
}) => {
  const {
    selectedType,
    selectedStep
  } = selectorSettings;

  switch (selectedType.subSteps[selectedStep].label) {
    case 'Social trend':
      {
        return /*#__PURE__*/React.createElement(SocialTrendsSelector, {
          selectorSettings: selectorSettings
        });
      }

    case 'Wallet & Event':
      {
        return /*#__PURE__*/React.createElement(WalletAndConditionsSelector, {
          selectorSettings: selectorSettings
        });
      }

    case 'Screener':
      {
        return /*#__PURE__*/React.createElement(WatchlistAndScreenerSelector, {
          type: "screener",
          selectorSettings: selectorSettings
        });
      }

    case 'Watchlist':
      {
        return /*#__PURE__*/React.createElement(WatchlistAndScreenerSelector, {
          type: "watchlist",
          selectorSettings: selectorSettings
        });
      }

    case 'Asset':
      {
        return /*#__PURE__*/React.createElement(AssetSelector, {
          selectorSettings: selectorSettings
        });
      }

    case 'Metric & Conditions':
      {
        return /*#__PURE__*/React.createElement(MetricAndConditions, {
          selectorSettings: selectorSettings
        });
      }

    case 'Notification & Privacy settings':
      {
        return /*#__PURE__*/React.createElement(NotificationAndPrivacy, {
          selectorSettings: selectorSettings
        });
      }

    case 'Name & Description':
      {
        return /*#__PURE__*/React.createElement(NameAndDescription, {
          selectorSettings: selectorSettings
        });
      }

    default:
      return /*#__PURE__*/React.createElement("div", null);
  }
};

export default StepsContent;