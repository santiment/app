import React from 'react';
import cx from 'classnames';
import CommonFooter from '../ProMetrics/ProMetricsFooter/CommonFooter';
import MobileHeader from '../../components/MobileHeader/MobileHeader';
import { MobileOnly } from '../../components/Responsive';
import { useUserSubscriptionStatus } from '../../stores/user/subscriptions';
import MakeProSubscriptionCard from '../feed/GeneralFeed/MakeProSubscriptionCard/MakeProSubscriptionCard';
import styles from './SheetsTemplatePage.module.css';

const SheetsTemplatePage = () => {
  const {
    isPro
  } = useUserSubscriptionStatus();
  return /*#__PURE__*/React.createElement("div", {
    className: cx('page', styles.container)
  }, /*#__PURE__*/React.createElement(MobileOnly, null, /*#__PURE__*/React.createElement(MobileHeader, {
    classes: styles
  })), /*#__PURE__*/React.createElement("div", {
    className: styles.chart
  }, isPro && /*#__PURE__*/React.createElement("iframe", {
    title: "Sheets template",
    width: "1607",
    height: "615",
    seamless: true,
    frameBorder: "0",
    scrolling: "no",
    src: "https://docs.google.com/spreadsheets/d/e/2PACX-1vSw1ohshy5iHno96J7nFYyqYVBOkOrIrRL5LFfIkZGsMR12QM-bsGFsC1CfOxqI8kkKHZdSjBcFSHsj/pubchart?oid=799877008&format=interactive"
  }), !isPro && /*#__PURE__*/React.createElement("div", {
    className: styles.inner
  }, /*#__PURE__*/React.createElement(MakeProSubscriptionCard, {
    classes: styles
  }))), /*#__PURE__*/React.createElement("div", {
    className: styles.footer
  }, /*#__PURE__*/React.createElement(CommonFooter, null)));
};

export default SheetsTemplatePage;