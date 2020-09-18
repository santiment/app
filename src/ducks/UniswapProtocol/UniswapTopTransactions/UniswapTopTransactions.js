import React from 'react'
import DetailedTransactionsTable from '../../../pages/Detailed/transactionsInfo/DetailedTransactionsTable'
import withProject from '../../../pages/Detailed/withProject'

const TransactionsWrapper = withProject(({ project }) => {
  return (
    <DetailedTransactionsTable
      project={project}
      show='tokenTopTransactions'
      title={null}
    />
  )
})

const UniswapTopTransactions = () => {
  return <TransactionsWrapper slug={'uniswap'} />
}

export default UniswapTopTransactions
