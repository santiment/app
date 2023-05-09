import React from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import Panel from '@santiment-network/ui/Panel/Panel';
import Icon from '@santiment-network/ui/Icon';
import styles from '../HelpPopup.module.css';

const FirstQuestion = ({
  isOpen,
  onClick
}) => /*#__PURE__*/React.createElement(Panel, {
  padding: true,
  className: styles.block,
  onClick: onClick
}, /*#__PURE__*/React.createElement("div", {
  className: styles.header
}, /*#__PURE__*/React.createElement("h4", {
  className: styles.headingSmall
}, "How is the list calculated?"), /*#__PURE__*/React.createElement(Icon, {
  type: "arrow-right-big",
  className: cx(styles.arrow, isOpen && styles.openedArrow)
})), isOpen && /*#__PURE__*/React.createElement("div", {
  className: styles.content
}, /*#__PURE__*/React.createElement("p", null, "This list does NOT calculate the most popular words on crypto social media ", /*#__PURE__*/React.createElement("b", null, "overall"), ' ', "- those would often be the same, redundant words such as \u2018Bitcoin\u2019, \u2018Ethereum\u2019, \u2018crypto\u2019 etc."), /*#__PURE__*/React.createElement("p", null, "Instead, our list aims to discover the biggest ", /*#__PURE__*/React.createElement("b", null, "developing"), " or ", /*#__PURE__*/React.createElement("b", null, "emerging"), ' ', "stories within the crypto community. That is why each day you\u2019ll see a new batch of fresh topics, currently gaining steam on crypto social media."), /*#__PURE__*/React.createElement("p", null, "To do this, every 9 hours we calculate the top 10 words with the biggest spike in social media mentions compared to their average social volume in the previous 2 weeks."), /*#__PURE__*/React.createElement("p", null, "This signals an abnormally high interest in a previously uninspiring topic, making the list practical for discovering new and developing talking points in the crypto community."), /*#__PURE__*/React.createElement("p", null, "The results are sourced from more than 1000 crypto-specific social media channels, including:"), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "300+ Telegram groups"), /*#__PURE__*/React.createElement("li", null, "300+ crypto subreddits"), /*#__PURE__*/React.createElement("li", null, "BitcoinTalk"), /*#__PURE__*/React.createElement("li", null, "More social channels constantly being added")), /*#__PURE__*/React.createElement("p", null, "The Santiment team also writes a detailed daily breakdown of the top 10 words to explain their appearance on the list. You can find our daily reports on the", ' ', /*#__PURE__*/React.createElement(Link, {
  to: '/insights',
  className: styles.link
}, "Community Insights"), ' ', "page or sign up for our Daily Email Brief.")));

export default FirstQuestion;