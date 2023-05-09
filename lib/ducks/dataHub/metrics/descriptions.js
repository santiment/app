import React from 'react';
import { Metric } from './index';
import { convertToReadableInterval } from '../../../utils/dates';
import { Link } from './frequences';
export const SOCIAL_CONTEXT_DESCRIPTION = 'Shows a set of words that have been frequently used alongside the coin’s name on crypto social media in the recent days.';

const getSentimentVolumeDescr = (channel = 'all channels') => {
  return 'Shows the difference between positive and negative sentiment about [Project Ticker] on ' + channel + ', adjusted for the amount of [Project Ticker] mentions over time. Positive values indicate the crowd sentiment is bullish on average, and vice versa. The bigger the spike/dip, the more extreme the sentiment';
};

const getSentimentBalanceDescr = (channel = 'all channels') => {
  return 'Shows the difference between positive and negative sentiment about [Project Ticker] on ' + channel + '. Positive values indicate the crowd sentiment is bullish on average, and vice versa. The bigger the spike/dip, the more extreme the sentiment';
};

const getSentimentPositiveNegativeDescr = (channel = 'all channels', isPositive = true) => {
  const type = isPositive ? 'positive (bullish)' : 'negative (bearish)';
  return 'Shows the ' + type + ' sentiment score for [Project Ticker] mentions on ' + channel + ' over time';
};

export const Description = {
  [Metric.social_volume_total.key]: 'Shows the amount of mentions of the coin on 1000+ crypto social media channels, including Telegram groups, crypto subreddits and more.',
  [Metric.age_consumed.key]: 'Tracks the movement of previously idle [Project Ticker] tokens. The metric shows the amount of [Project Ticker] changing addresses daily multiplied by the number of days since they last moved. Spikes indicate a significant amount of previously idle [Project Ticker] tokens moving between addresses.',
  [Metric.exchange_balance.key]: 'Shows the difference in the amount of [Project Ticker] tokens moving to and out of exchange wallets. If the value is positive, more [Project Ticker] entered the exchange than have left. If the value is negative, more [Project Ticker] flowed out of exchanges than flowed in.',
  [Metric.daily_active_addresses.key]: 'Shows the number of unique addresses involved in [Project Ticker] transactions daily. This metric indicates the daily level of crowd interaction (or speculation) with a token',
  [Metric.supply_on_exchanges.key]: 'What amount of coins/tokens are stored in known exchange wallets.',
  [Metric.supply_outside_exchanges.key]: 'What amount of coins/tokens are stored outside known exchange wallets.',
  [Metric.percent_of_total_supply_on_exchanges.key]: 'The percent of the total token supply which is on exchanges.',
  [Metric.circulation.key]: 'Shows only the number of unique [Project Ticker]  tokens transacted daily. If a token changes addresses 5 times on a given day, it will be counted only once by Token Circulation, and 5 times by Transaction Volume.',
  [Metric.mvrv_usd.key]: 'Shows the average profit or loss of all [Project ticker] holders based on the price when each token last moved. Example: if MVRV = 2, then all [Project ticker] holders are, on average, currently 2x on their initial investment.',
  [Metric.mvrv_usd_intraday.key]: 'Shows the intraday average profit or loss of all [Project ticker] holders based on the price when each token last moved. Example: if MVRV = 2, then all [Project ticker] holders are, on average, currently 2x on their initial investment.',
  [Metric.transaction_volume.key]: 'Shows the aggregate amount of [Project Ticker]  tokens across all transactions that happened on the network daily.',
  [Metric.transaction_volume_usd.key]: 'Represents the value of transacted asset expressed in USD. It is computed using formula: `transaction_volume` * `daily_average_price`',
  [Metric.network_growth.key]: 'Shows the number of new addresses being created on the network each day. This metric illustrates user adoption over time, and can be used to identify when the project is gaining or losing traction.',
  [Metric.dev_activity.key]: "Shows the project’s development activity over time based on a number of pure development- related 'events' in the project’s public Github repository. (not counted: comments on issues, forks, stars, etc.).",
  [Metric.velocity.key]: 'Shows the average number of times that a single [Project Ticker] token changes addresses daily. Higher token velocity means that a single token is used more often in daily transactions.',
  [Metric.twitter_followers.key]: "Shows the number of followers on the project's official Twitter account over time",
  [Metric.social_dominance_total.key]: 'Shows the share (or %) of the coin’s mentions on crypto-related social media, compared to a pool of 50+ of the most talked-about projects online.',
  [Metric.realized_value_usd.key]: 'Shows the total amount that all [Project Ticker] holders spent to purchase their tokens (i.e. the total acquisition cost). Realized cap is calculated by multiplying the [Project Ticker] supply by the price of each [Project Ticker] token when it last moved on-chain',
  [Metric.gasUsed.key]: 'How much ETH has moved out of team wallets over time. While not tracked all the way to exchanges, this metric may suggest potential selling activity',
  [Metric.mean_age.key]: 'Shows the average amount of days that all [Project ticker] tokens stayed in their current addresses. Rising slope signals a network-wide accumulation trend. Drop-offs indicate increased movement of [Project Ticker] tokens between addresses.',
  [Metric.mean_dollar_invested_age.key]: 'A dollar-based equivalent of the Mean Coin Age. The difference between "coin age" and "dollar age" comes from the different way that we compute the averages.',
  [Metric.nvt.key]: 'Shows the relationship between the [Project Ticker] market cap and the amount of [Project Ticker] tokens transacted on-chain daily. High NVT levels indicate an overvalued asset, and vice versa. This version of NVT is calculated by dividing the [Project Ticker] Market Cap by its on-chain Token Circulation.',
  [Metric.nvt_transaction_volume.key]: 'Shows the relationship between the [Project Ticker] market cap and the amount of [Project Ticker] tokens transacted on-chain daily. High NVT levels indicate an overvalued asset, and vice versa. This version of NVT is calculated by dividing the [Project Ticker] Market Cap by its on-chain Transaction Volume.',
  [Metric.topHoldersPercentOfTotalSupply.key]: 'Shows the combined balance of the top 10 addresses overall, as a percentage of the coin’s total circulating supply',
  [Metric.amount_in_top_holders.key]: 'Shows the combined balance of the top N addresses overall',
  [Metric.amount_in_exchange_top_holders.key]: 'Shows the combined balance of the top N addresses belonging to exchanges',
  [Metric.amount_in_non_exchange_top_holders.key]: 'Shows the combined balance of the top N addresses that don’t belong to exchanges',
  holders_distribution_1_to_10: 'Breaks down the number of addresses based on the amount of [Project Ticker] they hold.',
  holders_labeled_distribution_1_to_10: 'Breaks down the number of addresses based on the amount of [Project Ticker] they hold and labeled by owners. Labels are available only for Ethereum/ERC-20 assets',
  percent_of_holders_distribution_combined_balance_1_to_10: 'Represents the sum of all the tokens of all the addresses which hold the amount of tokens from an interval.',
  holders_distribution_combined_balance_1_to_10: 'Represents the sum of all the tokens of all the addresses which hold the amount of tokens from an interval.',
  [Metric.ethSpentOverTime.key]: 'Shows the amount of ETH moved out of the project’s ICO wallets over time',
  [Metric.miners_balance.key]: 'Shows the combined ETH balance of addresses belonging to Ethereum mining pools',
  [Metric.gasUsed.key]: 'Shows the amount of Gas accrued on the Ethereum network daily. Gas is a unit that measures the amount of computational effort it will take to successfully conduct a transaction or execute a contract on the Ethereum blockchain',
  [Metric.active_deposits.key]: 'Shows the amount of unique [Project Ticker] deposit addresses daily. Deposit addresses are used to deposit cryptocurrencies to centralized exchanges. Spikes in this metric may indicate a rise in short-term sell pressure.',
  [Metric.deposit_transactions.key]: 'Shows the amount of all incoming and outgoing transactions involving [Project Ticker] deposit addresses daily. Deposit addresses are used to deposit cryptocurrencies to centralized exchanges. Spikes in this metric may indicate a rise in short-term sell pressure',
  [Metric.exchange_inflow.key]: 'Shows the amount of [Project Ticker] moving to known exchange wallets daily. Excludes exchange-to-exchange transactions. Spikes in this metric may indicate a rise in short-term sell pressure.',
  [Metric.exchange_outflow.key]: 'Shows the amount of [Project Ticker] withdrawn from known exchange wallets daily. Excludes exchange-to-exchange transactions. Spikes in this metric may indicate a short-term accumulation trend.',
  [Metric.supply_on_exchanges.key]: 'Shows the total amount of [Project Ticker] located in known exchange wallets. Spikes in this metric may indicate a rise in short-term sell pressure.',
  [Metric.percent_of_total_supply_on_exchanges.key]: 'Shows the percentage of the total circulating supply of [Project Ticker] located in known exchange wallets. Spikes in this metric may indicate a rise in short-term sell pressure.',
  [Metric.supply_outside_exchanges.key]: 'Shows the total amount of [Project Ticker]  located outside of known exchange wallets. Spikes in this metric may indicate an accumulation trend.',
  [Metric.withdrawal_transactions.key]: 'Shows the amount of all incoming and outgoing transactions involving [Project Ticker] withdrawal addresses. Withdrawal addresses are used to withdraw cryptocurrencies from centralized exchanges. Spikes in this metric may indicate a short-term accumulation trend',
  [Metric.mvrv_long_short_diff_usd.key]: /*#__PURE__*/React.createElement(React.Fragment, null, "Shows the difference between the 365-day MVRV ratio and 60-day MVRV ratio, respectively. For certain coins, this indicator tends to bottom at the lowest point of its bear market and peak at the top of its bull cycle. Negative values mean that short-term holders are going to realize higher profits than long-term holders if they sell at price at this moment. Positive values show the opposite.", /*#__PURE__*/React.createElement("br", null), "This an oscillating indicator, which reaches extreme negative values at the bottom of the large bear cycles and extreme positive values at the top of the bull markets. The intuition is that at the top of the bull runs the long term holders are at large profit and this puts large sell pressure. At the bottom of the bear markets, the long term holders are at large loss and are not willing to sell. Compared to the individual MVRVs, this indicator is going to give negative values when both long and short term holders are at the same profit and loss, thus indicating that the current price is not the long term top/bottom, but more of a short term move."),
  [Metric.sentiment_volume_consumed_total.key]: getSentimentVolumeDescr(),
  [Metric.sentiment_volume_consumed_telegram.key]: getSentimentVolumeDescr('Telegram'),
  [Metric.sentiment_volume_consumed_reddit.key]: getSentimentVolumeDescr('Reddit'),
  [Metric.sentiment_volume_consumed_twitter.key]: getSentimentVolumeDescr('Twitter'),
  [Metric.sentiment_balance_total.key]: getSentimentBalanceDescr(),
  [Metric.sentiment_balance_telegram.key]: getSentimentBalanceDescr('Telegram'),
  [Metric.sentiment_balance_reddit.key]: getSentimentBalanceDescr('Reddit'),
  [Metric.sentiment_balance_twitter.key]: getSentimentBalanceDescr('Twitter'),
  [Metric.sentiment_positive_total.key]: getSentimentPositiveNegativeDescr(),
  [Metric.sentiment_positive_telegram.key]: getSentimentPositiveNegativeDescr('Telegram'),
  [Metric.sentiment_positive_reddit.key]: getSentimentPositiveNegativeDescr('Reddit'),
  [Metric.sentiment_positive_twitter.key]: getSentimentPositiveNegativeDescr('Twitter'),
  [Metric.sentiment_negative_total.key]: getSentimentPositiveNegativeDescr(),
  [Metric.sentiment_negative_telegram.key]: getSentimentPositiveNegativeDescr('Telegram', false),
  [Metric.sentiment_negative_reddit.key]: getSentimentPositiveNegativeDescr('Reddit', false),
  [Metric.sentiment_negative_twitter.key]: getSentimentPositiveNegativeDescr('Twitter', false),
  [Metric.bitmex_perpetual_basis.key]: 'Shows the difference between BitMEX perpetual contract’s price of [Project Ticker] and BitMEX index (spot) price for [Project Ticker]',
  [Metric.bitmex_perpetual_funding_rate.key]: 'The funding rate is a fee paid by one side of the perpetual contract to the other. When the funding rate is positive, Longs pay Shorts. When the funding rate is negative, Shorts pay Longs',
  [Metric.bitmex_perpetual_open_interest.key]: "Shows the amount of open perpetual contracts currently on Bitmex's [Project Ticker] / USD trading pairs. When open interest reaches unusually high numbers, it can precede increased volatility in the coin’s price",
  [Metric.bitmex_perpetual_open_value.key]: 'Shows the value of the corresponding open interest in Satoshis (XBT/BTC)',
  SOCIAL_VOLUME: SOCIAL_CONTEXT_DESCRIPTION,
  [Metric.dormant_circulation.key]: `Shows how many coins/tokens that have not been moved for more than ${convertToReadableInterval('365d')} were transacted during a day. This is useful for spotting when really old Bitcoins move. `,
  [Metric.stock_to_flow.key]: /*#__PURE__*/React.createElement(React.Fragment, null, "Stock To Flow ratio model is a measure of scarcity/abundance of particular resource. It shows how much supply enters yearly relative to the total supply of the resource. We measure Stock To Flow ratio for a given asset as the ratio between", ' ', /*#__PURE__*/React.createElement(Link, {
    href: "https://academy.santiment.net/metrics/circulation/"
  }, "Total Circulation"), " of the asset and the daily minted coins multiplied by days in one year.", ' '),
  [Metric.defi_total_value_locked_usd.key]: 'Shows total value locked in DeFi projects, available in USD.',
  [Metric.price_daa_divergence.key]: 'Price-Daily Addresses Divergence model tracks the relationship between the coin’s price and the amount of daily addresses interacting with the coin. When the price increases while the amount of active addresses declines, the model triggers a ‘Sell’ signal, and vice versa. Historically, strong divergences in these two metrics earmarked interesting entry/exit levels',
  [Metric.active_addresses_1h.key]: 'Shows the number of unique addresses involved in [Project Ticker] transactions hourly. This metric indicates the hourly level of crowd interaction (or speculation) with a token',
  [Metric.active_addresses_24h.key]: 'Shows the number of unique addresses involved in [Project Ticker] transactions daily. This metric indicates the daily level of crowd interaction (or speculation) with a token',
  [Metric.network_profit_loss.key]: /*#__PURE__*/React.createElement(React.Fragment, null, "Network Profit/Loss (NPL for short) computes the average profit or loss of all coins that change addresses daily.", /*#__PURE__*/React.createElement("br", null), "For each coin that moves on-chain, NPL takes the price at which it was last moved and assumes this to be its acquisition price. Once it changes addresses again, NPL assumes the coin was sold."),
  [Metric.whale_transaction_count_100k_usd_to_inf.key]: 'Number of Transactions Transferring More Than 100k USD"',
  [Metric.whale_transaction_count_1m_usd_to_inf.key]: 'Number of Transactions Transferring More Than 1M USD"',
  [Metric.mvrv_usd_z_score.key]: 'Shows the ratio between the difference of market cap and realized cap, and the standard deviation of market cap'
};
export const rebuildDescriptions = Submetrics => {
  Object.keys(Submetrics).forEach(key => {
    const list = Submetrics[key];

    switch (key) {
      case Metric.social_active_users.key:
        {
          list.forEach(metric => {
            Description[metric.key] = `Shows the amount of daily active users on crypto-related ${metric.channel}. An active user has sent at least one message during the day.`;
          });
          break;
        }

      case Metric.dormant_circulation.key:
        {
          list.forEach(metric => {
            Description[metric.key] = `Shows how many coins/tokens that have not been moved for more than ${convertToReadableInterval(metric.replacements.timebound)} were transacted during a day. This is useful for spotting when really old Bitcoins move. `;
          });
          break;
        }

      case Metric.twitter_followers.key:
        {
          list.forEach(metric => {
            Description[metric.key] = `Shows the ${convertToReadableInterval(metric.replacements.timebound)} change in the amount of followers of the project’s official Twitter account`;
          });
          break;
        }

      case Metric.circulation.key:
        {
          list.forEach(metric => {
            Description[metric.key] = `Shows only the number of unique [Project Ticker] tokens transacted in the past ${convertToReadableInterval(metric.replacements.timebound)} . `;
          });
          break;
        }

      case Metric.mvrv_usd.key:
        {
          list.forEach(metric => {
            Description[metric.key] = `Shows the average profit or loss of those holding [Project ticker] tokens which moved in the last ${convertToReadableInterval(metric.replacements.timebound)}, based on the price when each token last moved. Example: if MVRV = 2, then these holders are, on average, currently 2x on their initial investment. `;
          });
          break;
        }

      case Metric.mvrv_usd_intraday.key:
        {
          list.forEach(metric => {
            Description[metric.key] = `Shows the average intraday profit or loss of those holding [Project ticker] tokens which moved in the last ${convertToReadableInterval(metric.replacements.timebound)}, based on the price when each token last moved. Example: if MVRV = 2, then these holders are, on average, currently 2x on their initial investment. `;
          });
          break;
        }

      case Metric.realized_value_usd.key:
        {
          list.forEach(metric => {
            Description[metric.key] = `Shows the total amount spent on [Project Ticker] tokens that moved in the last ${convertToReadableInterval(metric.replacements.timebound)}. Realized cap is calculated by multiplying the [Project Ticker] supply by the price of each [Project Ticker] token when it last moved on-chain`;
          });
          break;
        }

      default:
        {
          break;
        }
    }
  });
};