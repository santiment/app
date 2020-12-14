import styles from './SheetsTemplates.module.scss'
import React from 'react'

export const SheetsTemplatesList = [
  {
    title: 'Maximal Mean Dollar Age Template',
    description: (
      <>
        This template visualizes the Mean Dollar Age of Bitcoin, Ethereum and
        various ERC20 coins in comparison to one another.
        <div className={styles.block}>
          Developed by Santiment, Mean Dollar Age calculates the average age of
          all dollars invested in acquiring a particular coin.
        </div>
        <div className={styles.block}>
          This metric identifies accumulation and sell cycles for any coin, and
          identifying dips in Mean Dollar Age can serve as a novel bullish
          indicator.
        </div>
      </>
    ),
    linkToTemplate:
      'https://docs.google.com/spreadsheets/d/1b4POwppuzzcMmb7_Kjs0ZJ7u-G9rVEGzMQ_uNmIeTVo/view'
  },
  {
    title: 'Top Holders Supply',
    description: (
      <>
        Crypto is still a whale's playground. This template monitors the
        behavior of the biggest addresses holding Ethereum as well as various
        ERC-20 coins.
        <div className={styles.block}>
          The template includes a dozen views of top whales' behavior, including
          balance changes, big accumulation/sell-off events and week-to-week
          adjustments to total supply held.
        </div>
      </>
    ),
    linkToTemplate:
      'https://docs.google.com/spreadsheets/d/1JZ11YeGMmeLqaODp9puNTaV2BJNkncnk1gOPSHlZ-20/view'
  },
  {
    title: 'Token Age Consumed',
    linkToTemplate:
      'https://docs.google.com/spreadsheets/d/1elZAnyR_0JPI7L3pQY2c9mG2TEvex-XQv8Lk_XYhVIk/view',
    description: (
      <>
        Token age consumed shows the amount of tokens changing addresses on a
        certain date, multiplied by the time since they last moved. Spikes in
        this metric signal a large amount of tokens moving after being idle for
        an extended period of time.
        <div className={styles.block}>
          The significance of this Sansheets model, as a compliment to the
          metric that is freely available on Sanbase, is that it helps identify
          many different assets and their notable age consumed spikes, all on
          the same chart. This makes it much easier to catch major spikes
          amongst many assets all in one place!
        </div>
      </>
    )
  },
  {
    title: 'NVT Template',
    description: (
      <>
        This template calculates the NVT for BTC, ETH and several ERC-20 coins,
        and assigns a bullish/bearish value to its historical and present-day
        performance.
        <div className={styles.block}>
          The idea behind the NVT is simple - if the value transferred on the
          network (token circulation) is too low relative to the network's
          valuation (market cap), the asset should be considered overvalued and
          due for a correction.
        </div>
        <div className={styles.block}>
          And vice versa - if the value transferred on the network is too high
          compared to its current valuation, NVT would deem the asset
          undervalued, and ripe for a breakout.
        </div>
      </>
    ),
    linkToTemplate:
      'https://docs.google.com/spreadsheets/d/1CpPBVgJJ-6T5EIKHkeMKBG954Rp5HlEHtevSzXOns1Y/view'
  },
  {
    title: 'Price-DAA Divergence Template',
    description: (
      <>
        We have found that major differences in the coin's price and network
        activity trends can present opportune times to buy OR sell, depending on
        the trend's direction.
        <div className={styles.block}>
          This template triggers BUY and SELL signals for Bitcoin and Ethereum
          based on major divergences in price and the amount of daily addresses
          interacting with the coin.
        </div>
      </>
    ),
    linkToTemplate: ''
  },
  {
    title: 'Network Growth & Daily Active Addresses Template',
    description: (
      <>
        This template compares the amount of network growth and daily active
        address percentage changes of Bitcoin, Ethereum, and other projects over
        time. In general, many projects create new addresses at similar
        percentage rate to one another as markets ebb and flow. Identifying
        which projects are creating new addresses and growing their network at a
        faster rate than their price is generally an excellent strategy to find
        buy low opportunities.
      </>
    ),
    linkToTemplate:
      'https://docs.google.com/spreadsheets/d/1opTpz2lDBXd9o6izMoUHzTWEU-pw-UAD2CuI-s4BWoA/view'
  },
  {
    title: 'Top Transactions',
    linkToTemplate:
      'https://docs.google.com/spreadsheets/d/1vvhzCUnmXv2n-XP5juUxizVtn6Xbj-OcS78wq0cT46s/view',
    description: (
      <>
        Often times, major transactions happen days before a price change
        actually occurs. Being informed of when one of the largest single
        transactions are made between an exchange address and non-exchange
        address, for example, can be one of the biggest advantages to getting a
        head start on where market prices are likely to head.
        <div className={styles.block}>
          This model is designed to show 20+ assets and each of their top 5
          largest transactions (measured by total USD value) all on the same
          axis. Particularly, when many altcoins have some of their largest
          single transactions on the same day, it's a great indication that an
          altcoin season is about to start (or end). This ties in to the 'Top
          Transactions Table' available to our PRO members on Sanbase PRO, but
          goes the extra mile by calculating what the transaction was worth in
          USD. This helps compare one asset's top transaction to another asset
          of a different price, to directly discover just how big of a deal the
          exchange of tokens was.
        </div>
      </>
    )
  },
  {
    title: 'MVRV and MVRV Long/Short Difference Ratio Template',
    description: (
      <>
        The MVRV ratio is found by dividing the market cap (market value or MV)
        by realized cap (total realized value or RV), and it provides us with a
        solid estimate of just how overvalued or undervalued the current market
        cap is.
        <div className={styles.block}>
          Additionally, we offer the MVRV Long/Short Difference comparison on
          this template to visualize which projects are over or under their line
          of average profitable traders. If the ratio is above 0%, then on
          average. Ethereum holders will profit if they sell their coins now. If
          it is below 0%, then the average holder will realize a loss if they
          sell.
        </div>
      </>
    ),
    linkToTemplate:
      'https://docs.google.com/spreadsheets/d/1wYTvxKYNYry_pJ-RB4kzbpVF60c26RlTfkMla05jG34/view'
  },
  {
    title: 'Velocity Vs. Price Template',
    description: (
      <>
        Velocity is an underutilized way to research how quickly money is
        circulating in the crypto economy. It's calculated by dividing a token's
        transaction volume (in USD) by its market cap (in USD).
        <div className={styles.block}>
          Similar to the Daily Active Addresses Template, this model visualizes
          when tokens are being overbought or oversold based on the historical
          ebbs and flows of its velocity metric.
        </div>
      </>
    ),
    linkToTemplate: ''
  },
  {
    title: 'Thresholds Crossed Template',
    description: (
      <>
        Understanding how many times a price of a project has moved above or
        below a round number USD value, or a psychological barrier, can provide
        great perspective in understanding just how cyclical the cryptocurrency
        markets are. For those who believe that a cross above a certain level
        likely means that "it will never fall back below again" can be shown
        just how often prices have reset time and time again.
        <div className={styles.block}>
          This template is great for understanding support levels, and where
          prices most commonly see a great deal of push and pull, along with
          psychological polarization among traders. It can be used well to your
          advantage.
        </div>
      </>
    ),
    linkToTemplate:
      'https://docs.google.com/spreadsheets/d/1irxlgPqMMq6x2kgCdo4K0tr8ec6tYauR2xY5NO4zIgY/view'
  },
  {
    title: 'Exchange Percent of Supply',
    linkToTemplate:
      'https://docs.google.com/spreadsheets/d/19lwjC_odu3MnpkXCvMF2JrGrhC6YwZl6bVZiRxO4BXA/view',
    description: (
      <>
        Knowing how much of a token's supply is sitting on exchanges at any
        given time can be a tremendously useful hint to identify whether big
        selloffs are being planned (or can even be possible) in the near future.
        Generally, we have found that the lower an asset's total percent of
        supply is on exchanges, the safer the asset is from seeing a sudden
        selloff and price drop.
        <div className={styles.block}>
          Identify many assets and where they are sitting compared to their past
          year of respective supply on exchanges. Usually, the longer an asset
          has been available to publicly traded, the lower the overall portion
          of its existing total supply is going to be sitting on exchanges. But
          by comparing data for each asset against their respective most recent
          years, you can get a pretty nice gauge of how bullish vs. bearish its
          current supply ratio on exchanges is.
        </div>
        <div className={styles.block}>
          You can even isolate what the top 10 on-exchange and off-exchange
          addresses are looking like, in terms of what these whales' total
          supply of tokens are on exchanges at any given time. Unraveling some
          of the information available in this model can be extraordinarily
          powerful for your trading strategies.
        </div>
      </>
    )
  },
  {
    title: 'Most Profitable Days for Trading Cryptocurrency',
    description: (
      <>
        As we've tested in the past, knowing which days have the best historical
        ROI can help reduce risk and craft effective market alphas.
        <div className={styles.block}>
          This template determines the best trading days (historically) for any
          coin in the Santiment database, with adjustable time ranges for Pro
          users.
        </div>
      </>
    ),
    linkToTemplate: ''
  },
  {
    title: 'Distribution Index',
    description: (
      <>
        Our research has shown that distributed coins (supply dispersed among
        many addresses) tend to outperform concentrated coins (much of
        circulating supply held by 'whales').
        <div className={styles.block}>
          This Index calculates the top 10 most distributed and most
          concentrated ERC-20 coins (within the top 50) over the last month.
        </div>
      </>
    ),
    linkToTemplate: ''
  },
  {
    title: 'ETH-ERC20 Correlation Index',
    description: (
      <>
        Our previous analysis indicates that ERC-20 coins tend to be less
        correlated to Ethereum during the bull market, and exhibit higher
        correlation during the bear market.
        <div className={styles.block}>
          This Index charts the correlation of ERC-20 market cap to the ETH
          market cap over the last 3 months.
        </div>
      </>
    ),
    linkToTemplate: ''
  },
  {
    title: 'Stablecoin Volatility Index',
    description: (
      <>
        Stablecoins are more volatile than you think. This presents a novel
        market opportunity, as one could theoretically invest in low-volatility
        stablecoins and trade outbreaks in their more volatile counterparts.
        <div className={styles.block}>
          This Santiment Index ranks 15 biggest stablecoins from most to least
          volatile over the past 30 days.
        </div>
      </>
    ),
    linkToTemplate: ''
  },
  {
    title: 'Least Correlated Coins to BTC & ETH',
    description: (
      <>
        According to our research, a portfolio of coins that are least
        correlated to both Bitcoin and Ethereum tends to perform particularly
        well during the bull cycles.
        <div className={styles.block}>
          This Index calculates the 20 least correlated coins to BTC & ETH over
          the past 30 days.
        </div>
      </>
    ),
    linkToTemplate: ''
  }
]
