import React from 'react'
import { COLUMNS } from './columns'
import { useTrendingWords } from './hooks'
import Table from '../_Table'
import styles from './index.module.scss'

const LINK_SELECTOR = `.${styles.word}`

const TrendsTable = ({ data, ...props }) => {
  const { trendingWords, isLoading } = useTrendingWords()

  const item = data[data.length - 1]
  const items = item && item.topWords

  function onRowClick (_, { currentTarget }) {
    currentTarget.querySelector(LINK_SELECTOR).click()
  }

  return (
    <Table
      {...props}
      className={styles.table}
      items={trendingWords || items}
      minRows={10}
      columns={COLUMNS}
      itemKeyProperty='word'
      isLoading={isLoading}
      onRowClick={onRowClick}
    />
  )
}

export default TrendsTable
