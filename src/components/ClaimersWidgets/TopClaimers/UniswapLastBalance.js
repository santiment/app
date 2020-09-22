import React, { useState } from 'react'
import Loader from '@santiment-network/ui/Loader/Loader'
import { useAssetsBalance } from './gql'
import { formatNumber } from '../../../utils/formatting'
import { getLoadingStatus, finishLoading } from './utils'
import styles from './table.module.scss'

const UniswapLastBalance = ({ address }) => {
	const [status, setStatus] = useState('')

  if (!status) {
  	checkStatus()
  }

  function checkStatus() {
  	setTimeout(() => {
  		const newStatus = getLoadingStatus(address)
  		if (newStatus !== status) setStatus(newStatus)
  		if (!newStatus) checkStatus()
  	}, 1000)
  }

  const [assetsBalances, loading] = useAssetsBalance(status ? address : null)

  if (status === 'loading' && loading === false && assetsBalances) {
  	finishLoading(address)
  	setStatus('finished')
  }

  const isLoading = status !== 'finished' || (loading && !assetsBalances)

  if (!address) {
    return null
  }

  if (isLoading) {
    return <Loader className={styles.loader} />
  }

  const uniswapBalance = (assetsBalances || []).find(
    ({ slug }) => slug === 'uniswap'
  ) || { balance: 0 }


  return <div>{formatNumber(uniswapBalance.balance)}</div>
}

export default UniswapLastBalance
