import React from 'react'
import { useWalletAssets } from '../HistoricalBalance/hooks'
import AssetsDistribution from '../HistoricalBalance/Address/AssetsDistribution'

const AssetsDistributionColumn = ({ address, infrastructure }) => {
  const { walletAssets, isError } = useWalletAssets({ address, infrastructure })

  return (
    <AssetsDistribution
      skipTitle
      walletAssets={walletAssets}
      isError={isError}
    />
  )
}

export default AssetsDistributionColumn
