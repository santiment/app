import React from 'react'
import cx from 'classnames'
import { COLUMNS, Column } from './columns'
import { useTrendingWords } from './hooks'
import Table from '../_Table'
import { useColumns } from '../_Table/hooks'
import { newRenderQueue, withRenderQueueProvider } from '../renderQueue/sized'
import styles from './index.module.scss'

const LINK_SELECTOR = `.${styles.word}`
const COMPACT_HIDDEN_COLUMNS = [Column.TRENDING_CHART, Column.CONNECTED_WORDS]

const TrendsTable = ({
  className,
  period,
  hiddenColumnIds,
  isCompact,
  ...props
}) => {
  const { trendingWords, isLoading } = useTrendingWords(period)
  const columns = useColumns(
    COLUMNS,
    isCompact ? COMPACT_HIDDEN_COLUMNS : hiddenColumnIds
  )

  function onRowClick (_, { currentTarget }) {
    currentTarget.querySelector(LINK_SELECTOR).click()
  }

  return (
    <Table
      {...props}
      className={cx(styles.table, className, isCompact && styles.compact)}
      items={trendingWords}
      minRows={10}
      columns={columns}
      itemKeyProperty='word'
      isLoading={isLoading}
      onRowClick={onRowClick}
    />
  )
}

export default withRenderQueueProvider(TrendsTable, newRenderQueue(2))
