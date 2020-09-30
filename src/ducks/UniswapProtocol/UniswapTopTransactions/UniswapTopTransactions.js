import React, { useState, useMemo } from 'react'
import { useQuery } from '@apollo/react-hooks'
import Toggle from '@santiment-network/ui/Toggle'
import Loader from '@santiment-network/ui/Loader/Loader'
import { DAY, getTimeIntervalFromToday } from '../../../utils/dates'
import { TOP_TOKEN_TRANSACTIONS_QUERY } from '../../Studio/Widget/TopTransactionsTable/gql'
import TransactionsTable from '../../../pages/Detailed/transactionsInfo/TransactionTable'
import { normalizeTransactionData } from '../../../pages/Detailed/transactionsInfo/utils'
import styles from './UniswapTopTransactions.module.scss'

const EXCLUDED_ADDRESSES = [
  '0x41653c7d61609d856f29355e404f310ec4142cfb',
  '0x4750c43867ef5f89869132eccf19b9b6c4286e1a',
  '0x4b4e140d1f131fdad6fb59c13af796fd194e4135',
  '0xe3953d9d317b834592ab58ab2c7a6ad22b54075d',
  '0x090d4613473dee047c3f2706764f49e0821d256e',
  '0x3d30b1ab88d487b0f3061f40de76845bec3f1e94',
  '0x3032ab3fa8c01d786d29dade018d7f2017918e12',
  '0x8fdb3816fe10e16aaa9b12b3c4688c873efe2eca'
]

const { from, to } = getTimeIntervalFromToday(-30, DAY)
const slug = 'uniswap'
const TRANSACTIONS_COUNT = 25

function useProjectTopTransactions (slug, from, to, limit, excludedAddresses) {
  const { data, loading } = useQuery(TOP_TOKEN_TRANSACTIONS_QUERY, {
    variables: {
      slug,
      from,
      to,
      limit,
      excludedAddresses
    }
  })

  let result

  if (data && data.projectBySlug) {
    result = data.projectBySlug.tokenTopTransactions
  }

  return [result || [], loading]
}

const UniswapTopTransactions = () => {
  const [isExclude, setIsExclude] = useState(true)
  const [transactions, loading] = useProjectTopTransactions(
    slug,
    from,
    to,
    TRANSACTIONS_COUNT,
    isExclude ? EXCLUDED_ADDRESSES : []
  )
  const normalizedData = useMemo(
    () => transactions.map(trx => normalizeTransactionData(slug, trx)),
    [transactions]
  )

  return (
    <>
      <div className={styles.title}>
        <h3 className={styles.text}>Top Token Transactions, 30d</h3>
        {loading && <Loader className={styles.loader} />}
        <div
          className={styles.toggleWrapper}
          onClick={() => setIsExclude(!isExclude)}
        >
          Include initial distribution addresses
          <Toggle className={styles.toggle} isActive={!isExclude} />
        </div>
      </div>
      <TransactionsTable
        header={null}
        data={normalizedData}
        defaultPageSize={50}
        className={styles.table}
      />
    </>
  )
}

export default UniswapTopTransactions
