import React, { useState } from 'react';
import cx from 'classnames';
import PublicSignals from '../signals/PublicSignals';
import PublicInsights from '../insights/PublicInsights';
import PublicWatchlists from '../watchlists/PublicWatchlists';
import { useUserTemplates } from '../../../ducks/Studio/Template/gql/hooks';
import ProfileTemplates from '../templates/ProfileTemplates';
import ProjectCard from '../../../ducks/Watchlists/Cards/ProjectCard';
import AddressCard from '../../../ducks/Watchlists/Cards/AddressCard';
import { PROJECT, BLOCKCHAIN_ADDRESS, SCREENER } from '../../../ducks/Watchlists/detector';
import LoaderImage from '../../../components/Loader/PageLoader';
import { checkIsNotScreener, checkIsScreener } from '../../../ducks/Screener/utils';
import { useProfileActivities } from '../../../queries/ProfileGQL';
import { useUser } from '../../../stores/user';
import styles from './ProfileActivities.module.css';
const ARRAY = [];
const STEPS = {
  INSIGHTS: '#insights',
  SIGNALS: '#signals',
  WATCHLISTS: '#watchlists',
  ADDRESSES_WATCHLISTS: '#addresses-watchlists',
  SCREENERS: '#screeners',
  CHART_LAYOUTS: '#chart-layouts'
};

const Counter = ({
  value
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: styles.counter
  }, "(", value, ")");
};

const ProfileActivities = ({
  profileId,
  currentUserId
}) => {
  const [step, setStep] = useState(window.location.hash || STEPS.INSIGHTS);
  const [templates] = useUserTemplates(profileId);
  const {
    data,
    loading
  } = useProfileActivities(profileId, currentUserId);
  const {
    isLoggedIn,
    user
  } = useUser();
  const isOwner = isLoggedIn && user && user.id === profileId;
  const hasData = !loading && data;
  const {
    insightsCount = {
      totalCount: 0
    },
    triggers = ARRAY,
    watchlists = ARRAY,
    addressesWatchlists = ARRAY
  } = data || {};
  const screeners = watchlists.filter(checkIsScreener);
  const projectWatchlists = watchlists.filter(checkIsNotScreener);

  const goTo = val => {
    if (loading) return;
    window.location.hash = val;
    return setStep(val);
  };

  return /*#__PURE__*/React.createElement("div", {
    className: styles.container
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.left
  }, /*#__PURE__*/React.createElement("div", {
    className: cx(styles.link, step === STEPS.INSIGHTS && styles.active),
    onClick: () => goTo(STEPS.INSIGHTS)
  }, "Insights ", /*#__PURE__*/React.createElement(Counter, {
    value: hasData ? insightsCount.totalCount : 0
  })), /*#__PURE__*/React.createElement("div", {
    className: cx(styles.link, step === STEPS.WATCHLISTS && styles.active),
    onClick: () => goTo(STEPS.WATCHLISTS)
  }, "Watchlists ", /*#__PURE__*/React.createElement(Counter, {
    value: hasData ? projectWatchlists.length : 0
  })), /*#__PURE__*/React.createElement("div", {
    className: cx(styles.link, step === STEPS.ADDRESSES_WATCHLISTS && styles.active),
    onClick: () => goTo(STEPS.ADDRESSES_WATCHLISTS)
  }, "Addresses Watchlists ", /*#__PURE__*/React.createElement(Counter, {
    value: hasData ? addressesWatchlists.length : 0
  })), /*#__PURE__*/React.createElement("div", {
    className: cx(styles.link, step === STEPS.SCREENERS && styles.active),
    onClick: () => goTo(STEPS.SCREENERS)
  }, "Screeners ", /*#__PURE__*/React.createElement(Counter, {
    value: hasData ? screeners.length : 0
  })), /*#__PURE__*/React.createElement("div", {
    className: cx(styles.link, step === STEPS.SIGNALS && styles.active),
    onClick: () => goTo(STEPS.SIGNALS)
  }, "Alerts ", /*#__PURE__*/React.createElement(Counter, {
    value: hasData ? triggers.length : 0
  })), /*#__PURE__*/React.createElement("div", {
    className: cx(styles.link, step === STEPS.CHART_LAYOUTS && styles.active),
    onClick: () => goTo(STEPS.CHART_LAYOUTS)
  }, "Chart Layouts ", /*#__PURE__*/React.createElement(Counter, {
    value: hasData ? templates.length : 0
  }))), /*#__PURE__*/React.createElement("div", {
    className: styles.right
  }, loading && /*#__PURE__*/React.createElement(LoaderImage, {
    className: styles.loader
  }), hasData && /*#__PURE__*/React.createElement(React.Fragment, null, step === STEPS.INSIGHTS && /*#__PURE__*/React.createElement(PublicInsights, {
    userId: profileId,
    isOwner: isOwner
  }), step === STEPS.WATCHLISTS && /*#__PURE__*/React.createElement(PublicWatchlists, {
    watchlists: projectWatchlists,
    Card: ProjectCard,
    type: PROJECT,
    isOwner: isOwner
  }), step === STEPS.ADDRESSES_WATCHLISTS && /*#__PURE__*/React.createElement(PublicWatchlists, {
    watchlists: addressesWatchlists,
    Card: AddressCard,
    type: BLOCKCHAIN_ADDRESS,
    isOwner: isOwner
  }), step === STEPS.SCREENERS && /*#__PURE__*/React.createElement(PublicWatchlists, {
    watchlists: screeners,
    path: "/screener/",
    Card: ProjectCard,
    type: SCREENER,
    isOwner: isOwner
  }), step === STEPS.SIGNALS && /*#__PURE__*/React.createElement(PublicSignals, {
    userId: profileId,
    isOwner: isOwner,
    data: triggers
  }), step === STEPS.CHART_LAYOUTS && /*#__PURE__*/React.createElement(ProfileTemplates, {
    userId: profileId,
    isOwner: isOwner,
    data: templates
  }))));
};

export default ProfileActivities;