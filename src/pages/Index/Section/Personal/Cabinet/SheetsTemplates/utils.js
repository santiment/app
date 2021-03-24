import styles from './SheetsTemplates.module.scss'
import React from 'react'

const ExternalLink = ({ href, children }) => {
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

export const DEFAULT_SHEETS_TEMPLATES = [
  {
    name: 'Whale Holder Distribution',
    url:
      'https://docs.google.com/spreadsheets/d/130DSq8KPXIEGBn25HQeI5-dCSeoDTwR6rR8UXC5b0gw/view',
    description: (
      <>
        This model provides the 1-day, 7-day, and 90-day percent changes to the
        amount of whale addresses for 40+ assets, to instantly compare which
        coins are seeing the biggest rises in major stakers. Prices very often
        follow the behavior of the largest addresses, and when there is an
        increasing amount of them, it's generally a sign that a price rise can
        inevitably follow.
        <div className={styles.block}>
          For most projects, an address with over $100K USD is what we deem to
          be a whale. For extremely large assets, this curriculum rises to $1M
          or even $10M for projects like BTC or ETH.
        </div>
      </>
    ),
    isPro: true
  },
  {
    name: 'MVRV Danger & Opportunity Zones',
    description: (
      <>
        It’s extremely helpful to have context when understanding where we are
        in the markets, and how average traders are returning profits or
        accumulating losses. The MVRV metric on Santiment allows us to see how
        average traders are performing over various timeframes, with the
        implication being that prime buy opportunities are when the crowd is at
        a loss, and prime sell opportunities are when the crowd has seen major
        profits.
        <div className={styles.block}>
          This template provides an up-to-date analysis of how high (or low)
          average trader returns are by averaging several key timeframes
          together, and tells us how close 20+ assets are to 'Opportunity Zones'
          (historic good buy zones) or 'Danger Zones' (historic good sell
          zones). The closer an asset is to the green dashed line, the less risk
          there is in opening a current long investment. The closer an asset is
          to the red dashed line, the more risk there is in opening a current
          long investment.
        </div>
        <div className={styles.block}>
          In a zero sum game like cryptocurrency trading, gauging exactly how a
          current investment in real-time would do vs. the competition of
          traders is a powerful measurement to have at your disposal.
        </div>
      </>
    ),
    url:
      'https://docs.google.com/spreadsheets/d/1wYTvxKYNYry_pJ-RB4kzbpVF60c26RlTfkMla05jG34/view'
  },
  {
    name: 'Top Holders Supply',
    description: (
      <>
        Crypto is still a whale's playground.{' '}
        <ExternalLink href='https://insights.santiment.net/read/top-token-holders-and-their-role-as-leading-indicators-5618'>
          This template
        </ExternalLink>{' '}
        monitors the behavior of the biggest addresses holding Ethereum as well
        as various ERC-20 coins.
        <div className={styles.block}>
          The charts included includes fluctuations in the top 1, 10, or 100
          largest addresses, respectively. Discover these whales' changes in
          total supply held, big accumulation/sell-off events, and week-to-week
          adjustments. Seeing what percentage of the total supply a group of
          whales owns also lets you know just how significant any decisions they
          make will be. For example, Ethereum's top 10 exchange holders don't
          hold nearly as high of a percent of the total supply that Fetch's top
          10 holders do.
        </div>
      </>
    ),
    url:
      'https://docs.google.com/spreadsheets/d/1JZ11YeGMmeLqaODp9puNTaV2BJNkncnk1gOPSHlZ-20/view'
  },
  {
    name: 'Token Age Consumed',
    url:
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
    name: 'NVT Token Circulation',
    description: (
      <>
        This template calculates the NVT (Network Value to Transactions) for
        Bitcoin, Ethereum, and several ERC-20 coins, and assigns a
        bullish/bearish value to its historical and present-day performance.
        This is more of a longer-term monthly indicator, and is set up as such.
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
    url:
      'https://docs.google.com/spreadsheets/d/1CpPBVgJJ-6T5EIKHkeMKBG954Rp5HlEHtevSzXOns1Y/view'
  },
  {
    name: 'Daily Active Addresses Divergence',
    description: (
      <>
        We{' '}
        <ExternalLink href='https://insights.santiment.net/read/price---daily-addresses-divergence%3A-%0Aa-primer-on-on-chain-trading-strategies-2222'>
          have found
        </ExternalLink>{' '}
        that major differences in an asset's price and address (network)
        activity trends can present opportune times to buy OR sell. By looking
        at years of historical context for how apart the price vs. daily active
        address activity of a coin is, the green vs. red daily bars on this
        chart provide an accurate analysis of how overvalued or undervalued an
        asset currently sits based on one of the most accurately tied crypto
        metrics to indicate future price.
        <div className={styles.block}>
          Over 30 different assets are available to study deviations, and more
          ERC-20's can be added via your own downloadable copy of this
          spreadsheet at any time!
        </div>
      </>
    ),
    url:
      'https://docs.google.com/spreadsheets/d/1opTpz2lDBXd9o6izMoUHzTWEU-pw-UAD2CuI-s4BWoA/view'
  },

  {
    name: 'Top Transactions',
    url:
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
    name: 'Thresholds Crossed',
    description: (
      <>
        The next time you hear someone claim that 'Bitcoin will never fall below
        $19,000 again', refer them to this model. More than anything, this model
        provides context and clarity to just what kind of roller coaster the
        crypto markets can be, and why you can't get too high or too low any
        time BTC or ETH break a significant price barrier.
        <div className={styles.block}>
          The next time you hear someone claim that 'Bitcoin will never fall
          below $19,000 again', refer them to this model. More than anything,
          this model provides context and clarity to just what kind of roller
          coaster the crypto markets can be, and why you can't get too high or
          too low any time BTC or ETH break a significant price barrier.
        </div>
      </>
    ),
    url:
      'https://docs.google.com/spreadsheets/d/1irxlgPqMMq6x2kgCdo4K0tr8ec6tYauR2xY5NO4zIgY/view'
  },
  {
    name: 'Exchange Percent of Supply',
    url:
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
    name: 'Distribution Index',
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
    url: 'https://insights.santiment.net/read/314'
  },
  {
    name: 'ETH-ERC20 Correlation Index',
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
    url: 'https://santiment.net/blog/eth-vs-erc-20-market-cap-comparison/'
  },
  {
    name: 'Stablecoin Volatility Index',
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
    url: 'https://partners.santiment.net/blog/stablecoin-volatility/'
  },
  {
    name: 'Least Correlated Coins to BTC & ETH',
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
    url:
      'https://partners.santiment.net/blog/is-diversification-worth-it-in-crypto/'
  }
]
