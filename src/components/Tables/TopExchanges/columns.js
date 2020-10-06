import { formatNumber } from '../../../utils/formatting'

export const columns = [
  {
    id: 'owner',
    Header: 'Exchange',
    accessor: 'owner',
    maxWidth: 160,
    sortable: false
  },
  {
    id: 'balance',
    Header: 'Balance',
    accessor: 'balance',
    minWidth: 120,
    maxWidth: 150,
    sortable: true,
    Cell: ({ value }) => formatNumber(value)
  },
  {
    id: 'balanceChange1d',
    Header: 'Change, 1d',
    accessor: 'balanceChange1d',
    minWidth: 110,
    maxWidth: 140,
    sortable: true,
    Cell: ({ value }) => formatNumber(value)
  },
  {
    id: 'balanceChange7d',
    Header: 'Change, 7d',
    accessor: 'balanceChange7d',
    minWidth: 110,
    maxWidth: 140,
    sortable: true,
    Cell: ({ value }) => formatNumber(value)
  },
  {
    id: 'balanceChange30d',
    Header: 'Change, 30d',
    accessor: 'balanceChange30d',
    minWidth: 110,
    maxWidth: 140,
    sortable: true,
    Cell: ({ value }) => formatNumber(value)
  },
  {
    id: 'daysSinceFirstTransfer',
    Header: 'Days since 1st transfer',
    accessor: 'daysSinceFirstTransfer',
    minWidth: 110,
    maxWidth: 140,
    sortable: true
  },
  {
    id: 'datetimeOfFirstTransfer',
    Header: '1st transfer at',
    accessor: 'datetimeOfFirstTransfer',
    minWidth: 110,
    maxWidth: 160,
    sortMethod: (a, b) => (new Date(a) > new Date(b) ? 1 : -1)
  }
]
