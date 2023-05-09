const _excluded = ["filters", "baseMetric"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { useState, useEffect, useMemo, Fragment } from 'react';
import cx from 'classnames';
import Icon from '@santiment-network/ui/Icon';
import Panel from '@santiment-network/ui/Panel';
import Button from '@santiment-network/ui/Button';
import ContextMenu from '@santiment-network/ui/ContextMenu';
import { InputWithIcon as Input } from '@santiment-network/ui/Input';
import MetricState from '../MetricState';
import Suggestions from '../Suggestions';
import Combinators from '../Combinators';
import { useMetricSettings } from '../hooks';
import { useMarketExchanges } from './hooks';
import { filterValuesBySearch } from '../utils';
import { extractFilterByMetricType } from '../../detector';
import Skeleton from '../../../../../../components/Skeleton/Skeleton';
import styles from './index.module.css';
const DEFAULT_SETTINGS = {
  exchanges: [],
  exchanges_combinator: 'or',
  isActive: false
};

const Exchanges = ({
  isViewMode,
  baseMetric,
  defaultSettings,
  isNoFilters,
  updMetricInFilter,
  toggleMetricInFilter
}) => {
  const [exchanges, loading] = useMarketExchanges();
  const {
    settings,
    setSettings,
    selectSuggest,
    clickCheckbox
  } = useMetricSettings(defaultSettings);
  const [search, setSearch] = useState('');
  const hasActiveExchanges = settings.exchanges.length > 0;
  const isANDCombinator = settings.exchanges_combinator === 'and';
  const filteredExchanges = useMemo(() => filterValuesBySearch(search, exchanges, 'exchange'), [search, exchanges]);
  useEffect(() => {
    if (isNoFilters) {
      setSettings(DEFAULT_SETTINGS);
    }
  }, [isNoFilters]);
  useEffect(() => {
    if (settings !== defaultSettings) {
      const {
        exchanges,
        exchanges_combinator,
        isActive
      } = settings;
      const {
        isActive: previousIsActive
      } = defaultSettings;
      const newFilter = {
        args: {
          exchanges_combinator,
          exchanges
        },
        name: 'traded_on_exchanges'
      };

      if (hasActiveExchanges) {
        if (previousIsActive !== isActive) {
          toggleMetricInFilter(newFilter, baseMetric.key);
        } else {
          updMetricInFilter(newFilter, baseMetric.key);
        }
      }

      if (!hasActiveExchanges && isActive && defaultSettings.isActive) {
        toggleMetricInFilter(newFilter, baseMetric.key);
      }
    }
  }, [settings]);

  function onToggleMode(combinator) {
    setSettings(state => _objectSpread(_objectSpread({}, state), {}, {
      exchanges_combinator: combinator
    }));
  }

  function onToggleExchange(exchange) {
    const selectedExchangesSet = new Set(settings.exchanges);

    if (!selectedExchangesSet.delete(exchange)) {
      selectedExchangesSet.add(exchange);
    }

    setSettings(state => _objectSpread(_objectSpread({}, state), {}, {
      exchanges: [...selectedExchangesSet]
    }));
  }

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(MetricState, {
    isViewMode: isViewMode,
    metric: baseMetric,
    settings: settings,
    isActive: settings.isActive,
    onCheckboxClicked: clickCheckbox,
    customStateText: settings.isActive && hasActiveExchanges ? `shows ${isANDCombinator ? 'all' : 'at least one'} of selected exchanges` : ''
  }), settings.isActive && hasActiveExchanges > 0 && /*#__PURE__*/React.createElement("div", {
    className: styles.labels
  }, settings.exchanges.map((name, idx) => /*#__PURE__*/React.createElement(Fragment, {
    key: idx
  }, /*#__PURE__*/React.createElement("div", {
    className: cx(styles.label, isViewMode && styles.label__viewMode),
    onClick: () => onToggleExchange(name)
  }, name, !isViewMode && /*#__PURE__*/React.createElement(Icon, {
    type: "close-small",
    className: styles.label__close
  })), settings.exchanges.length !== idx + 1 && /*#__PURE__*/React.createElement("span", {
    className: styles.operator
  }, isANDCombinator ? 'and' : 'or')))), settings.isActive && !isViewMode && /*#__PURE__*/React.createElement("div", {
    className: styles.wrapper
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.settings
  }, /*#__PURE__*/React.createElement(ContextMenu, {
    passOpenStateAs: "data-isactive",
    position: "bottom",
    align: "start",
    className: styles.dropdown,
    trigger: /*#__PURE__*/React.createElement(Input, {
      className: styles.trigger__btn,
      iconClassName: styles.trigger__arrow,
      icon: "arrow-down",
      iconPosition: "right",
      placeholder: "Choose exchanges",
      onChange: evt => {
        const {
          value
        } = evt.currentTarget;
        setSearch(value);
      }
    })
  }, /*#__PURE__*/React.createElement(Panel, {
    className: styles.panel
  }, hasActiveExchanges > 0 && /*#__PURE__*/React.createElement("div", {
    className: styles.list
  }, settings.exchanges.map((name, idx) => /*#__PURE__*/React.createElement(Button, {
    className: styles.item,
    fluid: true,
    variant: "ghost",
    key: idx,
    onClick: () => onToggleExchange(name)
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: styles.name
  }, name)), /*#__PURE__*/React.createElement("div", {
    className: cx(styles.action, styles.delete)
  }, "Remove")))), /*#__PURE__*/React.createElement("div", {
    className: styles.list
  }, /*#__PURE__*/React.createElement(Skeleton, {
    repeat: 3,
    show: loading,
    className: styles.loader
  }), filteredExchanges.map(({
    exchange,
    assetsCount,
    pairsCount
  }, idx) => {
    const isSelected = settings.exchanges.includes(exchange);
    return /*#__PURE__*/React.createElement(Button, {
      className: cx(styles.item, isSelected && styles.item__selected),
      fluid: true,
      variant: "ghost",
      key: idx,
      onClick: () => !isSelected && onToggleExchange(exchange)
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
      className: styles.name
    }, exchange), /*#__PURE__*/React.createElement("span", {
      className: styles.count
    }, "(", assetsCount, " assets, ", pairsCount, " pairs)")), /*#__PURE__*/React.createElement("div", {
      className: cx(styles.action, isSelected && styles.selected)
    }, "Add"));
  })))), /*#__PURE__*/React.createElement(Combinators, {
    onSelect: onToggleMode,
    isANDCombinator: isANDCombinator
  })), /*#__PURE__*/React.createElement(Suggestions, {
    hints: baseMetric.hints,
    onSuggestionClick: selectSuggest
  })));
};

export default (_ref => {
  let {
    filters,
    baseMetric
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  const filter = extractFilterByMetricType(filters, baseMetric);
  const settings = filter.length === 0 ? {} : _objectSpread(_objectSpread({}, filter[0]), {}, {
    isActive: true
  });
  return /*#__PURE__*/React.createElement(Exchanges, _extends({}, props, {
    baseMetric: baseMetric,
    defaultSettings: _objectSpread(_objectSpread({}, DEFAULT_SETTINGS), settings)
  }));
});