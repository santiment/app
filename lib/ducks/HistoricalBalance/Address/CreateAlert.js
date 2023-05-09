function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import AlertModal from '../../Alert/AlertModal';
import { ALERT_TYPES } from '../../Alert/constants';
import { getAddressInfrastructure } from '../../../utils/address';
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
    type: 'wallet_movement',
    target: {
      address: ''
    },
    selector: {
      infrastructure: '',
      slug: ''
    },
    channel: [],
    time_window: '',
    operation: {}
  }
};

const CreateAlert = ({
  assets,
  address,
  trigger
}) => {
  const infrastructure = getAddressInfrastructure(address);
  const slug = assets.length !== 0 ? assets[0].slug : '';
  return /*#__PURE__*/React.createElement(AlertModal, {
    defaultType: ALERT_TYPES[2],
    signalData: _objectSpread(_objectSpread({}, DEFAULT_SIGNAL), {}, {
      settings: _objectSpread(_objectSpread({}, DEFAULT_SIGNAL.settings), {}, {
        target: _objectSpread(_objectSpread({}, DEFAULT_SIGNAL.settings.target), {}, {
          address
        }),
        selector: _objectSpread(_objectSpread({}, DEFAULT_SIGNAL.settings.selector), {}, {
          slug,
          infrastructure
        })
      })
    }),
    trigger: trigger,
    disabled: !address || !slug
  });
};

export default CreateAlert;