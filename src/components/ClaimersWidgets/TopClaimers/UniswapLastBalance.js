import React from 'react'
import Loader from '@santiment-network/ui/Loader/Loader'
// import { useAssetsBalance } from './gql'
import styles from './table.module.scss'

const UniswapLastBalance = ({ address }) => {
  // const [assetsBalance, loading] = useAssetsBalance(address)
  // console.log(assetsBalance)
  return <Loader className={styles.loader} />
}

export default UniswapLastBalance
