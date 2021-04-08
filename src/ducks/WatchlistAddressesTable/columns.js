import React from 'react'
import MiniChart from './MiniChart'
import Labels from './Labels'
import { prepareColumns } from '../_Table'
import Note from './Note'
import ValueChange from '../../components/ValueChange/ValueChange'
import styles from './index.module.scss'
import { CHECKBOX_COLUMN, INDEX_COLUMN } from '../_Table/columns'

export const DEFAULT_COLUMNS = [CHECKBOX_COLUMN, INDEX_COLUMN]
export const CATEGORIES = {
  ASSET: 'Asset columns',
  GENERAL: 'General'
}

const balanceValue = new Intl.NumberFormat('en', {
  maximumFractionDigits: 2
})

export const COLUMNS = DEFAULT_COLUMNS.concat(
  prepareColumns([
    // {
    //   title: 'Current ETH balance',
    //   render: ({ balanceChange }) =>
    //     balanceChange && balanceValue.format(balanceChange.balanceEnd)
    // },
    // {
    //   title: 'ETH balance, 7d, %',
    //   render: ({ balanceChange }) =>
    //     balanceChange && (
    //       <ValueChange change={balanceChange.balanceChangePercent} />
    //     )
    // },
    // {
    //   title: 'ETH balance, 7d',
    //   render: ({ address, balanceChange }) =>
    //     balanceChange && (
    //       <MiniChart
    //         address={address}
    //         change={balanceChange.balanceChangePercent}
    //       />
    //     )
    // },
    {
      title: 'Labels',
      render: Labels
    },
    {
      title: 'Note, max 80 chars',
      render: Note
    }
  ])
)

export const ADDRESS_COLUMN = {
  title: 'Address',
  key: 'address',
  label: 'Address',
  category: CATEGORIES.GENERAL,
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
}

export const LABELS_COLUMN = {
  title: 'Labels',
  label: 'Address labels',
  category: CATEGORIES.GENERAL,
  key: 'labels',
  render: Labels
}

export const NOTE_COLUMN = {
  title: 'Note, max 80 chars',
  category: CATEGORIES.GENERAL,
  label: 'Address note',
  key: 'notes',
  render: Note
}

export const CURRENT_BALANCE_CELL = slug => obj =>
  obj[slug] && balanceValue.format(obj[slug].balanceEnd)
