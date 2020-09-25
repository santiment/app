import React from 'react'
import TransactionTable from './TransactionTable'
import { normalizeTransactionData } from './utils'

const DetailedTopTransactions = ({
  project,
  show = 'ethTopTransactions',
  title = 'Top ETH transactions'
}) => {
  const slug = project.slug || ''
  const data = project[show]
    ? project[show].slice(0, 10).map(trx => normalizeTransactionData(slug, trx))
    : []

  return <TransactionTable header={title} data={data} slug={project.slug} />
}

export default DetailedTopTransactions
