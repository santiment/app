import React from 'react'
import { formatNumber } from '../../../utils/formatting'
import WalletLink from '../../WalletLink/WalletLink'

const assets = ['uniswap', 'ethereum']

const TrxAddressCell = ({ value, original: { labels } }) => {
  const transformedLabels = labels.map(label => ({ name: label }))
  return (
    <WalletLink
      address={value}
      assets={assets}
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
]
