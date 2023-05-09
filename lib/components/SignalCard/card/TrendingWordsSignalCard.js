import React from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import { DesktopOnly } from '../../Responsive';
import Panel from '@santiment-network/ui/Panel/Panel';
import { isStrictTrendingWords } from './utils';
import SignalCardHeader from './SignalCardHeader';
import LikeBtnWrapper from '../../Like/LikeBtnWrapper';
import TrendingCardInsights from './trendingInsights/TrendingCardInsights';
import TrendingCardWords from './trendingCard/TrendingCardWords';
import FeedCardDate from '../../../pages/feed/GeneralFeed/CardDate/FeedCardDate';
import OpenSignalLink from '../../../ducks/Signals/link/OpenSignalLink';
import SignalCreator from './creator/SignalCreator';
import TimelineEventComments from '../../TimelineEventComments/TimelineEventComments';
import externalStyles from './SignalCard.module.css';
import styles from './TrendingWordsSignalCard.module.css';
export const isTrendingWordsSignal = trigger => {
  if (!trigger.settings) {
    return false;
  }

  if (isStrictTrendingWords(trigger.settings)) {
    return true;
  }

  return trigger.settings.operation && trigger.settings.operation.trending_word;
};

const TrendingWordsSignalCard = ({
  className,
  activityPayload,
  activity: {
    id,
    commentsCount,
    votes,
    trigger,
    insertedAt: date,
    user
  },
  onLike
}) => {
  const {
    title,
    settings,
    isPublic,
    settings: {
      operation: {
        trigger_time
      } = {}
    }
  } = trigger;
  const strictTrendingWords = isStrictTrendingWords(settings);
  return /*#__PURE__*/React.createElement(Panel, {
    padding: true,
    className: cx(externalStyles.wrapper, className)
  }, /*#__PURE__*/React.createElement(DesktopOnly, null, /*#__PURE__*/React.createElement(SignalCardHeader, {
    isUserTheAuthor: false,
    isPublic: isPublic,
    signal: trigger
  })), /*#__PURE__*/React.createElement("div", {
    className: externalStyles.wrapper__right
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.header
  }, strictTrendingWords ? /*#__PURE__*/React.createElement(Link, {
    to: "/labs/trends",
    className: styles.title
  }, title, " ", /*#__PURE__*/React.createElement(TrendingPeriod, {
    period: trigger_time
  })) : /*#__PURE__*/React.createElement(OpenSignalLink, {
    signal: trigger
  }), /*#__PURE__*/React.createElement(FeedCardDate, {
    date: date
  })), /*#__PURE__*/React.createElement(TrendingCardWords, {
    settings: settings,
    activityPayload: activityPayload
  }), strictTrendingWords && /*#__PURE__*/React.createElement(TrendingCardInsights, {
    date: new Date(date)
  }), /*#__PURE__*/React.createElement(SignalCreator, {
    user: user
  }), /*#__PURE__*/React.createElement("div", {
    className: styles.bottom
  }, /*#__PURE__*/React.createElement(LikeBtnWrapper, {
    onLike: onLike,
    className: styles.likeBtn,
    votes: votes,
    user: user
  }), /*#__PURE__*/React.createElement(TimelineEventComments, {
    id: id,
    authorId: user.id,
    commentsCount: commentsCount
  }))));
};

const currentTimezoneOffset = new Date().getTimezoneOffset();

const TrendingPeriod = ({
  period
}) => {
  if (!period) {
    return null;
  }

  const hours = +period.split(':')[0] + -1 * currentTimezoneOffset / 60;

  const getText = hours => {
    if (hours >= 12 && hours < 20) {
      return 'Europe markets open';
    } else if (hours >= 4 && hours < 12) {
      return 'Asia markets open';
    } else {
      return 'US markets open';
    }
  };

  return /*#__PURE__*/React.createElement("div", {
    className: styles.ampm
  }, "(", getText(hours), ")");
};

export default TrendingWordsSignalCard;