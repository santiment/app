import React from 'react'
import MiniChart from './MiniChart'
import Labels from './Labels'
import { prepareColumns } from '../_Table'
import Note from './Note'
import ValueChange from '../../components/ValueChange/ValueChange'
import styles from './index.module.scss'
import { CHECKBOX_COLUMN, INDEX_COLUMN } from '../_Table/columns'

export const CATEGORIES = {
  ASSET: 'Asset columns',
  GENERAL: 'General'
}

const ADDRESS_COLUMN = {
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

export const DEFAULT_COLUMNS = [CHECKBOX_COLUMN, INDEX_COLUMN, ADDRESS_COLUMN]

const balanceValue = new Intl.NumberFormat('en', {
  maximumFractionDigits: 2
})

export const combineColumns = dynamicColumns =>
  DEFAULT_COLUMNS.concat(prepareColumns(dynamicColumns))

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

export const BALANCE_CHANGE_PERCENT_CELL = slug => obj =>
  obj[slug] && <ValueChange change={obj[slug].balanceChangePercent} />

export const BALANCE_CHANGE_CHART_CELL = slug => obj =>
  obj[slug] && (
    <MiniChart address={obj.address} change={obj[slug].balanceChangePercent} />
  )
