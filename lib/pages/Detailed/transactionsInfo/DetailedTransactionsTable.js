import React from 'react';
import { normalizeTransactionData } from './utils';
import TransactionTable from '../../../components/Tables/TopTokenTransactions';

const DetailedTopTransactions = ({
  project,
  show = 'ethTopTransactions',
  title = 'Top ETH transactions'
}) => {
  const slug = project.slug || '';
  const data = project[show] ? project[show].slice(0, 10).map(trx => normalizeTransactionData(slug, trx)) : [];
  return /*#__PURE__*/React.createElement(TransactionTable, {
    header: title,
    data: data,
    slug: project.slug
  });
};

export default DetailedTopTransactions;