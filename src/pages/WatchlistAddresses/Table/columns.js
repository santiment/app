import React from 'react'
import {
  Label,
  CollapsedLabels
} from '../../../ducks/HistoricalBalance/Address/Labels'
import { prepareColumns } from '../../../ducks/_Table'
import Chart from '../Chart'
import ValueChange from '../../../components/ValueChange/ValueChange'
import { DEFAULT_COLUMNS } from '../../../ducks/WatchlistTable'

import styles from '../index.module.scss'

const balanceValue = new Intl.NumberFormat('en', {
  maximumFractionDigits: 2
})

const Labels = ({ labels }) => {
  const visibleLabels = labels.slice(0, 2)
  const hiddenLabels = labels.slice(2)

  return (
    <div className={styles.labels}>
      {visibleLabels.map(Label)}
      {!!hiddenLabels.length && <CollapsedLabels labels={hiddenLabels} />}
    </div>
  )
}

export const COLUMNS = DEFAULT_COLUMNS.concat(
  prepareColumns([
    {
      title: 'Transaction address',
      render: ({ address }) => address
    },
    {
      title: 'Current balance',
      render: ({ balanceChange }) =>
        balanceChange && balanceValue.format(balanceChange.balanceEnd)
    },
    {
      title: 'Balance, 7d, %',
      render: ({ balanceChange }) =>
        balanceChange && (
          <ValueChange change={balanceChange.balanceChangePercent} />
        )
    },
    {
      title: 'Balance, 7d',
      render: ({ address, balanceChange }) =>
        balanceChange && (
          <Chart
            address={address}
            change={balanceChange.balanceChangePercent}
          />
        )
    },
    {
      title: 'Labels',
      render: Labels
    }
  ])
)
