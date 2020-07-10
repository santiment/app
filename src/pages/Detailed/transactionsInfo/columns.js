import React from 'react'
import { formatNumber } from '../../../utils/formatting'
import WalletLink from '../../../components/WalletLink/WalletLink'

const TrxAddressCell = ({ value }) => <WalletLink {...value} />

const TrxHashAddressCell = ({ value }) => (
  <TrxAddressCell value={{ address: value, isTx: true }} />
)

export const columns = [
  {
    id: 'time',
    Header: 'Time',
    accessor: 'datetime',
    minWidth: 100,
    maxWidth: 200,
    sortMethod: (a, b) => (new Date(a) > new Date(b) ? 1 : -1)
  },
  {
    id: 'value',
    Header: 'Value',
    accessor: 'trxValue',
    minWidth: 100,
    maxWidth: 150,
    sortable: true,
    Cell: ({ value }) => formatNumber(value)
  },
  {
    Header: 'From',
    accessor: 'fromAddress',
    Cell: TrxAddressCell,
    sortable: false
  },
  {
    Header: 'To',
    accessor: 'toAddress',
    Cell: TrxAddressCell,
    sortable: false
  },
  {
    Header: 'TxHash',
    accessor: 'trxHash',
    Cell: TrxHashAddressCell,
    sortable: false
  }
]
