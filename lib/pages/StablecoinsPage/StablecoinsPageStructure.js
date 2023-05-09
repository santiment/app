function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Fragment, useEffect, useMemo, useState } from 'react';
import cx from 'classnames';
import Icon from '@santiment-network/ui/Icon';
import { getNewTimerangePeriod } from '../../utils/dates';
import IntervalsComponent from '../../components/IntervalsComponent/IntervalsComponent';
import CheckProPaywall from '../../ducks/Stablecoins/CheckProPaywall';
import styles from './StablecoinsPage.module.css';
import widgetStyles from '../../ducks/Studio/Widget/Widget.module.css';
export const BlockHeader = ({
  title,
  description,
  setInterval,
  ranges,
  defaultIndex,
  tag,
  className,
  onCloseClick
}) => {
  if (!title) {
    return null;
  }

  return /*#__PURE__*/React.createElement("div", {
    className: cx(styles.subHeader, className)
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.subTitle,
    id: tag
  }, title, setInterval && /*#__PURE__*/React.createElement(IntervalsComponent, {
    onChange: setInterval,
    defaultIndex: defaultIndex,
    ranges: ranges
  }), onCloseClick && /*#__PURE__*/React.createElement(Icon, {
    type: "close-medium",
    className: widgetStyles.close,
    onClick: onCloseClick
  })), description && /*#__PURE__*/React.createElement("div", {
    className: styles.subDescr
  }, description));
};
export const Block = ({
  title,
  description,
  children,
  isPaywalActive = false,
  tag,
  className
}) => {
  const El = useMemo(() => {
    return isPaywalActive ? CheckProPaywall : Fragment;
  }, [isPaywalActive]);
  return /*#__PURE__*/React.createElement("div", {
    className: cx(styles.block, className),
    id: tag
  }, /*#__PURE__*/React.createElement(BlockHeader, {
    title: title,
    description: description
  }), /*#__PURE__*/React.createElement(El, null, children));
};
export const ProOnlyBlock = ({
  title,
  description,
  children,
  tag,
  className
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: cx(styles.block, className),
    id: tag
  }, /*#__PURE__*/React.createElement(BlockHeader, {
    title: title,
    description: description
  }), /*#__PURE__*/React.createElement(CheckProPaywall, null, children));
};
export const BlockWithRanges = ({
  title,
  description,
  el: El,
  tag,
  checkPro = true,
  className
}) => {
  const [interval, setInterval] = useState('1d');
  const [settings, setSettings] = useState(_objectSpread(_objectSpread({}, getNewTimerangePeriod(interval)), {}, {
    interval
  }));
  useEffect(() => {
    setSettings(_objectSpread(_objectSpread(_objectSpread({}, settings), getNewTimerangePeriod(interval)), {}, {
      interval
    }));
  }, [interval]);
  const Wrapper = checkPro ? CheckProPaywall : Fragment;
  return /*#__PURE__*/React.createElement("div", {
    className: cx(styles.block, className),
    id: tag
  }, /*#__PURE__*/React.createElement(BlockHeader, {
    title: title,
    description: description,
    setInterval: setInterval
  }), /*#__PURE__*/React.createElement(Wrapper, null, /*#__PURE__*/React.createElement(El, {
    settings: settings
  })));
};