import React from 'react';
import cx from 'classnames';
import SocialGrid from '../../../../components/SocialGrid';
import Suggestions from '../../../../components/Trends/Search/Suggestions';
import Info from '../shared/Info/Info';
import Section from '../shared/Section/Section';
import TrendsExploreInput from './TrendsExploreInput/TrendsExploreInput';
import TopTrends from './TopTrends/TopTrends';
import dashboardsStyles from '../dashboards.module.css';

const SocialTool = ({
  isDesktop
}) => /*#__PURE__*/React.createElement("section", {
  className: cx(dashboardsStyles.wrapper, 'column')
}, /*#__PURE__*/React.createElement(Info, {
  title: "Social tool",
  description: "Explore the social volume of any word on crypto social media. You can also look at individual platform data, including Telegram, Twitter, and Reddit. Compare words and assets, and check any common words that have been frequently used alongside the coin\u2019s or trending word\u2019s name."
}), /*#__PURE__*/React.createElement("main", {
  className: cx(dashboardsStyles.content, 'column')
}, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(TrendsExploreInput, {
  showButton: true
}), isDesktop && /*#__PURE__*/React.createElement(Suggestions, null)), /*#__PURE__*/React.createElement(Section, {
  id: "soc_tool_top_10",
  title: "Top 10 Hourly Trends",
  description: "The top words with the highest percentage increase in mentions on crypto social media in the previous 24 hours"
}, /*#__PURE__*/React.createElement(TopTrends, null)), /*#__PURE__*/React.createElement(Section, {
  id: "soc_tool_mid_trends",
  title: "Popular Mid-Term Trends",
  description: "The most popular topics in crypto social media. This ranges from worldwide economic and health topics, to discussions directly related to airdrops, new listings, price movement, and more"
}, /*#__PURE__*/React.createElement(SocialGrid, null))));

export default SocialTool;