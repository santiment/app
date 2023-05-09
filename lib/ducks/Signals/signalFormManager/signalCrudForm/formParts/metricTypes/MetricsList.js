const _excluded = ["groupLabel", "onSelect", "group", "project", "selected"];

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useMemo } from 'react';
import cx from 'classnames';
import { GroupNodes } from '../../../../../Studio/Sidebar/Group';
import { getAssetNewMetrics } from '../../../../../dataHub/metrics/news';
import ExpansionItem from '../../../../../../components/ExpansionItem/ExpansionItem';
import MetricButton from '../../../../../Studio/Sidebar/Button';
import styles from './MetricsList.module.css';
export const NO_GROUP = '_';

const getSelectedCount = (groupItems, selected) => groupItems.reduce((acc, data) => {
  const {
    item,
    subitems
  } = data;
  let calculated = selected.indexOf(item) !== -1 ? 1 : 0;

  if (subitems && subitems.length > 0) {
    calculated += getSelectedCount(subitems, selected);
  }

  return acc + calculated;
}, 0);

const noop = () => {};

const MetricsList = ({
  index,
  metrikKey,
  list,
  onSelect,
  project,
  selected = [],
  availableMetrics = [],
  isBeta,
  selectedMetricSettingsMap,
  setSelectedMetricSettingsMap = noop
}) => {
  const keys = useMemo(() => Object.keys(list), [list]);
  const selectedCount = useMemo(() => {
    if (selected.length === 0) {
      return 0;
    }

    return keys.reduce((acc, key) => {
      const groupItems = list[key];
      return acc + getSelectedCount(groupItems, selected);
    }, 0);
  }, [keys, selected]);
  const newMetricsProps = getAssetNewMetrics(availableMetrics, {
    slug: project ? project.slug : undefined,
    isBeta
  });
  const {
    NewMetricsCategory
  } = newMetricsProps;
  return /*#__PURE__*/React.createElement(ExpansionItem, {
    isOpen: index === 0,
    title: /*#__PURE__*/React.createElement("div", {
      className: NewMetricsCategory[metrikKey] && styles.news
    }, metrikKey, selectedCount > 0 && /*#__PURE__*/React.createElement("span", {
      className: styles.counter
    }, "(", selectedCount, ")"))
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.list
  }, keys.map(key => {
    const items = list[key];
    return /*#__PURE__*/React.createElement(Group, _extends({
      key: key,
      groupLabel: key,
      group: items,
      onSelect: onSelect,
      project: project,
      selected: selected,
      selectedMetricSettingsMap: selectedMetricSettingsMap,
      setMetricSettingMap: setSelectedMetricSettingsMap
    }, newMetricsProps));
  })));
};

const Group = _ref => {
  let {
    groupLabel,
    onSelect,
    group,
    project,
    selected
  } = _ref,
      rest = _objectWithoutProperties(_ref, _excluded);

  if (group.length === 0) {
    return null;
  }

  const {
    NewMetricsGroup
  } = rest;
  return /*#__PURE__*/React.createElement(React.Fragment, null, groupLabel !== NO_GROUP && /*#__PURE__*/React.createElement("div", {
    className: cx(styles.group, NewMetricsGroup[groupLabel] && styles.news)
  }, groupLabel), /*#__PURE__*/React.createElement(GroupNodes, _extends({
    nodes: group,
    activeMetrics: selected,
    toggleMetric: onSelect,
    project: project,
    btnProps: {
      btnClassName: styles.metricBtn,
      infoClassName: styles.info,
      tooltipPosition: 'top'
    },
    Button: MetricButton
  }, rest)));
};

export default MetricsList;