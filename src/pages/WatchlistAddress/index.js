import React, { useMemo } from 'react'
import cx from 'classnames'
import Chart from './Chart'
import Page from '../../ducks/Page'
import BaseActions from '../../ducks/Watchlists/Widgets/TopPanel/BaseActions'
import Table, { prepareColumns } from './Table'
import { useAddressWatchlist } from './hooks'
import {
  Label,
  CollapsedLabels
} from '../../ducks/HistoricalBalance/Address/Labels'
import ValueChange from '../../components/ValueChange/ValueChange'
import styles from './index.module.scss'

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

const COLUMNS = prepareColumns([
  {
    title: '',
    render: () => {}
  },
  {
    title: '#',
    render: (_, i) => i,
    className: styles.index
  },
  {
    title: 'Transaction address',
    render: ({ address }) => address
  },
  {
    title: 'Current balance',
    render: ({ balanceChange }) => balanceValue.format(balanceChange.balanceEnd)
  },
  {
    title: 'Balance, 7d, %',
    render: ({ balanceChange }) => (
      <ValueChange
        change={balanceChange.balanceChangePercent}
        // className={styles.valueChange}
      />
    )
  },
  {
    title: 'Balance, 7d',
    render: ({ address, balanceChange }) => (
      <Chart address={address} change={balanceChange.balanceChangePercent} />
    )
  },
  {
    title: 'Labels',
    render: Labels
  }
])

const itemAccessor = ({ blockchainAddress }) => blockchainAddress

const WatchlistAddress = ({ ...props }) => {
  const { watchlist, isLoading } = useAddressWatchlist()
  console.log(watchlist)

  return (
    <Page
      title='My watchlist'
      actions={
        <>
          <div className={styles.edit}>Edit</div>
          <div className={styles.share}>Share</div>
        </>
      }
    >
      <Table
        className={styles.table}
        columns={COLUMNS}
        items={watchlist.listItems}
        itemKeyProperty='address'
        itemAccessor={itemAccessor}
        isLoading={isLoading}
      />
    </Page>
  )
}

export default WatchlistAddress
