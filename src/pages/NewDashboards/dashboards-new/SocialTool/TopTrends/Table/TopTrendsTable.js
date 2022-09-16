import React from 'react'
import Table from '../../../../../../ducks/_Table'
import { useTrendingWords } from '../../../../../../ducks/TrendsTable/hooks'
import { useColumns } from '../../../../../../ducks/_Table/hooks'
import { COLUMNS } from './Columns/TopTrendsColumns'
import topTrendsColumnsStyles from './Columns/TopTrendsColumns.module.scss'
import styles from './TopTrendsTable.module.scss'

const LINK_SELECTOR = `.${topTrendsColumnsStyles.word}`

const TopTrendsTable = ({ period }) => {
  const { trendingWords, words, isLoading } = useTrendingWords(period)
  const columns = useColumns(COLUMNS)

  function onRowClick(_, { target, currentTarget }) {
    if (!target.closest('a')) {
      currentTarget.querySelector(LINK_SELECTOR).click()
    }
  }

  return (
    <Table
      className={styles.table}
      headerClassName={styles.tableHeader}
      items={trendingWords}
      columns={columns}
      itemKeyProperty='word'
      itemProps={{ words }}
      minRows={10}
      isLoading={isLoading}
      onRowClick={onRowClick}
    />
  )
}

export default TopTrendsTable
