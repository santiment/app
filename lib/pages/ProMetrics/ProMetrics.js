import React from 'react';
import cx from 'classnames';
import Icon from '@santiment-network/ui/Icon';
import UpgradeBtn from '../../components/UpgradeBtn/UpgradeBtn';
import ProMetric from './ProMetric/ProMetric';
import { SECOND_METRICS_GROUP, THIRD_METRICS_GROUP } from './utils';
import { MobileOnly } from '../../components/Responsive';
import MobileHeader from '../../components/MobileHeader/MobileHeader';
import { FIRST_METRICS_GROUP } from './utils.js';
import CommonFooter from './ProMetricsFooter/CommonFooter';
import upgradeSvg from './../../assets/pro-metrics/upgrade.svg';
import { useUserSubscriptionStatus } from '../../stores/user/subscriptions';
import UpgradeInfo from '../Pricing/UpgradeInfo/UpgradeInfo';
import styles from './ProMetrics.module.css';

const ProMetrics = ({
  history,
  isLoggedIn
}) => {
  const {
    isPro
  } = useUserSubscriptionStatus();
  return /*#__PURE__*/React.createElement("div", {
    className: cx('page', styles.container)
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.inner
  }, /*#__PURE__*/React.createElement(MobileOnly, null, /*#__PURE__*/React.createElement(MobileHeader, {
    showBack: true,
    goBack: history.goBack,
    classes: styles
  })), /*#__PURE__*/React.createElement("div", {
    className: styles.firstStep
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.descriptions
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.crown
  }, /*#__PURE__*/React.createElement(Icon, {
    type: "crown"
  }), " Pro Google Sheets templates"), /*#__PURE__*/React.createElement("div", {
    className: styles.perksTitle
  }, "The Perks of Being a Pro Subscriber on Sanbase"), /*#__PURE__*/React.createElement("div", {
    className: styles.description
  }, "Next to many other perks, Sanbase Pro subscribers get access to exclusive templates, dynamic reports and market-beating indices developed by the Santiment team."), /*#__PURE__*/React.createElement("div", {
    className: styles.description
  }, "New Chart Layouts and indices are added monthly."), !isPro && /*#__PURE__*/React.createElement(UpgradeBtn, {
    loginRequired: false,
    className: styles.upgradeBtn
  }, "Upgrade")), FIRST_METRICS_GROUP.map((metric, index) => /*#__PURE__*/React.createElement(ProMetric, {
    isProSanbase: isPro,
    metric: metric,
    key: index,
    classes: {
      container: styles.firstGroup
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: cx(styles.ask, styles.bgSvg),
    style: {
      background: 'url(' + upgradeSvg + ') repeat-x bottom'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.askBlock
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.askTitle
  }, "Convinced to upgrade already?"), /*#__PURE__*/React.createElement(UpgradeBtn, {
    className: styles.askUpgradeBtn
  }))), /*#__PURE__*/React.createElement("div", {
    className: styles.row
  }, SECOND_METRICS_GROUP.map((metric, index) => /*#__PURE__*/React.createElement(ProMetric, {
    isProSanbase: isPro,
    metric: metric,
    key: index,
    classes: {
      container: styles.secondGroup,
      svg: styles.secondGroupSvg
    }
  })))), /*#__PURE__*/React.createElement("div", {
    className: styles.secondStep
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.grid
  }, THIRD_METRICS_GROUP.map((metric, index) => /*#__PURE__*/React.createElement(ProMetric, {
    isProSanbase: isPro,
    metric: metric,
    key: index,
    classes: {
      container: styles.thirdGroup,
      svg: styles.thirdGroupSvg
    }
  }))))), !isLoggedIn && /*#__PURE__*/React.createElement(UpgradeInfo, null), /*#__PURE__*/React.createElement(CommonFooter, null));
};

export default ProMetrics;