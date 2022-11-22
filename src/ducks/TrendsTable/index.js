import React from 'react'
import cx from 'classnames'
import Table from '../_Table'
import { useColumns } from '../_Table/hooks'
import { useTrendingWords } from './hooks'
import { COLUMNS, Column } from './columns'
import columnsStyles from './columns.module.scss'
import styles from './index.module.scss'

const LINK_SELECTOR = `.${columnsStyles.word}`
const COMPACT_HIDDEN_COLUMNS = [Column.TRENDING_CHART, Column.CONNECTED_WORDS, Column.SOCIAL_VOLUME]

const TrendsTable = ({
  className,
  period,
  dominance,
  hiddenColumnIds,
  isCompact,
  isDesktop,
  ...props
}) => {
  const { trendingWords, words, isLoading } = useTrendingWords(period)
  const columns = useColumns(COLUMNS, isCompact ? COMPACT_HIDDEN_COLUMNS : hiddenColumnIds)

  function onRowClick(_, { target, currentTarget }) {
    if (!target.closest('a')) {
      currentTarget.querySelector(LINK_SELECTOR).click()
    }
  }

  return (
    <Table
      {...props}
      className={cx(
        styles.table,
        className,
        isCompact && styles.compact,
        trendingWords.length === 0 && styles.empty,
      )}
      headerClassName={styles.tableHeader}
      items={trendingWords}
      minRows={10}
      columns={columns}
      itemKeyProperty='word'
      itemProps={{ words, isDesktop, dominance }}
      isLoading={isLoading}
      onRowClick={onRowClick}
    />
  )
}

export default TrendsTable
