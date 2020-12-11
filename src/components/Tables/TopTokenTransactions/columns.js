import React from 'react'
import { formatNumber } from '../../../utils/formatting'
import WalletLink from '../../WalletLink/WalletLink'

const TrxAddressCell = ({ value }) => <WalletLink {...value} />

export const DEFAULT_SORTING = [
  {
    id: 'datetime',
    desc: true
  }
]

export const COLUMNS = [
  {
    Header: 'Time',
    accessor: 'datetime',
    sortType: 'datetime'
  },
  {
    Header: 'Value',
    accessor: 'trxValue',
    Cell: ({ value }) => formatNumber(value)
  },
  {
    Header: 'From',
    accessor: 'fromAddress',
    Cell: TrxAddressCell,
    disableSortBy: true
  },
  {
    Header: 'To',
    accessor: 'toAddress',
    Cell: TrxAddressCell,
    disableSortBy: true
  },
  {
    Header: 'TxHash',
    accessor: 'trxHash',
    Cell: ({ value }) =>
      TrxAddressCell({ value: { address: value, isTx: true } }),
    disableSortBy: true
  }
]
