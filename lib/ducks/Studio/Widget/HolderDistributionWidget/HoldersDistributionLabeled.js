function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import HolderDistributionWidget, { holderDistributionBuilder, HoldersDistributionTitle } from './index';
import { HOLDERS_DISTRIBUTION_LABELED_METRICS } from '../../Chart/Sidepanel/HolderDistribution/metrics';
import { TabLabeledHoldersMetrics } from '../../Chart/Sidepanel/HolderDistribution/Tabs';

const HolderDistributionLabeledWidget = props => {
  function onChangeLabels(labels, mergedMetrics) {
    const {
      widget,
      rerenderWidgets
    } = props;
    widget.MetricSettingMap = new Map(widget.MetricSettingMap);
    widget.metrics.forEach(m => {
      const prevSettings = widget.MetricSettingMap.get(m);
      widget.MetricSettingMap.set(m, _objectSpread(_objectSpread({}, prevSettings), {}, {
        labels: labels,
        interval: '1d'
      }));
    });
    mergedMetrics.forEach(m => {
      const prevSettings = widget.MetricSettingMap.get(m);
      widget.MetricSettingMap.set(m, _objectSpread(_objectSpread({}, prevSettings), {}, {
        labels: labels,
        interval: '1d'
      }));
    });
    rerenderWidgets();
  }

  return /*#__PURE__*/React.createElement(HolderDistributionWidget, _extends({
    onChangeLabels: onChangeLabels,
    TabMetrics: TabLabeledHoldersMetrics,
    sidepanelHeader: /*#__PURE__*/React.createElement(HoldersDistributionTitle, {
      ticker: props.settings.ticker,
      description: "labeled by number of addresses"
    })
  }, props));
};

HolderDistributionLabeledWidget.new = holderDistributionBuilder(HolderDistributionLabeledWidget, HOLDERS_DISTRIBUTION_LABELED_METRICS);
export default HolderDistributionLabeledWidget;