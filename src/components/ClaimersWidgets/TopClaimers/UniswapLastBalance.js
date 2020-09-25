import React, { useState, useEffect } from 'react'
import Loader from '@santiment-network/ui/Loader/Loader'
import { useUniswapBalance } from './gql'
import { formatNumber } from '../../../utils/formatting'
import { getLoadingStatus, finishLoading } from './utils'
import styles from './table.module.scss'

const UniswapLastBalance = ({ address: defaultAddress, change }) => {
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
    }, 5000)
  }

  const [historicalBalance = [], loading] = useUniswapBalance(
    status ? address : null
  )

  if (
    status === 'loading' &&
    loading === false &&
    historicalBalance.length > 0
  ) {
    finishLoading(address)
    setStatus('finished')
  }

  const isLoading =
    status !== 'finished' || (loading && historicalBalance.length === 0)

  if (!address) {
    return null
  }

  if (isLoading) {
    return <Loader className={styles.loader} />
  }

  if (historicalBalance.length < 28) {
    return null
  }

  let balance = 0
  let balanceChange = 0
  const currentBalance =
    historicalBalance[historicalBalance.length - 1].balance || 0

  if (!change) {
    return <div>{formatNumber(currentBalance)}</div>
  }

  if ((change = '24h')) {
    const lastDayBalance =
      historicalBalance[historicalBalance.length - 2].balance || 0
    return <div>{formatNumber(currentBalance - lastDayBalance)}</div>
    // balanceChange = 0
  }

  if ((change = '30d')) {
    const lastMonthBalance = historicalBalance[0].balance || 0
    return <div>{formatNumber(currentBalance - lastMonthBalance)}</div>
    // balanceChange = 0
  }
}

export default UniswapLastBalance
