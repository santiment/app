import React from 'react'
import { useAddressHistoricalBalance } from './hooks'
import Chart from '../../components/MiniChart'

const MiniChart = ({ address, change }) => {
  const data = useAddressHistoricalBalance(address)

  return <Chart valueKey='balance' data={data} change={change} />
}

export default MiniChart
