const _excluded = ["slug", "address", "defaultSettings", "defaultWidgets", "defaultSidewidget", "pathname", "Extensions"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Switch, Route } from 'react-router-dom';
import SanStudio from 'studio';
import { Metric } from 'san-studio/lib/metrics';
import { newWidget } from 'san-studio/lib/stores/widgets';
import { studio as settingsStore } from 'san-studio/lib/stores/studio';
import ChartWidget from 'san-studio/lib/ChartWidget';
import { useGlobalsUpdater, useSettings, useWidgetsStore, useStudioMetrics, useWidgets } from './stores';
import LoginCTA from './LoginCTA';
import { getExternalWidget } from './Widget';
import ProjectInfo from './ProjectInfo';
import Sidebar from './Sidebar';
import { useSubwidgetsController } from './Subwidgets';
import { useInsightsStoreCreator } from './Insights';
import { useSidewidget } from './Sidewidget';
import StudioTab from './Tabs/Studio';
import KeyStatsTab from './Tabs/KeyStats';
import InsightsTab from './Tabs/Insights';
import { shareWidgets } from './sharing/share';
import { parseTemplate } from './sharing/template';
import { useRedrawer } from '../../hooks';
import { SAN_HEADER_HEIGHT } from '../../constants';
import { Tab } from '../../ducks/Studio/Tabs';
import { notifyAnonCreation, notifyCreation, notifySave } from '../../ducks/Studio/Template/notifications';
import styles from './index.module.css';
window.notifyLayoutSave = notifySave;
window.notifyLayoutEdit = notifySave;
window.notifyLayoutCreation = notifyCreation;
window.notifyLayoutAnonCreation = notifyAnonCreation;

function getScreen() {
  const {
    pathname
  } = window.location;
  let screen;
  if (pathname.includes(Tab.stats.path)) screen = Tab.stats.path;
  if (pathname.includes(Tab.insights.path)) screen = Tab.insights.path;
  return screen;
}

const getToday = () => new Date();

const Studio = _ref => {
  let {
    slug,
    address,
    defaultSettings,
    defaultWidgets,
    defaultSidewidget,
    pathname,
    Extensions
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  const ref = useRef();
  const setWidgetsRef = useRef();
  const isMapviewDisabledRef = useRef();
  const selectMetricRef = useRef();
  const onSidebarProjectMountRef = useRef();
  const [studio, setStudio] = useState();
  const settings = useSettings();
  const widgetsStore = useWidgetsStore(studio);
  const widgets = useWidgets(studio, setWidgetsRef);
  const sidewidget = useSidewidget(studio);
  const subwidgetsController = useSubwidgetsController();
  const metrics = useStudioMetrics(studio);
  const InsightsStore = useInsightsStoreCreator();
  const redraw = useRedrawer()[1];
  const [mountedScreen, setMountedScreen] = useState();
  const [modRange, setModRange] = useState();
  const [modDate, setModDate] = useState(getToday);
  const [isLoginCTAOpened, setIsLoginCTAOpened] = useState(false);
  const {
    from,
    to
  } = (props.parsedUrl || {}).settings || {};
  useMemo(() => (address || slug) && settingsStore.setProject({
    slug,
    address
  }), [slug, address]);
  useMemo(() => {
    if (from && to) {
      settingsStore.setPeriod(new Date(from), new Date(to));
    }
  }, []);

  const onChartPointClick = (point, e) => setModDate(new Date(point.value));

  useGlobalsUpdater();
  useEffect(() => {
    const page = ref.current;
    const studio = new SanStudio({
      target: page,
      props: {
        getExternalWidget,
        defaultSettings,
        onModRangeSelect,
        onChartPointClick,
        parseLayoutWidgets: parseTemplate,
        shareLayoutWidgets: shareWidgets,
        onAnonFavoriteClick: () => setIsLoginCTAOpened(true),
        onWidget: () => redraw(),
        onWidgetInit: () => setWidgetsRef.current(widgets => widgets.slice()),
        onSubwidget: subwidgetsController.onSubwidget,
        onScreenMount: setMountedScreen,
        onSidebarProjectMount: node => onSidebarProjectMountRef.current(node),
        checkIsMapviewDisabled: () => isMapviewDisabledRef.current,
        adjustSelectedMetric: onMetricSelect,
        InsightsContextStore: InsightsStore,
        headerPadding: SAN_HEADER_HEIGHT + 65,
        screen: getScreen(),
        sidewidget: defaultSidewidget,
        widgets: defaultWidgets || [newWidget(ChartWidget, {
          metrics: [Metric.price_usd]
        })]
      }
    });
    setStudio(studio);
    return () => studio.$destroy();
  }, []);
  useEffect(() => {
    if (!studio) return;
    const screen = getScreen();
    isMapviewDisabledRef.current = !!screen;
    studio.$$set({
      screen
    });
  }, [studio, pathname]);
  useEffect(() => {
    if (defaultSettings) settingsStore.setProject(defaultSettings);
    if (studio && defaultWidgets) widgetsStore.set(defaultWidgets);
  }, [studio, defaultSettings, defaultWidgets]);

  function onModRangeSelect(start, end, e) {
    setModRange([new Date(start.value), new Date(end.value)]);
  }

  function onMetricSelect(node) {
    if (selectMetricRef.current) return selectMetricRef.current(node);
    return node;
  }

  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    className: styles.wrapper
  }, studio && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ProjectInfo, {
    studio: studio,
    settings: settings
  })), /*#__PURE__*/React.createElement(Sidebar, {
    studio: studio,
    settings: settings,
    widgets: widgets,
    selectMetricRef: selectMetricRef,
    onSidebarProjectMountRef: onSidebarProjectMountRef
  }), studio && /*#__PURE__*/React.createElement(Switch, null, /*#__PURE__*/React.createElement(Route, {
    path: "/:base/related-insights"
  }, mountedScreen === Tab.insights.path && /*#__PURE__*/React.createElement(InsightsTab, {
    settings: settings
  })), /*#__PURE__*/React.createElement(Route, {
    path: "/:base/stats"
  }, mountedScreen === Tab.stats.path && /*#__PURE__*/React.createElement(KeyStatsTab, {
    settings: settings
  })), /*#__PURE__*/React.createElement(Route, null, !mountedScreen && /*#__PURE__*/React.createElement(StudioTab, {
    studio: studio,
    settings: settings,
    widgets: widgets,
    metrics: metrics,
    sidewidget: sidewidget,
    modDate: modDate,
    modRange: modRange,
    prevFullUrlRef: props.prevFullUrlRef,
    InsightsStore: InsightsStore,
    subwidgetsController: subwidgetsController
  }))), /*#__PURE__*/React.createElement(Extensions, _extends({}, props, {
    widgets: widgets,
    sidewidget: sidewidget,
    subwidgets: subwidgetsController.subwidgets,
    settings: settings
  })), /*#__PURE__*/React.createElement(LoginCTA, {
    isLoginCTAOpened: isLoginCTAOpened,
    setIsLoginCTAOpened: setIsLoginCTAOpened
  }));
};

export default Studio;