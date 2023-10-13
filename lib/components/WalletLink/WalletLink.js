const _excluded = ['address', 'labels', 'isTx']

function _extends() {
  _extends = Object.assign
    ? Object.assign.bind()
    : function (target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i]
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key]
            }
          }
        }
        return target
      }
  return _extends.apply(this, arguments)
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {}
  var target = _objectWithoutPropertiesLoose(source, excluded)
  var key, i
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source)
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i]
      if (excluded.indexOf(key) >= 0) continue
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue
      target[key] = source[key]
    }
  }
  return target
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {}
  var target = {}
  var sourceKeys = Object.keys(source)
  var key, i
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i]
    if (excluded.indexOf(key) >= 0) continue
    target[key] = source[key]
  }
  return target
}

import React from 'react'
import SmoothDropdownItem from './../SmoothDropdown/SmoothDropdownItem'
import ViewBalanceDialog from './ViewBalanceDialog'
import ActionLabels, { DefaultAssetLinkWithLabels } from './ActionLabels'
import { isEthStrictHashTx } from '../../utils/utils'
import styles from './WalletLink.module.css'

const WalletLink = (_ref) => {
  let { address, labels, isTx = false } = _ref,
    rest = _objectWithoutProperties(_ref, _excluded)

  if (!address && !labels) {
    return null
  }

  return /*#__PURE__*/ React.createElement(
    EthWalletLink,
    _extends(
      {
        address: address,
        labels: labels,
        isTx: isTx,
      },
      rest,
    ),
  )
}

const EthWalletLink = ({
  assets = [],
  isExchange = false,
  trigger: inputTrigger,
  settings,
  isFull,
  priceMetrics,
  labels,
  isTx,
  address,
  className,
  children,
}) => {
  return /*#__PURE__*/ React.createElement(ActionLabels, {
    address: address,
    isTx: isTx,
    isExchange: isExchange,
    asLink: isTx,
    labels: labels,
    settings: settings,
    isFull: isFull,
    className: className,
    content: children,
  })
}

export default WalletLink
