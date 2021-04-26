import React from 'react'
import { useWalletAssets } from '../HistoricalBalance/hooks'
import AssetsDistribution from '../HistoricalBalance/Address/AssetsDistribution'
import styles from './index.module.scss'

const AssetsDistributionColumn = ({ address, infrastructure }) => {
  const { walletAssets, isError } = useWalletAssets({ address, infrastructure })

  return (
    <AssetsDistribution
      skipTitle
      walletAssets={walletAssets}
      isError={isError}
      classes={{ histogramClassName: styles.histogram }}
    />
  )
}

export default AssetsDistributionColumn
