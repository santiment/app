import React from 'react'
import { COLUMNS } from './columns'
import { useTrendingWords } from './hooks'
import Table from '../_Table'

const TrendsTable = ({ data, ...props }) => {
  const { trendingWords, isLoading } = useTrendingWords()

  const item = data[data.length - 1]
  const items = item && item.topWords

  return (
    <Table
      {...props}
      items={items}
      minRows={10}
      columns={COLUMNS}
      itemKeyProperty='word'
      isLoading={isLoading}
    />
  )
}

export default TrendsTable
