import React from 'react'
import styles from './PublicTemplates.module.scss'

export const TEMPLATES = [
  {
    title: 'Price volatility ahead for BNB?',
    link:
      'https://app.santiment.net/projects/binance-coin?from=2020-01-16T23%3A00%3A00.000Z&interval=12h&isAnomalyActive=false&isCartesianGridActive=true&isClosestDataActive=true&isICOPriceActive=true&isLogScale=false&isMultiChartsActive=false&metrics=price_usd,social_volume_total,age_destroyed&projectId=235885&slug=binance-coin&ticker=BNB&timeRange=3m&title=Binance%20Coin%20%28BNB%29&to=2020-04-17T21%3A59%3A59.999Z',
    description: (
      <>
        In the past 24 hours, BNB’s social volume and token age consumed
        mushroomed to one and two-month highs, respectively, as Binance released
        a whitepaper for supporting smart contracts on Binance Chain (which will
        involve BNB staking).
        <div className={styles.block}>
          Extreme values in these two metrics often precede a rise in a coin’s
          short-term price volatility, as BNB is vying for another push upward
          on the back of today’s news and next week’s Cartesi IEO.
        </div>
      </>
    )
  },
  {
    title: 'Is $170 a strong sell level for ETH miners?',
    link:
      'https://app.santiment.net/?from=2020-01-16T23%3A00%3A00.000Z&interval=12h&isAnomalyActive=false&isCartesianGridActive=true&isClosestDataActive=true&isICOPriceActive=true&isLogScale=false&isMultiChartsActive=false&metrics=price_usd,minersBalance&projectId=57&slug=ethereum&ticker=ETH&timeRange=3m&title=Ethereum%20%28ETH%29&to=2020-04-17T21%3A59%3A59.999Z',
    description: (
      <>
        For the second time this month, Ethereum miners are offloading parts of
        their block rewards after Ethereum broke above $170.
        <div className={styles.block}>
          After a 45-day accumulation period, ETH miners first moved about 10000
          ETH on April 7th (as ETH tackled the $172 resistance line). Earlier
          today, they’ve started moving their coins again - at virtually the
          same price level.
        </div>
      </>
    )
  },
  {
    title: 'Can Bitcoin’s network activity support another leg up?',
    link:
      'https://app.santiment.net/?from=2019-04-16T22%3A00%3A00.000Z&interval=2d&isAnomalyActive=false&isCartesianGridActive=true&isClosestDataActive=true&isICOPriceActive=true&isLogScale=false&isMultiChartsActive=false&metrics=price_usd,daily_active_addresses&projectId=1538&slug=bitcoin&ticker=BTC&timeRange=1y&title=Bitcoin%20%28BTC%29&to=2020-04-17T21%3A59%3A59.999Z',
    description: (
      <>
        Bitcoin’s daily active addresses have been on the incline ever since
        ‘Black Thursday’, supporting the coin’s 52.3% growth.
        <div className={styles.block}>
          On April 15th, over 934,500 addresses have either sent or received
          Bitcoin - the highest level since Bitcoin’s 2019 top.
        </div>
      </>
    )
  },
  {
    title: 'Market still too shaky for stablecoin whales?',
    link:
      'https://app.santiment.net/?comparables=usd-coin-CC-USDC-CC-amount_in_non_exchange_top_holders,bitcoin-CC-BTC-CC-price_usd&from=2020-01-16T23%3A00%3A00.000Z&interval=12h&isAnomalyActive=false&isCartesianGridActive=true&isClosestDataActive=true&isICOPriceActive=false&isLogScale=false&isMultiChartsActive=false&metrics=amount_in_non_exchange_top_holders&projectId=1552&slug=tether&ticker=USDT&timeRange=3m&title=Tether%20%28USDT%29&to=2020-04-17T21%3A59%3A59.999Z',
    description: (
      <>
        The top non-exchange addresses for two biggest stablecoins - USDT and
        USDC - show no sign of converting parts of their bags back to Bitcoin
        and other cryptocurrencies just yet.
        <div className={styles.block}>
          In fact, since ‘Black Thursday’, these addresses have added another
          559,000,000 USDT and 136,000,000 USDC, respectively, to their bags,
          indicating a strong desire to stay on the sidelines until they’re
          confident the market has in fact recovered.
        </div>
      </>
    )
  },
  {
    title: 'Chainlink’s 30-day MVRV ratio approaching the ‘danger zone’?',
    link:
      'https://app.santiment.net/?from=2018-02-28T23%3A00%3A00.000Z&interval=7d&isAnomalyActive=false&isCartesianGridActive=true&isClosestDataActive=true&isICOPriceActive=false&isLogScale=false&isMultiChartsActive=false&metrics=price_usd,mvrv_usd_30d&projectId=763&slug=chainlink&ticker=LINK&title=ChainLink%20%28LINK%29&to=2020-04-17T21%3A59%3A59.999Z',
    description: (
      <>
        Chainlink’s 30-day MVRV ratio is hovering around 1.32, indicating that
        its short-term holders are currently - on average - around 32% in
        profit.
        <div className={styles.block}>
          This has been a contentious level in Chainlink’s recent history, as
          levels of 1.25 and above have often resulted in short-term
          corrections, as ‘new money’ feels more and more content with cashing
          out.
        </div>
      </>
    )
  }
]
