import React from 'react';
import cx from 'classnames';
import { HashLink } from 'react-router-hash-link';
import Aside from './Aside';
import Navigation from './Navigation';
import { CABINET_ANCHOR, VIDEOS_ANCHOR } from './Navigation/anchors';
import TrendsSection from './Section/Trends';
import Cabinet from './Section/Personal/Cabinet';
import InsightsOnDemand from './Section/InsightsOnDemand';
import WebinarWidget from './Section/Personal/Cabinet/WebinarWidget/WebinarWidget';
import Footer from '../ProMetrics/ProMetricsFooter/CommonFooter';
import EventBanner from '../../components/EventBanner';
import ResearchesBlock from '../../components/ResearchesBlock';
import KeystackeholdersEvents from './Section/KeystackeholdersEvents/KeystackeholdersEvents';
import FeaturedScreeners from './Section/FeaturedScreeners';
import NftInfluencers from './Section/NftInfluencers';
import styles from './index.module.css';

const Block = ({
  className,
  contentClassName,
  children
}) => /*#__PURE__*/React.createElement("div", {
  className: cx(styles.block, className)
}, /*#__PURE__*/React.createElement("div", {
  className: cx(styles.content, contentClassName)
}, children));

const Section = ({
  title,
  link,
  children
}) => /*#__PURE__*/React.createElement("div", {
  id: link
}, /*#__PURE__*/React.createElement(HashLink, {
  to: `#${link}`,
  className: styles.anchor
}, title), /*#__PURE__*/React.createElement("div", {
  className: styles.sectionContent
}, children));

const IndexPage = () => /*#__PURE__*/React.createElement("div", {
  className: styles.wrapper
}, /*#__PURE__*/React.createElement(EventBanner, null), /*#__PURE__*/React.createElement(Block, {
  className: styles.block_main,
  contentClassName: styles.content_main
}, /*#__PURE__*/React.createElement(Navigation, {
  className: styles.navigation
}), /*#__PURE__*/React.createElement("main", {
  className: styles.main
}, /*#__PURE__*/React.createElement(NftInfluencers, null), /*#__PURE__*/React.createElement(FeaturedScreeners, null), /*#__PURE__*/React.createElement(TrendsSection, null), /*#__PURE__*/React.createElement(KeystackeholdersEvents, null), /*#__PURE__*/React.createElement(InsightsOnDemand, null), /*#__PURE__*/React.createElement(Section, {
  title: "Video insights",
  link: VIDEOS_ANCHOR
}, /*#__PURE__*/React.createElement(WebinarWidget, null)), /*#__PURE__*/React.createElement(Section, {
  title: "Cabinet",
  link: CABINET_ANCHOR
}, /*#__PURE__*/React.createElement(Cabinet, null))), /*#__PURE__*/React.createElement(Aside, {
  className: styles.aside
})), /*#__PURE__*/React.createElement(ResearchesBlock, null), /*#__PURE__*/React.createElement(Footer, null));

export default IndexPage;