import React, { useMemo, useState } from 'react'
import { normalizeTransactionData } from '../../../pages/Detailed/transactionsInfo/utils'
import TransactionTable from '../../../pages/Detailed/transactionsInfo/TransactionTable'
import { useProjectTopTransactions } from '../../Studio/Widget/TopTransactionsTable'
import { DEFAULT_STABLECOIN } from '../HolderDistribution/StablecoinHolderDistribution'
import StablecoinSelector from '../StablecoinSelector/StablecoinSelector'
import styles from './StablecoinsTransactions.module.scss'

const StablecoinsTransactions = ({ from, to }) => {
  const [asset, setAsset] = useState(DEFAULT_STABLECOIN)

  const { slug } = asset

  const [transactions, loading] = useProjectTopTransactions(slug, from, to)
  const normalizedData = useMemo(
    () => transactions.map(trx => normalizeTransactionData(slug, trx)),
    [transactions]
  )

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <StablecoinSelector asset={asset} setAsset={setAsset} />
      </div>

      <TransactionTable
        header={null}
        data={normalizedData}
        loading={loading}
        showPagination
        defaultPageSize={12}
      />
    </div>
  )
}

export default StablecoinsTransactions
