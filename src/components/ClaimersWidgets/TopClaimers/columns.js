import React from 'react'
import { formatNumber } from '../../../utils/formatting'
import WalletLink from '../../WalletLink/WalletLink'
import UniswapLastBalance from './UniswapLastBalance'

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
    Header: 'Initially claimed',
    accessor: 'value',
    minWidth: 100,
    maxWidth: 130,
    sortable: false,
    Cell: ({ value }) => formatNumber(value)
  },
  {
    Cell: ({ original: { address } }) => (
      <UniswapLastBalance address={address} />
    ),
    id: 'price',
    Header: 'UNI current balance',
    accessor: 'price',
    minWidth: 100,
    maxWidth: 150,
    sortable: false
  },
  {
    Cell: ({ original: { address } }) => (
      <UniswapLastBalance address={address} change='24h' />
    ),
    id: 'price-change24h',
    Header: 'UNI balance change, 24h',
    accessor: 'price24h',
    minWidth: 130,
    maxWidth: 160,
    sortable: false
  },
  {
    Cell: ({ original: { address } }) => (
      <UniswapLastBalance address={address} change='30d' />
    ),
    id: 'price-change30d',
    Header: 'UNI balance change, 30d',
    accessor: 'price30d',
    minWidth: 130,
    maxWidth: 160,
    sortable: false
  }
]
