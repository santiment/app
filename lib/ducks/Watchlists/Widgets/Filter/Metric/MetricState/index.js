function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import cx from 'classnames';
import Icon from '@santiment-network/ui/Icon';
import { Checkbox } from '@santiment-network/ui/Checkboxes';
import MetricExplanation from '../../../../../SANCharts/MetricExplanation';
import Explanation from './Explanation';
import DeprecatedLabel from './DeprecatedLabel';
import { Metric } from '../../../../../dataHub/metrics';
import { ProLabel } from '../../../../../../components/ProLabel';
import ProPopupWrapper from '../../../../../../components/ProPopup/Wrapper';
import styles from './index.module.css';
const EMPTY_OBJ = {};

const FilterMetricState = ({
  isActive,
  isPro,
  onCheckboxClicked,
  isViewMode,
  metric,
  settings,
  customStateText = '',
  isFinishedState
}) => {
  const {
    key,
    descriptionKey,
    label,
    isOnlyPercentFilters,
    isDeprecated
  } = metric;
  const metricForDescription = Metric[descriptionKey || key] || EMPTY_OBJ;
  const isPaywalled = isOnlyPercentFilters && !isPro;
  const isDisabled = isViewMode && !isActive;

  const onClick = () => !isViewMode && !isPaywalled && onCheckboxClicked();

  return /*#__PURE__*/React.createElement("div", {
    className: styles.wrapper
  }, /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    className: cx(styles.toggle, isDisabled && styles.toggle__disabled, isPaywalled && !isViewMode && styles.toggle__disabled, isViewMode && styles.toggle__notActive)
  }, /*#__PURE__*/React.createElement(Checkbox, {
    isActive: isActive,
    disabled: isViewMode || isPaywalled,
    className: styles.checkbox
  }), /*#__PURE__*/React.createElement("div", {
    className: styles.title
  }, /*#__PURE__*/React.createElement("span", null, label), isDeprecated && /*#__PURE__*/React.createElement(DeprecatedLabel, {
    isAuthor: !isViewMode
  }), isOnlyPercentFilters && !isPro && !isDeprecated && !isViewMode && /*#__PURE__*/React.createElement(ProPopupWrapper, {
    type: "screener",
    className: styles.proLabel
  }, /*#__PURE__*/React.createElement(ProLabel, {
    as: "span"
  })), isActive && /*#__PURE__*/React.createElement(Explanation, _extends({}, settings, {
    metric: metric,
    customStateText: customStateText,
    isFinishedState: isFinishedState,
    className: styles.explanation
  })))), /*#__PURE__*/React.createElement(MetricExplanation, {
    on: "click",
    metric: metricForDescription,
    position: "bottom",
    align: "end"
  }, /*#__PURE__*/React.createElement(Icon, {
    type: "info-round",
    className: styles.info
  })));
};

export default FilterMetricState;