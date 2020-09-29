import React from 'react'
import Loader from '@santiment-network/ui/Loader/Loader'
import { formatNumber } from '../../../utils/formatting'
import WalletLink from '../../WalletLink/WalletLink'
import styles from './table.module.scss'

const settings = {
  assets: ['uniswap'],
  priceMetrics: [
    {
      asset: 'uniswap',
      enabled: true
    }
  ]
}

const TrxAddressCell = ({ value, original: { labels } }) => {
  const transformedLabels = labels.map(label => ({ name: label }))
  return <WalletLink address={value} {...settings} labels={transformedLabels} />
}

export const columns = [
  {
    id: 'address',
    Header: 'Address',
    accessor: 'address',
    Cell: TrxAddressCell,
    sortable: false
  },
  {
    id: 'value',
    Header: 'Claimed in interval',
    accessor: 'value',
    minWidth: 100,
    maxWidth: 150,
    sortable: false,
    Cell: ({ value }) => formatNumber(value)
  },
  {
    Cell: ({ original: { balance = '' } }) =>
      balance === '' ? (
        <Loader className={styles.loader} />
      ) : (
        formatNumber(balance)
      ),
    id: 'price',
    Header: 'UNI balance',
    accessor: 'price',
    minWidth: 100,
    maxWidth: 110,
    sortable: false
  },
  {
    Cell: ({ original: { volume = '' } }) =>
      volume === '' ? (
        <Loader className={styles.loader} />
      ) : (
        formatNumber(volume)
      ),
    id: 'volume',
    Header: 'Transaction Volume',
    accessor: 'volume',
    minWidth: 100,
    maxWidth: 130,
    sortable: false
  }
]
