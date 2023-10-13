const _excluded = ['isExchange', 'labels', 'className', 'content']

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

import React from 'react'
import cx from 'classnames'
import TransactionTableLabels from './TransactionTableLabels'
import { mapToTxAddress, mapToTxLink } from '../../utils/utils'
import styles from './WalletLink.module.css'
export const makeShortAddresLink = ({
  link,
  isExchange,
  settings: { linkSymbolsCount = 16 } = {},
}) =>
  link.length > 7 && link.length > linkSymbolsCount
    ? link.slice(0, isExchange ? 7 : linkSymbolsCount) + '...'
    : link
export const EtherscanLink = ({
  address = '',
  isTx,
  isExchange,
  label,
  isFull,
  settings,
  className,
  children,
}) => {
  const asLink = true
  const link = children || address
  const addressShort =
    isFull || typeof link !== 'string'
      ? link
      : makeShortAddresLink({
          link,
          isExchange,
          settings,
        })
  const showLabel = label || children || addressShort
  const El = asLink ? 'a' : 'div'
  const props = asLink
    ? {
        href: isTx ? mapToTxLink(address) : mapToTxAddress(address),
        target: '_blank',
        rel: 'noopener noreferrer',
      }
    : {}
  return /*#__PURE__*/ React.createElement(
    El,
    _extends({}, props, {
      className: cx(styles.etherscanLink, styles.link, className),
    }),
    showLabel,
  )
}

const ActionLabels = (_ref) => {
  let { isExchange, labels, className, content } = _ref,
    rest = _objectWithoutProperties(_ref, _excluded)

  return /*#__PURE__*/ React.createElement(
    'div',
    {
      className: cx(styles.withLabels, className),
    },
    content,
    /*#__PURE__*/ React.createElement(
      EtherscanLink,
      _extends({}, rest, {
        isExchange: isExchange,
      }),
    ),
    labels &&
      /*#__PURE__*/ React.createElement(TransactionTableLabels, {
        labels: labels,
      }),
  )
}

export const DefaultAssetLinkWithLabels = ({ address, labels }) => {
  return /*#__PURE__*/ React.createElement(
    'div',
    null,
    /*#__PURE__*/ React.createElement(
      'span',
      {
        className: styles.link,
      },
      makeShortAddresLink({
        link: address || '',
      }),
    ),
    labels &&
      /*#__PURE__*/ React.createElement(TransactionTableLabels, {
        labels: labels,
      }),
  )
}
export default ActionLabels
