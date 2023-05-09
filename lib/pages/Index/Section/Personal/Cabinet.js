import React from 'react';
import { HashLink } from 'react-router-hash-link';
import Accordion from '../../Accordion';
import { ProUpgradeBanner } from '../../../feed/GeneralFeed/MakeProSubscriptionCard/MakeProSubscriptionCard';
import { useUserSubscriptionStatus } from '../../../../stores/user/subscriptions';
import CabinetTitle from './Cabinet/CabinetTitle/CabinetTitle';
import { ReportsImg, SheetsTemplatesImg } from './Cabinet/images';
import Reports from './Cabinet/Reports';
import SheetsTemplates from './Cabinet/SheetsTemplates/SheetsTemplates';
import styles from './Cabinet.module.css';
const SHEETS_ANCHOR = '#san-sheets';
const CABINETS = [{
  title: /*#__PURE__*/React.createElement(CabinetTitle, {
    img: ReportsImg,
    title: "Weekly Reports",
    description: "Check out our latest premium reports about crypto activity in the market"
  }),
  content: /*#__PURE__*/React.createElement(Reports, null),
  isOpened: true
}, {
  title: /*#__PURE__*/React.createElement(CabinetTitle, {
    as: HashLink,
    to: `#${SHEETS_ANCHOR}`,
    img: /*#__PURE__*/React.createElement("div", {
      className: styles.img
    }, SheetsTemplatesImg),
    title: "Sansheets Pro Templates",
    description: /*#__PURE__*/React.createElement(React.Fragment, null, "A collection of trading and research models built with", ' ', /*#__PURE__*/React.createElement("a", {
      href: "https://sheets.santiment.net/",
      className: styles.link,
      target: "_blank",
      rel: "noopener noreferrer"
    }, "Sansheets"), ", a plugin that lets you directly import Santiment\u2019s data into Google Spreadsheets. Popular PRO templates include Price-DAA divergence, MVRV comparison model, NVT ratio and more.")
  }),
  content: /*#__PURE__*/React.createElement(SheetsTemplates, null),
  isOpened: true
}];

const Cabinet = () => {
  const {
    isPro,
    loading
  } = useUserSubscriptionStatus();
  if (loading) return null;

  if (!isPro) {
    return /*#__PURE__*/React.createElement(ProUpgradeBanner, {
      classes: styles
    });
  }

  return CABINETS.map(({
    title,
    content,
    isOpened
  }, index) => /*#__PURE__*/React.createElement(Accordion, {
    key: index,
    title: title,
    isOpenedDefault: isOpened,
    animateOnMount: true,
    showArrow: false,
    classes: styles
  }, content));
};

export default Cabinet;