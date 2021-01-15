import React from 'react'
import cx from 'classnames'
import { COLUMNS } from './columns'
import { useTrendingWords } from './hooks'
import Table from '../_Table'
import styles from './index.module.scss'

const LINK_SELECTOR = `.${styles.word}`

const TrendsTable = ({ className, ...props }) => {
  const { trendingWords, isLoading } = useTrendingWords()

  function onRowClick (_, { currentTarget }) {
    currentTarget.querySelector(LINK_SELECTOR).click()
  }

  return (
    <Table
      {...props}
      className={cx(styles.table, className)}
      items={trendingWords}
      minRows={10}
      columns={COLUMNS}
      itemKeyProperty='word'
      isLoading={isLoading}
      onRowClick={onRowClick}
    />
  )
}

export default TrendsTable
