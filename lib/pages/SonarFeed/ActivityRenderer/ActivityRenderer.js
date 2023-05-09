import React from 'react';
import cx from 'classnames';
import { POSSIBLE_METRICS_ACTIVITIES } from '../../../ducks/Signals/utils/constants';
import { couldShowChart } from '../../../ducks/Signals/utils/utils';
import SimpleActivity from './SimpleActivity';
import ActivityWithBacktesting from './ActivityWithBacktesting';
import styles from './ActivityRenderer.module.css';

const ActivityRenderer = ({
  activity,
  activity: {
    triggeredAt,
    trigger = {},
    user = {}
  },
  date,
  index,
  classes = {},
  onLike,
  showProfileExplanation
}) => {
  const {
    id: signalId,
    settings
  } = trigger;
  const {
    target
  } = settings;
  const showChart = target && couldShowChart(settings, POSSIBLE_METRICS_ACTIVITIES);
  const triggerDate = triggeredAt || date;
  return /*#__PURE__*/React.createElement("div", {
    key: triggerDate + '_' + signalId,
    className: cx(styles.activityItem, classes.activityItem, index === 0 ? classes.firstActivity : '')
  }, /*#__PURE__*/React.createElement("div", {
    className: cx(styles.content, showChart && styles.activityItemBacktest)
  }, showChart ? /*#__PURE__*/React.createElement(ActivityWithBacktesting, {
    classes: classes,
    index: index,
    activity: activity,
    user: user,
    date: triggerDate,
    onLike: onLike,
    showProfileExplanation: showProfileExplanation
  }) : /*#__PURE__*/React.createElement(SimpleActivity, {
    index: index,
    classes: classes,
    activity: activity,
    onLike: onLike,
    user: user,
    date: triggerDate
  })));
};

export default ActivityRenderer;