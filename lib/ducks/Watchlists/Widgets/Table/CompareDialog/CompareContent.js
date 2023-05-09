import React, { useCallback, useEffect, useState } from 'react';
import Dialog from '@santiment-network/ui/Dialog';
import { useIsBetaMode } from '../../../../../stores/ui';
import { useAvailableMetrics } from '../CompareInfo/hooks';
import { getCategoryGraph } from '../../../../Studio/Sidebar/utils';
import Search from '../../../../Studio/Sidebar/Search';
import { SEARCH_PREDICATE_ONLY_METRICS } from '../../../../Studio/Compare/Comparable/Metric';
import MetricBtns from '../CompareInfo/MetricBtns/MetricBtns';
import MetricsList from '../../../../Signals/signalFormManager/signalCrudForm/formParts/metricTypes/MetricsList';
import { filterOnlyMetrics } from '../../../../Signals/signalFormManager/signalCrudForm/formParts/metricTypes/SupportedMetricsList';
import { newProjectMetric } from '../../../../Studio/metrics';
import ChartWidget from '../../../../Studio/Widget/ChartWidget';
import { PATHS } from '../../../../../paths';
import { generateUrlV2 } from '../../../../Studio/url/generate';
import PageLoader from '../../../../../components/Loader/PageLoader';
import { useMergedTimeboundSubmetrics } from '../../../../dataHub/timebounds';
import styles from './CompareDialog.module.css';

const CompareContent = ({
  onSelectMetric,
  closeDialog,
  removeMetric,
  onClear,
  metrics,
  assets
}) => {
  const isBeta = useIsBetaMode();
  const {
    availableMetrics,
    loadings
  } = useAvailableMetrics(assets);
  const [categories, setCategories] = useState({});
  const categoriesKeys = Object.keys(categories);
  const AllSubmetrics = useMergedTimeboundSubmetrics(availableMetrics);
  const [selectedMetricSettingsMap, setSelectedMetricSettingsMap] = useState(new Map());
  useEffect(() => {
    const submetrics = filterOnlyMetrics(AllSubmetrics);
    const newCategories = getCategoryGraph(availableMetrics, [], submetrics, isBeta);
    setCategories(newCategories);
  }, [availableMetrics]);
  const onCompare = useCallback(() => {
    const MetricSettingMap = new Map();
    const widgets = assets.map(asset => ChartWidget.new({
      metrics: metrics.map(metric => {
        const projectMetric = newProjectMetric(asset, metric);
        const metricSettings = selectedMetricSettingsMap.get(metric);

        if (metricSettings) {
          MetricSettingMap.set(projectMetric, metricSettings);
        }

        return projectMetric;
      }),
      MetricSettingMap
    }));
    const url = `${PATHS.STUDIO}?${generateUrlV2({
      widgets,
      settings: {}
    })}`;
    window.open(url, '_blank');
  }, [metrics, assets, selectedMetricSettingsMap]);
  const project = assets[0];
  const loading = loadings.length > 0;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Dialog.ScrollContent, {
    className: styles.panel
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.info
  }, "Compare ", /*#__PURE__*/React.createElement(SelectedAssets, {
    assets: assets
  }), " on a single chart. Each row contains one selected metric and N selected assets"), /*#__PURE__*/React.createElement(Search, {
    iconPosition: "left",
    inputProps: {
      placeholder: 'Search for a metric'
    },
    toggleMetric: onSelectMetric,
    className: styles.search,
    categories: categories,
    searchPredicate: SEARCH_PREDICATE_ONLY_METRICS
  }), /*#__PURE__*/React.createElement("div", {
    className: styles.metricBtns
  }, /*#__PURE__*/React.createElement(MetricBtns, {
    onClear: onClear,
    metrics: metrics,
    removeMetric: removeMetric
  })), /*#__PURE__*/React.createElement("div", {
    className: styles.metrics
  }, loading ? /*#__PURE__*/React.createElement(PageLoader, {
    className: styles.loader
  }) : categoriesKeys.map((key, index) => /*#__PURE__*/React.createElement(MetricsList, {
    index: index,
    key: key,
    metrikKey: key,
    list: categories[key],
    onSelect: onSelectMetric,
    project: project,
    selected: metrics,
    availableMetrics: availableMetrics,
    isBeta: isBeta,
    selectedMetricSettingsMap: selectedMetricSettingsMap,
    setSelectedMetricSettingsMap: setSelectedMetricSettingsMap
  })))), /*#__PURE__*/React.createElement(Dialog.Actions, {
    className: styles.actions
  }, /*#__PURE__*/React.createElement(Dialog.Approve, {
    onClick: onCompare,
    isLoading: loading,
    disabled: loading || metrics.length === 0,
    className: styles.compare
  }, "Compare"), /*#__PURE__*/React.createElement(Dialog.Cancel, {
    onClick: closeDialog,
    className: styles.cancel
  }, "Cancel")));
};

const SelectedAssets = ({
  assets
}) => {
  return /*#__PURE__*/React.createElement(React.Fragment, null, assets.map(({
    name,
    ticker
  }, index) => {
    return /*#__PURE__*/React.createElement("span", {
      key: ticker,
      className: styles.name
    }, name, assets.length > 1 && index !== assets.length - 1 && /*#__PURE__*/React.createElement("span", null, ","));
  }));
};

export default CompareContent;