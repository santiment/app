const _excluded = ["title", "nodes", "activeMetrics", "project", "ErrorMsg", "NewMetric", "NewMetricsGroup", "OpenedGroup", "toggleMetric", "setMetricSettingMap"],
      _excluded2 = ["nodes", "hidden", "activeMetrics", "setMetricSettingMap", "metricSettingsMap", "toggleMetric", "project", "NewMetric", "ErrorMsg", "btnProps", "Button"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { Fragment, useState } from 'react';
import cx from 'classnames';
import Icon from '@santiment-network/ui/Icon';
import MetricButton from './Button';
import { NO_GROUP } from './utils';
import { useIsBetaMode } from '../../../stores/ui';
import styles from './MetricSelector/index.module.css';

const Group = _ref => {
  let {
    title,
    nodes,
    activeMetrics,
    project,
    ErrorMsg,
    NewMetric,
    NewMetricsGroup,
    OpenedGroup,
    toggleMetric,
    setMetricSettingMap
  } = _ref,
      rest = _objectWithoutProperties(_ref, _excluded);

  const hasGroup = title !== NO_GROUP;
  const [hidden, setHidden] = useState(hasGroup && !OpenedGroup[title]);

  function onToggleClick() {
    setHidden(!hidden);
  }

  return /*#__PURE__*/React.createElement(React.Fragment, null, hasGroup && /*#__PURE__*/React.createElement("h4", {
    className: cx(styles.group, NewMetricsGroup[title] && styles.news),
    onClick: onToggleClick
  }, /*#__PURE__*/React.createElement(Icon, {
    type: "arrow-right-small",
    className: cx(styles.toggle, hidden && styles.toggle_active)
  }), title), /*#__PURE__*/React.createElement(GroupNodes, _extends({
    nodes: nodes,
    hidden: hidden,
    activeMetrics: activeMetrics,
    setMetricSettingMap: setMetricSettingMap,
    toggleMetric: toggleMetric,
    project: project,
    NewMetric: NewMetric,
    ErrorMsg: ErrorMsg
  }, rest)));
};

export const GroupNodes = _ref2 => {
  let {
    nodes,
    hidden,
    activeMetrics,
    setMetricSettingMap,
    metricSettingsMap,
    toggleMetric,
    project,
    NewMetric,
    ErrorMsg,
    btnProps = {},
    Button
  } = _ref2,
      rest = _objectWithoutProperties(_ref2, _excluded2);

  const isBeta = useIsBetaMode();
  return /*#__PURE__*/React.createElement("div", {
    className: cx(styles.group__list, hidden && styles.group__list_hidden)
  }, nodes.map(({
    item,
    subitems
  }, index) => {
    if (!item || item.hidden) {
      return null;
    }

    const {
      showRoot = true,
      label,
      rootLabel = label,
      checkIsVisible
    } = item;

    if (checkIsVisible && !checkIsVisible(_objectSpread(_objectSpread(_objectSpread({}, rest), project), {}, {
      isBeta
    }))) {
      return null;
    }

    return /*#__PURE__*/React.createElement(Fragment, {
      key: item.key
    }, showRoot && /*#__PURE__*/React.createElement(Button, {
      index: index,
      metric: item,
      label: rootLabel,
      onClick: () => toggleMetric(item, project),
      setMetricSettingMap: setMetricSettingMap,
      metricSettingsMap: metricSettingsMap,
      project: project,
      isActive: activeMetrics.includes(item),
      isNew: NewMetric && NewMetric[item.key],
      isError: ErrorMsg && ErrorMsg[item.key],
      btnProps: btnProps
    }), subitems && subitems.map(subitem => {
      const {
        checkIsVisible,
        checkIsActive
      } = subitem;

      if (checkIsVisible && !checkIsVisible(_objectSpread(_objectSpread(_objectSpread({}, rest), project), {}, {
        isBeta
      }))) {
        return null;
      }

      const isActive = checkIsActive && checkIsActive(rest) || activeMetrics.includes(subitem);
      return /*#__PURE__*/React.createElement(Button, {
        metric: subitem,
        key: subitem.key,
        className: showRoot && styles.advanced,
        label: subitem.label,
        onClick: () => toggleMetric(subitem, project),
        setMetricSettingMap: setMetricSettingMap,
        metricSettingsMap: metricSettingsMap,
        project: project,
        showBetaLabel: !showRoot,
        isActive: isActive,
        isNew: NewMetric && NewMetric[subitem.key],
        btnProps: btnProps
      });
    }));
  }));
};
Group.defaultProps = {
  OpenedGroup: {},
  Button: MetricButton
};
export default Group;