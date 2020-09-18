import React from 'react'
import { formatNumber } from '../../../utils/formatting'
import WalletLink from '../../WalletLink/WalletLink'

const TrxAddressCell = ({ value }) => <WalletLink {...value} />

export const columns = [
  {
    Header: 'address',
    accessor: 'Address',
    Cell: TrxAddressCell,
    sortable: false
  },
  {
    id: 'value',
    Header: 'Value',
    accessor: 'trxValue',
    minWidth: 100,
    maxWidth: 150,
    sortable: true,
    Cell: ({ value }) => formatNumber(value)
  }
]
