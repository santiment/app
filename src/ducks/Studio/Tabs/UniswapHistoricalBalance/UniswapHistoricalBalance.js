import React from 'react'
import BalanceView from '../../../HistoricalBalance/balanceView/BalanceView'
import styles from './UniswapHistoricalBalance.module.scss'

const queryData = {
  address: '0x41653c7d61609d856f29355e404f310ec4142cfb',
  assets: ['uniswap'],
  priceMetrics: []
}

const noop = () => {}

const DEFAULT_SETTINGS = {
  from: '2020-09-16T00:00:00Z',
  to: new Date(),
  interval: '5m',
  selector: { slug: 'uniswap', infrastructure: 'ETH' }
}

const UniswapHistoricalBalance = () => {
  return (
    <div>
      <BalanceView
        queryData={queryData}
        classes={styles}
        onChangeQuery={noop}
        settings={{
          showHeader: false,
          showIntervals: false,
          showAlertBtn: false
        }}
        chartSettings={DEFAULT_SETTINGS}
      />
    </div>
  )
}

export default UniswapHistoricalBalance
