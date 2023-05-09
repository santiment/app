import React from 'react';
import cx from 'classnames';
import { SignalTypeIcon } from '../../../components/SignalCard/controls/SignalControls';
import CopySignal from '../../../components/SignalCard/controls/CopySignal';
import SignalCreator from '../../../components/SignalCard/card/creator/SignalCreator';
import { DesktopOnly } from '../../../components/Responsive';
import FeedCardDate from '../../feed/GeneralFeed/CardDate/FeedCardDate';
import OpenSignalLink from '../../../ducks/Signals/link/OpenSignalLink';
import { getDefaultActivityContent, LikesAndComments } from './ActivityWithBacktesting';
import styles from './ActivityRenderer.module.css';

const SimpleActivity = ({
  date,
  classes,
  user,
  activity,
  activity: {
    triggeredAt,
    trigger,
    trigger: {
      settings: {
        type,
        metric
      }
    } = {}
  },
  onLike
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: styles.wrapper
  }, /*#__PURE__*/React.createElement(DesktopOnly, null, /*#__PURE__*/React.createElement(SignalTypeIcon, {
    type: type,
    metric: metric,
    className: styles.icon
  })), /*#__PURE__*/React.createElement("div", {
    className: styles.center
  }, /*#__PURE__*/React.createElement("div", {
    className: cx(styles.description, styles.activityCustom)
  }, /*#__PURE__*/React.createElement("h4", {
    className: styles.title
  }, /*#__PURE__*/React.createElement(OpenSignalLink, {
    signal: trigger
  }), /*#__PURE__*/React.createElement(FeedCardDate, {
    date: triggeredAt || date
  }))), getDefaultActivityContent(classes, activity), /*#__PURE__*/React.createElement(SignalCreator, {
    user: user
  }), /*#__PURE__*/React.createElement("div", {
    className: styles.bottom
  }, /*#__PURE__*/React.createElement(LikesAndComments, {
    onLike: onLike,
    activity: activity
  }), /*#__PURE__*/React.createElement(CopySignal, {
    signal: trigger,
    creatorId: user.id
  }))));
};

export default SimpleActivity;