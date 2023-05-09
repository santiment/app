function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import cx from 'classnames';
import Button from '@santiment-network/ui/Button';
import Icon from '@santiment-network/ui/Icon';
import Label from '@santiment-network/ui/Label';
import { hasAddress, hasAssetById } from '../../utils';
import styles from './AssetsList.module.css';
import Labels from '../../../HistoricalBalance/Address/Labels';

const List = () => {};

const AutoSizer = () => {};

const ROW_HEIGHT = 32;

const rowAssetsRenderer = ({
  key,
  index,
  style,
  listItems,
  items,
  isContained,
  onToggle
}) => {
  const {
    name,
    ticker,
    id
  } = items[index];
  const isAssetInList = hasAssetById({
    listItems,
    id
  });
  return /*#__PURE__*/React.createElement("div", {
    key: key,
    className: styles.project,
    style: style
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    className: styles.name
  }, name), /*#__PURE__*/React.createElement(Label, {
    accent: "waterloo"
  }, ticker)), /*#__PURE__*/React.createElement(Button, {
    className: styles.actionBtn,
    accent: isContained ? 'grey' : 'positive',
    disabled: isContained ? false : isAssetInList,
    onClick: () => onToggle({
      project: items[index],
      listItems,
      isAssetInList
    })
  }, /*#__PURE__*/React.createElement(Icon, {
    type: isContained ? 'remove' : 'plus-round'
  })));
};

export const rowAddressRenderer = ({
  key,
  index,
  style,
  listItems,
  items,
  isContained,
  onToggle
}) => {
  const source = items[index];
  const {
    address
  } = source;
  const isInList = hasAddress(listItems, source);
  return /*#__PURE__*/React.createElement("div", {
    key: key,
    className: styles.address,
    style: style
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.container
  }, /*#__PURE__*/React.createElement(Label, {
    className: styles.name
  }, address), /*#__PURE__*/React.createElement("div", {
    className: styles.info
  }, /*#__PURE__*/React.createElement(Labels, {
    settings: source,
    showCount: 2
  }))), /*#__PURE__*/React.createElement(Button, {
    className: cx(styles.actionBtn, styles.deleteAddress),
    accent: isContained ? 'grey' : 'positive',
    disabled: isContained ? false : isInList,
    onClick: () => onToggle({
      item: source,
      listItems,
      isInList
    })
  }, /*#__PURE__*/React.createElement(Icon, {
    type: isContained ? 'remove' : 'plus-round'
  })));
};

const EditableList = ({
  items = [],
  listItems,
  isContained,
  onToggle,
  height,
  rowHeight = ROW_HEIGHT,
  rowRenderer = rowAssetsRenderer
}) => {
  const wrapperStyles = {
    height: height || (items.length > 4 ? '145px' : `${32 * items.length}px`),
    paddingRight: items.length > 4 ? '0' : `5px`
  };
  return /*#__PURE__*/React.createElement("div", {
    style: wrapperStyles,
    className: styles.wrapperList
  }, /*#__PURE__*/React.createElement(AutoSizer, null, ({
    height,
    width
  }) => /*#__PURE__*/React.createElement(List, {
    className: styles.list,
    width: width,
    height: height,
    rowHeight: rowHeight,
    rowCount: items.length,
    overscanRowCount: 5,
    rowRenderer: props => rowRenderer(_objectSpread(_objectSpread({}, props), {}, {
      listItems,
      items,
      isContained,
      onToggle
    }))
  })));
};

export default EditableList;