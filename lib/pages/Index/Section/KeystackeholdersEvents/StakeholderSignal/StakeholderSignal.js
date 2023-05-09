import React from 'react';
import cx from 'classnames';
import { READABLE_EXCHANGE_NAMES, READABLE_NAMES } from '../hooks';
import { getDateFormats, getTimeFormats } from '../../../../../utils/dates';
import { formatNumber, millify } from '../../../../../utils/formatting';
import { useProject } from '../../../../../hooks/project';
import { TxLinkTo } from '../../../../../components/Tables/TopTokenTransactions/columns';
import WalletLink from '../../../../../components/WalletLink/WalletLink';
import StakeholderChartPreview from '../StakeholderChartPreview/StakeholderChartPreview';
import { HARDCODED_EXCHANGE_LINKS } from '../../../../../components/WalletLink/TransactionTableLabels';
import { usdFormatter } from '../../../../../ducks/dataHub/metrics/formatters'; // import UsefulSuggestion from '../UsefulSuggestion'

import styles from './StakeholderSignal.module.css';

function formatDate(date) {
  const {
    DD,
    MM,
    YYYY
  } = getDateFormats(date);
  const {
    HH,
    mm
  } = getTimeFormats(date);
  return `${DD}.${MM}.${YYYY} ${HH}:${mm}`;
}

const MAX_TX_LENGTH = 40;

const getShortTx = value => {
  if (value.length < MAX_TX_LENGTH) {
    return value;
  }

  return value.slice(0, MAX_TX_LENGTH) + '...';
};

const LINK_SETTINGS = {
  linkSymbolsCount: 42
};

const ExchangeLink = ({
  exchange_name
}) => {
  const link = HARDCODED_EXCHANGE_LINKS[exchange_name];
  const label = READABLE_EXCHANGE_NAMES[exchange_name] || exchange_name.toLowerCase();

  if (link) {
    return /*#__PURE__*/React.createElement("a", {
      className: styles.link,
      target: "_blank",
      rel: "noopener noreferrer",
      href: link
    }, label);
  } else {
    return label;
  }
};

function isValueUsd(value, value_usd, signal) {
  if (!value_usd) {
    switch (signal) {
      case 'ath':
      case 'ath_price_usd':
      case 'price_usd_all_time_high':
      case 'large_transactions':
      case 'large_exchange_deposit':
      case 'large_exchange_withdrawal':
        return true;

      default:
        return false;
    }
  }

  return false;
}

const StakeholderSignal = ({
  data,
  settings
}) => {
  const {
    datetime,
    metadata: {
      exchange_name,
      from,
      to,
      txHash,
      tokenTransferred,
      daysDestroyed,
      prev_ath,
      prev_ath_dt,
      value_usd
    },
    value,
    signal,
    slug,
    project: targetProject
  } = data;
  const [project = targetProject] = useProject(!targetProject && slug);
  const {
    ticker
  } = project || {};
  return /*#__PURE__*/React.createElement("div", {
    className: styles.container
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.header
  }, /*#__PURE__*/React.createElement("div", null, READABLE_NAMES[signal] || signal, ' ', signal === 'old_coins_moved' && to === 'burn' && /*#__PURE__*/React.createElement("span", {
    "aria-label": "fire",
    role: "img"
  }, "\uD83D\uDD25")), /*#__PURE__*/React.createElement("div", {
    className: styles.date
  }, formatDate(new Date(datetime)))), /*#__PURE__*/React.createElement("div", {
    className: styles.content
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.info
  }, exchange_name && /*#__PURE__*/React.createElement("div", {
    className: styles.row
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.label
  }, "Exchange:"), /*#__PURE__*/React.createElement("div", {
    className: styles.value
  }, /*#__PURE__*/React.createElement(ExchangeLink, {
    exchange_name: exchange_name
  }))), prev_ath && /*#__PURE__*/React.createElement("div", {
    className: styles.row
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.label
  }, "Previous ATH:"), /*#__PURE__*/React.createElement("div", {
    className: styles.value
  }, prev_ath, ` at `, formatDate(new Date(prev_ath_dt)))), value && /*#__PURE__*/React.createElement("div", {
    className: styles.row
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.label
  }, isValueUsd(value, value_usd, signal) ? 'Value USD:' : 'Value:'), isValueUsd(value, value_usd, signal) ? /*#__PURE__*/React.createElement("div", {
    className: styles.value
  }, usdFormatter(value)) : /*#__PURE__*/React.createElement("div", {
    className: styles.value
  }, formatNumber(value), " ", ticker)), value_usd && /*#__PURE__*/React.createElement("div", {
    className: styles.row
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.label
  }, "Value USD:"), /*#__PURE__*/React.createElement("div", {
    className: styles.value
  }, usdFormatter(value_usd))), daysDestroyed && /*#__PURE__*/React.createElement("div", {
    className: styles.row
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.label
  }, "Amount of destroyed days:"), /*#__PURE__*/React.createElement("div", {
    className: styles.value
  }, daysDestroyed)), tokenTransferred && /*#__PURE__*/React.createElement("div", {
    className: styles.row
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.label
  }, "Token transfer:"), /*#__PURE__*/React.createElement("div", {
    className: cx(styles.value, styles.amount)
  }, millify(tokenTransferred), " ", ticker)), from && /*#__PURE__*/React.createElement("div", {
    className: styles.row
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.label
  }, "from:"), /*#__PURE__*/React.createElement("div", {
    className: styles.value
  }, /*#__PURE__*/React.createElement(WalletLink, {
    address: from,
    assets: [slug],
    className: styles.address,
    settings: LINK_SETTINGS,
    priceMetrics: [slug]
  }))), to && /*#__PURE__*/React.createElement("div", {
    className: styles.row
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.label
  }, "to:"), /*#__PURE__*/React.createElement("div", {
    className: styles.value
  }, /*#__PURE__*/React.createElement(WalletLink, {
    address: to,
    assets: [slug],
    className: styles.address,
    settings: LINK_SETTINGS,
    priceMetrics: [slug]
  }))), txHash && /*#__PURE__*/React.createElement("div", {
    className: styles.row
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.label
  }, "Tx hash:"), /*#__PURE__*/React.createElement("div", {
    className: styles.value
  }, /*#__PURE__*/React.createElement(TxLinkTo, {
    value: txHash,
    formatter: getShortTx
  })))), /*#__PURE__*/React.createElement("div", {
    className: styles.chart
  }, /*#__PURE__*/React.createElement(StakeholderChartPreview, {
    data: data,
    project: project,
    settings: settings
  }))));
};

export default StakeholderSignal;