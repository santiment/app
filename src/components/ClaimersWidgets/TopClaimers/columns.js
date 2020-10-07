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

function CellWithLoader (value = '') {
  if (value === '') {
    return <Loader className={styles.loader} />
  } else {
    return formatNumber(value)
  }
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
    maxWidth: 140,
    sortable: false,
    Cell: ({ value }) => formatNumber(value)
  },
  {
    Cell: ({ original: { balance = '' } }) => CellWithLoader(balance),
    id: 'price',
    Header: 'Current balance',
    accessor: 'price',
    minWidth: 90,
    maxWidth: 110,
    sortable: false
  },
  {
    Cell: ({ original: { volumeInflow = '' } }) => CellWithLoader(volumeInflow),
    id: 'volume-in',
    Header: 'Transaction Volume In',
    accessor: 'volume-in',
    minWidth: 130,
    maxWidth: 160,
    sortable: false
  },
  {
    Cell: ({ original: { volumeOutflow = '' } }) =>
      CellWithLoader(volumeOutflow),
    id: 'volume-out',
    Header: 'Transaction Volume Out',
    accessor: 'volume-out',
    minWidth: 130,
    maxWidth: 160,
    sortable: false
  }
]
