function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import cx from 'classnames';
import PanelWithHeader from '@santiment-network/ui/Panel/PanelWithHeader';
import UniswapHistoricalBalance from './UniswapHistoricalBalance/UniswapHistoricalBalance';
import EthSpentTable from '../../../components/Tables/EthSpent';
import withProject from '../../../pages/Detailed/withProject';
import GeneralInfoBlock from '../../../pages/Detailed/generalInfo/GeneralInfoBlock';
import FinancialsBlock from '../../../pages/Detailed/financialInfo/FinancialsBlock';
import DetailedTransactionsTable from '../../../pages/Detailed/transactionsInfo/DetailedTransactionsTable';
import styles from '../../../pages/Detailed/Detailed.module.css';

const KeyStats = ({
  slug,
  project,
  isERC20,
  loading
}) => {
  const {
    ticker
  } = project;
  return /*#__PURE__*/React.createElement(React.Fragment, null, slug === 'ethereum' && /*#__PURE__*/React.createElement("div", {
    className: styles.spent
  }, /*#__PURE__*/React.createElement(EthSpentTable, null)), /*#__PURE__*/React.createElement("div", {
    className: styles.info
  }, /*#__PURE__*/React.createElement(PanelWithHeader, {
    header: "General Info",
    className: styles.info__card
  }, /*#__PURE__*/React.createElement(GeneralInfoBlock, _extends({}, project, {
    loading: loading
  }))), project.fundsRaisedIcos && project.fundsRaisedIcos.length > 0 && /*#__PURE__*/React.createElement(PanelWithHeader, {
    header: "Financials",
    className: styles.info__card
  }, /*#__PURE__*/React.createElement(FinancialsBlock, project)), slug === 'uniswap' && /*#__PURE__*/React.createElement(PanelWithHeader, {
    header: "Uniswap: Token Distributor 0x090d4613473dee047c3f2706764f49e0821d256e",
    className: cx(styles.info__card, styles.info_uniswap),
    contentClassName: cx(styles.noPadding, styles.uniswap)
  }, /*#__PURE__*/React.createElement(UniswapHistoricalBalance, null))), !loading && project.tokenTopTransactions && project.tokenTopTransactions.length > 0 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: styles.info
  }, /*#__PURE__*/React.createElement(DetailedTransactionsTable, {
    project: project,
    title: `Top ${ticker} transactions, 30d`,
    show: "tokenTopTransactions"
  })), isERC20 && /*#__PURE__*/React.createElement("div", {
    className: styles.info
  }, /*#__PURE__*/React.createElement(DetailedTransactionsTable, {
    project: project
  }))));
};

export default withProject(KeyStats);