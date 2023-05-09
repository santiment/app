function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useMemo } from 'react';
import UIButton from '@santiment-network/ui/Button';
import Setting from './Setting';
import { useDropdown } from './Dropdown';
import { getMetricSetting } from '../../utils';
import { Node, BARS } from '../../../Chart/nodes';
import { Metric } from '../../../dataHub/metrics';

const getBaseMetric = metric => metric.base || metric;

const NodeToLabel = {
  [Node.BAR]: 'Bar'
};

const buildNode = (id, label) => {
  NodeToLabel[id] = label;
  return {
    id,
    label
  };
};

const NODES = [buildNode(Node.AREA, 'Area'), buildNode(Node.LINE, 'Line'), buildNode(Node.FILLED_LINE, 'Filled line'), buildNode(Node.GRADIENT_LINE, 'Gradient line'), buildNode(Node.AUTO_WIDTH_BAR, 'Bar')];
const CANDLES_NODE = buildNode(Node.CANDLES, 'Candles');

const Button = ({
  id,
  label,
  activeKey,
  activeRef,
  onChange
}) => /*#__PURE__*/React.createElement(UIButton, {
  variant: "ghost",
  isActive: activeKey === id,
  onClick: () => onChange(id),
  forwardedRef: activeKey === id ? activeRef : undefined
}, label);

const NodeSetting = ({
  metric,
  widget,
  rerenderWidgets
}) => {
  const {
    activeRef,
    close,
    Dropdown
  } = useDropdown();
  const node = useMemo(() => {
    const settings = widget.MetricSettingMap.get(metric);
    const node = settings && settings.node || metric.node;
    return BARS.has(node) ? Node.AUTO_WIDTH_BAR : node;
  }, [widget.MetricSettingMap, metric]);

  function onChange(newNode) {
    const newMap = new Map(widget.MetricSettingMap);
    const metricSetting = getMetricSetting(newMap, metric);

    if (newNode === metric.node || newNode === Node.AUTO_WIDTH_BAR && BARS.has(metric.node)) {
      delete metricSetting.node;
    } else {
      metricSetting.node = newNode;
    }

    widget.MetricSettingMap = newMap;
    close();
    rerenderWidgets();
  }

  return /*#__PURE__*/React.createElement(Dropdown, {
    trigger: /*#__PURE__*/React.createElement(Setting, null, "Style: ", NodeToLabel[node])
  }, !metric.indicator && getBaseMetric(metric) === Metric.price_usd && /*#__PURE__*/React.createElement(Button, _extends({}, CANDLES_NODE, {
    activeKey: node,
    activeRef: activeRef,
    onChange: onChange
  })), NODES.map(nodeType => /*#__PURE__*/React.createElement(Button, _extends({
    key: nodeType.id
  }, nodeType, {
    activeKey: node,
    activeRef: activeRef,
    onChange: onChange
  }))));
};

export default NodeSetting;