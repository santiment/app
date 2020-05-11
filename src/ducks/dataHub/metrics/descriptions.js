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

  [Metric.age_destroyed.key]: (
    <>
      Shows the amount of tokens changing addresses on a certain date,
      multiplied by the number of days since they last moved.{' '}
      <MoreInfoLink href='https://academy.santiment.net/metrics/age-consumed/' />
    </>
  ),

  [Metric.exchange_balance.key]: (
    <>
      The flows of tokens going in to and out of exchange wallets combined on
      one graph. If the value is positive, more tokens entered the exchange than
      left. If the value is negative, more flowed out of exchanges than flowed
      in.{' '}
      <MoreInfoLink href='https://academy.santiment.net/metrics/exchange-funds-flow/' />
    </>
  ),

  [Metric.daily_active_addresses.key]: (
    <>
      Shows the number of unique network addresses involved in transactions on a
      certain date. Simply put, DAA indicates the daily level of crowd
      interaction (or speculation) with a certain token.{' '}
      <MoreInfoLink href='https://academy.santiment.net/metrics/daily-active-addresses/' />
    </>
  ),

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

  [Metric.circulation.key]: (
    <>
      Shows the number of unique tokens being used during each day. If one token
      changes hands 5 times on a given day, it will be counted once by the token
      circulation, but 5 times by the transaction volume.{' '}
      <MoreInfoLink href='https://academy.santiment.net/metrics/circulation/' />
    </>
  ),

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

  [Metric.transaction_volume.key]: (
    <>
      Shows the aggregate amount of tokens across all transactions that happened
      on the network on a certain date.{' '}
      <MoreInfoLink href='https://academy.santiment.net/metrics/transaction-volume/' />
    </>
  ),

  [Metric.network_growth.key]: (
    <>
      Shows the number of new addresses being created on the network each day.
      Essentially, this chart illustrates user adoption over time, and can be
      used to identify when the project is gaining - or losing - traction.{' '}
      <MoreInfoLink href='https://academy.santiment.net/metrics/network-growth/' />
    </>
  ),

  [Metric.dev_activity.key]: (
    <>
      Based on number of Github 'events' including PRs, comments, and wiki
      edits, plus the number of public repositories a project is maintaining.{' '}
      <MoreInfoLink href='https://academy.santiment.net/metrics/developer-activity/' />
    </>
  ),

  [Metric.velocity.key]: (
    <>
      Shows the average number of times that a token changes wallets each day.
      Simply put, a higher token velocity means that a token is used in
      transactions more often within a set time frame.{' '}
      <MoreInfoLink href='https://academy.santiment.net/metrics/velocity/' />
    </>
  ),

  [Metric.active_deposits.key]: (
    <>
      Shows the number of unique deposit addresses that participated in
      transactions for a given day. A deposit address is an address belonging to
      an exchange that users use to deposit assets.{' '}
      <MoreInfoLink href='https://academy.santiment.net/metrics/metrics-for-deposit-addresses/#daily-active-deposits' />
    </>
  ),

  [Metric.twitter_followers.key]:
    "Shows the number of followers on the project's official Twitter account over time",

  [Metric.social_dominance_total.key]:
    'Shows the share (or %) of the coin’s mentions on crypto-related social media, compared to a pool of 50+ of the most talked-about projects online.',

  [Metric.realized_value_usd.key]:
    'Realized Cap shows the total amount that all holders spent to purchase the coin (i.e. the total acquisition cost). While market cap = supply X current price of each coin, realized cap = supply X price of each coin when it last ‘moved’',

  [Metric.gasUsed.key]:
    'How much ETH has moved out of team wallets over time. While not tracked all the way to exchanges, this metric may suggest potential selling activity',

  [Metric.mean_age.key]: (
    <>
      The average age of all coins/tokens on the blockchain.{' '}
      <MoreInfoLink href='https://academy.santiment.net/metrics/mean-coin-age/' />
    </>
  ),

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
    'NVT tries to determine how much ‘value’ is being transmitted on a coin’s network. This version of NVT is calculated by dividing the coin’s Market Cap by its on-chain Transaction Volume. The higher the NVT, the more expensive the network relative to the value it transmits, indicating an overvalued asset.'
}
