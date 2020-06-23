import React from 'react'
import { Metric } from './index'
import styles from './Frequence.module.scss'

const FrequenceLink = ({ href, children }) => {
  return (
    <a
      className={styles.link}
      target='_blank'
      rel='noopener noreferrer'
      href={href}
    >
      {children}
    </a>
  )
}

const FiveMinute = (
  <FrequenceLink href='https://academy.santiment.net/metrics/details/frequency#five-minute-frequency'>
    Five-Minute Intervals
  </FrequenceLink>
)
const Daily = (
  <FrequenceLink href='https://academy.santiment.net/metrics/details/frequency#daily-frequency'>
    Daily Intervals
  </FrequenceLink>
)

// [GarageInc] Missed Sentiment, Spent Coin Cost, Top Social Gainers / Losers
// [GarageInc] Missed Community Messages Count, Top Holders

const Frequences = {
  [Metric.age_destroyed.key]: FiveMinute,
  [Metric.circulation.key]: Daily,
  [Metric.daily_active_addresses.key]: Daily,
  [Metric.active_deposits.key]: Daily,
  [Metric.dev_activity.key]: FiveMinute,
  [Metric.exchange_inflow.key]: FiveMinute,
  [Metric.exchange_outflow.key]: FiveMinute,
  [Metric.exchange_balance.key]: FiveMinute,
  [Metric.mvrv_usd.key]: Daily,
  [Metric.mean_age.key]: Daily,
  [Metric.nvt.key]: Daily,
  [Metric.network_growth.key]: Daily,
  [Metric.supply_on_exchanges.key]: Daily,
  [Metric.supply_outside_exchanges.key]: Daily,
  [Metric.percent_of_total_supply_on_exchanges.key]: Daily,
  [Metric.price_usd.key]: FiveMinute,
  [Metric.price_btc.key]: FiveMinute,
  [Metric.price_eth.key]: FiveMinute,
  [Metric.volume_usd.key]: FiveMinute,
  [Metric.marketcap_usd.key]: FiveMinute,
  [Metric.realized_value_usd.key]: Daily,
  [Metric.social_dominance_total.key]: FiveMinute,
  [Metric.social_volume_total.key]: FiveMinute,
  [Metric.social_volume_total.key]: FiveMinute,
  [Metric.transaction_volume.key]: FiveMinute,
  [Metric.velocity.key]: Daily
}

export default Frequences
