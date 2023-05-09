import { useEffect, useMemo, useState } from 'react';
import { useProjectPriceChanges, useProjectsSocialVolumeChanges } from '../../../../hooks/project';
import { useWatchlistItems } from '../../gql/hooks';
import { mapToColors } from './utils';
export const useWithColors = (data, key, sorter) => {
  const [result, setResult] = useState([]);
  useEffect(() => {
    const sorted = data.sort(sorter);
    setResult(mapToColors(sorted, key));
  }, [data, key, sorter]);
  return result;
};

const useChartInterval = ({
  type,
  settings,
  ranges,
  onChangeSettings
}) => {
  const defaultSelectedIndex = settings && settings.interval ? ranges.findIndex(({
    label
  }) => label === settings.interval) : 1;
  const [intervalIndex, setIntervalIndex] = useState(() => Math.min(ranges.length - 1, defaultSelectedIndex));
  useEffect(() => {
    onChangeSettings(type, ranges[intervalIndex]);
  }, [intervalIndex]);
  return {
    intervalIndex,
    setIntervalIndex,
    rangeItem: ranges[intervalIndex]
  };
};

const buildOrder = ({
  interval,
  metric = 'marketcap_usd',
  desc = false
}) => ({
  metric,
  dynamic_from: interval,
  dynamic_to: 'now',
  aggregation: 'last',
  direction: desc ? 'desc' : 'asc'
});

export const useProjectRanges = ({
  listId,
  ranges,
  desc = true,
  isSocialVolume = false,
  settings,
  onChangeSettings,
  type,
  sortByMetric
}) => {
  const {
    setIntervalIndex,
    intervalIndex,
    rangeItem: {
      label,
      key,
      metric = key
    }
  } = useChartInterval({
    settings,
    type,
    ranges,
    onChangeSettings
  });
  const [slugs] = useWatchlistItems(listId);
  const hookProps = {
    key,
    orderBy: buildOrder({
      interval: label,
      metric: sortByMetric || metric,
      desc
    }),
    metric,
    interval: label,
    slugs
  };
  const [data, loading] = isSocialVolume ? useProjectsSocialVolumeChanges(hookProps) : useProjectPriceChanges(hookProps);
  const limited = useMemo(() => {
    return data.slice(0, 100);
  }, [data]);
  return {
    data: limited,
    loading,
    intervalIndex,
    setIntervalIndex,
    label,
    key: metric
  };
};