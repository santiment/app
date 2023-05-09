import React from 'react';
import cx from 'classnames';
import Markdown from 'react-markdown';
import { SignalTypeIcon } from '../../../components/SignalCard/controls/SignalControls';
import SignalPreview from '../../../ducks/Signals/chart/preview/SignalPreview';
import CopySignal from '../../../components/SignalCard/controls/CopySignal';
import SignalCreator from '../../../components/SignalCard/card/creator/SignalCreator';
import LikeBtnWrapper from '../../../components/Like/LikeBtnWrapper';
import { DesktopOnly, MobileOnly } from '../../../components/Responsive';
import FeedCardDate from '../../feed/GeneralFeed/CardDate/FeedCardDate';
import OpenSignalLink from '../../../ducks/Signals/link/OpenSignalLink';
import { isEthStrictAddress } from '../../../utils/utils';
import FeedHistoricalBalance from '../../feed/GeneralFeed/FeedItemRenderer/feedHistoricalBalance/FeedHistoricalBalance';
import FeedSignalCardWithMarkdown, { MoreInfoAlert } from '../../feed/GeneralFeed/FeedItemRenderer/feedSignalCardWithMarkdown/FeedSignalCardWithMarkdown';
import SidecarExplanationTooltip from '../../../ducks/SANCharts/SidecarExplanationTooltip';
import TimelineEventComments from '../../../components/TimelineEventComments/TimelineEventComments';
import styles from './ActivityRenderer.module.css';
export const getUserTriggerData = activityData => {
  if (activityData) {
    const {
      user_trigger_data
    } = activityData;
    const firstKey = Object.keys(user_trigger_data)[0];
    return user_trigger_data[firstKey];
  } else {
    return null;
  }
};
export const getDefaultActivityContent = (classes, activity, showMarkdown = true) => {
  const {
    payload,
    data: activityData,
    trigger = {}
  } = activity;
  const data = getUserTriggerData(activityData);

  if (data) {
    if (isEthStrictAddress(data.address)) {
      return /*#__PURE__*/React.createElement(FeedHistoricalBalance, {
        user_trigger_data: data
      });
    } else if (trigger && showMarkdown) {
      return /*#__PURE__*/React.createElement(FeedSignalCardWithMarkdown, {
        trigger: trigger,
        user_trigger_data: data
      });
    }
  }

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Markdown, {
    source: validateMarkdown(Object.values(payload)[0]),
    className: classes.activityMarkdown
  }), data && data.project_slug && /*#__PURE__*/React.createElement(MoreInfoAlert, {
    slug: data.project_slug,
    type: data.type
  }));
};

const validateMarkdown = text => text.replace('not implemented', 'changed');

const ActivityWithBacktesting = ({
  date,
  user,
  classes,
  activity,
  activity: {
    index,
    triggeredAt,
    trigger = {}
  },
  onLike,
  showProfileExplanation
}) => {
  const {
    settings: {
      type,
      metric
    }
  } = trigger;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(DesktopOnly, null, /*#__PURE__*/React.createElement(SignalTypeIcon, {
    type: type,
    metric: metric,
    className: styles.icon
  })), /*#__PURE__*/React.createElement("div", {
    className: styles.container
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.info
  }, /*#__PURE__*/React.createElement("div", {
    className: cx(styles.description, styles.activityCustom, styles.activityBacktest)
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.center
  }, /*#__PURE__*/React.createElement(MobileOnly, null, /*#__PURE__*/React.createElement(FeedCardDate, {
    date: triggeredAt || date
  })), /*#__PURE__*/React.createElement("h4", {
    className: styles.title
  }, /*#__PURE__*/React.createElement(OpenSignalLink, {
    signal: trigger
  })), getDefaultActivityContent(classes, activity, false), /*#__PURE__*/React.createElement("div", {
    className: styles.tooltip
  }, /*#__PURE__*/React.createElement(SidecarExplanationTooltip, {
    closeTimeout: 500,
    localStorageSuffix: "_FEED_PROFILE_EXPLANATION",
    position: "top",
    title: "Click to open profile",
    className: styles.avatarTooltip,
    description: "",
    isNew: true,
    withArrow: true,
    showEnabled: index === 0 && showProfileExplanation
  }, /*#__PURE__*/React.createElement(SignalCreator, {
    user: user,
    className: styles.creator
  }))))), /*#__PURE__*/React.createElement("div", {
    className: styles.preview
  }, /*#__PURE__*/React.createElement(DesktopOnly, null, /*#__PURE__*/React.createElement(FeedCardDate, {
    date: triggeredAt || date
  })), /*#__PURE__*/React.createElement(SignalPreview, {
    trigger: trigger,
    type: type,
    showExpand: false,
    showTitle: false
  }))), /*#__PURE__*/React.createElement("div", {
    className: styles.bottom
  }, /*#__PURE__*/React.createElement(LikesAndComments, {
    onLike: onLike,
    activity: activity
  }), /*#__PURE__*/React.createElement(CopySignal, {
    signal: trigger,
    creatorId: user.id
  }))));
};

export const LikesAndComments = ({
  onLike,
  activity: {
    votes,
    user,
    id,
    commentsCount
  }
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: styles.actions
  }, onLike && /*#__PURE__*/React.createElement(LikeBtnWrapper, {
    onLike: onLike,
    votes: votes,
    user: user
  }), /*#__PURE__*/React.createElement(TimelineEventComments, {
    id: id,
    authorId: user.id,
    commentsCount: commentsCount
  }));
};
export default ActivityWithBacktesting;