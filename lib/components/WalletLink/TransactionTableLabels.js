const _excluded = ['metadata', 'ref'],
  _excluded2 = ['name', 'metadata', 'forwardedRef']

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
import cx from 'classnames'
import { CollapsedLabels } from '../../ducks/HistoricalBalance/Address/Labels'
import styles from './TransactionTableLabels.module.css'
export const HARDCODED_EXCHANGE_LINKS = {
  defisaver: 'https://defisaver.com/',
  pooltogether: 'https://www.pooltogether.com/',
  dydx: 'https://dydx.exchange/',
  compound: 'https://compound.finance/',
  bzx: 'https://bzx.network/',
  defizap: 'https://defizap.com/',
  makerdao: 'https://makerdao.com/ru/',
  iearn: 'https://yearn.finance/',
  defimoneymarket: 'https://defimoneymarket.com/',
  chai: 'https://chai.money/',
  tokensets: 'https://www.tokensets.com/',
  eidoo: 'https://eidoo.io/',
  aave: 'https://aave.com/',
  celsius: 'https://celsius.network/',
  nexo: 'https://nexo.io/',
  nuonetwork: 'https://www.nuo.network/',
  synthetix: 'https://www.synthetix.io/',
  instadapp: 'https://instadapp.io/',
  wbtc: 'https://wbtc.network/',
  kyber: 'https://kyber.network/',
  oneinch: 'https://1inch.exchange/',
  bitfinex: 'https://www.bitfinex.com/',
  binance: 'https://www.binance.com/',
  uniswap: 'https://uniswap.org/',
  ftx_exchange: 'https://ftx.com/',
  huobi: 'https://www.huobi.com/',
  'crypto.com': 'https://crypto.com/',
  coinbase: 'https://www.coinbase.com/',
  kucoin: 'https://www.kucoin.com/',
}

const LabelWrapper = (_ref) => {
  let { metadata, ref } = _ref,
    rest = _objectWithoutProperties(_ref, _excluded)

  if (!metadata) {
    return null
  }

  const { className } = rest
  let decoded = {}

  try {
    decoded = JSON.parse(metadata.replace(/\bNaN\b/g, 'null'))
  } catch (e) {
    return null
  }

  const { owner } = decoded
  const linkRef = owner ? HARDCODED_EXCHANGE_LINKS[owner.toLowerCase()] : undefined

  if (linkRef) {
    return /*#__PURE__*/ React.createElement(
      'a',
      {
        className: cx(styles.label, styles.link, className),
        target: '_blank',
        rel: 'noopener noreferrer',
        href: linkRef,
        onClick: (e) => {
          e.stopPropagation()
        },
      },
      owner,
    )
  } else {
    return /*#__PURE__*/ React.createElement(
      'div',
      _extends(
        {
          ref: ref,
        },
        rest,
        {
          className: cx(styles.label, className),
        },
      ),
      owner,
    )
  }
}

const LabelRenderer = (_ref2) => {
  let { name, metadata, forwardedRef } = _ref2,
    rest = _objectWithoutProperties(_ref2, _excluded2)

  if (!name) {
    return null
  }

  const { className } = rest

  switch (name.toLowerCase()) {
    case 'decentralized_exchange': {
      return /*#__PURE__*/ React.createElement(
        LabelWrapper,
        _extends(
          {
            key: name,
            metadata: metadata,
            ref: forwardedRef,
          },
          rest,
        ),
      )
    }

    case 'centralized_exchange': {
      return /*#__PURE__*/ React.createElement(
        LabelWrapper,
        _extends(
          {
            key: name,
            metadata: metadata,
            ref: forwardedRef,
          },
          rest,
        ),
      )
    }

    case 'defi': {
      return /*#__PURE__*/ React.createElement(
        LabelWrapper,
        _extends(
          {
            key: name,
            metadata: metadata,
            ref: forwardedRef,
          },
          rest,
        ),
      )
    }

    case 'withdrawal': {
      return /*#__PURE__*/ React.createElement(
        'div',
        _extends(
          {
            key: name,
            ref: forwardedRef,
          },
          rest,
          {
            className: cx(styles.label, className),
          },
        ),
        'CEX trader',
      )
    }

    default: {
      return /*#__PURE__*/ React.createElement(
        'div',
        _extends(
          {
            key: name,
            ref: forwardedRef,
          },
          rest,
          {
            className: cx(styles.label, className),
          },
        ),
        name,
      )
    }
  }
}

const TransactionTableLabels = ({ labels, className }) => {
  const visibleLabels = labels.slice(0, 7)
  const hiddenLabels = labels.slice(7)
  return /*#__PURE__*/ React.createElement(
    'div',
    {
      className: cx(styles.labels, className),
    },
    visibleLabels.map(LabelRenderer),
    !!hiddenLabels.length &&
      /*#__PURE__*/ React.createElement(CollapsedLabels, {
        labels: hiddenLabels,
        el: LabelRenderer,
      }),
  )
}

export default TransactionTableLabels
