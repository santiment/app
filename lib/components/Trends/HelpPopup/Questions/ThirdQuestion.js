import React from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import Panel from '@santiment-network/ui/Panel/Panel';
import Icon from '@santiment-network/ui/Icon';
import styles from '../HelpPopup.module.css';

const ThirdQuestion = ({
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
}, "What do all the columns mean?"), /*#__PURE__*/React.createElement(Icon, {
  type: "arrow-right-big",
  className: cx(styles.arrow, isOpen && styles.openedArrow)
})), isOpen && /*#__PURE__*/React.createElement("div", {
  className: styles.content
}, /*#__PURE__*/React.createElement("p", null, "Other than the actual words, our list has 5 columns that help bring more context to the results:"), /*#__PURE__*/React.createElement("div", {
  className: styles.blockItem
}, /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("b", null, "Hype Score"), " - this is the main criteria for ranking the words on our list. The Hype Score is based on a sophisticated formula (developed by Santiment) that analyzes all social media messages, and then - using a dozen parameters - ranks the words by the", ' ', /*#__PURE__*/React.createElement("b", null, "likelihood of sustained chatter.")), /*#__PURE__*/React.createElement("p", null, "The bigger the Hype Score, the more likely it is that a particular word/topic will continue to be discussed in the near future, whereas a lower Hype Score means that although a word/topic is very popular in crypto at the moment, it\u2019s already slowly losing the crowd\u2019s attention."), /*#__PURE__*/React.createElement("p", null, "While Social Volume shows the absolute number of social mentions for each word, the Hype Score is much more complex and actually tries to predict which of the top 10 words are more likely to continue to be talked about on crypto social media, and which are starting to fizzle out.")), /*#__PURE__*/React.createElement("div", {
  className: styles.blockItem
}, /*#__PURE__*/React.createElement("b", null, "Social Volume"), " - shows the total amount of mentions of a word/topic on crypto social media today. The (green or red) number next to it shows how many (more or less) social media mentions the word has had today compared to yesterday."), /*#__PURE__*/React.createElement("div", {
  className: styles.blockItem
}, /*#__PURE__*/React.createElement(Icon, {
  type: "connection-big",
  className: styles.icon
}), " - shows if some words on our list are related, i.e. trending for the same reason. Hovering over the Link icon will highlight all the related words on the list.", /*#__PURE__*/React.createElement("p", null, "The words are linked together whenever someone writes a Community Insight about them. Anyone can do it - here\u2019s how:"), /*#__PURE__*/React.createElement("ol", null, /*#__PURE__*/React.createElement("li", null, "On the main", ' ', /*#__PURE__*/React.createElement(Link, {
  to: '/labs/trends',
  className: styles.link
}, "Trends"), ' ', "page, tick the words on the list that you believe are trending for the same reason"), /*#__PURE__*/React.createElement("li", null, "Once you\u2019ve selected the related words, click \u201C+ Add Insight\u201D found right below the list."), /*#__PURE__*/React.createElement("li", null, "Write an Insight explaining why those words are trending together"), /*#__PURE__*/React.createElement("li", null, "Once you publish your insight, those words will be publicly interlinked on our list, and hovering over the Link symbol will highlight the related words for everyone"))), /*#__PURE__*/React.createElement("div", {
  className: styles.blockItem
}, /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement(Icon, {
  className: styles.icon,
  type: "insight"
}), " - shows if there are any Community Insights written about a particular trending word."), /*#__PURE__*/React.createElement("p", null, "Whenever someone selects one or more words on the list and writes an Insight about them (see above), the Paper icon will display a number in the top right corner. That number indicates how many Insights have been written in connection to that term.")), /*#__PURE__*/React.createElement("div", {
  className: styles.blockItem
}, /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement(Icon, {
  className: styles.icon,
  type: "cloud-big"
}), " - clicking the Cloud icon opens the social Word Cloud for a selected word, which gives you additional information about why it\u2019s trending."), /*#__PURE__*/React.createElement("p", null, "The cloud highlights terms that are often used alongside the selected word on crypto social media (in the past 3 days). Larger terms in the cloud are found more frequently in connection to the selected word."))));

export default ThirdQuestion;