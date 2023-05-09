import React from 'react';
import cx from 'classnames';
import Button from '@santiment-network/ui/Button';
import Icon from '@santiment-network/ui/Icon';
import Settings from '../MetricSelector/Settings';
import { MetricSettings } from '../../../dataHub/metrics/settings';
import MetricExplanation from '../../../SANCharts/MetricExplanation';
import styles from './index.module.css';
import settingsStyles from '../MetricSelector/Settings.module.css';

const MetricButton = ({
  className,
  metric,
  label,
  isActive,
  isError,
  isDisabled,
  isNew,
  project,
  showBetaLabel = true,
  onClick,
  metricSettingsMap,
  setMetricSettingMap,
  btnProps = {}
}) => {
  const settings = isActive && metric && MetricSettings[metric.key];
  const isPro = metric && metric.isPro;
  const {
    btnClassName,
    infoClassName,
    tooltipPosition = 'right',
    addIconClassName
  } = btnProps;
  return /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    className: cx(styles.btn, className, btnClassName, isPro && styles.pro, (isError || isDisabled) && styles.disabled, settings && settingsStyles.adjustable),
    isActive: isActive,
    onClick: onClick,
    type: "button"
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.top
  }, isError ? /*#__PURE__*/React.createElement("div", {
    className: styles.error
  }, "no data") : /*#__PURE__*/React.createElement(Icon, {
    type: "plus-small",
    className: cx(styles.plus, isActive && styles.active, addIconClassName)
  }), label, metric && isNew && /*#__PURE__*/React.createElement("div", {
    className: styles.new
  }, "NEW"), metric && metric.isBeta && showBetaLabel && /*#__PURE__*/React.createElement("div", {
    className: styles.beta
  }, "BETA"), metric && /*#__PURE__*/React.createElement(MetricExplanation, {
    metric: metric,
    project: project,
    position: tooltipPosition
  }, /*#__PURE__*/React.createElement(Icon, {
    type: "info-round",
    className: cx(styles.info, infoClassName)
  }))), settings && /*#__PURE__*/React.createElement(Settings, {
    metric: metric,
    settings: settings,
    metricSettingsMap: metricSettingsMap,
    setMetricSettingMap: setMetricSettingMap
  }));
};

export default MetricButton;