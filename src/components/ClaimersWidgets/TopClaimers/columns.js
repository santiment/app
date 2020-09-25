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
  return (
    <WalletLink
      address={value}
      {...settings}
      isFull={true}
      labels={transformedLabels}
    />
  )
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
    maxWidth: 150,
    sortable: false,
    Cell: ({ value }) => formatNumber(value)
  },
  {
    Cell: ({ original: { address } }) => (
      <UniswapLastBalance address={address} />
    ),
    id: 'price',
    Header: 'Uniswap current balance',
    accessor: 'price',
    minWidth: 100,
    maxWidth: 150,
    sortable: false
  }
]
