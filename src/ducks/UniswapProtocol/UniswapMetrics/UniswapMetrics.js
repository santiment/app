import React from 'react'
import UniswapMetric from './UniswapMetric'
import styles from './UniswapMetrics.module.scss'

const UniswapMetricsList = [
  {
    human_readable_name: 'Uniswap Total Claimed',
    key: 'uniswap_total_claimed'
  },
  {
    human_readable_name: 'Uniswap Total Claimed for Users',
    key: 'uniswap_cliamed_for_users'
  },
  {
    human_readable_name: 'Uniswap Total Claimed for Liquidity Providers',
    key: 'uniswap_claimed_for_lps'
  },
  {
    human_readable_name: 'Uniswap Percent Claimed',
    key: 'uniswap_percent_claimed'
  },
  {
    human_readable_name: 'Uniswap Number of Claims',
    key: 'uniswap_number_of_claims'
  },
  {
    human_readable_name: 'Uniswap Number of Claims by Liquidity Providers',
    key: 'uniswap_number_of_claims_by_lps'
  },
  {
    human_readable_name: 'Uniswap Amount Claimed',
    key: 'uniswap_amount_claimed'
  },
  {
    human_readable_name: 'Uniswap Amount Claimed by Liquidity Providers',
    key: 'uniswap_amount_claimed_by_lps'
  }
]

const UniswapMetrics = () => {
  return (
    <div className={styles.container}>
      {UniswapMetricsList.map(m => {
        return <UniswapMetric key={m.key} metric={m} />
      })}
    </div>
  )
}

export default UniswapMetrics
