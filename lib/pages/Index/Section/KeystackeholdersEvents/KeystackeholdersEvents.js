function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { useState, useMemo, useEffect, Fragment } from 'react';
import { HashLink } from 'react-router-hash-link';
import { TEMPORARY_HIDDEN_LABELS, useGroupedBySlugs, useRawSignals } from './hooks';
import Accordion from '../../Accordion';
import StackholderTitle, { StakeholderProBanner } from './StackholderTitle/StackholderTitle';
import Range from '../../../../ducks/Watchlists/Widgets/WatchlistOverview/WatchlistAnomalies/Range';
import Skeleton from '../../../../components/Skeleton/Skeleton';
import { KEYSTACKHOLDERS_ANCHOR } from '../../Navigation/anchors';
import StakeholderSignal from './StakeholderSignal/StakeholderSignal';
import StakeholderLabels from './StakeholderLabels/StakeholderLabels';
import NoSignals from '../../../../components/Illustrations/NoSignals';
import AssetsSelector from '../../../../components/AssetsSelector/AssetsSelector';
import styles from './KeystackeholdersEvents.module.css';
const DEFAULT_SETTINGS = {
  from: 'utc_now-12h',
  to: 'utc_now'
};
const RANGES = ['12h', '24h', '7d', '30d'];
const INTERVALS = ['5m', '15m', '1h', '3h'];
const READABLE_DAYS = {
  '12h': '12 hours',
  '24h': '1 day',
  '7d': '7 days',
  '30d': '30 days'
};

const getCountSuffix = (source, count) => count + ' ' + (count === 1 ? `${source}` : `${source}s`);

const KeystackeholdersEvents = /*#__PURE__*/React.memo(() => {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [selectedAssets, setSelectedAssets] = useState({});
  const [intervalIndex, setIntervalIndex] = useState(0);
  const {
    data: signals,
    loading
  } = useRawSignals(settings);
  const [hiddenLabels, setHiddenLabels] = useState(TEMPORARY_HIDDEN_LABELS);
  const {
    slugs,
    projects,
    visibleSlugs,
    groups,
    labels,
    restrictedSignals
  } = useGroupedBySlugs(signals, hiddenLabels, selectedAssets);
  const signalsCount = useMemo(() => Object.values(groups).reduce((acc, {
    list
  }) => acc + list.length, 0), [groups]);
  const visibleRestrictedSignals = useMemo(() => restrictedSignals.filter(signal => !hiddenLabels[signal]), [restrictedSignals, hiddenLabels]);
  useEffect(() => {
    setSelectedAssets(signals.reduce((acc, {
      slug
    }) => {
      acc[slug] = true;
      return acc;
    }, {}));
  }, [signals]);
  const proBannerIdx = visibleSlugs.length > 3 ? 2 : visibleSlugs.length - 1;
  return /*#__PURE__*/React.createElement("div", {
    className: styles.container,
    id: KEYSTACKHOLDERS_ANCHOR
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.title
  }, /*#__PURE__*/React.createElement(HashLink, {
    to: `#${KEYSTACKHOLDERS_ANCHOR}`,
    className: styles.anchor
  }, "Key Stakeholder Signals"), /*#__PURE__*/React.createElement("div", {
    className: styles.right
  }, /*#__PURE__*/React.createElement(Range, {
    className: styles.action,
    btnClassName: styles.action__range,
    range: RANGES[intervalIndex],
    changeRange: () => {
      const newInterval = (intervalIndex + 1) % RANGES.length;
      setIntervalIndex(newInterval);
      const from = `utc_now-${RANGES[newInterval]}`;
      const interval = INTERVALS[newInterval];
      setSettings(_objectSpread(_objectSpread({}, settings), {}, {
        from,
        interval
      }));
    }
  }), slugs.length > 0 && /*#__PURE__*/React.createElement(AssetsSelector, {
    projects: projects,
    slugs: slugs,
    className: styles.action,
    selected: selectedAssets,
    onChange: setSelectedAssets
  }))), /*#__PURE__*/React.createElement("div", {
    className: styles.description
  }, "Real-time signals for big changes in on-chain, social and development activity"), !loading && /*#__PURE__*/React.createElement(StakeholderLabels, {
    labels: labels,
    hidden: hiddenLabels,
    setHidden: setHiddenLabels,
    restrictedSignals: restrictedSignals
  }), /*#__PURE__*/React.createElement("div", {
    className: styles.count
  }, "Last ", READABLE_DAYS[RANGES[intervalIndex]], " ", getCountSuffix('signal', signalsCount), " fired for ", getCountSuffix('asset', visibleSlugs.length)), loading && /*#__PURE__*/React.createElement(Skeleton, {
    repeat: 3,
    show: loading,
    className: styles.skeleton,
    wrapperClassName: styles.skeletonWrapper
  }), !loading && visibleSlugs.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: styles.accordions
  }, visibleSlugs.length === 0 && visibleRestrictedSignals.length > 0 && /*#__PURE__*/React.createElement(StakeholderProBanner, {
    signals: visibleRestrictedSignals
  }), visibleSlugs.map((slug, index) => {
    const {
      types,
      list
    } = groups[slug];
    return /*#__PURE__*/React.createElement(Fragment, {
      key: slug
    }, index === proBannerIdx && visibleRestrictedSignals.length > 0 && /*#__PURE__*/React.createElement(StakeholderProBanner, {
      signals: visibleRestrictedSignals
    }), /*#__PURE__*/React.createElement(Accordion, {
      title: /*#__PURE__*/React.createElement(StackholderTitle, {
        slug: slug,
        labels: types,
        count: list.length,
        project: projects[slug]
      }),
      isOpenedDefault: index === 0,
      classes: styles
    }, /*#__PURE__*/React.createElement("div", {
      className: styles.list
    }, list.map(item => /*#__PURE__*/React.createElement(StakeholderSignal, {
      key: `${item.datetime}_${item.slug}_${item.signal}`,
      data: item,
      settings: settings
    })))));
  })), !loading && visibleSlugs.length === 0 && /*#__PURE__*/React.createElement("div", {
    className: styles.noData
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(NoSignals, {
    className: styles.noDataImage
  })), /*#__PURE__*/React.createElement("div", {
    className: styles.noDataInfo
  }, /*#__PURE__*/React.createElement("span", {
    className: styles.noDataTitle
  }, "There are currently no signals matching your filters."), /*#__PURE__*/React.createElement("span", null, "Try a different filter to activate Key Stakeholder signals"))));
});
export default KeystackeholdersEvents;