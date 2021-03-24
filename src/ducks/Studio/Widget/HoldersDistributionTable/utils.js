import React from 'react'
import { formatNumber } from '../../../../utils/formatting'
import {
  percentageFormatter,
  usdFormatter
} from '../../../dataHub/metrics/formatters'
import WalletLink from '../../../../components/WalletLink/WalletLink'

const AddressCell = ({ value, row: { original }, ...rest }) => {
  return <WalletLink address={value} labels={original.labels} />
}

export const COLUMNS = [
  {
    Header: 'Address',
    accessor: 'address',
    disableSortBy: true,
    Cell: AddressCell
  },
  {
    Header: 'Value',
    accessor: 'value',
    Cell: ({ value }) => formatNumber(value),
    disableSortBy: true
  },
  {
    Header: 'Value USD',
    accessor: 'valueUsd',
    Cell: ({ value }) => usdFormatter(value),
    disableSortBy: true
  },
  {
    Header: 'Part Of Total',
    accessor: 'partOfTotal',
    disableSortBy: true,
    Cell: ({ value }) => percentageFormatter(value)
  }
]
