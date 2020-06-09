import React from 'react'
import { Metric } from './index'
import MoreInfoLink from '../../../components/MoreInfoLink/MoreInfoLink'

export const Description = {
  [Metric.social_volume_total.key]: (
    <>
      Shows the amount of mentions of the coin on 1000+ crypto social media
      channels, including Telegram groups, crypto subreddits, discord groups,
      private traders chats and more.{' '}
      <MoreInfoLink href='https://academy.santiment.net/metrics/social-volume/' />
    </>
  ),

  [Metric.age_destroyed.key]:
    'Tracks the movement of previously idle [Project Ticker] tokens. The metric shows the amount of [Project Ticker] changing addresses daily multiplied by the number of days since they last moved. Spikes indicate a significant amount of previously idle [Project Ticker] tokens moving between addresses. ',

  [Metric.exchange_balance.key]:
    'Shows the difference in the amount of [Project Ticker] tokens moving to and out of exchange wallets. If the value is positive, more [Project Ticker] entered the exchange than have left. If the value is negative, more [Project Ticker] flowed out of exchanges than flowed in. ',

  [Metric.daily_active_addresses.key]:
    'Shows the number of unique addresses involved in [Project Ticker] transactions daily. This metric indicates the daily level of crowd interaction (or speculation) with a token. ',

  [Metric.supply_on_exchanges.key]: (
    <>
      What amount of coins/tokens are stored in known exchange wallets.{' '}
      <MoreInfoLink href='https://academy.santiment.net/metrics/supply-on-or-outside-exchanges/' />
    </>
  ),

  [Metric.supply_outside_exchanges.key]: (
    <>
      What amount of coins/tokens are stored outside known exchange wallets.{' '}
      <MoreInfoLink href='https://academy.santiment.net/metrics/supply-on-or-outside-exchanges/' />
    </>
  ),

  [Metric.percent_of_total_supply_on_exchanges.key]: (
    <>
      The percent of the total token supply which is on exchanges.{' '}
      <MoreInfoLink href='https://academy.santiment.net/metrics/supply-on-or-outside-exchanges/' />
    </>
  ),

  [Metric.circulation.key]:
    'Shows only the number of unique [Project Ticker]  tokens transacted daily. If a token changes addresses 5 times on a given day, it will be counted only once by Token Circulation, and 5 times by Transaction Volume. ',

  [Metric.mvrv_usd.key]: (
    <>
      MVRV measures how much every holder originally paid for their coins, and
      compares that investment to the coin’s current price to calculate the
      average profit or loss across all holders. Example: if MVRV = 2, then, on
      average, all coin holders have (currently) doubled their initial
      investment.{' '}
      <MoreInfoLink href='https://academy.santiment.net/metrics/mvrv/' />
    </>
  ),

  [Metric.transaction_volume.key]:
    'Shows the aggregate amount of [Project Ticker]  tokens across all transactions that happened on the network daily. ',

  [Metric.network_growth.key]: (
    <>
      Shows the number of new addresses being created on the network each day.
      This metric illustrates user adoption over time, and can be used to
      identify when the project is gaining or losing traction.{' '}
      <MoreInfoLink href='https://academy.santiment.net/metrics/network-growth/' />
    </>
  ),

  [Metric.dev_activity.key]: (
    <>
      Shows the project’s development activity over time based on a number of
      pure development- related 'events' in the project’s public Github
      repository. (not counted: comments on issues, forks, stars, etc.).{' '}
      <MoreInfoLink href='https://academy.santiment.net/metrics/developer-activity/' />
    </>
  ),

  [Metric.velocity.key]:
    'Shows the average number of times that a single [Project Ticker] token changes addresses daily. Higher token velocity means that a single token is used more often in daily transactions. ',

  [Metric.twitter_followers.key]:
    "Shows the number of followers on the project's official Twitter account over time",

  [Metric.social_dominance_total.key]:
    'Shows the share (or %) of the coin’s mentions on crypto-related social media, compared to a pool of 50+ of the most talked-about projects online.',

  [Metric.realized_value_usd.key]:
    'Realized Cap shows the total amount that all holders spent to purchase the coin (i.e. the total acquisition cost). While market cap = supply X current price of each coin, realized cap = supply X price of each coin when it last ‘moved’',

  [Metric.gasUsed.key]:
    'How much ETH has moved out of team wallets over time. While not tracked all the way to exchanges, this metric may suggest potential selling activity',

  [Metric.mean_age.key]:
    'Shows the average amount of days that all [Project ticker] tokens stayed in their current addresses. Rising slope signals a network-wide accumulation trend. Drop-offs indicate increased movement of [Project Ticker] tokens between addresses. ',

  [Metric.mean_dollar_invested_age.key]: (
    <>
      For each coin we see how long it has stayed at its current address and we
      compute the average of all those ages. The difference between "coin age"
      and "dollar age" comes from the different way that we compute the
      averages.{' '}
      <MoreInfoLink href='https://insights.santiment.net/read/%F0%9F%93%A2-mean-age-653' />
    </>
  ),

  [Metric.nvt.key]: (
    <>
      NVT tries to determine how much ‘value’ is being transmitted on a coin’s
      network. This version of NVT is calculated by dividing the coin’s Market
      Cap by its Token Circulation. The higher the NVT, the more expensive the
      network relative to the value it transmits, indicating an overvalued
      asset. <MoreInfoLink href='https://academy.santiment.net/metrics/nvt/' />
    </>
  ),

  [Metric.nvt_transaction_volume.key]:
    'NVT tries to determine how much ‘value’ is being transmitted on a coin’s network. This version of NVT is calculated by dividing the coin’s Market Cap by its on-chain Transaction Volume. The higher the NVT, the more expensive the network relative to the value it transmits, indicating an overvalued asset.',

  [Metric.topHoldersPercentOfTotalSupply.key]:
    'Shows the combined balance of the top 10 addresses overall, as a percentage of the coin’s total circulating supply',
  [Metric.amount_in_top_holders.key]:
    'Shows the combined balance of the top N addresses overall',
  [Metric.amount_in_exchange_top_holders.key]:
    'Shows the combined balance of the top N addresses belonging to exchanges',
  [Metric.amount_in_non_exchange_top_holders.key]:
    'Shows the combined balance of the top N addresses that don’t belong to exchanges',

  holder_distribution:
    'Breaks down the number of addresses based on the amount of [Project Ticker] they hold',
  [Metric.ethSpentOverTime.key]:
    'Shows the amount of ETH moved out of the project’s ICO wallets over time',
  [Metric.minersBalance.key]:
    'Shows the combined ETH balance of addresses belonging to Ethereum mining pools',
  [Metric.gasUsed.key]:
    'Shows the amount of Gas accrued on the Ethereum network daily. Gas is a unit that measures the amount of computational effort it will take to successfully conduct a transaction or execute a contract on the Ethereum blockchain',
  [Metric.active_deposits.key]:
    'Shows the amount of unique [Project Ticker] deposit addresses daily. Deposit addresses are used to deposit cryptocurrencies to centralized exchanges. Spikes in this metric may indicate a rise in short-term sell pressure. ',
  [Metric.deposit_transactions.key]:
    'Shows the amount of all incoming and outgoing transactions involving [Project Ticker] deposit addresses daily. Deposit addresses are used to deposit cryptocurrencies to centralized exchanges. Spikes in this metric may indicate a rise in short-term sell pressure',
  [Metric.exchange_inflow.key]:
    'Shows the amount of [Project Ticker] moving to known exchange wallets daily. Excludes exchange-to-exchange transactions. Spikes in this metric may indicate a rise in short-term sell pressure. ',
  [Metric.exchange_outflow.key]:
    'Shows the amount of [Project Ticker] withdrawn from known exchange wallets daily. Excludes exchange-to-exchange transactions. Spikes in this metric may indicate a short-term accumulation trend. ',
  [Metric.supply_on_exchanges.key]:
    'Shows the total amount of [Project Ticker] located in known exchange wallets. Spikes in this metric may indicate a rise in short-term sell pressure. ',
  [Metric.percent_of_total_supply_on_exchanges.key]:
    'Shows the percentage of the total circulating supply of [Project Ticker] located in known exchange wallets. Spikes in this metric may indicate a rise in short-term sell pressure. ',
  [Metric.supply_outside_exchanges.key]:
    'Shows the total amount of [Project Ticker]  located outside of known exchange wallets. Spikes in this metric may indicate an accumulation trend. ',
  [Metric.withdrawal_transactions.key]:
    'Shows the amount of all incoming and outgoing transactions involving [Project Ticker] withdrawal addresses. Withdrawal addresses are used to withdraw cryptocurrencies from centralized exchanges. Spikes in this metric may indicate a short-term accumulation trend'
}

export const rebuildDescriptions = Submetrics => {
  Object.keys(Submetrics).forEach(key => {
    const list = Submetrics[key]

    switch (key) {
      case Metric.twitter_followers.key: {
        list.forEach(metric => {
          Description[metric.key] = `Shows the ${
            metric.replacements.timebound
          } change in the amount of followers of the project’s official Twitter account`
        })
        break
      }
      case Metric.circulation.key: {
        list.forEach(metric => {
          Description[
            metric.key
          ] = `Shows only the number of unique [Project Ticker] tokens transacted in the past ${
            metric.replacements.timebound
          } days. `
        })
        break
      }
      default: {
        break
      }
    }
  })
}
