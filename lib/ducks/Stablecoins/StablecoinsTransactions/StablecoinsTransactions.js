import React, { useMemo, useState } from 'react';
import { normalizeTransactionData } from '../../../pages/Detailed/transactionsInfo/utils';
import TransactionTable from '../../../components/Tables/TopTokenTransactions';
import { DEFAULT_STABLECOIN } from '../HolderDistribution/StablecoinHolderDistribution';
import { StablecoinsSelector } from '../StablecoinSelector/ProjectsSelectors';
import { useProjectTopTransactions } from '../../Studio/Widget/TopTransactionsTable';
import styles from './StablecoinsTransactions.module.css';
const PAGE_SIZE = 12;

const StablecoinsTransactions = ({
  from,
  to
}) => {
  const [asset, setAsset] = useState(DEFAULT_STABLECOIN);
  const {
    slug
  } = asset;
  const [transactions, loading] = useProjectTopTransactions(slug, from, to);
  const normalizedData = useMemo(() => transactions.map(trx => normalizeTransactionData(slug, trx)), [transactions]);
  return /*#__PURE__*/React.createElement("div", {
    className: styles.container
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.header
  }, /*#__PURE__*/React.createElement(StablecoinsSelector, {
    asset: asset,
    setAsset: setAsset
  })), /*#__PURE__*/React.createElement(TransactionTable, {
    header: null,
    data: normalizedData,
    loading: loading,
    showPagination: normalizedData.length > PAGE_SIZE,
    defaultPageSize: PAGE_SIZE
  }));
};

export default StablecoinsTransactions;