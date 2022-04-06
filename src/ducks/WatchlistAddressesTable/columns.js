import React from 'react'
import MiniChart from './MiniChart'
import Labels from './Labels'
import { prepareColumns } from '../_Table'
import Note from './Note'
import AssetsDistributionColumn from './AssetsDistribution'
import { CHECKBOX_COLUMN, INDEX_COLUMN } from '../_Table/columns'
import ValueChange from '../../components/ValueChange/ValueChange'
import styles from './index.module.scss'

export const CATEGORIES = {
  ASSET: 'Asset columns',
  GENERAL: 'General',
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
  ),
}

export const DEFAULT_COLUMNS = [CHECKBOX_COLUMN, INDEX_COLUMN, ADDRESS_COLUMN]

const balanceValue = new Intl.NumberFormat('en', {
  maximumFractionDigits: 2,
})

export const combineColumns = (dynamicColumns) =>
  DEFAULT_COLUMNS.concat(prepareColumns(dynamicColumns))

export const LABELS_COLUMN = {
  title: 'Labels',
  label: 'Address labels',
  category: CATEGORIES.GENERAL,
  key: 'labels',
  scheme: `labels { name origin }`,
  render: Labels,
}

export const NOTE_COLUMN = {
  title: 'Note, max 80 chars',
  category: CATEGORIES.GENERAL,
  label: 'Address note',
  key: 'notes',
  render: Note,
}

const ASSETS_DISTRIBUTION_CELL = (obj) =>
  obj.address && (
    <AssetsDistributionColumn address={obj.address} infrastructure={obj.infrastructure} />
  )

export const ASSETS_DISTRIBUTION_COLUMN = {
  title: 'Assets USD distribution',
  category: CATEGORIES.GENERAL,
  label: 'Assets USD distribution',
  key: 'distribution',
  scheme: ' ',
  render: ASSETS_DISTRIBUTION_CELL,
}

export const CURRENT_BALANCE_CELL = (key) => (obj) =>
  obj[key] && balanceValue.format(obj[key].balanceEnd)

export const BALANCE_CHANGE_PERCENT_CELL = (key) => (obj) =>
  obj[key] && <ValueChange change={obj[key].balanceChangePercent} />

export const BALANCE_CHANGE_CHART_CELL = (key, slug) => (obj) =>
  obj[key] && <MiniChart address={obj.address} slug={slug} change={obj[key].balanceChangePercent} />
