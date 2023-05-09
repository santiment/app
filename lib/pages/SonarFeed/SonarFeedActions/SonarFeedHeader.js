import React from 'react';
import HelpPopup from '../../../components/HelpPopup/HelpPopup';
import styles from './SonarFeedHeader.module.css';

const SonarFeedHeader = () => /*#__PURE__*/React.createElement("div", {
  className: styles.header
}, /*#__PURE__*/React.createElement("h1", null, "My Alerts"), /*#__PURE__*/React.createElement("div", {
  className: styles.explanation
}, /*#__PURE__*/React.createElement(HelpPopup, {
  position: "bottom",
  align: "start"
}, "Create your own alert or subscribe to existing")));

export default SonarFeedHeader;