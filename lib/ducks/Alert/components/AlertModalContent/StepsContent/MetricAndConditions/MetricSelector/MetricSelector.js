function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { useEffect, useMemo, useState } from 'react';
import { useField } from 'formik';
import { InputWithIcon } from '@santiment-network/ui/Input';
import { track } from 'san-webkit/lib/analytics';
import MetricsList from './MetricsList/MetricsList';
import { useMergedTimeboundSubmetrics } from '../../../../../../dataHub/timebounds';
import { getCategoryGraph } from '../../../../../../Studio/Sidebar/utils';
import { useProject } from '../../../../../../../hooks/project';
import { useIsBetaMode } from '../../../../../../../stores/ui';
import { filterOnlyMetrics, getByAvailable } from './utils';
import { AlertsEvents } from '../../../../../analytics';
import styles from './MetricSelector.module.css';
const suggestedMetrics = {
  Suggested: {
    _: [{
      item: {
        category: 'Suggested',
        label: 'Price',
        key: 'price_usd'
      },
      subitems: []
    }, {
      item: {
        category: 'Suggested',
        label: 'Daily Active Addresses',
        key: 'daily_active_addresses'
      },
      subitems: []
    }]
  }
};

function filterCategories(categories, searchTerm) {
  return Object.keys(categories).reduce((acc, curr) => {
    const category = Object.keys(categories[curr]).reduce((catAcc, catCurr) => {
      const arr = categories[curr][catCurr].reduce((arrItemAcc, arrItemCurr) => {
        const hasItem = arrItemCurr.item.label.toLowerCase().includes(searchTerm.toLowerCase());

        if (hasItem) {
          return [...arrItemAcc, _objectSpread(_objectSpread({}, arrItemCurr), {}, {
            subitems: arrItemCurr.subitems.filter(subitem => subitem.label.toLowerCase().includes(searchTerm.toLowerCase()))
          })];
        }

        return arrItemAcc;
      }, []);

      if (arr.length > 0) {
        return _objectSpread(_objectSpread({}, catAcc), {}, {
          [catCurr]: arr
        });
      }

      return catAcc;
    }, {});

    if (Object.keys(category).length > 0) {
      return _objectSpread(_objectSpread({}, acc), {}, {
        [curr]: category
      });
    }

    return acc;
  }, {});
}

const MetricSelector = ({
  selectedMetric,
  metrics,
  target,
  onChange
}) => {
  const [,, {
    setValue: setMetric
  }] = useField('settings.metric');
  const isBeta = useIsBetaMode();
  const [project] = useProject(target.slug);
  const [categories, setCategories] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const allCategories = useMemo(() => filterCategories(categories, searchTerm), [categories, searchTerm]);
  const allMetrics = useMemo(() => getByAvailable(metrics.some(m => m.includes('nvt')) ? metrics.concat('nvt_5min') : metrics, target), [metrics, target]);
  const allSubmetrics = useMergedTimeboundSubmetrics(metrics);
  useEffect(() => {
    const submetrics = filterOnlyMetrics(allSubmetrics);
    const newCategories = getCategoryGraph(allMetrics, [], submetrics, isBeta);
    setCategories(_objectSpread(_objectSpread({}, suggestedMetrics), newCategories));
  }, [metrics, allMetrics, isBeta]);

  function handleSelectMetric(metric) {
    track.event(AlertsEvents.SetAlertMetric, {
      metric: metric.key
    });
    setMetric(metric.key);
    onChange(metric);
  }

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(InputWithIcon, {
    type: "text",
    icon: "search-small",
    iconPosition: "left",
    className: styles.search,
    placeholder: 'Search for metric',
    value: searchTerm,
    onChange: e => setSearchTerm(e.target.value)
  }), /*#__PURE__*/React.createElement(MetricsList, {
    metricsList: allCategories,
    project: project,
    onSelect: handleSelectMetric,
    selectedMetric: selectedMetric
  }));
};

export default MetricSelector;