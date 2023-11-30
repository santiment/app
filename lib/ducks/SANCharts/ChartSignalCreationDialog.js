function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import Button from '@santiment-network/ui/Button';
import Icon from '@santiment-network/ui/Icon';
import AlertModal from '../Alert/AlertModal';
import { ALERT_TYPES } from '../Alert/constants';
import styles from './ChartSignalCreationDialog.module.css';
const DEFAULT_SIGNAL = {
  cooldown: '1d',
  description: '',
  iconUrl: '',
  isActive: true,
  isPublic: false,
  isRepeating: true,
  tags: [],
  title: '',
  settings: {
    type: 'metric_signal',
    metric: '',
    target: {
      slug: ''
    },
    channel: [],
    time_window: '',
    operation: {}
  }
};

const ChartSignalCreationDialog = ({
  trigger = DefaultSignalCreationTrigger,
  slug
}) => /*#__PURE__*/React.createElement(AlertModal, {
  defaultType: ALERT_TYPES[0],
  signalData: _objectSpread(_objectSpread({}, DEFAULT_SIGNAL), {}, {
    settings: _objectSpread(_objectSpread({}, DEFAULT_SIGNAL.settings), {}, {
      target: {
        slug
      }
    })
  }),
  trigger: trigger
});

const DefaultSignalCreationTrigger = /*#__PURE__*/React.createElement(Button, {
  variant: "flat",
  className: styles.btn
}, /*#__PURE__*/React.createElement(Icon, {
  type: "plus-round",
  className: styles.icon
}), " Signals");
export default ChartSignalCreationDialog;