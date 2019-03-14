import React from 'react'
import Assets from './../pages/assets/Assets'
import EthSpentTable from './../components/EthSpentTable'

const EthSpent = () => (
  <Assets type='erc20' render={Assets => <EthSpentTable {...Assets} />} />
)

export default EthSpent
