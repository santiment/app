import React from 'react';
import Dialog from '@santiment-network/ui/Dialog';
import Icon from '@santiment-network/ui/Icon';
import styles from './FeedHelpPopup.module.css';

const FeedHelpPopup = () => /*#__PURE__*/React.createElement(Dialog, {
  className: styles.tooltip,
  position: "center",
  title: "About Santiment\u2019s Feed",
  trigger: /*#__PURE__*/React.createElement("div", {
    className: styles.trigger
  }, /*#__PURE__*/React.createElement(Icon, {
    type: "question-round-small",
    className: styles.description
  }))
}, /*#__PURE__*/React.createElement("div", {
  className: styles.container
}, "This is a continuous stream of updates on cryptocurrency assets, your personal watchlists and general market conditions, using various Santiment metrics and tools"));

export default FeedHelpPopup;