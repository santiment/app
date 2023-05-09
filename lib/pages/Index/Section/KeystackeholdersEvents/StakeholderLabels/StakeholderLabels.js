function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { useMemo } from 'react';
import cx from 'classnames';
import Panel from '@santiment-network/ui/Panel';
import ContextMenu from '@santiment-network/ui/ContextMenu';
import { READABLE_NAMES } from '../hooks';
import { ProLabel } from '../../../../../components/ProLabel';
import styles from './StakeholderLabels.module.css';
const MAX_COUNT = 6;
export function toggleByKey(label, hidden, onChange) {
  if (hidden[label]) {
    delete hidden[label];
    onChange(_objectSpread({}, hidden));
  } else {
    onChange(_objectSpread(_objectSpread({}, hidden), {}, {
      [label]: true
    }));
  }
}

const Label = ({
  label,
  hidden,
  toggle,
  proLabels
}) => {
  return /*#__PURE__*/React.createElement("div", {
    key: label,
    className: cx(styles.label, hidden[label] && styles.label__hidden),
    onClick: () => toggle(label)
  }, READABLE_NAMES[label] || label, proLabels.includes(label) && /*#__PURE__*/React.createElement(ProLabel, {
    className: styles.proLabel
  }));
};

const StakeholderLabels = ({
  labels,
  restrictedSignals,
  hidden,
  setHidden
}) => {
  const visibleLabels = useMemo(() => labels.slice(0, MAX_COUNT), [labels]);
  const unvisibleLabels = useMemo(() => labels.slice(MAX_COUNT), [labels]);

  function toggle(label) {
    if (hidden[label]) {
      delete hidden[label];
      setHidden(_objectSpread({}, hidden));
    } else {
      setHidden(_objectSpread(_objectSpread({}, hidden), {}, {
        [label]: true
      }));
    }
  }

  if (labels.length === 0) {
    return null;
  }

  return /*#__PURE__*/React.createElement("div", {
    className: styles.container
  }, visibleLabels.map(label => /*#__PURE__*/React.createElement(Label, {
    key: label,
    hidden: hidden,
    label: label,
    toggle: toggle,
    proLabels: restrictedSignals
  })), labels.length > MAX_COUNT && /*#__PURE__*/React.createElement(ContextMenu, {
    passOpenStateAs: "data-isactive",
    position: "bottom",
    align: "start",
    className: styles.dropdown,
    trigger: /*#__PURE__*/React.createElement("div", {
      className: cx(styles.label, styles.label__hidden)
    }, "+", unvisibleLabels.length)
  }, /*#__PURE__*/React.createElement(Panel, {
    className: styles.panel
  }, unvisibleLabels.map(label => /*#__PURE__*/React.createElement(Label, {
    key: label,
    hidden: hidden,
    label: label,
    toggle: toggle,
    proLabels: restrictedSignals
  })), Object.keys(hidden).length !== labels.length && /*#__PURE__*/React.createElement("div", {
    className: cx(styles.label, styles.deselect),
    onClick: () => setHidden(labels.reduce((acc, l) => {
      acc[l] = true;
      return acc;
    }, {}))
  }, "Deselect all"))));
};

export default StakeholderLabels;