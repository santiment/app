import React, { useState, useMemo } from 'react'
import cx from 'classnames'
import { Checkbox } from '@santiment-network/ui/Checkboxes'
import Chart from './Chart'
import Actions from './Actions'
import Page from '../../ducks/Page'
import Table, { prepareColumns } from './Table'
import {
  useAddressWatchlist,
  useIsWatchlistAuthor,
  useAddressWatchlistItems
} from './hooks'
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
    id: 'CHECKBOX',
    Title: ({ selectAll, isAllItemSelected }) => (
      <Checkbox onClick={selectAll} isActive={isAllItemSelected} />
    ),
    render: (item, { selectItem, selectedItemsSet }) => (
      <Checkbox
        onClick={() => selectItem(item)}
        isActive={selectedItemsSet.has(item)}
      />
    ),
    className: styles.checkbox
  },
  {
    title: '#',
    render: (_, __, i) => i,
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
      <ValueChange change={balanceChange.balanceChangePercent} />
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

const SET = new Set()
function useSelectedItemsSet (items) {
  const [selectedItemsSet, setSelectedItemsSet] = useState(SET)

  function selectItem (item) {
    const newState = new Set(selectedItemsSet)

    if (newState.has(item)) {
      newState.delete(item)
    } else {
      newState.add(item)
    }

    setSelectedItemsSet(newState)
  }

  function selectAll () {
    setSelectedItemsSet(
      selectedItemsSet.size === items.length ? SET : new Set(items)
    )
  }

  return {
    selectedItemsSet,
    selectItem,
    selectAll,
    isAllItemSelected: selectedItemsSet.size === items.length
  }
}

const WatchlistAddress = ({ ...props }) => {
  const { watchlist, isLoading } = useAddressWatchlist()
  const isAuthor = useIsWatchlistAuthor(watchlist)
  const items = useAddressWatchlistItems(watchlist)
  const obj = useSelectedItemsSet(items)
  console.log(watchlist)

  return (
    <Page
      title={watchlist.name}
      actions={<Actions watchlist={watchlist} isAuthor={isAuthor} />}
    >
      <Table
        className={styles.table}
        columns={COLUMNS}
        items={items}
        itemKeyProperty='address'
        itemProps={obj}
        isLoading={isLoading}
      />
    </Page>
  )
}

export default WatchlistAddress
