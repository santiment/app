const _excluded = ["className", "metric"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import cx from 'classnames';
import TopHoldersSetting from './TopHoldersSetting';
import NodeSetting from './NodeSetting';
import ColorSetting from './ColorSetting';
import IntervalSetting from './IntervalSetting';
import ExchangeSetting from './ExchangeSetting';
import IndicatorsSetting from './IndicatorsSetting';
import ShowAxisSetting from './ShowAxisSetting';
import { Metric } from '../../../dataHub/metrics';
import { MetricSettings } from '../../../dataHub/metrics/settings';
import { Node } from '../../../Chart/nodes';
import BlockchainLabelsSetting from './BlockchainLabelsSetting/BlockchainLabelsSetting';
import styles from './index.module.css';
const SettingToComponent = {
  holdersCount: TopHoldersSetting,
  labels: BlockchainLabelsSetting
};

function isExchangeModifiable(metric) {
  const {
    base = metric
  } = metric;
  return base === Metric.exchange_outflow || base === Metric.exchange_inflow || base === Metric.exchange_balance;
}

const isIndicatorAssignable = metric => !metric.indicator && metric !== Metric.dev_activity;

const getSettings = ({
  key,
  domainGroup
}) => MetricSettings[key] || MetricSettings[domainGroup];

const Settings = _ref => {
  let {
    className,
    metric
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  const settings = getSettings(metric);
  return /*#__PURE__*/React.createElement("div", {
    className: cx(styles.wrapper, className)
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.label
  }, metric.label, ":"), metric.node !== Node.GREEN_RED_BAR && !metric.indicator && /*#__PURE__*/React.createElement(NodeSetting, _extends({
    metric: metric
  }, props)), /*#__PURE__*/React.createElement(ColorSetting, {
    metric: metric
  }), metric.node !== Node.AUTO_WIDTH_BAR && !metric.indicator && /*#__PURE__*/React.createElement(IntervalSetting, _extends({
    metric: metric
  }, props)), isExchangeModifiable(metric) && /*#__PURE__*/React.createElement(ExchangeSetting, _extends({
    metric: metric
  }, props)), isIndicatorAssignable(metric) && /*#__PURE__*/React.createElement(IndicatorsSetting, _extends({
    metric: metric
  }, props)), /*#__PURE__*/React.createElement(ShowAxisSetting, _extends({
    metric: metric
  }, props)), settings && settings.map(({
    key
  }) => {
    const Setting = SettingToComponent[key];
    return Setting ? /*#__PURE__*/React.createElement(Setting, _extends({
      key: key,
      metric: metric
    }, props)) : null;
  }));
};

export default Settings;