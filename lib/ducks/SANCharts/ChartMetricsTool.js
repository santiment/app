const _excluded = ["classes", "className", "activeMetrics", "activeEvents", "disabledMetrics", "alwaysShowingMetrics", "hiddenMetrics", "slug", "toggleMetric", "hideSettings", "isWideChart", "addMetricBtnText", "isMobile", "showLimitMessage"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useState } from 'react';
import cx from 'classnames';
import ContextMenu from '@santiment-network/ui/ContextMenu';
import Button from '@santiment-network/ui/Button';
import Icon from '@santiment-network/ui/Icon';
import ChartMetricSelector from './ChartMetricSelector';
import ChartActiveMetrics from './ChartActiveMetrics';
import { useIsBetaMode } from '../../stores/ui';
import styles from './ChartMetricsTool.module.css';

const ChartMetricsTool = _ref => {
  let {
    classes = {},
    className,
    activeMetrics = [],
    activeEvents = [],
    disabledMetrics = [],
    alwaysShowingMetrics = [],
    hiddenMetrics = [],
    slug,
    toggleMetric,
    hideSettings = {},
    isWideChart = false,
    addMetricBtnText = 'Add metric',
    isMobile,
    showLimitMessage
  } = _ref,
      rest = _objectWithoutProperties(_ref, _excluded);

  const [isOpen, setIsOpen] = useState(false);
  const isBeta = useIsBetaMode();
  return /*#__PURE__*/React.createElement("div", {
    className: styles.container
  }, isWideChart && /*#__PURE__*/React.createElement("div", {
    className: styles.divider
  }), /*#__PURE__*/React.createElement("div", {
    className: cx(styles.wrapper, isWideChart && styles.topOffset, className)
  }, hideSettings.metricSelector || /*#__PURE__*/React.createElement(ContextMenu, {
    open: isOpen,
    onClose: () => setIsOpen(false),
    onOpen: () => setIsOpen(true),
    trigger: /*#__PURE__*/React.createElement(Button, {
      variant: "fill",
      accent: "positive",
      className: styles.trigger
    }, !isMobile && /*#__PURE__*/React.createElement(Icon, {
      type: "plus-round",
      className: styles.triggerIcon
    }), addMetricBtnText),
    passOpenStateAs: "isActive",
    position: "bottom",
    align: "start",
    offsetY: 8
  }, /*#__PURE__*/React.createElement(ChartMetricSelector, {
    className: cx(styles.selector, classes.selector),
    slug: slug,
    toggleMetric: toggleMetric,
    disabledMetrics: disabledMetrics,
    activeMetrics: activeMetrics,
    activeEvents: activeEvents,
    hiddenMetrics: hiddenMetrics,
    variant: "modal",
    isMobile: isMobile,
    showLimitMessage: showLimitMessage,
    onSave: () => setIsOpen(false),
    isBeta: isBeta
  })), !isMobile && /*#__PURE__*/React.createElement(ChartActiveMetrics, _extends({
    activeMetrics: activeMetrics,
    toggleMetric: toggleMetric,
    activeEvents: activeEvents,
    alwaysShowingMetrics: alwaysShowingMetrics,
    isWideChart: isWideChart
  }, rest))));
};

export default ChartMetricsTool;