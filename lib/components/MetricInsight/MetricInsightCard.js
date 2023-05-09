import React from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import Panel from '@santiment-network/ui/Panel';
import MultilineText from '../MultilineText/MultilineText';
import { makeLinkToInsight } from '../../utils/url';
import externalStyles from '../Insight/InsightCard.module.css';
import styles from './MetricInsightCard.module.css';

const MetricInsightCard = ({
  insight,
  id: insightId
}) => {
  if (!insight) {
    return /*#__PURE__*/React.createElement(Panel, {
      className: cx(externalStyles.wrapper, externalStyles.wrapper_withMc, styles.card)
    }, "No insight with id ", insightId);
  }

  const {
    id,
    title,
    user: {
      id: authorId,
      username: authorName
    }
  } = insight;
  const linkToInsight = makeLinkToInsight(id, title);
  return /*#__PURE__*/React.createElement(Panel, {
    className: cx(externalStyles.wrapper, externalStyles.wrapper_withMc, styles.card)
  }, /*#__PURE__*/React.createElement("a", {
    href: linkToInsight,
    className: styles.title,
    target: "_blank",
    rel: "noopener noreferrer"
  }, /*#__PURE__*/React.createElement(MultilineText, {
    maxLines: 2,
    id: "insightCardTitle",
    text: title
  })), /*#__PURE__*/React.createElement(Link, {
    to: '/profile/' + authorId,
    className: styles.author
  }, "by ", authorName));
};

export default MetricInsightCard;