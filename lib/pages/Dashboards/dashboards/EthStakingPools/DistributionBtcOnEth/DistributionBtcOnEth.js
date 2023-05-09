import React, { useCallback, useEffect, useState } from 'react';
import { query } from 'san-webkit/lib/api';
import { QueuedDashboardMetricChart as DashboardMetricChart } from '../../../../../components/DashboardMetricChart/DashboardMetricChart';
import { QUERY } from './queries';

const metricsMapper = key => ({
  key,
  label: key,
  node: 'line',
  domainGroup: 'eth2'
});

const DistributionBtcOnEth = ({
  metric
}) => {
  const [metrics, setMetrics] = useState([]);
  const useMetricsData = useCallback((_metrics, settings) => {
    const [data, setData] = useState([]);
    const [loadings, setLoadings] = useState([{}]);
    const {
      from,
      to
    } = settings;
    useEffect(() => {
      const assets = new Set();
      query(QUERY, {
        variables: {
          metric,
          from,
          to
        }
      }).then(({
        getMetric
      }) => getMetric.histogramData.values.data).then(data => data.map(({
        d,
        v
      }) => {
        const item = {
          datetime: Date.parse(d)
        };
        v.forEach(({
          s,
          v
        }) => {
          if (assets.size < 10) assets.add(s);
          item[s] = v;
        });
        setMetrics([...assets].map(metricsMapper));
        return item;
      })).then(data => {
        setData(data);
        setLoadings([]);
      });
    }, [from, to]);
    return [data, loadings];
  }, []);
  return /*#__PURE__*/React.createElement(DashboardMetricChart, {
    noBrush: true,
    noIntervals: true,
    isSharedAxisDefault: true,
    metrics: metrics,
    useMetricsData: useMetricsData
  });
};

export default DistributionBtcOnEth;