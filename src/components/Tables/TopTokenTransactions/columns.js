import React from 'react'
import WalletLink from '../../WalletLink/WalletLink'
import { formatNumber } from '../../../utils/formatting'
import { mapToTxLink } from '../../../utils/utils'
import styles from '../../WalletLink/WalletLink.module.scss'

const AddressCell = ({ value }) => <WalletLink {...value} />

export const TxLinkTo = ({ value, formatter }) => (
  <a
    className={styles.link}
    href={mapToTxLink(value)}
    target='_blank'
    rel='noopener noreferrer'
  >
    {formatter ? formatter(value) : value}
  </a>
)

const TrxCell = ({ value }) => (
  <div className={styles.trx}>
    <TxLinkTo value={value} />
  </div>
)

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
    Cell: AddressCell,
    disableSortBy: true
  },
  {
    Header: 'To',
    accessor: 'toAddress',
    Cell: AddressCell,
    disableSortBy: true
  },
  {
    Header: 'TxHash',
    accessor: 'trxHash',
    Cell: TrxCell,
    disableSortBy: true
  }
]
