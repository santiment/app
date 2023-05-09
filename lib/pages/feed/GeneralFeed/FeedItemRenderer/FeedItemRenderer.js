import React from 'react';
import cx from 'classnames';
import WithFeedEventLikesMutation from '../../../../components/Like/WithFeedEventLikesMutation';
import ActivityRenderer from '../../../SonarFeed/ActivityRenderer/ActivityRenderer';
import TrendingWordsSignalCard, { isTrendingWordsSignal } from '../../../../components/SignalCard/card/TrendingWordsSignalCard';
import { InsightCard, PulseInsight } from '@cmp/InsightCard';
import styles from './FeedItemRenderer.module.css';

const FeedItemRenderer = ({
  item,
  index,
  showProfileExplanation
}) => {
  const {
    id: eventId,
    __typename,
    payload,
    trigger,
    insertedAt
  } = item;

  if (payload && trigger) {
    let isTrendingWords = isTrendingWordsSignal(trigger);
    return /*#__PURE__*/React.createElement(WithFeedEventLikesMutation, null, like => isTrendingWords ? /*#__PURE__*/React.createElement(TrendingWordsSignalCard, {
      activity: item,
      className: styles.card,
      activityPayload: payload.default,
      onLike: like(eventId)
    }) : /*#__PURE__*/React.createElement(ActivityRenderer, {
      date: insertedAt,
      activity: item,
      index: index,
      classes: styles,
      onLike: like(eventId),
      showProfileExplanation: showProfileExplanation
    }));
  } else if (__typename === 'TimelineEvent') {
    const {
      post
    } = item;

    if (post) {
      return post.isPulse ? /*#__PURE__*/React.createElement(PulseInsight, {
        insight: post,
        class: cx('mrg-l mrg--b'.styles.card, styles.pulseInsight)
      }) : /*#__PURE__*/React.createElement(InsightCard, {
        insight: post,
        class: "mrg-l mrg--b"
      });
    }
  }

  return null;
};

export default FeedItemRenderer;