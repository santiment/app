import React from 'react';
import Dialog from '@santiment-network/ui/Dialog';
import Icon from '@santiment-network/ui/Icon';
import HelpPopupContent from './HelpPopupContent';
import styles from './HelpPopup.module.css';

const HelpPopup = () => /*#__PURE__*/React.createElement(Dialog, {
  className: styles.tooltip,
  position: "center",
  title: "About Santiment\u2019s Top 10 Trending Words in Crypto",
  trigger: /*#__PURE__*/React.createElement("div", {
    className: styles.trigger
  }, /*#__PURE__*/React.createElement(Icon, {
    type: "question-round",
    className: styles.description
  }))
}, /*#__PURE__*/React.createElement("div", {
  padding: true,
  className: styles.container
}, /*#__PURE__*/React.createElement(HelpPopupContent, null)));

export default HelpPopup;