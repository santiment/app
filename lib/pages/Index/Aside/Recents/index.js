import React, { useMemo, useState } from 'react';
import Tabs from '@santiment-network/ui/Tabs';
import Assets from './Assets';
import ChartLayouts from './ChartLayouts';
import Watchlists from './Watchlists';
import Section from '../Section';
import { getRecentAssets, getRecentWatchlists, getRecentScreeners, getRecentTemplates } from '../../../../utils/recent';
import styles from './Recents.module.css';
const RECENT_GETTERS = [getRecentAssets, () => getRecentTemplates().map(id => +id), getRecentWatchlists, getRecentScreeners];

const recentGetter = getter => getter();

const getRecents = () => RECENT_GETTERS.map(recentGetter);

const ASSETS = 'Assets';
const CHART_LAYOUTS = 'Chart Layouts';
const WATCHLISTS = 'Watchlists';
const SCREENERS = 'Screeners';
const ROW_HEIGHT = 53;
const HEADER_HEIGHT = 34;
const TAB_COMPONENT = {
  [ASSETS]: ({
    assets,
    setHeight
  }) => /*#__PURE__*/React.createElement(Assets, {
    slugs: assets,
    setHeight: setHeight
  }),
  [CHART_LAYOUTS]: ({
    chartLayouts,
    setHeight
  }) => /*#__PURE__*/React.createElement(ChartLayouts, {
    ids: chartLayouts,
    setHeight: setHeight
  }),
  [WATCHLISTS]: ({
    watchlists,
    setHeight
  }) => /*#__PURE__*/React.createElement(Watchlists, {
    ids: watchlists,
    setHeight: setHeight
  }),
  [SCREENERS]: ({
    screeners,
    setHeight
  }) => /*#__PURE__*/React.createElement(Watchlists, {
    ids: screeners,
    setHeight: setHeight
  })
};

const Recents = () => {
  const [assets, chartLayouts, watchlists, screeners] = useMemo(getRecents, []);
  const [height, setHeight] = useState(1);
  const availableTabs = useMemo(() => {
    return [assets.length > 0 && ASSETS, chartLayouts.length > 0 && CHART_LAYOUTS, watchlists.length > 0 && WATCHLISTS, screeners.length > 0 && SCREENERS].filter(Boolean);
  }, [assets, chartLayouts, watchlists, screeners]);
  const [tab, setTab] = useState(availableTabs[0]);

  if (availableTabs.length === 0) {
    return null;
  }

  const Component = TAB_COMPONENT[tab];
  return /*#__PURE__*/React.createElement(Section, {
    title: "Recently viewed"
  }, /*#__PURE__*/React.createElement(Tabs, {
    className: styles.tabs,
    options: availableTabs,
    defaultSelectedIndex: tab,
    onSelect: tab => setTab(tab),
    classes: styles
  }), /*#__PURE__*/React.createElement("div", {
    className: styles.wrapper,
    style: {
      height: `${HEADER_HEIGHT + height * ROW_HEIGHT}px`
    }
  }, Component && /*#__PURE__*/React.createElement(Component, {
    assets: assets,
    chartLayouts: chartLayouts,
    watchlists: watchlists,
    screeners: screeners,
    setHeight: setHeight
  })));
};

export default Recents;