import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Section } from '../index';
import SocialGrid from '../../../../components/SocialGrid';
import { INDEX_PAGE_GROUPS } from '../../../../components/SocialGrid/topics';
import Santrends from '../../../../components/Trends/Trends';
import { Column } from '../../../../ducks/TrendsTable/columns';
import Tab from '../../../../components/Tab';
import { SOCIAL_ANCHOR } from '../../Navigation/anchors';
import styles from './index.module.css';
const RECENT_SOCIAL_TOOL = INDEX_PAGE_GROUPS[0];
const TRENDS_HIDDEN_COLUMNS = [Column.SOCIAL_VOLUME];
const TabType = {
  SOCIAL_TOOL: 'Social Tool',
  SOCIAL_TRENDS: 'Social Trends'
};
const TabTypeContent = {
  [TabType.SOCIAL_TOOL]: {
    href: '/labs/trends/explore/',
    widget: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h4", {
      className: styles.title
    }, RECENT_SOCIAL_TOOL.title), /*#__PURE__*/React.createElement("p", {
      className: styles.text
    }, RECENT_SOCIAL_TOOL.description), /*#__PURE__*/React.createElement(SocialGrid, {
      className: styles.socialgrid,
      topics: RECENT_SOCIAL_TOOL.topics
    })),
    description: '‘Google Trends’ for crypto. Monitor the interest in any topic on dedicated cryptocurrency social channels, including 1000+ Telegram groups, crypto subreddits, Twitter accounts and more.'
  },
  [TabType.SOCIAL_TRENDS]: {
    href: '/labs/trends/',
    widget: /*#__PURE__*/React.createElement(Santrends, {
      className: styles.santrends,
      hiddenColumnIds: TRENDS_HIDDEN_COLUMNS
    }),
    description: /*#__PURE__*/React.createElement(React.Fragment, null, "Track the top emerging topics on crypto social media, including Telegram groups, crypto subreddits, Twitter and more")
  }
};

const Tabs = ({
  tabState
}) => /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Tab, {
  tab: TabType.SOCIAL_TRENDS,
  tabState: tabState
}), /*#__PURE__*/React.createElement(Tab, {
  tab: TabType.SOCIAL_TOOL,
  tabState: tabState
}));

const Trends = () => {
  const tabState = useState(TabType.SOCIAL_TRENDS);
  const activeTab = tabState[0];
  const {
    href,
    description,
    widget
  } = TabTypeContent[activeTab];
  return /*#__PURE__*/React.createElement(Section, {
    title: /*#__PURE__*/React.createElement(Tabs, {
      tabState: tabState
    }),
    className: styles.wrapper,
    id: SOCIAL_ANCHOR
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.description
  }, description), /*#__PURE__*/React.createElement(Link, {
    to: href,
    className: styles.link
  }, "Start researching ", activeTab), widget);
};

export default Trends;