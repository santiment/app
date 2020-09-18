import React from 'react'
import BalanceView from '../../../HistoricalBalance/balanceView/BalanceView'
import styles from './UniswapHistoricalBalance.module.scss'

const queryData = {
  address: '0x090d4613473dee047c3f2706764f49e0821d256e',
  assets: ['uniswap'],
  priceMetrics: []
}

const noop = () => {}

const DEFAULT_SETTINGS = {
  from: '2020-09-16T19:00:00Z',
  to: new Date(),
  selector: { slug: 'uniswap', infrastructure: 'ETH' }
}

const UniswapHistoricalBalance = ({ classes, title }) => {
  return (
    <BalanceView
      title={title}
      queryData={queryData}
      classes={{ ...styles, ...classes }}
      onChangeQuery={noop}
      settings={{
        showHeader: false,
        showIntervals: false,
        showAlertBtn: false,
        showLegend: false,
        showYAxes: true
      }}
      chartSettings={DEFAULT_SETTINGS}
    />
  )
}

export default UniswapHistoricalBalance
