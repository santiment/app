const _excluded = ["searchTerm"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useMemo } from 'react';
import cx from 'classnames';
import Category, { Button } from './Category';
import styles from './Category.module.css';
import { getAddressInfrastructure } from '../../../utils/address';
const DEFAULT_SUGGESTIONS = [];
const WALLET_LINK = '/labs/balance?address=';

const propsAccessor = ({
  word,
  key = word,
  As
}) => ({
  key,
  As,
  to: WALLET_LINK + word
});

const Wallet = ({
  address
}) => address;

const Lookup = ({
  address,
  className
}) => /*#__PURE__*/React.createElement(Button, {
  to: WALLET_LINK + address,
  className: cx(className, styles.lookup)
}, "Lookup wallet");

const buildLookupSuggestion = searchTerm => [{
  key: '__lookup__',
  As: ({
    className
  }) => /*#__PURE__*/React.createElement(Lookup, {
    address: searchTerm,
    className: className
  })
}];

const TrendingWordsCategory = _ref => {
  let {
    searchTerm
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  const suggestions = useMemo(() => getAddressInfrastructure(searchTerm) ? buildLookupSuggestion(searchTerm) : DEFAULT_SUGGESTIONS, [searchTerm]);
  return suggestions.length ? /*#__PURE__*/React.createElement(Category, _extends({}, props, {
    title: "Wallets",
    items: suggestions,
    Item: Wallet,
    propsAccessor: propsAccessor
  })) : null;
};

export default TrendingWordsCategory;