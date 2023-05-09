const _excluded = ["className"],
      _excluded2 = ["className", "contentClassName", "chartSidepane", "toggleChartSidepane"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import cx from 'classnames';
import Icon from '@santiment-network/ui/Icon';
import { TOP_HOLDERS_PANE, METRICS_EXPLANATION_PANE, SPENT_COIN_COST, SOCIAL_CONTEXT } from './panes';
import HolderDistribution from './HolderDistribution';
import MetricsExplanation from './MetricsExplanation';
import PriceHistogram from '../../AdvancedView/PriceHistogram';
import SocialContext from '../../AdvancedView/SocialContext';
import styles from './index.module.css';
const Components = {
  [TOP_HOLDERS_PANE]: HolderDistribution,
  [METRICS_EXPLANATION_PANE]: MetricsExplanation,
  [SPENT_COIN_COST]: PriceHistogram,
  [SOCIAL_CONTEXT]: SocialContext
};
export const CloseButton = _ref => {
  let {
    className
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  return /*#__PURE__*/React.createElement("div", _extends({
    className: cx(styles.close, className)
  }, props), /*#__PURE__*/React.createElement("div", {
    className: styles.icons
  }, /*#__PURE__*/React.createElement(Icon, {
    type: "sidebar",
    className: styles.icon
  })));
};
export default (_ref2 => {
  let {
    className,
    contentClassName,
    chartSidepane,
    toggleChartSidepane
  } = _ref2,
      props = _objectWithoutProperties(_ref2, _excluded2);

  const El = Components[chartSidepane];

  if (!El) {
    toggleChartSidepane();
    return null;
  }

  return /*#__PURE__*/React.createElement("div", {
    className: cx(styles.wrapper, className)
  }, /*#__PURE__*/React.createElement(CloseButton, {
    onClick: () => toggleChartSidepane()
  }), /*#__PURE__*/React.createElement("div", {
    className: cx(styles.content, contentClassName)
  }, El.Title && /*#__PURE__*/React.createElement("div", {
    className: styles.title
  }, /*#__PURE__*/React.createElement(El.Title, props)), /*#__PURE__*/React.createElement(El, props)));
});