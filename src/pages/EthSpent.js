import React from 'react'
import GetAssets from './../pages/assets/GetAssets'
import EthSpentTable from './../components/EthSpentTable'

const EthSpent = () => (
  <GetAssets type='erc20' render={Assets => <EthSpentTable {...Assets} />} />
)

export default EthSpent
