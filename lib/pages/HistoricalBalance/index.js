import React, { useMemo } from 'react';
import cx from 'classnames';
import URLExtension from './URLExtension';
import { useUser } from '../../stores/user';
import Page from '../../ducks/Page';
import HistoricalBalance from '../../ducks/HistoricalBalance';
import { parseUrl } from '../../ducks/HistoricalBalance/url';
import HelpPopup from '../../components/HelpPopup/HelpPopup';
import PageLoader from '../../components/Loader/PageLoader';
import { LoginWarning } from '../../components/banners/feature/PopupBanner';
import styles from './index.module.css';

const Help = () => /*#__PURE__*/React.createElement(HelpPopup, null, "Enter any ERC-20 or BTC wallet's address and choose up to 5 assets for a detailed breakdown of the wallet's balance over time.");

export const Title = () => /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
  style: {
    marginRight: '6px'
  }
}, "Historical balance"), /*#__PURE__*/React.createElement(Help, null));

const HistoricalBalancePage = ({
  history
}) => {
  const {
    loading,
    isLoggedIn
  } = useUser();
  const {
    settings,
    chartAssets,
    priceAssets,
    isLog
  } = useMemo(() => parseUrl(isLoggedIn ? window.location.search : ''), [isLoggedIn]);

  if (loading) {
    return /*#__PURE__*/React.createElement(PageLoader, null);
  }

  return /*#__PURE__*/React.createElement(Page, {
    title: "Historical Balance",
    actions: /*#__PURE__*/React.createElement(Help, null)
  }, isLoggedIn ? null : /*#__PURE__*/React.createElement("div", {
    className: cx(styles.bg, 'row hv-center')
  }, /*#__PURE__*/React.createElement(LoginWarning, {
    className: cx(styles.login, 'border')
  })), /*#__PURE__*/React.createElement(HistoricalBalance, {
    defaultSettings: settings,
    defaultChartAssets: chartAssets,
    defaultPriceAssets: priceAssets,
    defaultIsLog: isLog
  }, isLoggedIn && /*#__PURE__*/React.createElement(URLExtension, {
    history: history
  })));
};

export default HistoricalBalancePage;