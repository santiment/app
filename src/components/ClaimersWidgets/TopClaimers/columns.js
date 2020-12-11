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

const TrxAddressCell = ({
  value,
  row: {
    original: { labels }
  }
}) => {
  const transformedLabels = labels.map(label => ({ name: label }))
  return <WalletLink address={value} {...settings} labels={transformedLabels} />
}

function CellWithLoader ({ value = '' }) {
  if (value === '') {
    return <Loader className={styles.loader} />
  } else {
    return formatNumber(value)
  }
}

export const DEFAULT_SORTING = [
  {
    id: 'value',
    desc: true
  }
]

export const COLUMNS = [
  {
    Header: 'Address',
    accessor: 'address',
    Cell: TrxAddressCell,
    disableSortBy: true
  },
  {
    Header: 'Claimed in interval',
    accessor: 'value',
    Cell: ({ value }) => formatNumber(value)
  },
  {
    Header: 'Current balance',
    accessor: 'balance',
    Cell: CellWithLoader
  },
  {
    Header: 'Transaction Volume In',
    accessor: 'volumeInflow',
    Cell: CellWithLoader
  },
  {
    Header: 'Transaction Volume Out',
    accessor: 'volumeOutflow',
    Cell: CellWithLoader
  }
]
