import React, { useMemo } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Skeleton from '../../../components/Skeleton/Skeleton';
import ChangeChart from '../../Watchlists/Widgets/Table/PriceGraph/ChangeChart';
import { ResponsiveContainer } from 'recharts';
import styles from './EthStakingRoi.module.css';
const ETH2_STAKING_ROI_QUERY = gql`
  query getMetric($from: DateTime!) {
    getMetric(metric: "eth2_roi") {
      timeseriesData(selector: { slug: "ethereum" }, from: $from, to: "utc_now", interval: "1d") {
        datetime
        ROI: value
      }
    }
  }
`;
const FROM = new Date('2020-11-03 00:00:00');
export const useEthROI = () => {
  const {
    data,
    loading,
    error
  } = useQuery(ETH2_STAKING_ROI_QUERY, {
    variables: {
      from: FROM
    }
  });
  return useMemo(() => {
    return {
      data: data ? data.getMetric.timeseriesData : [],
      loading,
      error
    };
  }, [data, loading, error]);
};

const toPercents = value => (value * 100).toFixed(2);

const valueFormatter = ({
  payload
}) => {
  if (!payload || !payload.length) {
    return '-';
  }

  const percentValue = toPercents(payload[0].payload.originalValue);
  return `${percentValue}%`;
};

const EthStakingRoi = () => {
  const {
    data,
    loading
  } = useEthROI();
  const value = useMemo(() => {
    const last = data[data.length - 1];
    return last ? last.ROI : 0;
  }, [data]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Skeleton, {
    repeat: 1,
    className: styles.skeleton,
    wrapperClassName: styles.skeletonWrapper,
    show: loading
  }), !loading && /*#__PURE__*/React.createElement("div", {
    className: styles.wrapper
  }, toPercents(value), "%", /*#__PURE__*/React.createElement(ResponsiveContainer, {
    height: 56,
    className: styles.chart
  }, /*#__PURE__*/React.createElement(ChangeChart, {
    data: data,
    width: '100%',
    dataKey: 'ROI',
    height: 100,
    color: 'var(--jungle-green)',
    showTooltip: true,
    valueFormatter: valueFormatter
  }))));
};

export default EthStakingRoi;