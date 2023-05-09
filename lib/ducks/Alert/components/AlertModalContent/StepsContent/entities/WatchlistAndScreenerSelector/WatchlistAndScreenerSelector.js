import React, { useMemo, useState } from 'react';
import { useField } from 'formik';
import { InputWithIcon } from '@santiment-network/ui/Input';
import { track } from 'san-webkit/lib/analytics';
import PageLoader from '../../../../../../../components/Loader/PageLoader';
import StepTitle from '../../StepTitle/StepTitle';
import NextStep from '../../NextStep/NextStep';
import WatchlistsAndScreenersList from './WatchlistsList/WatchlistsAndScreenersList';
import { useProjectScreeners, useProjectWatchlists } from '../../../../../../Watchlists/gql/lists/hooks';
import { AlertsEvents } from '../../../../../analytics';
import styles from './WatchlistAndScreenerSelector.module.css';

const WatchlistAndScreenerSelector = ({
  selectorSettings: {
    setSelectedStep,
    selectedStep,
    visitedSteps,
    setVisitedSteps
  },
  type,
  isSocial
}) => {
  const [, {
    value
  }, {
    setValue
  }] = useField(type === 'watchlist' ? 'settings.target.watchlist_id' : 'settings.operation.selector.watchlist_id');
  const [,, {
    setValue: setMetric
  }] = useField('settings.metric');
  const [,, {
    setValue: setTimeWindow
  }] = useField('settings.time_window');
  const [,, {
    setValue: setOperation
  }] = useField('settings.operation');
  const [watchlists, watchlistsLoading] = useProjectWatchlists();
  const [screeners, screenersLoading] = useProjectScreeners();
  const [searchTerm, setSearchTerm] = useState('');
  const filteredItems = useMemo(() => {
    if (type === 'watchlist') {
      return watchlists.filter(watchlist => watchlist.name.toLowerCase().indexOf(searchTerm) !== -1);
    }

    return screeners.filter(screener => screener.name.toLowerCase().indexOf(searchTerm) !== -1);
  }, [screeners, watchlists, searchTerm]);

  function handleNextClick() {
    setSelectedStep(selectedStep + 1);

    if (!visitedSteps.has(selectedStep + 1)) {
      setVisitedSteps(prev => [...prev, selectedStep + 1]);
    }
  }

  function handleSelectWatchlist(id) {
    track.event(type === 'watchlist' ? AlertsEvents.SetAlertWatchlist : AlertsEvents.SetAlertScreener, {
      id
    });

    if (value === id) {
      setValue('');
    } else {
      setValue(id);
    }

    if (type === 'watchlist' && !isSocial) {
      setMetric('');
      setTimeWindow('');
      setOperation({});
    }
  }

  let children = /*#__PURE__*/React.createElement(React.Fragment, null, !isSocial && /*#__PURE__*/React.createElement("div", {
    className: styles.titleWrapper
  }, /*#__PURE__*/React.createElement(StepTitle, {
    title: type === 'watchlist' ? 'Select Watchlist' : 'Select Screener',
    className: styles.title
  }), value && /*#__PURE__*/React.createElement(NextStep, {
    label: type === 'watchlist' ? 'Choose Metric' : 'Notification settings',
    onClick: handleNextClick
  })), /*#__PURE__*/React.createElement(InputWithIcon, {
    type: "text",
    icon: "search-small",
    iconPosition: "left",
    className: styles.search,
    placeholder: type === 'watchlist' ? 'Search for watchlist' : 'Search for screener',
    value: searchTerm,
    onChange: e => setSearchTerm(e.target.value)
  }), /*#__PURE__*/React.createElement(WatchlistsAndScreenersList, {
    isSocial: isSocial,
    items: filteredItems,
    selectedWatchlist: value,
    onSelect: handleSelectWatchlist
  }));

  if (watchlistsLoading || screenersLoading) {
    children = /*#__PURE__*/React.createElement(PageLoader, {
      containerClass: styles.loaderWrapper,
      className: styles.loader
    });
  }

  return /*#__PURE__*/React.createElement("div", {
    className: styles.wrapper
  }, children);
};

export default WatchlistAndScreenerSelector;