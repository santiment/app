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
      showAllLabels
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
    Header: 'Value',
    accessor: 'value',
    minWidth: 100,
    maxWidth: 150,
    sortable: true,
    Cell: ({ value }) => formatNumber(value)
  }
  // {
  //   Cell: ({ original: { address }, ...rest}) => {
  //     console.log(rest)
  //     return (
  //       <UniswapLastBalance address={address} />
  //     )
  //   },
  //   id: 'price',
  //   Header: 'Uniswap current balance',
  //   accessor: 'price',
  //   minWidth: 100,
  //   maxWidth: 150,
  //   sortable: true,
  // }
]
