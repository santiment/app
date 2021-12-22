import React from "react";
import WatchlistAndScreener from "./steps/WatchlistAndScreener/WatchlistAndScreener";
import Notifications from "./steps/Notifications/Notifications";
import Title from "./steps/Title/Title";
import MetricsAndConditions from "./steps/MetricsAndConditions/MetricsAndConditions";
import Assets from "./steps/Assets/Assets";

const DESCRIPTION_TYPES = {
  TITLE: "title",
  NOTIFICATIONS: "notifications_settings",
  METRICS_AND_CONDITIONS: "metrics_and_conditions",
  ASSETS: "assets",
  WATCHLISTS: "watchlists",
  SCREENERS: "screeners"
};

function checkType(type) {
  switch (type) {
    case "Check name and description":
    case "Name & Description":
      return DESCRIPTION_TYPES.TITLE;
    case "Set up Notifications and Privacy":
    case "Notification & Privacy settings":
      return DESCRIPTION_TYPES.NOTIFICATIONS;
    case "Choose Metric and Conditions":
    case "Metric & Conditions":
      return DESCRIPTION_TYPES.METRICS_AND_CONDITIONS;
    case "Select Asset":
    case "Asset":
      return DESCRIPTION_TYPES.ASSETS;
    case "Select Watchlist":
    case "Watchlist":
      return DESCRIPTION_TYPES.WATCHLISTS;
    case "Select Screener":
    case "Screener":
      return DESCRIPTION_TYPES.SCREENERS;
    default:
      return {};
  }
}

const AlertStepDescription = ({
  description,
  size,
  type,
  status,
  selectedType
}) => {
  const currentType = checkType(type);

  switch (currentType) {
    case DESCRIPTION_TYPES.TITLE: {
      return <Title description={description} isSmall={size === "small"} />;
    }
    case DESCRIPTION_TYPES.NOTIFICATIONS: {
      return (
        <Notifications
          status={status}
          description={description}
          isSmall={size === "small"}
        />
      );
    }
    case DESCRIPTION_TYPES.METRICS_AND_CONDITIONS: {
      return (
        <MetricsAndConditions
          isSmall={size === "small"}
          description={description}
        />
      );
    }
    case DESCRIPTION_TYPES.ASSETS: {
      return <Assets description={description} isSmall={size === "small"} />;
    }
    case DESCRIPTION_TYPES.WATCHLISTS:
    case DESCRIPTION_TYPES.SCREENERS: {
      return (
        <WatchlistAndScreener
          selectedType={selectedType}
          description={description}
          isSmall={size === "small"}
        />
      );
    }
    default:
      return description || "";
  }
};

export default AlertStepDescription;
