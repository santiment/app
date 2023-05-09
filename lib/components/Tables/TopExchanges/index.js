const _excluded = ["className", "skip", "ticker", "isForcedLoading", "isStablecoinPage", "titleChildren", "titleClassName"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useState, useMemo } from 'react';
import cx from 'classnames';
import Loader from '@santiment-network/ui/Loader/Loader';
import { COLUMNS, DEFAULT_SORTING } from './columns';
import { useTopExchanges } from './gql';
import { StablecoinsSelector } from '../../../ducks/Stablecoins/StablecoinSelector/ProjectsSelectors';
import Table from '../../../ducks/Table';
import styles from './index.module.css';
const DEFAULT_STABLECOIN = {
  slug: 'stablecoins',
  name: 'All stablecoins',
  ticker: ''
};
export const TopExchangesTableTitle = ({
  loading,
  title = 'Holdings on the top exchanges',
  ticker,
  children,
  className
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: cx(styles.title, className)
  }, /*#__PURE__*/React.createElement("h3", {
    className: styles.text
  }, ticker ? `${ticker} - ` : '', title), loading && /*#__PURE__*/React.createElement(Loader, {
    className: styles.headerLoader
  }), children);
};

const TopExchanges = _ref => {
  let {
    className,
    skip,
    ticker,
    isForcedLoading,
    isStablecoinPage,
    titleChildren,
    titleClassName
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  const [asset, setAsset] = useState(DEFAULT_STABLECOIN);
  const additionalProps = isStablecoinPage && asset.slug !== 'stablecoins' ? {
    slug: asset.slug,
    selector: null
  } : {};
  const [items, loading] = useTopExchanges(_objectSpread(_objectSpread({}, props), additionalProps), skip);
  const isLoadingForced = isForcedLoading && loading;
  const data = useMemo(() => items, [items]);
  const columns = useMemo(() => COLUMNS, []);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(TopExchangesTableTitle, {
    loading: loading,
    items: items,
    ticker: ticker,
    className: titleClassName
  }, titleChildren), isStablecoinPage && /*#__PURE__*/React.createElement("div", {
    className: styles.header
  }, /*#__PURE__*/React.createElement(StablecoinsSelector, {
    asset: asset,
    setAsset: setAsset
  })), /*#__PURE__*/React.createElement(Table, {
    data: isLoadingForced ? [] : data,
    columns: columns,
    options: {
      loadingSettings: {
        repeatLoading: 10,
        isLoading: isLoadingForced || loading && data.length === 0
      },
      sortingSettings: {
        defaultSorting: DEFAULT_SORTING,
        allowSort: true
      },
      stickySettings: {
        isStickyHeader: true,
        isStickyColumn: true,
        stickyColumnIdx: 0
      }
    },
    className: cx(className, styles.tableWrapper),
    classes: {
      table: styles.table,
      loader: styles.loadingWrapper,
      loaderRow: styles.loadingRow
    }
  }));
};

export default TopExchanges;