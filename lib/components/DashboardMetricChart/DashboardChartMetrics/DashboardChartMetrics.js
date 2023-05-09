const _excluded = ["children", "isLoading", "isDisabled"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useCallback } from 'react';
import cx from 'classnames';
import Button from '@santiment-network/ui/Button';
import ProjectIcon from '../../ProjectIcon/ProjectIcon';
import { usePressedModifier } from '../../../hooks/keyboard';
import styles from './DashboardChartMetrics.module.css';

const DashboardMetricButton = _ref => {
  let {
    children,
    isLoading,
    isDisabled
  } = _ref,
      rest = _objectWithoutProperties(_ref, _excluded);

  return /*#__PURE__*/React.createElement(Button, _extends({
    border: true,
    isLoading: isLoading,
    className: cx(styles.assetBtn, isDisabled && styles.disabled, isLoading && styles.loading)
  }, rest), children);
};

const DashboardChartMetrics = ({
  metrics,
  loadings,
  disabledMetrics,
  toggleDisabled,
  colors,
  dataKey = 'key'
}) => {
  const PressedModifier = usePressedModifier();
  const onMetricClick = useCallback(metric => {
    const clickedKey = metric[dataKey];

    if (PressedModifier.cmdKey) {
      const newDisabled = metrics.reduce((acc, metric) => {
        const key = metric[dataKey];

        if (key !== clickedKey) {
          acc[key] = true;
        }

        return acc;
      }, {});
      toggleDisabled(newDisabled);
    } else {
      if (disabledMetrics[clickedKey]) {
        delete disabledMetrics[clickedKey];
      } else {
        disabledMetrics[clickedKey] = true;
      }

      toggleDisabled(_objectSpread({}, disabledMetrics));
    }
  }, [PressedModifier, toggleDisabled, disabledMetrics, dataKey]);
  return /*#__PURE__*/React.createElement("div", {
    className: styles.container
  }, metrics && metrics.map(metric => {
    const {
      label
    } = metric;
    const key = metric[dataKey];
    const color = colors[key];
    return /*#__PURE__*/React.createElement(DashboardMetricButton, {
      key: label,
      isLoading: loadings.includes(metric),
      onClick: () => onMetricClick(metric),
      isDisabled: disabledMetrics[key]
    }, /*#__PURE__*/React.createElement("div", {
      className: cx(styles.btnInner, styles.icon)
    }, /*#__PURE__*/React.createElement("svg", {
      width: "14",
      height: "10",
      viewBox: "0 0 14 10",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M11 5C11 7.20914 9.20914 9 7 9C4.79086 9 3 7.20914 3 5M11 5C11 2.79086 9.20914 1 7 1C4.79086 1 3 2.79086 3 5M11 5H13M3 5H1",
      stroke: disabledMetrics[key] ? 'var(--casper)' : color,
      strokeWidth: "1.2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }))), /*#__PURE__*/React.createElement("div", {
      className: styles.divider
    }), dataKey === 'slug' && /*#__PURE__*/React.createElement(ProjectIcon, {
      size: 18,
      slug: key,
      className: styles.projectIcon
    }), /*#__PURE__*/React.createElement("div", {
      className: styles.btnInner
    }, label));
  }));
};

export default DashboardChartMetrics;