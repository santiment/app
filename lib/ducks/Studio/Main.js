const _excluded = ["widgets", "topSlot", "bottomSlot", "settings", "setSettings", "setIsICOPriceDisabled"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import cx from 'classnames';
import Loadable from 'react-loadable';
import { Switch, Route } from 'react-router-dom';
import StudioTabs from './Tabs';
import StudioTabsKeyStats from './Tabs/KeyStats';
import TabsWidgets from './Tabs/Widgets';
import StudioInfo from '../SANCharts/Header';
import SanbaseBanner from '../../components/SanbaseBanner/SanbaseBanner';
import PageLoader from '../../components/Loader/PageLoader';
import PremiumBanner from './PremiumBanner/PremiumBanner';
import styles from './Main.module.css';
const LoadableRelatedInsights = Loadable({
  loader: () => import('./RelatedInsights/RelatedInsights'),
  loading: () => /*#__PURE__*/React.createElement(PageLoader, null)
});

const Main = _ref => {
  let {
    widgets,
    topSlot,
    bottomSlot,
    settings,
    setSettings,
    setIsICOPriceDisabled
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  const {
    slug
  } = settings;

  function onProjectSelect(project) {
    if (!project) return;
    const {
      slug,
      name,
      ticker,
      id: projectId
    } = project;
    const title = `${name} (${ticker})`;
    setSettings(_objectSpread(_objectSpread({}, settings), {}, {
      slug,
      title,
      name,
      projectId,
      ticker
    }));
    setIsICOPriceDisabled(true);
  }

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(SanbaseBanner, null), /*#__PURE__*/React.createElement("div", {
    className: styles.header
  }, topSlot, /*#__PURE__*/React.createElement(StudioInfo, {
    slug: slug,
    onSlugSelect: onProjectSelect
  })), /*#__PURE__*/React.createElement(StudioTabs, {
    settings: settings
  }), /*#__PURE__*/React.createElement("div", {
    className: cx(styles.container, styles.content)
  }, /*#__PURE__*/React.createElement(Switch, null, /*#__PURE__*/React.createElement(Route, {
    path: "/:base/related-insights"
  }, /*#__PURE__*/React.createElement(LoadableRelatedInsights, {
    settings: settings
  })), /*#__PURE__*/React.createElement(Route, {
    path: "/:base/stats"
  }, /*#__PURE__*/React.createElement(StudioTabsKeyStats, {
    slug: slug
  })), /*#__PURE__*/React.createElement(Route, null, /*#__PURE__*/React.createElement(TabsWidgets, _extends({}, props, {
    settings: settings,
    widgets: widgets,
    setIsICOPriceDisabled: setIsICOPriceDisabled,
    onProjectSelect: onProjectSelect
  }))))), /*#__PURE__*/React.createElement(PremiumBanner, null), bottomSlot);
};

export default Main;