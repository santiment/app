import React, { useState, useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';
import { connect } from 'react-redux';
import { track } from 'san-webkit/lib/analytics';
import Icon from '@santiment-network/ui/Icon';
import Button from '@santiment-network/ui/Button';
import Search from '@santiment-network/ui/Search';
import Message from '@santiment-network/ui/Message';
import Loader from '@santiment-network/ui/Loader/Loader';
import Trigger from './Trigger';
import { metrics, getActiveBaseMetrics } from './dataHub/metrics';
import Category from './Category';
import EntryPoint from './EntryPoint';
import ToggleActiveFilters from './ToggleActiveFilters';
import { getCategoryGraph } from '../../../Studio/Sidebar/utils';
import { countCategoryActiveMetrics } from '../../../SANCharts/ChartMetricSelector';
import { getNewFunction, extractFilters, filterMetricsBySearch } from './utils';
import { isContainMetric } from './detector';
import { useAvailableMetrics } from './hooks';
import { useUserSubscriptionStatus } from '../../../../stores/user/subscriptions';
import { APP_STATES } from '../../../Updates/reducers';
import { notifyLoginForSave, notifyOutdatedVersion } from '../TopPanel/notifications';
import styles from './index.module.css';

const Filter = ({
  entityId,
  projectsCount,
  isAuthor,
  isAuthorLoading,
  screenerFunction,
  setScreenerFunction,
  isLoggedIn,
  isDefaultScreener,
  loading,
  appVersionState,
  isOpen,
  setIsOpen,
  updateWatchlistFunction,
  closeClasses
}) => {
  if (!screenerFunction) {
    return null;
  }

  const isViewMode = !isAuthor && !isAuthorLoading && (isLoggedIn || !isDefaultScreener);
  const filters = useMemo(() => extractFilters(screenerFunction.args), [screenerFunction]);
  const [currentSearch, setCurrentSearch] = useState('');
  const [filter, updateFilter] = useState(filters);
  const [baseProjects, setBaseProjects] = useState(screenerFunction.args.baseProjects);
  const [isOutdatedVersion, setIsOutdatedVersion] = useState(false);
  const [isActiveFiltersOnly, setIsActiveFiltersOnly] = useState(false);
  const [isWereChanges, setIsWereChanges] = useState(false);
  const {
    availableMetrics
  } = useAvailableMetrics();
  const [isReset, setIsReset] = useState(false);
  const {
    isPro
  } = useUserSubscriptionStatus();
  useEffect(() => {
    updateFilter(filters);
  }, [filters]);
  const isNoFilters = useMemo(() => filters.length === 0 || screenerFunction.name === 'top_all_projects', [filters, screenerFunction]);
  useEffect(() => {
    if (isOutdatedVersion && appVersionState !== APP_STATES.LATEST) {
      notifyOutdatedVersion();
    }
  }, [isOutdatedVersion]);
  useEffect(() => {
    if (isViewMode && !isActiveFiltersOnly) {
      setIsActiveFiltersOnly(true);
    }
  }, [isViewMode]);
  useEffect(() => {
    if (!isLoggedIn && !isViewMode && isWereChanges && isOpen) {
      notifyLoginForSave();
    }
  }, [isWereChanges]);
  useEffect(() => {
    if (!isOpen) {
      setCurrentSearch('');
    }
  }, [isOpen]);
  useEffect(() => {
    if (!isViewMode && baseProjects !== screenerFunction.args.baseProjects) {
      const newFunction = getNewFunction(filter, baseProjects);
      updateWatchlistFunction(newFunction);
      setScreenerFunction(newFunction);
    }
  }, [baseProjects]);

  function resetAll() {
    const func = getNewFunction([], baseProjects);
    updateFilter([]);

    if (!isNoFilters) {
      updateWatchlistFunction(func);
    }

    setScreenerFunction(func);
    setIsReset(true);
    setCurrentSearch('');
  }

  function updMetricInFilter(metric, key, alternativeKey = key) {
    if (isViewMode) {
      return;
    }

    track.event('screener_filter_updated', {
      id: entityId,
      filter: key,
      args: metric.args
    });
    const filters = isNoFilters ? [] : filter.filter(item => !isContainMetric(item.args.metric || item.name, key) && !isContainMetric(item.args.metric || item.name, alternativeKey));
    const newFilter = [...filters, metric];
    const newFunction = getNewFunction(newFilter, baseProjects);
    updateFilter(newFilter);
    updateWatchlistFunction(newFunction);
    setScreenerFunction(newFunction);

    if (newFilter.length > 0 && isReset) {
      setIsReset(false);
    }

    if (!isWereChanges) {
      setIsWereChanges(true);
    }
  }

  function toggleMetricInFilter(metric, key, alternativeKey = key) {
    if (isViewMode) {
      return;
    }

    const isMetricInList = filter.some(item => isContainMetric(item.args.metric || item.name, key) || isContainMetric(item.args.metric || item.name, alternativeKey));
    track.event('screener_filter_toggled', {
      id: entityId,
      filter: key,
      action: isMetricInList ? 'removed' : 'added',
      args: metric.args
    });
    let newFilter = [];

    if (isMetricInList) {
      newFilter = filter.filter(item => !isContainMetric(item.args.metric || item.name, key) && !isContainMetric(item.args.metric || item.name, alternativeKey));
    } else {
      newFilter = [...filter, metric];
    }

    const newFunction = getNewFunction(newFilter, baseProjects);
    updateFilter(newFilter);
    updateWatchlistFunction(newFunction);
    setScreenerFunction(newFunction);

    if (newFilter.length > 0 && isReset) {
      setIsReset(false);
    }

    if (!isWereChanges) {
      setIsWereChanges(true);
    }
  }

  const activeBaseMetrics = getActiveBaseMetrics(filter);
  const dynamicMetrics = metrics.filter(metric => !metric.isStatic || metric.Widget);
  const metricsSet = isActiveFiltersOnly ? activeBaseMetrics : dynamicMetrics;
  const filteredMetrics = filterMetricsBySearch(currentSearch, metricsSet);
  const categories = getCategoryGraph(filteredMetrics);
  activeBaseMetrics.forEach(metric => {
    if (metric === undefined && !isOutdatedVersion) {
      setIsOutdatedVersion(true);
    }
  });
  const categoryActiveMetricsCounter = countCategoryActiveMetrics(activeBaseMetrics);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Trigger, {
    isOpen: isOpen,
    onClick: setIsOpen,
    activeMetricsCount: activeBaseMetrics.length
  }), /*#__PURE__*/ReactDOM.createPortal( /*#__PURE__*/React.createElement("section", {
    className: cx(styles.wrapper, isOpen && styles.active)
  }, /*#__PURE__*/React.createElement("div", {
    className: cx(closeClasses.wrapper, 'btn row v-center border'),
    onClick: () => setIsOpen(false)
  }, /*#__PURE__*/React.createElement(Icon, {
    type: "sidebar",
    className: closeClasses.icon
  })), /*#__PURE__*/React.createElement("div", {
    className: styles.inner
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.top
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.row
  }, /*#__PURE__*/React.createElement("span", {
    className: styles.count__assets
  }, projectsCount, " assets"), !loading && /*#__PURE__*/React.createElement("span", {
    className: styles.count__filters
  }, `${activeBaseMetrics.length} filter${activeBaseMetrics.length !== 1 ? 's' : ''} activated`), loading && /*#__PURE__*/React.createElement(Loader, {
    className: styles.loader
  })), !isViewMode && isOpen && /*#__PURE__*/React.createElement(Search, {
    autoFocus: true,
    onChange: value => setCurrentSearch(value),
    placeholder: "Search metrics",
    className: styles.search
  }), /*#__PURE__*/React.createElement("div", {
    className: styles.togglers
  }, /*#__PURE__*/React.createElement(ToggleActiveFilters, {
    isActive: isActiveFiltersOnly,
    onClick: () => setIsActiveFiltersOnly(!isActiveFiltersOnly)
  }), !isViewMode && /*#__PURE__*/React.createElement(Button, {
    className: styles.button,
    onClick: resetAll,
    disabled: isReset || !isWereChanges && isNoFilters
  }, "Reset all")), isViewMode && !loading && /*#__PURE__*/React.createElement(Message, {
    variant: "warn",
    icon: "info-round",
    className: styles.message
  }, "View only. You aren't the author of this screener"), /*#__PURE__*/React.createElement(EntryPoint, {
    baseProjects: baseProjects,
    setBaseProjects: setBaseProjects,
    isViewMode: isViewMode
  })), /*#__PURE__*/React.createElement("div", {
    className: styles.content
  }, Object.keys(categories).map(key => /*#__PURE__*/React.createElement(Category, {
    key: key,
    title: key,
    counter: categoryActiveMetricsCounter[key],
    groups: categories[key],
    toggleMetricInFilter: toggleMetricInFilter,
    availableMetrics: availableMetrics,
    isViewMode: isViewMode,
    isNoFilters: isReset,
    filters: filter,
    updMetricInFilter: updMetricInFilter,
    isActiveFiltersOnly: isActiveFiltersOnly,
    totalCounter: activeBaseMetrics.length,
    isPro: isPro,
    isOpen: isOpen
  }))))), document.body), isOpen && /*#__PURE__*/React.createElement("div", {
    className: styles.background,
    onClick: () => setIsOpen(false)
  }));
};

const mapStateToProps = ({
  app
}) => ({
  appVersionState: app.appVersionState
});

export default connect(mapStateToProps)(Filter);