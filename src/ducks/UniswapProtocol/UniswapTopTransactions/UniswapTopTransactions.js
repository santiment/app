import React from 'react'
import DetailedTransactionsTable from '../../../pages/Detailed/transactionsInfo/DetailedTransactionsTable'
import withProject from '../../../pages/Detailed/withProject'

const TransactionsWrapper = withProject(({ project }) => (
  <DetailedTransactionsTable project={project} />
))

const UniswapTopTransactions = () => {
  return <TransactionsWrapper slug={'uniswap'} />
}

export default UniswapTopTransactions
