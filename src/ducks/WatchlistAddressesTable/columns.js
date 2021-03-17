import React from 'react'
import MiniChart from './MiniChart'
import Labels from './Labels'
import { prepareColumns } from '../_Table'
import Note from './Note'
import { DEFAULT_COLUMNS } from '../WatchlistTable'
import ValueChange from '../../components/ValueChange/ValueChange'
import styles from './index.module.scss'

const balanceValue = new Intl.NumberFormat('en', {
  maximumFractionDigits: 2
})

export const COLUMNS = DEFAULT_COLUMNS.concat(
  prepareColumns([
    {
      title: 'Address',
      render: ({ address }) => (
        <a
          className={styles.address}
          href={`/labs/balance?address=${address}`}
          rel='noopener noreferrer'
          target='_blank'
        >
          {address}
        </a>
      )
    },
    {
      title: 'Current ETH balance',
      render: ({ balanceChange }) =>
        balanceChange && balanceValue.format(balanceChange.balanceEnd)
    },
    {
      title: 'ETH balance, 7d, %',
      render: ({ balanceChange }) =>
        balanceChange && (
          <ValueChange change={balanceChange.balanceChangePercent} />
        )
    },
    {
      title: 'ETH balance, 7d',
      render: ({ address, balanceChange }) =>
        balanceChange && (
          <MiniChart
            address={address}
            change={balanceChange.balanceChangePercent}
          />
        )
    },
    {
      title: 'Labels',
      render: Labels
    },
    {
      title: 'Note, max 45 chars',
      render: Note
    }
  ])
)
