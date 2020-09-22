import React from 'react'
import Loader from '@santiment-network/ui/Loader/Loader'
import { useAssetsBalance } from './gql'
import { formatNumber } from '../../../utils/formatting'
import styles from './table.module.scss'

const UniswapLastBalance = ({ address }) => {
  const [assetsBalances, loading] = useAssetsBalance(address)

  const isLoading = loading && assetsBalances.length === 0
  const uniswapBalance = assetsBalances.find(
    ({ slug }) => slug === 'uniswap'
  ) || { balance: 0 }

  if (!address) {
    return null
  }

  if (isLoading) {
    return <Loader className={styles.loader} />
  }

  return <div>{formatNumber(uniswapBalance.balance)}</div>
}

export default UniswapLastBalance
