import React from 'react'
import WalletLink from '../../WalletLink/WalletLink'
import { formatNumber } from '../../../utils/formatting'
import styles from '../../WalletLink/WalletLink.module.scss'

const AddressCell = ({ value }) => <WalletLink {...value} />

const TrxCell = ({ value }) => (
  <div className={styles.trx}>
    <a
      className={styles.link}
      href={`https://etherscan.io/tx/${value}`}
      target='_blank'
      rel='noopener noreferrer'
    >
      {value}
    </a>
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
