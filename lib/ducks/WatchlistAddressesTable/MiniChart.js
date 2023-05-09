import React from 'react';
import { useAddressHistoricalBalance } from './hooks';
import Chart from '../../components/MiniChart';

const MiniChart = ({
  address,
  change,
  slug
}) => {
  const data = useAddressHistoricalBalance(address, slug);
  return /*#__PURE__*/React.createElement(Chart, {
    valueKey: "balance",
    data: data,
    change: change
  });
};

export default MiniChart;