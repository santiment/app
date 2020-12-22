import React from 'react'
import { COLUMNS } from './columns'
import Section from '../Section'
import { useRecentTransactions } from '../hooks'
import PagedTable from '../../_Table/Paged'
import styles from './index.module.scss'

const LatestTransactions = ({ settings }) => {
  const { recentTransactions, isLoading } = useRecentTransactions(settings)

  return (
    <Section title='Latest transactions'>
      <PagedTable
        className={styles.table}
        columns={COLUMNS}
        itemKeyProperty='trxHash'
        items={recentTransactions}
        isLoading={isLoading}
        minRows={10}
        itemProps={settings}
      />
    </Section>
  )
}

export default LatestTransactions
