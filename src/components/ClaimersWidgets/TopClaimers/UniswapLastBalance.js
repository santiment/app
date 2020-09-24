import React, { useState, useEffect } from 'react'
import Loader from '@santiment-network/ui/Loader/Loader'
import { useAssetsBalance } from './gql'
import { formatNumber } from '../../../utils/formatting'
import { getLoadingStatus, finishLoading } from './utils'
import styles from './table.module.scss'

const UniswapLastBalance = ({ address: defaultAddress }) => {
  const [status, setStatus] = useState('')
  const [address, setAddress] = useState(defaultAddress)

  if (!status) {
    checkStatus()
  }

  useEffect(
    () => {
      if (address !== defaultAddress) {
        const newStatus = getLoadingStatus(defaultAddress)
        setStatus(newStatus)
        setAddress(defaultAddress)
      }
    },
    [defaultAddress]
  )

  function checkStatus () {
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
