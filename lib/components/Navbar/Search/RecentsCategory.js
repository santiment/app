const _excluded = ["items", "onClear"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import Icon from '@santiment-network/ui/Icon';
import Category from './Category';
import { Asset, propsAccessor as assetAccessor } from './AssetsCategory';
import styles from './Category.module.css';
const SEARCH_RECENTS = 'SEARCH_RECENTS';
export function getRecents() {
  const savedRecents = localStorage.getItem(SEARCH_RECENTS);
  return savedRecents ? JSON.parse(savedRecents) : [];
}

function saveRecents(items) {
  const recents = items.slice(0, 5);
  localStorage.setItem(SEARCH_RECENTS, JSON.stringify(items));
  return recents;
}

const removeRecent = ({
  key,
  type
}) => getRecents().filter(({
  type: itemType,
  key: itemKey
}) => type !== itemType || key !== itemKey);

export const clearRecents = () => saveRecents([]);
export function addRecent(type, item) {
  if (type !== 'Assets') return;
  const {
    key
  } = assetAccessor(item);

  const newRecent = _objectSpread(_objectSpread({}, item), {}, {
    key,
    type
  });

  return saveRecents([newRecent, ...removeRecent(newRecent)].filter(Boolean));
}

const Title = ({
  onClear
}) => /*#__PURE__*/React.createElement("div", {
  className: styles.recent
}, "Recently searched", /*#__PURE__*/React.createElement(Icon, {
  type: "history-clear",
  className: styles.clear,
  onClick: onClear
}));

const RecentsCategory = _ref => {
  let {
    items,
    onClear
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  return items.length ? /*#__PURE__*/React.createElement(Category, _extends({}, props, {
    title: /*#__PURE__*/React.createElement(Title, {
      onClear: onClear
    }),
    titleKey: "Recently searched",
    items: items,
    Item: Asset,
    propsAccessor: assetAccessor
  })) : null;
};

export default RecentsCategory;