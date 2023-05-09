import React from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import { TRENDING_WORDS } from '../../../../../ducks/Signals/utils/constants';
import ScreenerTriggerDescription from '../../../../../components/ScreenerTriggerDescription/ScreenerTriggerDescription';
import styles from './FeedSignalCardWithMarkdown.module.css';
export const getLink = ({
  type,
  slug
}) => {
  return type === TRENDING_WORDS ? '/labs/trends' : '/projects/' + slug;
};
export const MoreInfoAlert = ({
  slug,
  type,
  link: targetLink,
  className
}) => {
  const link = targetLink || getLink({
    type,
    slug
  });
  return /*#__PURE__*/React.createElement(Link, {
    to: link,
    className: cx(styles.more, className),
    target: "_blank",
    onClick: e => e.stopPropagation()
  }, "More info");
};

const FeedSignalCardWithMarkdown = ({
  trigger,
  user_trigger_data
}) => {
  const {
    description
  } = trigger;
  const {
    project_slug,
    trending_words
  } = user_trigger_data;
  return /*#__PURE__*/React.createElement("div", {
    className: styles.card
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.description
  }, description), /*#__PURE__*/React.createElement(ScreenerTriggerDescription, {
    trigger: trigger,
    data: user_trigger_data
  }), /*#__PURE__*/React.createElement(MoreInfoAlert, {
    slug: project_slug,
    type: trending_words
  }));
};

export default FeedSignalCardWithMarkdown;