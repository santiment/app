import React from 'react';
import LikeBtn from '../Like/LikeBtn';
import MultilineText from '../MultilineText/MultilineText';
import { getSEOLinkFromIdAndTitle } from './utils';
import styles from './InsightCardSmall.module.css';

const InsightCard = ({
  className = '',
  id,
  title,
  user,
  votedAt,
  votes: {
    totalVotes
  },
  maxLines = 2,
  multilineTextId
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: className
  }, /*#__PURE__*/React.createElement("a", {
    href: `https://insights.santiment.net/read/${getSEOLinkFromIdAndTitle(id, title)}`,
    className: styles.title
  }, /*#__PURE__*/React.createElement(MultilineText, {
    id: multilineTextId,
    maxLines: maxLines,
    text: title
  })), /*#__PURE__*/React.createElement("div", {
    className: styles.meta
  }, /*#__PURE__*/React.createElement("a", {
    href: `https://insights.santiment.net/user/${user.id}`,
    className: styles.username
  }, user.username), /*#__PURE__*/React.createElement(LikeBtn, {
    disabled: true,
    liked: !!votedAt,
    likesNumber: totalVotes
  })));
};

InsightCard.defaultProps = {
  votes: {},
  comments: 0
};
export default InsightCard;