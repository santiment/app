import React from 'react';
import HelpPopup from './../../components/HelpPopup/HelpPopup';
import styles from './../../components/HelpPopup/HelpPopup.module.css';

const HelpPopupTrends = ({
  className,
  triggerClassName
}) => /*#__PURE__*/React.createElement(HelpPopup, {
  className: className,
  triggerClassName: triggerClassName
}, /*#__PURE__*/React.createElement("h4", {
  className: styles.title
}, "Specify your search results with these modifiers:"), /*#__PURE__*/React.createElement("ul", {
  className: styles.list
}, /*#__PURE__*/React.createElement("li", {
  className: styles.item
}, /*#__PURE__*/React.createElement("code", null, "btc moon"), " will search for the exact phrase"), /*#__PURE__*/React.createElement("li", {
  className: styles.item
}, /*#__PURE__*/React.createElement("code", null, "btc AND moon"), " will search for comments including both ", /*#__PURE__*/React.createElement("code", null, "btc"), " and", ' ', /*#__PURE__*/React.createElement("code", null, "moon")), /*#__PURE__*/React.createElement("li", {
  className: styles.item
}, /*#__PURE__*/React.createElement("code", null, "btc OR moon"), " will search for comments including either ", /*#__PURE__*/React.createElement("code", null, "btc"), " or", ' ', /*#__PURE__*/React.createElement("code", null, "moon")), /*#__PURE__*/React.createElement("li", {
  className: styles.item
}, "You can also combine modifiers by using brackets:", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("code", null, "(btc OR bitcoin) AND moon"))));

export default HelpPopupTrends;