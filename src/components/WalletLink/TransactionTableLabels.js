import React from 'react'
import cx from 'classnames'
import { CollapsedLabels } from '../../ducks/HistoricalBalance/Address/Labels'
import styles from './TransactionTableLabels.module.scss'

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
  kucoin: 'https://www.kucoin.com/'
}

const LabelWrapper = ({ metadata, ref, ...rest }) => {
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

  const linkRef = owner
    ? HARDCODED_EXCHANGE_LINKS[owner.toLowerCase()]
    : undefined

  if (linkRef) {
    return (
      <a
        className={cx(styles.label, styles.link, className)}
        target='_blank'
        rel='noopener noreferrer'
        href={linkRef}
        onClick={e => {
          e.stopPropagation()
        }}
      >
        {owner}
      </a>
    )
  } else {
    return (
      <div ref={ref} {...rest} className={cx(styles.label, className)}>
        {owner}
      </div>
    )
  }
}

const LabelRenderer = ({ name, metadata, forwardedRef, ...rest }) => {
  if (!name) {
    return null
  }

  const { className } = rest

  switch (name.toLowerCase()) {
    case 'decentralized_exchange': {
      return (
        <LabelWrapper
          key={name}
          metadata={metadata}
          ref={forwardedRef}
          {...rest}
        />
      )
    }
    case 'centralized_exchange': {
      return (
        <LabelWrapper
          key={name}
          metadata={metadata}
          ref={forwardedRef}
          {...rest}
        />
      )
    }
    case 'defi': {
      return (
        <LabelWrapper
          key={name}
          metadata={metadata}
          ref={forwardedRef}
          {...rest}
        />
      )
    }
    case 'withdrawal': {
      return (
        <div
          key={name}
          ref={forwardedRef}
          {...rest}
          className={cx(styles.label, className)}
        >
          CEX trader
        </div>
      )
    }
    default: {
      return (
        <div
          key={name}
          ref={forwardedRef}
          {...rest}
          className={cx(styles.label, className)}
        >
          {name}
        </div>
      )
    }
  }
}

const TransactionTableLabels = ({ labels, className }) => {
  const visibleLabels = labels.slice(0, 3)
  const hiddenLabels = labels.slice(3)

  return (
    <div className={cx(styles.labels, className)}>
      {visibleLabels.map(LabelRenderer)}
      {!!hiddenLabels.length && (
        <CollapsedLabels labels={hiddenLabels} el={LabelRenderer} />
      )}
    </div>
  )
}

export default TransactionTableLabels
