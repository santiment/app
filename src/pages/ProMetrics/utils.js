import React from 'react'
import styles from './ProMetric/ProMetric.module.scss'
import { Link } from 'react-router-dom'
import Button from '@santiment-network/ui/Button'

export const THIRD_METRICS_GROUP = [
  {
    title: 'Velocity Vs. Price Template',
    description: (
      <>
        Velocity is an underutilized way to research how quickly money is
        circulating in the crypto economy. It’s calculated by dividing a token’s
        transaction volume (in USD) by its market cap (in USD).
        <div className={styles.block}>
          Similar to the Daily Active Addresses Template, this model visualizes
          when tokens are being overbought or oversold based on the historical
          ebbs and flows of its velocity metric.
        </div>
      </>
    ),
    svg: (
      <svg
        width='384'
        height='247'
        viewBox='0 0 384 247'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <g filter='url(#filter0_dd)'>
          <rect x='8' y='6' width='368' height='231' rx='4' fill='white' />
          <rect
            x='8.5'
            y='6.5'
            width='367'
            height='230'
            rx='3.5'
            stroke='#E7EAF3'
          />
        </g>
        <defs>
          <filter
            id='filter0_dd'
            x='0'
            y='0'
            width='384'
            height='247'
            filterUnits='userSpaceOnUse'
            color-interpolation-filters='sRGB'
          >
            <feFlood flood-opacity='0' result='BackgroundImageFix' />
            <feColorMatrix
              in='SourceAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            />
            <feOffset dy='2' />
            <feGaussianBlur stdDeviation='4' />
            <feColorMatrix
              type='matrix'
              values='0 0 0 0 0.232639 0 0 0 0 0.328333 0 0 0 0 0.416667 0 0 0 0.03 0'
            />
            <feBlend
              mode='normal'
              in2='BackgroundImageFix'
              result='effect1_dropShadow'
            />
            <feColorMatrix
              in='SourceAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            />
            <feOffset dy='1' />
            <feGaussianBlur stdDeviation='1' />
            <feColorMatrix
              type='matrix'
              values='0 0 0 0 0.231373 0 0 0 0 0.329412 0 0 0 0 0.415686 0 0 0 0.03 0'
            />
            <feBlend
              mode='normal'
              in2='effect1_dropShadow'
              result='effect2_dropShadow'
            />
            <feBlend
              mode='normal'
              in='SourceGraphic'
              in2='effect2_dropShadow'
              result='shape'
            />
          </filter>
        </defs>
      </svg>
    )
  },
  {
    title: 'Most Profitable Days for Trading Cryptocurrency',
    description: (
      <>
        As{' '}
        <a
          className={styles.link}
          rel='noopener noreferrer'
          target='_blank'
          href='https://insights.santiment.net/read/backtesting-the-week%3A-which-days-are-best-for-trading-crypto%3F-1139'
        >
          we’ve tested in the past
        </a>{' '}
        , knowing which days have the best historical ROI can help reduce risk
        and craft effective market alphas.
        <div className={styles.block}>
          This template determines the best trading days (historically) for any
          coin in the Santiment database, with adjustable time ranges for Pro
          users.
        </div>
      </>
    ),
    svg: (
      <svg
        width='384'
        height='247'
        viewBox='0 0 384 247'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <g filter='url(#filter0_dd)'>
          <rect x='8' y='6' width='368' height='231' rx='4' fill='white' />
          <rect
            x='8.5'
            y='6.5'
            width='367'
            height='230'
            rx='3.5'
            stroke='#E7EAF3'
          />
        </g>
        <defs>
          <filter
            id='filter0_dd'
            x='0'
            y='0'
            width='384'
            height='247'
            filterUnits='userSpaceOnUse'
            color-interpolation-filters='sRGB'
          >
            <feFlood flood-opacity='0' result='BackgroundImageFix' />
            <feColorMatrix
              in='SourceAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            />
            <feOffset dy='2' />
            <feGaussianBlur stdDeviation='4' />
            <feColorMatrix
              type='matrix'
              values='0 0 0 0 0.232639 0 0 0 0 0.328333 0 0 0 0 0.416667 0 0 0 0.03 0'
            />
            <feBlend
              mode='normal'
              in2='BackgroundImageFix'
              result='effect1_dropShadow'
            />
            <feColorMatrix
              in='SourceAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            />
            <feOffset dy='1' />
            <feGaussianBlur stdDeviation='1' />
            <feColorMatrix
              type='matrix'
              values='0 0 0 0 0.231373 0 0 0 0 0.329412 0 0 0 0 0.415686 0 0 0 0.03 0'
            />
            <feBlend
              mode='normal'
              in2='effect1_dropShadow'
              result='effect2_dropShadow'
            />
            <feBlend
              mode='normal'
              in='SourceGraphic'
              in2='effect2_dropShadow'
              result='shape'
            />
          </filter>
        </defs>
      </svg>
    )
  },
  {
    title: 'Distribution Index',
    description: (
      <>
        Our research has shown that distributed coins (supply dispersed among
        many addresses) tend to outperform concentrated coins (much of
        circulating supply held by ‘whales’).
        <div className={styles.block}>
          This Index calculates the top 10 most distributed and most
          concentrated ERC-20 coins (within the top 50) over the last month.
        </div>
      </>
    ),
    svg: (
      <svg
        width='384'
        height='247'
        viewBox='0 0 384 247'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <g filter='url(#filter0_dd)'>
          <rect x='8' y='6' width='368' height='231' rx='4' fill='white' />
          <rect
            x='8.5'
            y='6.5'
            width='367'
            height='230'
            rx='3.5'
            stroke='#E7EAF3'
          />
        </g>
        <defs>
          <filter
            id='filter0_dd'
            x='0'
            y='0'
            width='384'
            height='247'
            filterUnits='userSpaceOnUse'
            color-interpolation-filters='sRGB'
          >
            <feFlood flood-opacity='0' result='BackgroundImageFix' />
            <feColorMatrix
              in='SourceAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            />
            <feOffset dy='2' />
            <feGaussianBlur stdDeviation='4' />
            <feColorMatrix
              type='matrix'
              values='0 0 0 0 0.232639 0 0 0 0 0.328333 0 0 0 0 0.416667 0 0 0 0.03 0'
            />
            <feBlend
              mode='normal'
              in2='BackgroundImageFix'
              result='effect1_dropShadow'
            />
            <feColorMatrix
              in='SourceAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            />
            <feOffset dy='1' />
            <feGaussianBlur stdDeviation='1' />
            <feColorMatrix
              type='matrix'
              values='0 0 0 0 0.231373 0 0 0 0 0.329412 0 0 0 0 0.415686 0 0 0 0.03 0'
            />
            <feBlend
              mode='normal'
              in2='effect1_dropShadow'
              result='effect2_dropShadow'
            />
            <feBlend
              mode='normal'
              in='SourceGraphic'
              in2='effect2_dropShadow'
              result='shape'
            />
          </filter>
        </defs>
      </svg>
    )
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
    svg: (
      <svg
        width='384'
        height='247'
        viewBox='0 0 384 247'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <g filter='url(#filter0_dd)'>
          <rect x='8' y='6' width='368' height='231' rx='4' fill='white' />
          <rect
            x='8.5'
            y='6.5'
            width='367'
            height='230'
            rx='3.5'
            stroke='#E7EAF3'
          />
        </g>
        <defs>
          <filter
            id='filter0_dd'
            x='0'
            y='0'
            width='384'
            height='247'
            filterUnits='userSpaceOnUse'
            color-interpolation-filters='sRGB'
          >
            <feFlood flood-opacity='0' result='BackgroundImageFix' />
            <feColorMatrix
              in='SourceAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            />
            <feOffset dy='2' />
            <feGaussianBlur stdDeviation='4' />
            <feColorMatrix
              type='matrix'
              values='0 0 0 0 0.232639 0 0 0 0 0.328333 0 0 0 0 0.416667 0 0 0 0.03 0'
            />
            <feBlend
              mode='normal'
              in2='BackgroundImageFix'
              result='effect1_dropShadow'
            />
            <feColorMatrix
              in='SourceAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            />
            <feOffset dy='1' />
            <feGaussianBlur stdDeviation='1' />
            <feColorMatrix
              type='matrix'
              values='0 0 0 0 0.231373 0 0 0 0 0.329412 0 0 0 0 0.415686 0 0 0 0.03 0'
            />
            <feBlend
              mode='normal'
              in2='effect1_dropShadow'
              result='effect2_dropShadow'
            />
            <feBlend
              mode='normal'
              in='SourceGraphic'
              in2='effect2_dropShadow'
              result='shape'
            />
          </filter>
        </defs>
      </svg>
    )
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
    svg: (
      <svg
        width='384'
        height='247'
        viewBox='0 0 384 247'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <g filter='url(#filter0_dd)'>
          <rect x='8' y='6' width='368' height='231' rx='4' fill='white' />
          <rect
            x='8.5'
            y='6.5'
            width='367'
            height='230'
            rx='3.5'
            stroke='#E7EAF3'
          />
        </g>
        <defs>
          <filter
            id='filter0_dd'
            x='0'
            y='0'
            width='384'
            height='247'
            filterUnits='userSpaceOnUse'
            color-interpolation-filters='sRGB'
          >
            <feFlood flood-opacity='0' result='BackgroundImageFix' />
            <feColorMatrix
              in='SourceAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            />
            <feOffset dy='2' />
            <feGaussianBlur stdDeviation='4' />
            <feColorMatrix
              type='matrix'
              values='0 0 0 0 0.232639 0 0 0 0 0.328333 0 0 0 0 0.416667 0 0 0 0.03 0'
            />
            <feBlend
              mode='normal'
              in2='BackgroundImageFix'
              result='effect1_dropShadow'
            />
            <feColorMatrix
              in='SourceAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            />
            <feOffset dy='1' />
            <feGaussianBlur stdDeviation='1' />
            <feColorMatrix
              type='matrix'
              values='0 0 0 0 0.231373 0 0 0 0 0.329412 0 0 0 0 0.415686 0 0 0 0.03 0'
            />
            <feBlend
              mode='normal'
              in2='effect1_dropShadow'
              result='effect2_dropShadow'
            />
            <feBlend
              mode='normal'
              in='SourceGraphic'
              in2='effect2_dropShadow'
              result='shape'
            />
          </filter>
        </defs>
      </svg>
    )
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
    svg: (
      <svg
        width='384'
        height='247'
        viewBox='0 0 384 247'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <g filter='url(#filter0_dd)'>
          <rect x='8' y='6' width='368' height='231' rx='4' fill='white' />
          <rect
            x='8.5'
            y='6.5'
            width='367'
            height='230'
            rx='3.5'
            stroke='#E7EAF3'
          />
        </g>
        <defs>
          <filter
            id='filter0_dd'
            x='0'
            y='0'
            width='384'
            height='247'
            filterUnits='userSpaceOnUse'
            color-interpolation-filters='sRGB'
          >
            <feFlood flood-opacity='0' result='BackgroundImageFix' />
            <feColorMatrix
              in='SourceAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            />
            <feOffset dy='2' />
            <feGaussianBlur stdDeviation='4' />
            <feColorMatrix
              type='matrix'
              values='0 0 0 0 0.232639 0 0 0 0 0.328333 0 0 0 0 0.416667 0 0 0 0.03 0'
            />
            <feBlend
              mode='normal'
              in2='BackgroundImageFix'
              result='effect1_dropShadow'
            />
            <feColorMatrix
              in='SourceAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            />
            <feOffset dy='1' />
            <feGaussianBlur stdDeviation='1' />
            <feColorMatrix
              type='matrix'
              values='0 0 0 0 0.231373 0 0 0 0 0.329412 0 0 0 0 0.415686 0 0 0 0.03 0'
            />
            <feBlend
              mode='normal'
              in2='effect1_dropShadow'
              result='effect2_dropShadow'
            />
            <feBlend
              mode='normal'
              in='SourceGraphic'
              in2='effect2_dropShadow'
              result='shape'
            />
          </filter>
        </defs>
      </svg>
    )
  }
]

export const SECOND_METRICS_GROUP = [
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
    svg: (
      <svg
        width='500'
        height='316'
        viewBox='0 0 500 316'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <g filter='url(#filter0_dd)'>
          <rect x='8' y='6' width='484' height='300' rx='4' fill='#F9FAFC' />
          <rect
            x='8.5'
            y='6.5'
            width='483'
            height='299'
            rx='3.5'
            stroke='#E7EAF3'
          />
        </g>
        <defs>
          <filter
            id='filter0_dd'
            x='0'
            y='0'
            width='500'
            height='316'
            filterUnits='userSpaceOnUse'
            color-interpolation-filters='sRGB'
          >
            <feFlood flood-opacity='0' result='BackgroundImageFix' />
            <feColorMatrix
              in='SourceAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            />
            <feOffset dy='2' />
            <feGaussianBlur stdDeviation='4' />
            <feColorMatrix
              type='matrix'
              values='0 0 0 0 0.232639 0 0 0 0 0.328333 0 0 0 0 0.416667 0 0 0 0.03 0'
            />
            <feBlend
              mode='normal'
              in2='BackgroundImageFix'
              result='effect1_dropShadow'
            />
            <feColorMatrix
              in='SourceAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            />
            <feOffset dy='1' />
            <feGaussianBlur stdDeviation='1' />
            <feColorMatrix
              type='matrix'
              values='0 0 0 0 0.231373 0 0 0 0 0.329412 0 0 0 0 0.415686 0 0 0 0.03 0'
            />
            <feBlend
              mode='normal'
              in2='effect1_dropShadow'
              result='effect2_dropShadow'
            />
            <feBlend
              mode='normal'
              in='SourceGraphic'
              in2='effect2_dropShadow'
              result='shape'
            />
          </filter>
        </defs>
      </svg>
    )
  },
  {
    title: 'Thresholds Crossed Template',
    description: (
      <>
        Understanding how many times a price of a project has moved above or
        below a round number USD value, or a psychological barrier, can provide
        great perspective in understanding just how cyclical the cryptocurrency
        markets are. For those who believe that a cross above a certain level
        likely means that “it will never fall back below again” can be shown
        just how often prices have reset time and time again.
        <div className={styles.block}>
          This template is great for understanding support levels, and where
          prices most commonly see a great deal of push and pull, along with
          psychological polarization among traders. It can be used well to your
          advantage.
        </div>
      </>
    ),
    svg: (
      <svg
        width='500'
        height='316'
        viewBox='0 0 500 316'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <g filter='url(#filter0_dd)'>
          <rect x='8' y='6' width='484' height='300' rx='4' fill='#F9FAFC' />
          <rect
            x='8.5'
            y='6.5'
            width='483'
            height='299'
            rx='3.5'
            stroke='#E7EAF3'
          />
        </g>
        <defs>
          <filter
            id='filter0_dd'
            x='0'
            y='0'
            width='500'
            height='316'
            filterUnits='userSpaceOnUse'
            color-interpolation-filters='sRGB'
          >
            <feFlood flood-opacity='0' result='BackgroundImageFix' />
            <feColorMatrix
              in='SourceAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            />
            <feOffset dy='2' />
            <feGaussianBlur stdDeviation='4' />
            <feColorMatrix
              type='matrix'
              values='0 0 0 0 0.232639 0 0 0 0 0.328333 0 0 0 0 0.416667 0 0 0 0.03 0'
            />
            <feBlend
              mode='normal'
              in2='BackgroundImageFix'
              result='effect1_dropShadow'
            />
            <feColorMatrix
              in='SourceAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            />
            <feOffset dy='1' />
            <feGaussianBlur stdDeviation='1' />
            <feColorMatrix
              type='matrix'
              values='0 0 0 0 0.231373 0 0 0 0 0.329412 0 0 0 0 0.415686 0 0 0 0.03 0'
            />
            <feBlend
              mode='normal'
              in2='effect1_dropShadow'
              result='effect2_dropShadow'
            />
            <feBlend
              mode='normal'
              in='SourceGraphic'
              in2='effect2_dropShadow'
              result='shape'
            />
          </filter>
        </defs>
      </svg>
    )
  }
]

export const FIRST_METRICS_GROUP = [
  {
    title: 'Maximal Mean Dollar Age Template',
    isLeft: true,
    svg: (
      <svg
        width='500'
        height='340'
        viewBox='0 0 500 340'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <g filter='url(#filter0_dd)'>
          <rect x='8' y='6' width='484' height='324' rx='4' fill='white' />
          <rect
            x='8.5'
            y='6.5'
            width='483'
            height='323'
            rx='3.5'
            stroke='var(--porcelain)'
          />
        </g>
        <mask
          id='mask0'
          mask-type='alpha'
          maskUnits='userSpaceOnUse'
          x='8'
          y='6'
          width='484'
          height='324'
        >
          <rect
            x='8.5'
            y='6.5'
            width='483'
            height='323'
            rx='3.5'
            fill='white'
            stroke='var(--porcelain)'
          />
        </mask>
        <g mask='url(#mask0)'>
          <rect x='9' y='291' width='482' height='2' fill='var(--athens)' />
          <rect x='9' y='208' width='482' height='2' fill='var(--athens)' />
          <rect x='9' y='125' width='482' height='2' fill='var(--athens)' />
          <rect x='9' y='42' width='482' height='2' fill='var(--athens)' />
          <path
            d='M230.138 172.877L232.555 164.309C232.777 163.524 233.796 163.32 234.302 163.961L236.619 166.894C236.672 166.96 236.732 167.02 236.799 167.071L240.121 169.594C240.245 169.687 240.345 169.808 240.413 169.947L243.92 177.049L247.045 182.854C247.311 183.349 247.932 183.527 248.42 183.25L250.908 181.835C251.061 181.749 251.188 181.623 251.277 181.472L254.616 175.777C254.705 175.625 254.832 175.5 254.985 175.413L258.308 173.524L261.065 171.957C261.56 171.675 262.19 171.863 262.45 172.37L265.108 177.562C265.368 178.069 265.997 178.257 266.492 177.976L268.393 176.895C268.846 176.638 269.421 176.771 269.714 177.202L272.262 180.941C272.555 181.371 273.13 181.505 273.582 181.247L276.416 179.636L279.847 177.686C279.966 177.619 280.07 177.527 280.152 177.418L283.468 173.009C283.579 172.861 283.647 172.686 283.665 172.502L287.199 135.384C287.23 135.059 287.417 134.77 287.701 134.609L290.614 132.953C290.775 132.862 290.907 132.728 290.996 132.567L294.47 126.274L297.514 122.026C297.83 121.585 298.438 121.476 298.887 121.779L301.013 123.215C301.408 123.481 301.935 123.432 302.275 123.098L305.032 120.383C305.206 120.211 305.311 119.982 305.328 119.738L308.833 68.1243C308.875 67.508 309.46 67.0766 310.061 67.219L312.16 67.7161C312.406 67.7744 312.665 67.7373 312.885 67.6124L316.008 65.8373C316.092 65.7895 316.169 65.7298 316.235 65.6601L318.839 62.945C319.295 62.4691 320.079 62.5574 320.419 63.1229L323.058 67.5251C323.242 67.8326 323.577 68.0178 323.936 68.0107L326.531 67.9591C326.809 67.9535 327.072 67.8324 327.257 67.6247L329.844 64.7224C330.237 64.2817 330.925 64.2755 331.325 64.7091L334.101 67.7125C334.159 67.7751 334.209 67.8448 334.249 67.92L336.908 72.8965C337.286 73.605 338.303 73.6006 338.676 72.8888L340.337 69.7127C340.744 68.9364 341.881 69.0206 342.168 69.8484L345.021 78.0661L348.244 89.3206C348.433 89.9823 349.219 90.2592 349.781 89.8625L351.682 88.5221C352.02 88.2841 352.469 88.278 352.812 88.5068L355.088 90.0213C355.521 90.309 356.101 90.2179 356.425 89.8116L358.694 86.9614C359.09 86.4635 359.844 86.4576 360.248 86.9491L362.256 89.391C362.671 89.8954 363.45 89.8735 363.835 89.3466L365.859 86.5812C366.264 86.0281 367.093 86.037 367.486 86.5987L369.99 90.1788C370.181 90.4521 370.496 90.6121 370.829 90.6055L373.906 90.5442L376.765 90.4874C377.21 90.4785 377.596 90.1758 377.711 89.745L380.635 78.7715C380.843 77.991 381.843 77.7664 382.365 78.3829L384.553 80.9682C384.674 81.1116 384.834 81.218 385.013 81.275L387.919 82.2007C388.193 82.2879 388.416 82.4886 388.531 82.7516L391.831 90.2697C391.915 90.4616 392.057 90.6222 392.238 90.7288L394.894 92.2978C395.291 92.5325 395.797 92.4649 396.119 92.1342L398.114 90.0838C398.617 89.5667 399.486 89.7364 399.757 90.4049L402.792 97.8777L406.403 104.581L409.396 108.875C409.729 109.353 410.399 109.446 410.85 109.077L413.537 106.877C413.595 106.83 413.648 106.775 413.694 106.716L417.16 102.241C417.21 102.176 417.252 102.106 417.285 102.031L419.748 96.4189C420.122 95.5656 421.358 95.6433 421.622 96.5368L424.334 105.691C424.413 105.955 424.596 106.175 424.841 106.299L431.678 109.761L434.495 111.438C434.943 111.705 435.521 111.583 435.823 111.157L438.478 107.403C438.729 107.047 439.182 106.895 439.597 107.027L442.189 107.85C442.398 107.917 442.622 107.913 442.828 107.839L445.779 106.784C446 106.705 446.186 106.551 446.305 106.348L448.297 102.946C448.774 102.132 450.011 102.371 450.149 103.305L452.926 121.992C453.064 122.926 454.301 123.165 454.778 122.35L455.495 121.125C455.975 120.306 457.219 120.553 457.349 121.494L460.369 143.355C460.464 144.042 461.212 144.426 461.825 144.103L463.922 143C464.087 142.913 464.225 142.782 464.319 142.621L466.622 138.688C467.064 137.934 468.194 138.07 468.443 138.908L471.179 148.088C471.308 148.519 471.708 148.811 472.157 148.802L475.007 148.746L478.058 148.685C478.406 148.678 478.725 148.491 478.901 148.191L481.376 143.964C481.76 143.309 482.706 143.304 483.096 143.955L485.562 148.067C485.735 148.356 486.042 148.538 486.379 148.552L492.04 148.779C492.576 148.801 493 149.242 493 149.778V332C493 332.552 492.552 333 492 333H3C2.44772 333 2 332.552 2 332V116.944C2 116.22 2.95438 115.959 3.32315 116.581C3.56445 116.988 4.12894 117.051 4.45322 116.706L9.49927 111.338C10.0005 110.805 10.886 110.973 11.1568 111.653L14.6375 120.39L19.5322 129.698C19.5787 129.786 19.6116 129.881 19.63 129.979L23.6706 151.528C23.8348 152.404 24.9761 152.644 25.479 151.909L26.2191 150.826C26.5461 150.348 27.2099 150.246 27.6645 150.606L30.7094 153.011C31.0764 153.301 31.5954 153.298 31.9588 153.004L32.0731 152.911C32.7072 152.397 33.6564 152.818 33.7011 153.633L34.226 163.202C34.2858 164.29 35.7972 164.511 36.1657 163.485L36.9986 161.165C37.3323 160.236 38.668 160.301 38.9094 161.259L41.0541 169.765C41.2815 170.667 42.5088 170.797 42.9204 169.964L44.8817 165.992C45.1279 165.493 45.7338 165.291 46.23 165.542L48.4879 166.685C48.7719 166.829 49.1073 166.829 49.3913 166.685L52.4863 165.118C52.5289 165.097 52.573 165.078 52.6182 165.063L55.9228 163.947C56.0792 163.895 56.2463 163.881 56.4091 163.909L59.2101 164.382C59.5583 164.44 59.9117 164.311 60.1398 164.042L61.9246 161.933C62.4851 161.271 63.5652 161.588 63.6792 162.448L66.8335 186.235C66.9163 186.859 67.5482 187.252 68.1447 187.051L69.893 186.461C70.3143 186.318 70.7789 186.471 71.0332 186.836L73.3708 190.19C73.7751 190.77 74.6375 190.758 75.0264 190.168L77.2062 186.857C77.5357 186.356 78.2284 186.256 78.6864 186.642L80.6469 188.297C81.0787 188.661 81.7263 188.596 82.0765 188.152L84.4067 185.203C84.757 184.759 85.4046 184.694 85.8363 185.058L87.8434 186.752C88.2846 187.124 88.9484 187.047 89.292 186.583L92.1835 182.679C92.2399 182.603 92.3068 182.535 92.3823 182.478L95.7538 179.917C95.8369 179.854 95.9097 179.778 95.9694 179.693L98.5222 176.03C98.9573 175.406 99.9024 175.477 100.239 176.159L102.799 181.344C102.981 181.712 103.37 181.932 103.78 181.897L106.711 181.65L110.005 181.372C110.211 181.355 110.407 181.274 110.566 181.14L113.17 178.942C113.591 178.586 114.222 178.639 114.578 179.06L117.473 182.48C117.52 182.536 117.573 182.586 117.631 182.631L120.771 185.015C121.013 185.199 121.326 185.263 121.621 185.188L123.879 184.617C124.381 184.49 124.896 184.767 125.068 185.255L128.024 193.683C128.215 194.228 128.825 194.498 129.356 194.274L131.897 193.202C131.957 193.177 132.014 193.146 132.068 193.109L134.881 191.21C135.292 190.932 135.845 190.998 136.18 191.365L138.687 194.115C138.994 194.452 139.034 194.954 138.785 195.336L137.659 197.061C137.15 197.84 138.042 198.774 138.844 198.3C139.074 198.164 139.354 198.14 139.604 198.235L142.819 199.456L145.244 200.377C145.848 200.606 146.509 200.21 146.591 199.569L149.591 176.138C149.719 175.137 151.08 174.934 151.494 175.854L153.299 179.856C153.501 180.306 154.002 180.541 154.478 180.409L157.191 179.656C157.238 179.643 157.284 179.626 157.329 179.606L160.873 178.033L163.64 176.804C164.116 176.593 164.675 176.783 164.924 177.24L167.653 182.257C167.902 182.715 168.461 182.905 168.937 182.693L170.834 181.851C171.322 181.635 171.893 181.839 172.133 182.315L174.887 187.782C175.127 188.258 175.699 188.462 176.186 188.246L178.926 187.029L182.34 185.513C182.47 185.455 182.586 185.371 182.68 185.265L186.148 181.385L189.26 176.989C189.546 176.584 190.086 176.451 190.528 176.675L192.593 177.723C193.065 177.963 193.642 177.792 193.909 177.335L204.039 159.96C204.145 159.779 204.305 159.635 204.497 159.55L207.812 158.078L211.144 156.257C211.325 156.158 211.472 156.004 211.563 155.818L213.991 150.847C214.379 150.051 215.534 150.116 215.831 150.95L218.282 157.83C218.478 158.379 219.098 158.645 219.63 158.409L221.233 157.697C221.778 157.455 222.412 157.741 222.592 158.31L225.836 168.582C225.856 168.645 225.882 168.706 225.914 168.764L228.3 173.088C228.732 173.871 229.895 173.737 230.138 172.877Z'
            fill='var(--jungle-green)'
            fillOpacity='0.1'
            stroke='var(--jungle-green)'
            strokeWidth='1.16594'
          />
          <path
            d='M264.857 214.208L262.444 203.807C262.245 202.948 261.112 202.749 260.631 203.488L258.37 206.97C258.325 207.04 258.271 207.103 258.21 207.16L254.855 210.259C254.747 210.359 254.662 210.481 254.607 210.617L251.08 219.305L247.959 226.357C247.705 226.931 246.992 227.132 246.476 226.775L244.076 225.116C243.934 225.017 243.819 224.884 243.744 224.728L240.363 217.714C240.288 217.558 240.173 217.424 240.031 217.326L236.692 215.018L234.039 213.183C233.517 212.822 232.795 213.033 232.549 213.618L229.894 219.926C229.647 220.511 228.925 220.721 228.403 220.36L226.709 219.189C226.224 218.854 225.556 219.008 225.268 219.523L222.756 224.007C222.468 224.521 221.8 224.676 221.315 224.341L218.584 222.452L215.145 220.074C215.031 219.996 214.935 219.895 214.863 219.778L212.711 216.298C212.232 215.523 211.05 215.74 210.878 216.635L208.041 231.414C207.904 232.123 207.084 232.458 206.49 232.048L204.368 230.581C204.219 230.478 204.101 230.336 204.026 230.171L200.53 222.469L197.512 217.347C197.201 216.818 196.49 216.692 196.016 217.082L194.075 218.676C193.651 219.024 193.025 218.965 192.673 218.544L189.748 215.04C189.715 215 189.684 214.957 189.657 214.912L186.482 209.59C186.249 209.2 185.783 209.015 185.346 209.141L182.912 209.842C182.624 209.925 182.314 209.874 182.067 209.704L178.989 207.576C178.907 207.519 178.834 207.451 178.772 207.372L176.236 204.155C175.781 203.578 174.879 203.673 174.554 204.332L171.926 209.663C171.754 210.012 171.395 210.23 171.005 210.22L168.525 210.16C168.215 210.153 167.926 210.002 167.743 209.752L165.215 206.302C164.819 205.763 164.016 205.756 163.612 206.289L160.883 209.879C160.836 209.942 160.796 210.01 160.764 210.082L158.126 216.087C157.775 216.887 156.637 216.883 156.292 216.08L154.7 212.378C154.328 211.514 153.078 211.595 152.82 212.499L149.979 222.452L146.746 236.186C146.574 236.916 145.69 237.204 145.121 236.716L143.391 235.232C143.024 234.918 142.486 234.91 142.11 235.214L140.007 236.916C139.547 237.288 138.866 237.182 138.541 236.686L136.36 233.353C135.969 232.755 135.095 232.749 134.695 233.341L132.803 236.139C132.394 236.744 131.495 236.721 131.118 236.095L129.192 232.894C128.798 232.24 127.848 232.25 127.468 232.911L125.001 237.201C124.818 237.519 124.476 237.711 124.11 237.702L121.094 237.629L118.268 237.561C117.807 237.55 117.413 237.225 117.315 236.775L114.362 223.297C114.175 222.444 113.063 222.223 112.564 222.939L110.436 225.998C110.322 226.161 110.162 226.287 109.976 226.359L107.075 227.483C106.806 227.588 106.594 227.804 106.496 228.076L103.145 237.362C103.077 237.552 102.952 237.717 102.788 237.835L100.2 239.694C99.7681 240.005 99.1684 239.923 98.8359 239.507L96.966 237.169C96.4711 236.551 95.4875 236.726 95.2366 237.477L92.2077 246.549L88.5969 254.702L85.6348 259.871C85.3077 260.442 84.5279 260.547 84.0617 260.082L81.4539 257.486C81.4017 257.434 81.3555 257.376 81.3159 257.314L77.8242 251.831C77.7846 251.769 77.7521 251.702 77.7271 251.633L75.2806 244.853C74.9443 243.921 73.6029 243.993 73.3684 244.956L70.6405 256.156C70.5781 256.412 70.4174 256.633 70.1932 256.771L63.3217 261.003L60.6064 262.97C60.1271 263.317 59.4527 263.174 59.1553 262.662L56.5291 258.146C56.2821 257.721 55.7628 257.538 55.3042 257.715L52.8723 258.655C52.627 258.75 52.3543 258.744 52.1132 258.639L49.2197 257.381C48.9998 257.286 48.8215 257.114 48.7174 256.898L46.748 252.807C46.3148 251.908 44.9754 252.129 44.8543 253.12L42.0709 275.909C41.9498 276.9 40.6104 277.121 40.1772 276.221L39.55 274.918C39.1148 274.014 37.7685 274.243 37.6553 275.239L34.6169 301.986C34.5334 302.722 33.7076 303.115 33.0842 302.716L31.0639 301.423C30.9078 301.323 30.7825 301.181 30.702 301.014L28.4233 296.281C28.0164 295.436 26.7743 295.566 26.5511 296.477L23.795 307.726C23.6832 308.182 23.269 308.499 22.7995 308.488L19.9928 308.42L16.9935 308.347C16.6182 308.338 16.2796 308.12 16.1167 307.781L13.6617 302.682C13.3001 301.931 12.2323 301.926 11.8638 302.674L9.42082 307.63C9.26019 307.956 8.93548 308.169 8.57262 308.186L2.95126 308.461C2.41856 308.487 2 308.926 2 309.46V332C2 332.552 2.4477 333 2.99999 333H492C492.552 333 493 332.552 493 332V70.0586C493 69.3232 492.006 69.0939 491.684 69.755C491.458 70.2171 490.826 70.2821 490.512 69.8753L485.579 63.4931C485.088 62.8582 484.087 63.0308 483.837 63.7934L480.362 74.4017L475.449 85.767C475.415 85.8452 475.391 85.9273 475.378 86.0115L471.325 112.301C471.181 113.24 469.931 113.467 469.465 112.639L468.809 111.471C468.489 110.901 467.716 110.787 467.245 111.24L464.353 114.018C463.969 114.388 463.36 114.384 462.981 114.01C462.374 113.412 461.345 113.815 461.306 114.667L460.772 126.512C460.721 127.639 459.134 127.832 458.814 126.75L458.022 124.065C457.727 123.068 456.294 123.127 456.083 124.145L453.95 134.438C453.749 135.405 452.416 135.527 452.044 134.611L450.116 129.86C449.883 129.287 449.191 129.061 448.665 129.385L446.585 130.666C446.263 130.864 445.858 130.864 445.536 130.666L442.519 128.808C442.473 128.78 442.425 128.755 442.374 128.734L439.121 127.399C438.937 127.323 438.735 127.304 438.54 127.344L435.874 127.892C435.482 127.972 435.08 127.811 434.852 127.483L433.143 125.028C432.615 124.269 431.428 124.571 431.328 125.49L428.151 154.632C428.079 155.294 427.393 155.702 426.777 155.449L425.207 154.805C424.743 154.614 424.209 154.797 423.96 155.233L421.678 159.215C421.288 159.894 420.304 159.882 419.931 159.193L417.822 155.296C417.5 154.703 416.696 154.592 416.226 155.075L414.437 156.911C413.989 157.37 413.231 157.295 412.882 156.758L410.635 153.297C410.285 152.76 409.527 152.685 409.08 153.144L407.242 155.03C406.786 155.498 406.011 155.411 405.672 154.853L402.804 150.144C402.756 150.064 402.697 149.992 402.629 149.929L399.233 146.793C399.159 146.724 399.095 146.644 399.044 146.556L396.531 142.171C396.117 141.447 395.051 141.519 394.737 142.292L392.182 148.588C392.014 149 391.595 149.252 391.153 149.206L388.289 148.912L385.039 148.579C384.806 148.555 384.588 148.45 384.425 148.282L381.912 145.703C381.474 145.253 380.734 145.314 380.375 145.83L377.519 149.935C377.477 149.994 377.43 150.049 377.376 150.098L374.268 152.969C374.007 153.211 373.636 153.295 373.296 153.19L371.208 152.548C370.673 152.383 370.108 152.689 369.953 153.226L366.961 163.603C366.786 164.207 366.103 164.503 365.543 164.215L363.109 162.966C363.045 162.933 362.986 162.894 362.931 162.849L360.21 160.615C359.77 160.254 359.117 160.333 358.776 160.788L356.174 164.259C355.941 164.571 355.91 164.989 356.094 165.332L357.55 168.045C358.005 168.892 357.002 169.771 356.221 169.21C355.956 169.02 355.608 168.986 355.312 169.124L352.181 170.57L349.177 171.957C348.81 172.127 348.377 172.058 348.079 171.784L346.057 169.915C345.534 169.432 344.688 169.635 344.441 170.302L341.686 177.734C341.498 178.241 340.941 178.507 340.429 178.334L337.819 177.453C337.765 177.435 337.713 177.412 337.663 177.385L334.127 175.476L331.465 174.038C330.953 173.761 330.314 173.978 330.077 174.509L327.346 180.616C327.108 181.147 326.47 181.364 325.958 181.088L324.27 180.176C323.749 179.894 323.098 180.126 322.871 180.673L320.108 187.344C319.882 187.891 319.231 188.123 318.709 187.841L316.074 186.418L312.661 184.574C312.53 184.504 312.418 184.406 312.33 184.286L308.852 179.553L305.758 174.236C305.475 173.75 304.847 173.593 304.368 173.888L301.817 175.463C301.653 175.564 301.522 175.71 301.439 175.883L291.251 197.231C291.005 197.748 290.377 197.952 289.874 197.681L287.188 196.23L283.836 194.002C283.667 193.89 283.537 193.729 283.461 193.542L281.042 187.518C280.689 186.637 279.421 186.698 279.155 187.609L276.703 195.979C276.524 196.59 275.828 196.88 275.268 196.578L273.867 195.821C273.296 195.513 272.587 195.822 272.424 196.45L269.156 209.038C269.141 209.094 269.122 209.148 269.098 209.2L266.742 214.396C266.347 215.266 265.073 215.139 264.857 214.208Z'
            fill='var(--dodger-blue)'
            fillOpacity='0.1'
            stroke='var(--dodger-blue)'
            strokeWidth='1.16594'
          />
        </g>
        <defs>
          <filter
            id='filter0_dd'
            x='0'
            y='0'
            width='500'
            height='340'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'
          >
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feColorMatrix
              in='SourceAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            />
            <feOffset dy='2' />
            <feGaussianBlur stdDeviation='4' />
            <feColorMatrix
              type='matrix'
              values='0 0 0 0 0.232639 0 0 0 0 0.328333 0 0 0 0 0.416667 0 0 0 0.03 0'
            />
            <feBlend
              mode='normal'
              in2='BackgroundImageFix'
              result='effect1_dropShadow'
            />
            <feColorMatrix
              in='SourceAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            />
            <feOffset dy='1' />
            <feGaussianBlur stdDeviation='1' />
            <feColorMatrix
              type='matrix'
              values='0 0 0 0 0.231373 0 0 0 0 0.329412 0 0 0 0 0.415686 0 0 0 0.03 0'
            />
            <feBlend
              mode='normal'
              in2='effect1_dropShadow'
              result='effect2_dropShadow'
            />
            <feBlend
              mode='normal'
              in='SourceGraphic'
              in2='effect2_dropShadow'
              result='shape'
            />
          </filter>
        </defs>
      </svg>
    ),
    description: (
      <>
        This template visualizes the Mean Dollar Age of Bitcoin, Ethereum and
        various ERC20 coins in comparison to one another.
        <div className={styles.block}>
          Developed by Santiment,{' '}
          <a
            className={styles.link}
            rel='noopener noreferrer'
            target='_blank'
            href='https://insights.santiment.net/read/%F0%9F%93%A2-mean-age-653/?utm_campaign=mainlist_feb_2020&utm_medium=newsletter&utm_source=email&via=monthly_email'
          >
            Mean Dollar Age
          </a>{' '}
          calculates the average age of all dollars invested in acquiring a
          particular coin.
        </div>
        <div className={styles.block}>
          This metric identifies accumulation and sell cycles for any coin,{' '}
          <span className={styles.highline}>
            and identifying dips in Mean Dollar Age
          </span>{' '}
          can serve as a novel bullish indicator.
        </div>
      </>
    )
  },
  {
    title: 'Top Holders Template',
    description: (
      <>
        Crypto is still a whale’s playground.{' '}
        <a
          className={styles.link}
          rel='noopener noreferrer'
          target='_blank'
          href='https://insights.santiment.net/read/top-token-holders-and-their-role-as-leading-indicators-5618'
        >
          This template
        </a>{' '}
        monitors the behavior of the biggest addresses holding Ethereum as well
        as various ERC-20 coins.
        <div className={styles.block}>
          The template includes a dozen views of top whales’ behavior, including
          balance changes, big accumulation/sell-off events and week-to-week
          adjustments to total supply held.
        </div>
      </>
    ),
    svg: (
      <svg
        width='500'
        height='340'
        viewBox='0 0 500 340'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <g filter='url(#filter0_dd)'>
          <rect x='8' y='6' width='484' height='324' rx='4' fill='white' />
          <rect
            x='8.5'
            y='6.5'
            width='483'
            height='323'
            rx='3.5'
            stroke='var(--porcelain)'
          />
        </g>
        <mask
          id='mask0'
          mask-type='alpha'
          maskUnits='userSpaceOnUse'
          x='8'
          y='6'
          width='484'
          height='324'
        >
          <rect
            x='8.5'
            y='6.5'
            width='483'
            height='323'
            rx='3.5'
            fill='white'
            stroke='var(--porcelain)'
          />
        </mask>
        <g mask='url(#mask0)'>
          <path
            d='M56.9008 316H62.3848V314.764H58.3048V312.544H62.3008V311.308H58.3048V309.232H62.3848V307.996H56.9008V316ZM65.5306 316.144C66.1186 316.144 66.4906 315.988 66.7186 315.772L66.4186 314.824C66.3226 314.932 66.0946 315.028 65.8546 315.028C65.4946 315.028 65.3026 314.74 65.3026 314.344V311.308H66.4786V310.204H65.3026V308.62H64.0426V310.204H63.0826V311.308H64.0426V314.656C64.0426 315.616 64.5586 316.144 65.5306 316.144ZM71.5466 316H72.8066V311.896C72.8066 310.708 72.1826 310.06 70.9346 310.06C70.0226 310.06 69.2666 310.54 68.8826 310.996V307.996H67.6226V316H68.8826V311.956C69.1826 311.56 69.7346 311.176 70.3706 311.176C71.0786 311.176 71.5466 311.452 71.5466 312.352V316ZM74.083 313.096C74.083 314.932 75.379 316.144 77.119 316.144C78.043 316.144 78.895 315.856 79.471 315.304L78.895 314.476C78.487 314.884 77.815 315.112 77.251 315.112C76.159 315.112 75.499 314.392 75.403 313.516H79.879V313.216C79.879 311.392 78.763 310.06 77.023 310.06C75.307 310.06 74.083 311.416 74.083 313.096ZM77.023 311.092C78.163 311.092 78.631 311.944 78.655 312.628H75.391C75.451 311.92 75.943 311.092 77.023 311.092ZM81.1226 316H82.3826V312.052C82.6346 311.644 83.3426 311.284 83.8706 311.284C84.0266 311.284 84.1586 311.296 84.2666 311.32V310.072C83.5106 310.072 82.8146 310.504 82.3826 311.056V310.204H81.1226V316ZM84.9228 313.096C84.9228 314.932 86.2188 316.144 87.9588 316.144C88.8828 316.144 89.7348 315.856 90.3108 315.304L89.7348 314.476C89.3268 314.884 88.6548 315.112 88.0908 315.112C86.9988 315.112 86.3388 314.392 86.2428 313.516H90.7188V313.216C90.7188 311.392 89.6028 310.06 87.8628 310.06C86.1468 310.06 84.9228 311.416 84.9228 313.096ZM87.8628 311.092C89.0028 311.092 89.4708 311.944 89.4948 312.628H86.2308C86.2908 311.92 86.7828 311.092 87.8628 311.092ZM95.8745 316H97.1345V310.204H95.8745V314.272C95.5745 314.668 95.0225 315.028 94.3865 315.028C93.6785 315.028 93.2225 314.752 93.2225 313.852V310.204H91.9625V314.308C91.9625 315.496 92.5745 316.144 93.8225 316.144C94.7345 316.144 95.4545 315.7 95.8745 315.232V316ZM105.875 316H107.135V311.812C107.135 310.636 106.535 310.06 105.467 310.06C104.603 310.06 103.835 310.6 103.499 311.128C103.307 310.492 102.779 310.06 101.915 310.06C101.039 310.06 100.271 310.636 100.031 310.996V310.204H98.7711V316H100.031V311.956C100.295 311.572 100.811 311.176 101.363 311.176C102.047 311.176 102.323 311.596 102.323 312.22V316H103.583V311.944C103.835 311.572 104.363 311.176 104.927 311.176C105.599 311.176 105.875 311.596 105.875 312.22V316Z'
            fill='var(--casper)'
          />
          <path
            d='M157.112 316H158.516V307.996H156.536L154.352 313.384L152.18 307.996H150.2V316H151.604V309.94L154.052 316H154.652L157.112 309.94V316ZM163.723 316H164.983V312.16C164.983 310.6 163.855 310.06 162.571 310.06C161.647 310.06 160.807 310.36 160.135 310.996L160.651 311.872C161.155 311.38 161.719 311.14 162.367 311.14C163.171 311.14 163.723 311.548 163.723 312.22V313.084C163.303 312.592 162.631 312.34 161.851 312.34C160.903 312.34 159.835 312.892 159.835 314.224C159.835 315.508 160.903 316.144 161.851 316.144C162.619 316.144 163.291 315.868 163.723 315.376V316ZM163.723 314.68C163.435 315.076 162.895 315.28 162.343 315.28C161.635 315.28 161.107 314.872 161.107 314.248C161.107 313.612 161.635 313.204 162.343 313.204C162.895 313.204 163.435 313.408 163.723 313.804V314.68ZM170.457 316H172.041L169.581 312.832L171.993 310.204H170.433L167.877 313V307.996H166.617V316H167.877V314.44L168.681 313.612L170.457 316ZM172.269 313.096C172.269 314.932 173.565 316.144 175.305 316.144C176.229 316.144 177.081 315.856 177.657 315.304L177.081 314.476C176.673 314.884 176.001 315.112 175.437 315.112C174.345 315.112 173.685 314.392 173.589 313.516H178.065V313.216C178.065 311.392 176.949 310.06 175.209 310.06C173.493 310.06 172.269 311.416 172.269 313.096ZM175.209 311.092C176.349 311.092 176.817 311.944 176.841 312.628H173.576C173.637 311.92 174.129 311.092 175.209 311.092ZM179.308 316H180.568V312.052C180.82 311.644 181.528 311.284 182.056 311.284C182.212 311.284 182.344 311.296 182.452 311.32V310.072C181.696 310.072 181 310.504 180.568 311.056V310.204H179.308V316Z'
            fill='var(--casper)'
          />
          <path
            d='M239.854 316H243.898C245.398 316 246.226 315.076 246.226 313.84C246.226 312.856 245.53 312.004 244.678 311.872C245.422 311.716 246.07 311.044 246.07 310.036C246.07 308.908 245.254 307.996 243.79 307.996H239.854V316ZM241.258 311.308V309.232H243.502C244.222 309.232 244.63 309.676 244.63 310.276C244.63 310.876 244.222 311.308 243.502 311.308H241.258ZM241.258 314.764V312.544H243.562C244.366 312.544 244.786 313.048 244.786 313.648C244.786 314.344 244.33 314.764 243.562 314.764H241.258ZM253.299 316H254.835L251.691 307.996H249.939L246.795 316H248.331L248.919 314.464H252.711L253.299 316ZM250.815 309.184L252.315 313.228H249.315L250.815 309.184ZM256.832 316H258.236V309.232H260.66V307.996H254.408V309.232H256.832V316Z'
            fill='var(--casper)'
          />
          <path
            d='M327.818 312.004C327.818 314.02 328.778 316.144 331.022 316.144C333.266 316.144 334.226 314.02 334.226 312.004C334.226 309.988 333.266 307.876 331.022 307.876C328.778 307.876 327.818 309.988 327.818 312.004ZM332.798 312.004C332.798 313.528 332.33 314.896 331.022 314.896C329.714 314.896 329.246 313.528 329.246 312.004C329.246 310.48 329.714 309.124 331.022 309.124C332.33 309.124 332.798 310.48 332.798 312.004ZM339.197 316H340.613L338.477 313.024L340.481 310.204H339.065L337.697 312.172L336.317 310.204H334.901L336.905 313.024L334.781 316H336.185L337.697 313.864L339.197 316Z'
            fill='var(--casper)'
          />
          <path
            d='M407.847 316H409.575L406.083 311.776L409.335 307.996H407.595L404.463 311.812V307.996H403.059V316H404.463V313.444L405.159 312.628L407.847 316ZM409.701 317.14L409.509 318.268C409.689 318.316 410.037 318.352 410.217 318.352C411.117 318.34 411.813 318.028 412.209 317.044L415.005 310.204H413.649L411.957 314.548L410.265 310.204H408.921L411.297 316.072L411.009 316.732C410.841 317.116 410.577 317.236 410.181 317.236C410.037 317.236 409.833 317.2 409.701 317.14ZM415.796 316H417.056V315.208C417.5 315.784 418.16 316.144 418.916 316.144C420.392 316.144 421.484 315.016 421.484 313.108C421.484 311.236 420.404 310.06 418.916 310.06C418.184 310.06 417.512 310.396 417.056 311.008V307.996H415.796V316ZM417.056 314.26V311.968C417.332 311.536 417.956 311.176 418.544 311.176C419.552 311.176 420.188 311.98 420.188 313.108C420.188 314.236 419.552 315.028 418.544 315.028C417.956 315.028 417.332 314.692 417.056 314.26ZM422.409 313.096C422.409 314.932 423.705 316.144 425.445 316.144C426.369 316.144 427.221 315.856 427.797 315.304L427.221 314.476C426.813 314.884 426.141 315.112 425.577 315.112C424.485 315.112 423.825 314.392 423.729 313.516H428.205V313.216C428.205 311.392 427.089 310.06 425.349 310.06C423.633 310.06 422.409 311.416 422.409 313.096ZM425.349 311.092C426.489 311.092 426.957 311.944 426.981 312.628H423.717C423.777 311.92 424.269 311.092 425.349 311.092ZM429.449 316H430.709V312.052C430.961 311.644 431.669 311.284 432.197 311.284C432.353 311.284 432.485 311.296 432.593 311.32V310.072C431.837 310.072 431.141 310.504 430.709 311.056V310.204H429.449V316Z'
            fill='var(--casper)'
          />
          <rect x='9' y='292' width='482' height='2' fill='var(--athens)' />
          <rect x='9' y='209' width='482' height='2' fill='var(--athens)' />
          <rect x='9' y='126' width='482' height='2' fill='var(--athens)' />
          <rect x='9' y='43' width='482' height='2' fill='var(--athens)' />
          <g opacity='0.3'>
            <rect
              x='62'
              y='177.429'
              width='4'
              height='116.571'
              rx='2'
              fill='var(--dodger-blue)'
            />
            <rect
              x='74'
              y='165.771'
              width='4'
              height='128.229'
              rx='2'
              fill='var(--persimmon)'
            />
            <rect
              x='86'
              y='158'
              width='4'
              height='136'
              rx='2'
              fill='var(--texas-rose)'
            />
            <rect
              x='98'
              y='165.771'
              width='4'
              height='128.229'
              rx='2'
              fill='var(--lima)'
            />
          </g>
          <g opacity='0.3'>
            <rect
              x='146'
              y='188.571'
              width='4'
              height='105.429'
              rx='2'
              fill='var(--dodger-blue)'
            />
            <rect
              x='158'
              y='178.029'
              width='4'
              height='115.971'
              rx='2'
              fill='var(--persimmon)'
            />
            <rect
              x='170'
              y='171'
              width='4'
              height='123'
              rx='2'
              fill='var(--texas-rose)'
            />
            <rect
              x='182'
              y='178.029'
              width='4'
              height='115.971'
              rx='2'
              fill='var(--lima)'
            />
          </g>
          <g opacity='0.3'>
            <rect
              x='230'
              y='234'
              width='4'
              height='60'
              rx='2'
              fill='var(--dodger-blue)'
            />
            <rect
              x='242'
              y='228'
              width='4'
              height='66'
              rx='2'
              fill='var(--persimmon)'
            />
            <rect
              x='254'
              y='224'
              width='4'
              height='70'
              rx='2'
              fill='var(--texas-rose)'
            />
            <rect
              x='266'
              y='228'
              width='4'
              height='66'
              rx='2'
              fill='var(--lima)'
            />
          </g>
          <rect
            x='314'
            y='132'
            width='4'
            height='162'
            rx='2'
            fill='var(--dodger-blue)'
          />
          <rect
            x='326'
            y='115.8'
            width='4'
            height='178.2'
            rx='2'
            fill='var(--persimmon)'
          />
          <rect
            x='338'
            y='105'
            width='4'
            height='189'
            rx='2'
            fill='var(--texas-rose)'
          />
          <rect
            x='350'
            y='115.8'
            width='4'
            height='178.2'
            rx='2'
            fill='var(--lima)'
          />
          <path
            d='M314.701 91.908C315.349 92.676 316.297 93.144 317.677 93.144C319.465 93.144 320.725 92.1 320.725 90.432C320.725 88.8 319.513 87.852 318.169 87.852C317.401 87.852 316.741 88.164 316.357 88.548V86.232H320.197V84.996H314.953V89.472L315.949 89.76C316.453 89.28 317.017 89.064 317.701 89.064C318.685 89.064 319.309 89.628 319.309 90.492C319.309 91.272 318.673 91.896 317.665 91.896C316.765 91.896 316.045 91.56 315.505 90.948L314.701 91.908ZM322.677 93H324.213L327.321 85.968V84.996H321.549V86.232H325.701L322.677 93ZM327.099 92.292C327.099 92.748 327.483 93.132 327.939 93.132C328.395 93.132 328.779 92.748 328.779 92.292C328.779 91.836 328.395 91.452 327.939 91.452C327.483 91.452 327.099 91.836 327.099 92.292ZM330.304 92.244C330.844 92.784 331.612 93.132 332.596 93.132C334.912 93.132 336.124 91.308 336.124 89.004C336.124 86.772 335.176 84.864 332.824 84.864C331.036 84.864 329.872 86.076 329.872 87.552C329.872 89.256 331.12 90.144 332.56 90.144C333.496 90.144 334.336 89.556 334.708 89.016V89.256C334.708 90.564 334.048 91.884 332.596 91.884C331.84 91.884 331.372 91.62 330.952 91.188L330.304 92.244ZM334.684 87.996C334.288 88.572 333.616 88.932 332.932 88.932C332.068 88.932 331.3 88.488 331.3 87.504C331.3 86.868 331.852 86.112 332.896 86.112C334.132 86.112 334.612 87.132 334.684 87.996ZM337.115 89.004C337.115 91.02 338.075 93.144 340.319 93.144C342.563 93.144 343.523 91.02 343.523 89.004C343.523 86.988 342.563 84.876 340.319 84.876C338.075 84.876 337.115 86.988 337.115 89.004ZM342.095 89.004C342.095 90.528 341.627 91.896 340.319 91.896C339.011 91.896 338.543 90.528 338.543 89.004C338.543 87.48 339.011 86.124 340.319 86.124C341.627 86.124 342.095 87.48 342.095 89.004ZM344.354 86.88C344.354 87.996 345.146 88.848 346.334 88.848C347.534 88.848 348.338 87.996 348.338 86.88C348.338 85.752 347.534 84.876 346.334 84.876C345.146 84.876 344.354 85.752 344.354 86.88ZM345.566 93H346.358L351.482 84.996H350.678L345.566 93ZM347.402 86.88C347.402 87.564 346.958 88.056 346.334 88.056C345.722 88.056 345.278 87.564 345.278 86.88C345.278 86.16 345.722 85.68 346.334 85.68C346.958 85.68 347.402 86.16 347.402 86.88ZM348.662 91.176C348.662 92.292 349.454 93.144 350.642 93.144C351.83 93.144 352.634 92.292 352.634 91.176C352.634 90.048 351.83 89.172 350.642 89.172C349.454 89.172 348.662 90.048 348.662 91.176ZM351.71 91.176C351.71 91.872 351.266 92.352 350.642 92.352C350.018 92.352 349.586 91.872 349.586 91.176C349.586 90.456 350.018 89.976 350.642 89.976C351.266 89.976 351.71 90.456 351.71 91.176Z'
            fill='var(--lima)'
          />
          <g opacity='0.3'>
            <rect
              x='398'
              y='170.571'
              width='4'
              height='123.429'
              rx='2'
              fill='var(--dodger-blue)'
            />
            <rect
              x='410'
              y='158.229'
              width='4'
              height='135.771'
              rx='2'
              fill='var(--persimmon)'
            />
            <rect
              x='422'
              y='150'
              width='4'
              height='144'
              rx='2'
              fill='var(--texas-rose)'
            />
            <rect
              x='434'
              y='158.229'
              width='4'
              height='135.771'
              rx='2'
              fill='var(--lima)'
            />
          </g>
          <g opacity='0.15' filter='url(#filter1_f)'>
            <rect
              x='36'
              y='39'
              width='101'
              height='28'
              rx='6.22222'
              fill='var(--waterloo)'
            />
          </g>
          <g filter='url(#filter2_d)'>
            <rect x='28' y='30' width='117' height='32' rx='16' fill='white' />
            <rect
              x='28.3889'
              y='30.3889'
              width='116.222'
              height='31.2222'
              rx='15.6111'
              stroke='#F1F3F9'
              strokeWidth='0.777778'
            />
          </g>
          <path
            d='M62.312 48.836C62.828 49.556 63.86 50.144 65.252 50.144C67.064 50.144 68.18 49.172 68.18 47.828C68.18 46.568 67.076 45.944 66.32 45.872C67.112 45.728 68.06 45.14 68.06 44.024C68.06 42.68 66.884 41.876 65.252 41.876C63.968 41.876 63.02 42.416 62.42 43.124L63.056 43.868C63.644 43.268 64.304 42.944 65.144 42.944C66.092 42.944 66.86 43.376 66.86 44.192C66.86 45.02 66.068 45.38 65.096 45.38C64.784 45.38 64.364 45.38 64.232 45.368V46.46C64.352 46.448 64.772 46.448 65.096 46.448C66.26 46.448 66.98 46.82 66.98 47.708C66.98 48.548 66.32 49.076 65.216 49.076C64.316 49.076 63.488 48.668 62.984 48.056L62.312 48.836ZM77.7709 50H78.8869L80.7109 44.204H79.5829L78.2629 48.62L76.8109 44.204H75.8749L74.4229 48.62L73.1029 44.204H71.9749L73.7989 50H74.9149L76.3429 45.548L77.7709 50ZM81.3126 47.096C81.3126 48.92 82.5846 50.144 84.3126 50.144C85.2486 50.144 86.0646 49.844 86.6406 49.28L86.1366 48.572C85.7046 49.016 85.0326 49.256 84.4206 49.256C83.2566 49.256 82.5366 48.44 82.4526 47.456H87.0366V47.192C87.0366 45.416 85.9566 44.06 84.2166 44.06C82.5246 44.06 81.3126 45.416 81.3126 47.096ZM84.2166 44.948C85.4406 44.948 85.9566 45.908 85.9806 46.676H82.4406C82.5006 45.884 83.0526 44.948 84.2166 44.948ZM88.0274 47.096C88.0274 48.92 89.2994 50.144 91.0274 50.144C91.9634 50.144 92.7794 49.844 93.3554 49.28L92.8514 48.572C92.4194 49.016 91.7474 49.256 91.1354 49.256C89.9714 49.256 89.2514 48.44 89.1674 47.456H93.7514V47.192C93.7514 45.416 92.6714 44.06 90.9314 44.06C89.2394 44.06 88.0274 45.416 88.0274 47.096ZM90.9314 44.948C92.1554 44.948 92.6714 45.908 92.6954 46.676H89.1554C89.2154 45.884 89.7674 44.948 90.9314 44.948ZM98.9903 50H100.358L97.8383 46.832L100.334 44.204H98.9783L96.1823 47.144V41.996H95.1023V50H96.1823V48.392L97.0583 47.504L98.9903 50ZM100.739 49.244C101.327 49.844 102.179 50.144 103.151 50.144C104.675 50.144 105.491 49.364 105.491 48.368C105.491 47.036 104.291 46.76 103.283 46.532C102.563 46.364 101.939 46.196 101.939 45.692C101.939 45.224 102.395 44.936 103.127 44.936C103.859 44.936 104.507 45.236 104.843 45.644L105.323 44.888C104.831 44.42 104.111 44.06 103.115 44.06C101.699 44.06 100.907 44.852 100.907 45.776C100.907 47.024 102.059 47.288 103.043 47.516C103.787 47.684 104.447 47.876 104.447 48.452C104.447 48.944 104.015 49.28 103.199 49.28C102.419 49.28 101.651 48.884 101.255 48.452L100.739 49.244ZM113.526 50H114.606V46.088C114.606 44.612 113.538 44.06 112.278 44.06C111.342 44.06 110.55 44.372 109.902 45.008L110.37 45.752C110.886 45.236 111.45 44.984 112.11 44.984C112.938 44.984 113.526 45.416 113.526 46.136V47.096C113.082 46.58 112.41 46.328 111.63 46.328C110.658 46.328 109.614 46.904 109.614 48.224C109.614 49.496 110.67 50.144 111.63 50.144C112.41 50.144 113.07 49.868 113.526 49.364V50ZM113.526 48.728C113.202 49.16 112.638 49.388 112.038 49.388C111.258 49.388 110.706 48.92 110.706 48.236C110.706 47.552 111.258 47.084 112.038 47.084C112.638 47.084 113.202 47.312 113.526 47.744V48.728ZM116.289 51.488C116.985 52.148 117.693 52.352 118.665 52.352C120.093 52.352 121.545 51.764 121.545 49.772V44.204H120.465V45.044C119.997 44.42 119.313 44.06 118.557 44.06C117.057 44.06 115.977 45.188 115.977 47.048C115.977 48.944 117.057 50.048 118.557 50.048C119.337 50.048 120.021 49.628 120.465 49.052V49.808C120.465 51.032 119.565 51.464 118.665 51.464C117.873 51.464 117.285 51.248 116.805 50.696L116.289 51.488ZM120.465 48.224C120.165 48.692 119.505 49.088 118.857 49.088C117.777 49.088 117.105 48.248 117.105 47.048C117.105 45.86 117.777 45.02 118.857 45.02C119.505 45.02 120.165 45.404 120.465 45.872V48.224ZM125.83 50.144C127.642 50.144 128.758 48.776 128.758 47.096C128.758 45.428 127.642 44.06 125.83 44.06C124.03 44.06 122.902 45.428 122.902 47.096C122.902 48.776 124.03 50.144 125.83 50.144ZM125.83 49.184C124.678 49.184 124.03 48.2 124.03 47.096C124.03 46.004 124.678 45.02 125.83 45.02C126.994 45.02 127.63 46.004 127.63 47.096C127.63 48.2 126.994 49.184 125.83 49.184Z'
            fill='var(--rhino)'
          />
          <circle cx='46' cy='46' r='10' fill='var(--dodger-blue-light)' />
          <circle cx='46' cy='46' r='4' fill='var(--dodger-blue)' />
          <g opacity='0.15' filter='url(#filter3_f)'>
            <rect
              x='161'
              y='39'
              width='101'
              height='28'
              rx='6.22222'
              fill='var(--waterloo)'
            />
          </g>
          <g filter='url(#filter4_d)'>
            <rect x='153' y='30' width='117' height='32' rx='16' fill='white' />
            <rect
              x='153.389'
              y='30.3889'
              width='116.222'
              height='31.2222'
              rx='15.6111'
              stroke='#F1F3F9'
              strokeWidth='0.777778'
            />
          </g>
          <path
            d='M187.624 50H193.264V48.944H189.532C191.728 47.252 193.228 45.848 193.228 44.288C193.228 42.692 191.872 41.876 190.432 41.876C189.316 41.876 188.224 42.32 187.564 43.148L188.272 43.928C188.764 43.34 189.496 42.944 190.444 42.944C191.224 42.944 192.004 43.352 192.004 44.288C192.004 45.548 190.624 46.748 187.624 49.052V50ZM203.076 50H204.192L206.016 44.204H204.888L203.568 48.62L202.116 44.204H201.18L199.728 48.62L198.408 44.204H197.28L199.104 50H200.22L201.648 45.548L203.076 50ZM206.617 47.096C206.617 48.92 207.889 50.144 209.617 50.144C210.553 50.144 211.369 49.844 211.945 49.28L211.441 48.572C211.009 49.016 210.337 49.256 209.725 49.256C208.561 49.256 207.841 48.44 207.757 47.456H212.341V47.192C212.341 45.416 211.261 44.06 209.521 44.06C207.829 44.06 206.617 45.416 206.617 47.096ZM209.521 44.948C210.745 44.948 211.261 45.908 211.285 46.676H207.745C207.805 45.884 208.357 44.948 209.521 44.948ZM213.332 47.096C213.332 48.92 214.604 50.144 216.332 50.144C217.268 50.144 218.084 49.844 218.66 49.28L218.156 48.572C217.724 49.016 217.052 49.256 216.44 49.256C215.276 49.256 214.556 48.44 214.472 47.456H219.056V47.192C219.056 45.416 217.976 44.06 216.236 44.06C214.544 44.06 213.332 45.416 213.332 47.096ZM216.236 44.948C217.46 44.948 217.976 45.908 218 46.676H214.46C214.52 45.884 215.072 44.948 216.236 44.948ZM224.295 50H225.663L223.143 46.832L225.639 44.204H224.283L221.487 47.144V41.996H220.407V50H221.487V48.392L222.363 47.504L224.295 50ZM226.044 49.244C226.632 49.844 227.484 50.144 228.456 50.144C229.98 50.144 230.796 49.364 230.796 48.368C230.796 47.036 229.596 46.76 228.588 46.532C227.868 46.364 227.244 46.196 227.244 45.692C227.244 45.224 227.7 44.936 228.432 44.936C229.164 44.936 229.812 45.236 230.148 45.644L230.628 44.888C230.136 44.42 229.416 44.06 228.42 44.06C227.004 44.06 226.212 44.852 226.212 45.776C226.212 47.024 227.364 47.288 228.348 47.516C229.092 47.684 229.752 47.876 229.752 48.452C229.752 48.944 229.32 49.28 228.504 49.28C227.724 49.28 226.956 48.884 226.56 48.452L226.044 49.244ZM238.831 50H239.911V46.088C239.911 44.612 238.843 44.06 237.583 44.06C236.647 44.06 235.855 44.372 235.207 45.008L235.675 45.752C236.191 45.236 236.755 44.984 237.415 44.984C238.243 44.984 238.831 45.416 238.831 46.136V47.096C238.387 46.58 237.715 46.328 236.935 46.328C235.963 46.328 234.919 46.904 234.919 48.224C234.919 49.496 235.975 50.144 236.935 50.144C237.715 50.144 238.375 49.868 238.831 49.364V50ZM238.831 48.728C238.507 49.16 237.943 49.388 237.343 49.388C236.563 49.388 236.011 48.92 236.011 48.236C236.011 47.552 236.563 47.084 237.343 47.084C237.943 47.084 238.507 47.312 238.831 47.744V48.728ZM241.593 51.488C242.289 52.148 242.997 52.352 243.969 52.352C245.397 52.352 246.849 51.764 246.849 49.772V44.204H245.769V45.044C245.301 44.42 244.617 44.06 243.861 44.06C242.361 44.06 241.281 45.188 241.281 47.048C241.281 48.944 242.361 50.048 243.861 50.048C244.641 50.048 245.325 49.628 245.769 49.052V49.808C245.769 51.032 244.869 51.464 243.969 51.464C243.177 51.464 242.589 51.248 242.109 50.696L241.593 51.488ZM245.769 48.224C245.469 48.692 244.809 49.088 244.161 49.088C243.081 49.088 242.409 48.248 242.409 47.048C242.409 45.86 243.081 45.02 244.161 45.02C244.809 45.02 245.469 45.404 245.769 45.872V48.224ZM251.135 50.144C252.947 50.144 254.063 48.776 254.063 47.096C254.063 45.428 252.947 44.06 251.135 44.06C249.335 44.06 248.207 45.428 248.207 47.096C248.207 48.776 249.335 50.144 251.135 50.144ZM251.135 49.184C249.983 49.184 249.335 48.2 249.335 47.096C249.335 46.004 249.983 45.02 251.135 45.02C252.299 45.02 252.935 46.004 252.935 47.096C252.935 48.2 252.299 49.184 251.135 49.184Z'
            fill='var(--rhino)'
          />
          <circle cx='171' cy='46' r='10' fill='var(--persimmon-light)' />
          <circle cx='171' cy='46' r='4' fill='var(--persimmon)' />
          <g opacity='0.15' filter='url(#filter5_f)'>
            <rect
              x='282'
              y='39'
              width='93'
              height='28'
              rx='6.22222'
              fill='var(--waterloo)'
            />
          </g>
          <g filter='url(#filter6_d)'>
            <rect x='278' y='30' width='101' height='32' rx='16' fill='white' />
            <rect
              x='278.389'
              y='30.3889'
              width='100.222'
              height='31.2222'
              rx='15.6111'
              stroke='#F1F3F9'
              strokeWidth='0.777778'
            />
          </g>
          <path
            d='M319.02 50H320.304L322.584 41.996H321.24L319.584 48.416L317.844 41.996H316.872L315.12 48.416L313.464 41.996H312.12L314.412 50H315.696L317.352 43.82L319.02 50ZM322.734 47.096C322.734 48.92 324.006 50.144 325.734 50.144C326.67 50.144 327.486 49.844 328.062 49.28L327.558 48.572C327.126 49.016 326.454 49.256 325.842 49.256C324.678 49.256 323.958 48.44 323.874 47.456H328.458V47.192C328.458 45.416 327.378 44.06 325.638 44.06C323.946 44.06 322.734 45.416 322.734 47.096ZM325.638 44.948C326.862 44.948 327.378 45.908 327.402 46.676H323.862C323.922 45.884 324.474 44.948 325.638 44.948ZM329.449 47.096C329.449 48.92 330.721 50.144 332.449 50.144C333.385 50.144 334.201 49.844 334.777 49.28L334.273 48.572C333.841 49.016 333.169 49.256 332.557 49.256C331.393 49.256 330.673 48.44 330.589 47.456H335.173V47.192C335.173 45.416 334.093 44.06 332.353 44.06C330.661 44.06 329.449 45.416 329.449 47.096ZM332.353 44.948C333.577 44.948 334.093 45.908 334.117 46.676H330.577C330.637 45.884 331.189 44.948 332.353 44.948ZM340.412 50H341.78L339.26 46.832L341.756 44.204H340.4L337.604 47.144V41.996H336.524V50H337.604V48.392L338.48 47.504L340.412 50ZM349.428 50H350.508V46.088C350.508 44.612 349.44 44.06 348.18 44.06C347.244 44.06 346.452 44.372 345.804 45.008L346.272 45.752C346.788 45.236 347.352 44.984 348.012 44.984C348.84 44.984 349.428 45.416 349.428 46.136V47.096C348.984 46.58 348.312 46.328 347.532 46.328C346.56 46.328 345.516 46.904 345.516 48.224C345.516 49.496 346.572 50.144 347.532 50.144C348.312 50.144 348.972 49.868 349.428 49.364V50ZM349.428 48.728C349.104 49.16 348.54 49.388 347.94 49.388C347.16 49.388 346.608 48.92 346.608 48.236C346.608 47.552 347.16 47.084 347.94 47.084C348.54 47.084 349.104 47.312 349.428 47.744V48.728ZM352.191 51.488C352.887 52.148 353.595 52.352 354.567 52.352C355.995 52.352 357.447 51.764 357.447 49.772V44.204H356.367V45.044C355.899 44.42 355.215 44.06 354.459 44.06C352.959 44.06 351.879 45.188 351.879 47.048C351.879 48.944 352.959 50.048 354.459 50.048C355.239 50.048 355.923 49.628 356.367 49.052V49.808C356.367 51.032 355.467 51.464 354.567 51.464C353.775 51.464 353.187 51.248 352.707 50.696L352.191 51.488ZM356.367 48.224C356.067 48.692 355.407 49.088 354.759 49.088C353.679 49.088 353.007 48.248 353.007 47.048C353.007 45.86 353.679 45.02 354.759 45.02C355.407 45.02 356.067 45.404 356.367 45.872V48.224ZM361.733 50.144C363.545 50.144 364.661 48.776 364.661 47.096C364.661 45.428 363.545 44.06 361.733 44.06C359.933 44.06 358.805 45.428 358.805 47.096C358.805 48.776 359.933 50.144 361.733 50.144ZM361.733 49.184C360.581 49.184 359.933 48.2 359.933 47.096C359.933 46.004 360.581 45.02 361.733 45.02C362.897 45.02 363.533 46.004 363.533 47.096C363.533 48.2 362.897 49.184 361.733 49.184Z'
            fill='var(--rhino)'
          />
          <circle cx='296' cy='46' r='10' fill='var(--texas-rose-light)' />
          <circle cx='296' cy='46' r='4' fill='var(--texas-rose)' />
          <g opacity='0.15' filter='url(#filter7_f)'>
            <rect
              x='395'
              y='39'
              width='69'
              height='28'
              rx='6.22222'
              fill='var(--waterloo)'
            />
          </g>
          <g filter='url(#filter8_d)'>
            <rect x='387' y='30' width='85' height='32' rx='16' fill='white' />
            <rect
              x='387.389'
              y='30.3889'
              width='84.2222'
              height='31.2222'
              rx='15.6111'
              stroke='#F1F3F9'
              strokeWidth='0.777778'
            />
          </g>
          <path
            d='M423.844 50H425.044V43.052H427.516V41.996H421.36V43.052H423.844V50ZM429.987 50.144C431.799 50.144 432.915 48.776 432.915 47.096C432.915 45.428 431.799 44.06 429.987 44.06C428.187 44.06 427.059 45.428 427.059 47.096C427.059 48.776 428.187 50.144 429.987 50.144ZM429.987 49.184C428.835 49.184 428.187 48.2 428.187 47.096C428.187 46.004 428.835 45.02 429.987 45.02C431.151 45.02 431.787 46.004 431.787 47.096C431.787 48.2 431.151 49.184 429.987 49.184ZM438.414 50H439.494V41.996H438.414V45.044C437.946 44.42 437.262 44.06 436.518 44.06C435.006 44.06 433.926 45.248 433.926 47.108C433.926 49.004 435.006 50.144 436.518 50.144C437.286 50.144 437.982 49.748 438.414 49.172V50ZM438.414 48.344C438.114 48.812 437.466 49.184 436.806 49.184C435.726 49.184 435.054 48.308 435.054 47.108C435.054 45.896 435.726 45.02 436.806 45.02C437.466 45.02 438.114 45.404 438.414 45.872V48.344ZM444.799 50H445.879V46.088C445.879 44.612 444.811 44.06 443.551 44.06C442.615 44.06 441.823 44.372 441.175 45.008L441.643 45.752C442.159 45.236 442.723 44.984 443.383 44.984C444.211 44.984 444.799 45.416 444.799 46.136V47.096C444.355 46.58 443.683 46.328 442.903 46.328C441.931 46.328 440.887 46.904 440.887 48.224C440.887 49.496 441.943 50.144 442.903 50.144C443.683 50.144 444.343 49.868 444.799 49.364V50ZM444.799 48.728C444.475 49.16 443.911 49.388 443.311 49.388C442.531 49.388 441.979 48.92 441.979 48.236C441.979 47.552 442.531 47.084 443.311 47.084C443.911 47.084 444.475 47.312 444.799 47.744V48.728ZM447.49 51.296L447.322 52.268C447.49 52.316 447.814 52.352 447.994 52.352C448.834 52.34 449.47 52.016 449.842 51.104L452.698 44.204H451.534L449.722 48.752L447.91 44.204H446.758L449.146 50.06L448.81 50.828C448.63 51.26 448.366 51.392 447.97 51.392C447.826 51.392 447.622 51.356 447.49 51.296Z'
            fill='var(--rhino)'
          />
          <circle cx='405' cy='46' r='10' fill='var(--lima-light)' />
          <circle cx='405' cy='46' r='4' fill='var(--lima)' />
        </g>
        <defs>
          <filter
            id='filter0_dd'
            x='0'
            y='0'
            width='500'
            height='340'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'
          >
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feColorMatrix
              in='SourceAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            />
            <feOffset dy='2' />
            <feGaussianBlur stdDeviation='4' />
            <feColorMatrix
              type='matrix'
              values='0 0 0 0 0.232639 0 0 0 0 0.328333 0 0 0 0 0.416667 0 0 0 0.03 0'
            />
            <feBlend
              mode='normal'
              in2='BackgroundImageFix'
              result='effect1_dropShadow'
            />
            <feColorMatrix
              in='SourceAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            />
            <feOffset dy='1' />
            <feGaussianBlur stdDeviation='1' />
            <feColorMatrix
              type='matrix'
              values='0 0 0 0 0.231373 0 0 0 0 0.329412 0 0 0 0 0.415686 0 0 0 0.03 0'
            />
            <feBlend
              mode='normal'
              in2='effect1_dropShadow'
              result='effect2_dropShadow'
            />
            <feBlend
              mode='normal'
              in='SourceGraphic'
              in2='effect2_dropShadow'
              result='shape'
            />
          </filter>
          <filter
            id='filter1_f'
            x='-10.6667'
            y='-7.66667'
            width='194.333'
            height='121.333'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'
          >
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feBlend
              mode='normal'
              in='SourceGraphic'
              in2='BackgroundImageFix'
              result='shape'
            />
            <feGaussianBlur
              stdDeviation='23.3333'
              result='effect1_foregroundBlur'
            />
          </filter>
          <filter
            id='filter2_d'
            x='-3.11111'
            y='6.66667'
            width='179.222'
            height='94.2222'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'
          >
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feColorMatrix
              in='SourceAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            />
            <feOffset dy='7.77778' />
            <feGaussianBlur stdDeviation='15.5556' />
            <feColorMatrix
              type='matrix'
              values='0 0 0 0 0.476616 0 0 0 0 0.521707 0 0 0 0 0.620087 0 0 0 0.06 0'
            />
            <feBlend
              mode='normal'
              in2='BackgroundImageFix'
              result='effect1_dropShadow'
            />
            <feBlend
              mode='normal'
              in='SourceGraphic'
              in2='effect1_dropShadow'
              result='shape'
            />
          </filter>
          <filter
            id='filter3_f'
            x='114.333'
            y='-7.66667'
            width='194.333'
            height='121.333'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'
          >
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feBlend
              mode='normal'
              in='SourceGraphic'
              in2='BackgroundImageFix'
              result='shape'
            />
            <feGaussianBlur
              stdDeviation='23.3333'
              result='effect1_foregroundBlur'
            />
          </filter>
          <filter
            id='filter4_d'
            x='121.889'
            y='6.66667'
            width='179.222'
            height='94.2222'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'
          >
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feColorMatrix
              in='SourceAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            />
            <feOffset dy='7.77778' />
            <feGaussianBlur stdDeviation='15.5556' />
            <feColorMatrix
              type='matrix'
              values='0 0 0 0 0.476616 0 0 0 0 0.521707 0 0 0 0 0.620087 0 0 0 0.06 0'
            />
            <feBlend
              mode='normal'
              in2='BackgroundImageFix'
              result='effect1_dropShadow'
            />
            <feBlend
              mode='normal'
              in='SourceGraphic'
              in2='effect1_dropShadow'
              result='shape'
            />
          </filter>
          <filter
            id='filter5_f'
            x='235.333'
            y='-7.66667'
            width='186.333'
            height='121.333'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'
          >
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feBlend
              mode='normal'
              in='SourceGraphic'
              in2='BackgroundImageFix'
              result='shape'
            />
            <feGaussianBlur
              stdDeviation='23.3333'
              result='effect1_foregroundBlur'
            />
          </filter>
          <filter
            id='filter6_d'
            x='246.889'
            y='6.66667'
            width='163.222'
            height='94.2222'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'
          >
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feColorMatrix
              in='SourceAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            />
            <feOffset dy='7.77778' />
            <feGaussianBlur stdDeviation='15.5556' />
            <feColorMatrix
              type='matrix'
              values='0 0 0 0 0.476616 0 0 0 0 0.521707 0 0 0 0 0.620087 0 0 0 0.06 0'
            />
            <feBlend
              mode='normal'
              in2='BackgroundImageFix'
              result='effect1_dropShadow'
            />
            <feBlend
              mode='normal'
              in='SourceGraphic'
              in2='effect1_dropShadow'
              result='shape'
            />
          </filter>
          <filter
            id='filter7_f'
            x='348.333'
            y='-7.66667'
            width='162.333'
            height='121.333'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'
          >
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feBlend
              mode='normal'
              in='SourceGraphic'
              in2='BackgroundImageFix'
              result='shape'
            />
            <feGaussianBlur
              stdDeviation='23.3333'
              result='effect1_foregroundBlur'
            />
          </filter>
          <filter
            id='filter8_d'
            x='355.889'
            y='6.66667'
            width='147.222'
            height='94.2222'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'
          >
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feColorMatrix
              in='SourceAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            />
            <feOffset dy='7.77778' />
            <feGaussianBlur stdDeviation='15.5556' />
            <feColorMatrix
              type='matrix'
              values='0 0 0 0 0.476616 0 0 0 0 0.521707 0 0 0 0 0.620087 0 0 0 0.06 0'
            />
            <feBlend
              mode='normal'
              in2='BackgroundImageFix'
              result='effect1_dropShadow'
            />
            <feBlend
              mode='normal'
              in='SourceGraphic'
              in2='effect1_dropShadow'
              result='shape'
            />
          </filter>
        </defs>
      </svg>
    )
  },
  {
    title: 'NVT Ratio Template',
    description: (
      <>
        This template calculates the NVT ratio for BTC, ETH and several ERC-20
        coins, and assigns a bullish/bearish value to its historical and
        present-day performance.
        <div className={styles.block}>
          The idea behind the NVT ratio is simple - if the value transferred on
          the network (token circulation) is{' '}
          <span className={styles.highline}>too low</span> relative to the
          network's valuation (market cap), the asset should be considered{' '}
          <span className={styles.highline}>overvalued</span> and due for a
          correction.
        </div>
        <div className={styles.block}>
          And vice versa - if the value transferred on the network is too{' '}
          <span className={styles.highline}>high</span>
          compared to its current valuation, NVT would deem the asset{' '}
          <span className={styles.highline}>undervalued</span>, and ripe for a
          breakout.
        </div>
      </>
    ),
    svg: (
      <svg
        width='500'
        height='340'
        viewBox='0 0 500 340'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <g filter='url(#filter0_dd)'>
          <rect
            x='8'
            y='6'
            width='484'
            height='324'
            rx='4'
            fill='var(--athens)'
          />
          <rect
            x='8.5'
            y='6.5'
            width='483'
            height='323'
            rx='3.5'
            stroke='var(--porcelain)'
          />
        </g>
        <mask
          id='mask0'
          mask-type='alpha'
          maskUnits='userSpaceOnUse'
          x='8'
          y='6'
          width='484'
          height='324'
        >
          <rect
            x='8.5'
            y='6.5'
            width='483'
            height='323'
            rx='3.5'
            fill='var(--athens)'
            stroke='var(--porcelain)'
          />
        </mask>
        <g mask='url(#mask0)'>
          <path
            d='M233.131 203.26L235.556 196.187C235.798 195.479 236.705 195.279 237.223 195.819L239.612 198.308C239.669 198.367 239.734 198.419 239.804 198.463L243.105 200.526C243.239 200.61 243.351 200.724 243.433 200.86L246.92 206.671L250.056 211.464C250.328 211.881 250.865 212.033 251.316 211.822L253.903 210.612C254.059 210.539 254.194 210.427 254.294 210.287L257.599 205.648C257.699 205.508 257.834 205.396 257.99 205.323L261.308 203.771L264.17 202.432C264.628 202.218 265.175 202.38 265.442 202.81L268.115 207.105C268.383 207.535 268.929 207.697 269.388 207.483L271.494 206.498C271.907 206.305 272.398 206.415 272.688 206.766L275.288 209.905C275.578 210.256 276.069 210.366 276.481 210.173L279.416 208.8L282.847 207.196C282.966 207.14 283.073 207.062 283.161 206.965L286.42 203.4C286.562 203.245 286.651 203.049 286.675 202.84L290.184 172.514C290.224 172.17 290.44 171.871 290.754 171.724L293.608 170.389C293.772 170.312 293.913 170.191 294.014 170.04L297.47 164.89L300.549 161.354C300.859 160.998 301.376 160.907 301.789 161.137L304.101 162.421C304.458 162.619 304.899 162.581 305.216 162.324L307.97 160.092C308.182 159.92 308.315 159.669 308.337 159.397L311.821 117.184C311.87 116.59 312.424 116.17 313.009 116.284L315.223 116.716C315.431 116.756 315.647 116.73 315.838 116.64L319.011 115.156C319.093 115.118 319.169 115.068 319.238 115.009L321.923 112.705C322.366 112.325 323.039 112.403 323.383 112.875L326.05 116.536C326.242 116.799 326.55 116.952 326.875 116.947L329.585 116.903C329.831 116.899 330.067 116.804 330.247 116.638L332.911 114.178C333.289 113.829 333.87 113.824 334.255 114.166L337.088 116.689C337.154 116.748 337.213 116.816 337.262 116.891L339.951 121.034C340.348 121.645 341.243 121.64 341.634 121.026L343.386 118.27C343.819 117.59 344.838 117.675 345.151 118.418L348.021 125.22L351.233 134.45C351.439 135.044 352.136 135.302 352.679 134.987L354.754 133.783C355.057 133.607 355.43 133.602 355.736 133.77L358.184 135.11C358.579 135.327 359.07 135.252 359.383 134.929L361.756 132.475C362.145 132.074 362.787 132.069 363.182 132.464L365.325 134.608C365.731 135.015 366.397 134.996 366.779 134.566L368.921 132.159C369.324 131.705 370.036 131.713 370.43 132.176L372.99 135.188C373.183 135.415 373.469 135.545 373.768 135.54L376.906 135.488L379.802 135.441C380.23 135.434 380.606 135.156 380.737 134.749L383.632 125.809C383.861 125.104 384.75 124.883 385.281 125.4L387.55 127.606C387.674 127.726 387.826 127.812 387.993 127.856L390.926 128.625C391.196 128.695 391.424 128.875 391.555 129.121L394.807 135.219C394.907 135.405 395.062 135.555 395.252 135.647L397.985 136.976C398.341 137.149 398.766 137.096 399.068 136.84L401.205 135.033C401.701 134.613 402.46 134.771 402.748 135.354L405.792 141.523L409.403 147.039L412.435 150.618C412.764 151.007 413.334 151.086 413.757 150.801L416.532 148.932C416.593 148.89 416.65 148.842 416.701 148.788L420.144 145.13C420.205 145.066 420.256 144.994 420.298 144.916L422.786 140.251C423.194 139.486 424.315 139.567 424.609 140.383L427.307 147.878C427.403 148.142 427.604 148.354 427.864 148.462L434.678 151.302L437.595 152.731C438.004 152.931 438.496 152.83 438.793 152.485L441.493 149.343C441.742 149.053 442.134 148.931 442.504 149.027L445.242 149.743C445.418 149.789 445.603 149.786 445.777 149.735L448.789 148.849C449.004 148.786 449.192 148.652 449.322 148.469L451.355 145.612C451.868 144.891 452.997 145.143 453.154 146.014L455.921 161.34C456.078 162.211 457.206 162.464 457.72 161.742L458.553 160.572C459.069 159.846 460.206 160.107 460.354 160.986L463.353 178.848C463.46 179.488 464.14 179.858 464.736 179.6L466.919 178.655C467.086 178.582 467.231 178.465 467.337 178.317L469.68 175.024C470.148 174.367 471.16 174.505 471.435 175.263L474.153 182.769C474.299 183.171 474.683 183.436 475.11 183.429L478.007 183.381L481.113 183.33C481.43 183.325 481.727 183.169 481.911 182.91L484.424 179.38C484.819 178.823 485.644 178.819 486.046 179.371L488.552 182.809C488.733 183.058 489.019 183.21 489.327 183.22L495.033 183.408C495.572 183.426 496 183.868 496 184.408V334C496 334.552 495.552 335 495 335H6C5.44772 335 5 334.552 5 334V157.357C5 156.642 5.91528 156.347 6.33258 156.927C6.58609 157.279 7.08762 157.336 7.41406 157.05L12.5883 152.522C13.0851 152.087 13.8593 152.244 14.147 152.838L17.6375 160.048L22.5086 167.67C22.5706 167.767 22.6154 167.874 22.641 167.986L26.6658 185.65C26.8499 186.458 27.8804 186.704 28.41 186.067L29.2553 185.049C29.5795 184.659 30.1443 184.573 30.5696 184.85L33.7852 186.94C34.1201 187.158 34.5525 187.156 34.8849 186.934L35.1563 186.753C35.7961 186.327 36.6577 186.752 36.7088 187.519L37.2236 195.24C37.2933 196.285 38.719 196.533 39.1379 195.573L40.0264 193.537C40.3977 192.686 41.6271 192.757 41.8991 193.644L44.0601 200.697C44.3138 201.525 45.4282 201.661 45.8737 200.919L47.8843 197.568C48.1396 197.142 48.6683 196.969 49.1264 197.159L51.555 198.171C51.8011 198.274 52.078 198.274 52.3242 198.171L55.5503 196.827L58.9613 195.88C59.0931 195.843 59.231 195.834 59.3665 195.853L62.2877 196.258C62.5931 196.301 62.9011 196.2 63.1223 195.985L65.0041 194.155C65.5844 193.591 66.5597 193.914 66.6884 194.713L69.8154 214.118C69.9103 214.706 70.4959 215.082 71.0703 214.922L72.9872 214.39C73.3632 214.285 73.7656 214.409 74.0179 214.707L76.4297 217.554C76.8365 218.034 77.5804 218.024 77.9736 217.532L80.2418 214.697C80.5704 214.287 81.161 214.201 81.593 214.501L83.7354 215.988C84.1392 216.269 84.6868 216.214 85.0272 215.859L87.4561 213.329C87.7965 212.975 88.3441 212.92 88.7478 213.201L90.9338 214.719C91.3475 215.006 91.9104 214.941 92.2474 214.566L95.1744 211.314C95.2368 211.245 95.3086 211.185 95.3877 211.135L98.747 209.036C98.8347 208.981 98.9133 208.913 98.9801 208.834L101.588 205.756C102.03 205.233 102.856 205.3 103.208 205.888L105.785 210.183C105.979 210.505 106.337 210.692 106.712 210.666L109.711 210.457L113.047 210.226C113.227 210.213 113.4 210.152 113.548 210.05L116.256 208.169C116.649 207.896 117.181 207.94 117.524 208.274L120.467 211.135C120.518 211.185 120.574 211.229 120.634 211.266L123.814 213.253C124.032 213.39 124.295 213.437 124.548 213.384L126.963 212.881C127.429 212.784 127.9 213.03 128.087 213.468L131.01 220.327C131.216 220.81 131.761 221.052 132.258 220.879L134.905 219.96C134.959 219.941 135.012 219.918 135.062 219.89L137.972 218.273C138.346 218.066 138.811 218.119 139.128 218.405L141.512 220.557C141.903 220.91 141.953 221.507 141.625 221.921L140.886 222.852C140.332 223.55 141.107 224.516 141.909 224.126C142.101 224.033 142.322 224.016 142.525 224.08L145.819 225.109L148.322 225.891C148.905 226.074 149.514 225.695 149.608 225.091L152.588 205.94C152.735 204.996 153.995 204.775 154.453 205.613L156.288 208.962C156.503 209.354 156.952 209.556 157.388 209.457L160.262 208.8L163.873 207.481L166.741 206.433C167.176 206.274 167.664 206.434 167.919 206.821L170.659 210.965C170.914 211.351 171.401 211.512 171.836 211.353L173.936 210.586C174.383 210.422 174.884 210.597 175.132 211.003L177.888 215.505C178.137 215.911 178.637 216.085 179.084 215.922L181.926 214.884L185.35 213.633C185.473 213.588 185.587 213.518 185.684 213.429L189.148 210.239L192.285 206.593C192.567 206.264 193.029 206.155 193.428 206.322L195.695 207.269C196.127 207.449 196.626 207.306 196.897 206.924L207.021 192.634C207.139 192.468 207.304 192.342 207.494 192.273L210.812 191.06L214.135 189.566C214.322 189.482 214.479 189.341 214.584 189.164L217.034 185.037C217.451 184.335 218.487 184.401 218.812 185.15L221.27 190.827C221.48 191.313 222.033 191.551 222.531 191.369L224.331 190.711C224.844 190.524 225.412 190.783 225.608 191.292L228.826 199.677C228.852 199.747 228.887 199.813 228.929 199.876L231.354 203.493C231.815 204.179 232.862 204.042 233.131 203.26Z'
            fill='var(--jungle-green)'
            fillOpacity='0.05'
            stroke='var(--jungle-green)'
            strokeWidth='1.16594'
          />
          <path
            d='M63.8618 276.337L60.0218 234.451C59.9868 234.069 59.5513 233.867 59.2368 234.088L56.0682 236.31C56.0391 236.331 56.0078 236.348 55.975 236.362L52.3798 237.875C52.2109 237.946 52.0944 238.104 52.0762 238.286L48.187 277.437L44.7217 294.984C44.6172 295.513 43.8647 295.525 43.7439 294.999L40.964 282.908C40.8394 282.366 40.056 282.402 39.9813 282.953L36.9691 305.176C36.89 305.759 36.0435 305.75 35.9768 305.165L32.5758 275.353C32.573 275.329 32.5685 275.305 32.5622 275.281L29.1245 262.387C28.9894 261.88 28.265 261.897 28.1529 262.409L25.3199 275.356C25.199 275.909 24.3983 275.868 24.3346 275.306L21.2682 248.276C21.2008 247.683 20.3376 247.686 20.2742 248.28L16.9292 279.628C16.8956 279.942 16.583 280.147 16.2818 280.052L12.9187 278.993L9.06246 277.778C9.021 277.765 8.97801 277.757 8.93458 277.755L2.52234 277.469C2.23771 277.456 2 277.683 2 277.968V336.5C2 336.776 2.22384 337 2.49999 337H498.5C498.776 337 499 336.776 499 336.5V284.691C499 284.415 498.776 284.191 498.5 284.191H488.813C488.649 284.191 488.495 284.272 488.402 284.406L485.247 288.959C485.167 289.073 485.043 289.15 484.905 289.169L473.916 290.711C473.622 290.752 473.357 290.53 473.346 290.233L471.159 227.911C471.138 227.291 470.23 227.258 470.163 227.874L463.298 290.443C463.241 290.96 462.529 291.057 462.336 290.573L451.978 264.578C451.791 264.11 451.107 264.181 451.021 264.678L446.548 290.443C446.489 290.787 446.103 290.965 445.802 290.788L443.283 289.307C443.109 289.205 442.891 289.217 442.73 289.338L439.224 291.961C438.929 292.181 438.505 292.018 438.434 291.657L428.947 243.417C428.836 242.853 428.018 242.89 427.959 243.462L424.396 278.19C424.387 278.28 424.354 278.366 424.299 278.438L415.493 290.229C415.288 290.503 414.874 290.495 414.68 290.213L406.467 278.265C406.343 278.084 406.115 278.006 405.906 278.071L400.781 279.668C400.549 279.741 400.299 279.636 400.188 279.42L398.19 275.534C398.053 275.266 397.711 275.18 397.463 275.35L389.71 280.667C389.422 280.865 389.025 280.713 388.942 280.374L382.296 253.246C382.169 252.727 381.427 252.742 381.32 253.264L375.888 279.793L373.298 292.859C373.199 293.356 372.51 293.408 372.337 292.933L367.561 279.793L359.426 241.225C359.308 240.664 358.492 240.711 358.439 241.282L355.417 273.925C355.378 274.354 354.85 274.535 354.555 274.221L346.555 265.715C346.302 265.447 345.855 265.535 345.723 265.879L335.342 293.046C335.164 293.511 334.491 293.459 334.386 292.973L326.669 257.328C326.574 256.894 326.003 256.789 325.761 257.161L322.501 262.174C322.286 262.504 321.792 262.468 321.628 262.11L319.554 257.585C319.371 257.185 318.798 257.2 318.635 257.609L314.291 268.542C314.108 269.002 313.439 268.945 313.337 268.461L310.923 257.023C310.842 256.642 310.377 256.495 310.092 256.761L309.293 257.509C309.042 257.743 308.635 257.661 308.495 257.347L301.779 242.279C301.623 241.931 301.152 241.878 300.922 242.182L297.612 246.579C297.367 246.905 296.856 246.816 296.735 246.426L292.093 231.434C291.949 230.971 291.297 230.963 291.141 231.422L286.968 243.755C286.856 244.085 286.45 244.203 286.18 243.983L284.194 242.375C283.977 242.198 283.657 242.235 283.485 242.456L279.142 248.027C279 248.209 278.753 248.27 278.542 248.176L277.085 247.522C276.773 247.382 276.416 247.589 276.383 247.928L275.612 255.711C275.566 256.182 274.952 256.331 274.695 255.934L272.281 252.208C272.029 251.82 271.431 251.952 271.366 252.41L268.089 275.653C268.009 276.22 267.194 276.23 267.1 275.666L263.807 255.85C263.758 255.556 263.465 255.37 263.178 255.45L259.932 256.361C259.843 256.386 259.75 256.386 259.662 256.361L256.102 255.363C255.96 255.323 255.843 255.222 255.782 255.087L252.405 247.62C252.229 247.232 251.679 247.227 251.497 247.613L248.547 253.861C248.358 254.261 247.781 254.237 247.626 253.823L244.594 245.701C244.432 245.267 243.816 245.268 243.657 245.704L240.349 254.719C240.265 254.949 240.028 255.083 239.788 255.039L236.509 254.425C236.366 254.399 236.219 254.435 236.106 254.525L232.531 257.367C232.426 257.451 232.358 257.574 232.345 257.709L228.475 296.717C228.458 296.893 228.349 297.046 228.189 297.121L224.79 298.71C224.628 298.786 224.438 298.77 224.292 298.667L220.787 296.208C220.674 296.129 220.599 296.007 220.579 295.87L216.721 269.029C216.702 268.898 216.631 268.78 216.525 268.7L212.949 266.024C212.836 265.94 212.764 265.813 212.751 265.674L208.875 226.747C208.861 226.613 208.794 226.489 208.688 226.405L205.658 223.997C205.347 223.749 204.886 223.946 204.849 224.342L201.06 265.051C201.036 265.317 200.806 265.516 200.539 265.504L197.098 265.343L193.278 265.164C193.212 265.161 193.148 265.145 193.089 265.118L189.513 263.445C189.356 263.372 189.172 263.385 189.027 263.48L185.5 265.789C185.398 265.856 185.324 265.958 185.292 266.075L181.886 278.54C181.753 279.026 181.067 279.033 180.924 278.55L177.663 267.528C177.578 267.242 177.264 267.093 176.989 267.209L173.735 268.578C173.638 268.619 173.53 268.628 173.427 268.604L169.667 267.725L165.975 266.344C165.832 266.29 165.671 266.306 165.54 266.385L161.897 268.6C161.852 268.627 161.803 268.647 161.752 268.659L158.45 269.431C158.162 269.499 157.878 269.302 157.84 269.008L154.484 242.726C154.41 242.144 153.568 242.143 153.492 242.725L150.119 268.747C150.091 268.958 149.934 269.129 149.726 269.172L146.307 269.892C146.208 269.913 146.104 269.903 146.01 269.863L142.856 268.536C142.547 268.406 142.2 268.61 142.164 268.943L138.744 301.029C138.681 301.615 137.834 301.63 137.751 301.047L134.446 277.78C134.417 277.578 134.269 277.413 134.07 277.365L130.48 276.481L126.561 275.517L122.986 274.637C122.78 274.587 122.628 274.412 122.608 274.201L118.833 235.682C118.791 235.251 118.257 235.074 117.966 235.394L114.915 238.75C114.844 238.829 114.799 238.929 114.788 239.035L110.945 276.363C110.914 276.665 110.623 276.87 110.328 276.798L107.044 275.99C106.993 275.977 106.945 275.957 106.9 275.929L103.049 273.541L99.7779 270.981C99.4826 270.749 99.0475 270.913 98.9783 271.282L95.6788 288.849C95.5751 289.401 94.7798 289.389 94.6933 288.833L91.3439 267.321C91.3129 267.122 91.1652 266.961 90.9693 266.912L87.3739 266.028L83.7082 264.918C83.5499 264.87 83.4256 264.747 83.3761 264.589L80.2745 254.717C80.1112 254.197 79.3522 254.276 79.2998 254.818L75.6735 292.346C75.6442 292.649 75.3524 292.856 75.0564 292.783L72.066 292.047C71.849 291.994 71.6228 292.091 71.5122 292.285L68.4688 297.625C68.2368 298.032 67.6223 297.925 67.5419 297.463L63.8618 276.337Z'
            fill='var(--malibu)'
            fillOpacity='0.05'
            stroke='var(--malibu)'
            strokeWidth='1.5'
          />
          <path
            d='M491 234.13L489.175 231.937C488.914 231.623 488.408 231.737 488.306 232.131L485.187 244.181C485.146 244.339 485.031 244.467 484.879 244.524L474.032 248.598C473.708 248.72 473.361 248.483 473.357 248.136L470.917 62L463.295 247.985C463.271 248.591 462.391 248.638 462.301 248.038L452.013 178.914C451.925 178.321 451.059 178.357 451.02 178.955L446.524 248.3C446.493 248.783 445.862 248.944 445.603 248.536L443.47 245.179C443.262 244.851 442.775 244.876 442.601 245.224L439.4 251.636C439.173 252.09 438.491 251.956 438.454 251.449L428.301 113.22L424.384 215.429C424.383 215.468 424.377 215.506 424.366 215.544L415.577 247.05C415.439 247.543 414.738 247.536 414.611 247.04L406.455 215.273C406.364 214.917 405.932 214.778 405.65 215.014L401.032 218.869C400.739 219.113 400.292 218.953 400.22 218.579L398.194 208.026C398.105 207.566 397.488 207.47 397.264 207.882L389.901 221.401C389.665 221.835 389.009 221.7 388.964 221.208L382.309 148.478C382.253 147.867 381.359 147.874 381.312 148.485L375.888 219.412L373.302 254.342C373.257 254.94 372.388 254.967 372.307 254.372L367.561 219.412L358.744 107.489L355.407 204.004C355.388 204.557 354.619 204.674 354.435 204.153L346.686 182.094C346.512 181.6 345.793 181.671 345.719 182.189L335.374 254.667C335.29 255.258 334.429 255.231 334.381 254.637L326.665 159.223C326.619 158.657 325.815 158.594 325.681 159.146L322.577 171.927C322.449 172.455 321.69 172.429 321.598 171.893L319.595 160.191C319.499 159.63 318.691 159.639 318.608 160.202L314.326 189.052C314.238 189.641 313.379 189.612 313.333 189.018L310.908 158.26C310.867 157.733 310.141 157.623 309.945 158.114L309.444 159.369C309.257 159.839 308.57 159.765 308.487 159.266L301.801 119.107C301.713 118.58 300.971 118.54 300.826 119.054L297.711 130.134C297.563 130.662 296.796 130.601 296.733 130.056L292.111 90.0932C292.043 89.5063 291.192 89.5018 291.118 90.088L286.957 123.013C286.894 123.512 286.217 123.616 286.007 123.16L284.359 119.584C284.165 119.164 283.554 119.209 283.425 119.653L279.163 134.287C279.051 134.672 278.555 134.775 278.299 134.467L277.287 133.251C276.994 132.898 276.42 133.094 276.403 133.552L275.605 155.121C275.584 155.701 274.756 155.784 274.62 155.22L272.358 145.876C272.222 145.316 271.403 145.392 271.373 145.967L267.634 216.959L263.773 154.759C263.748 154.362 263.292 154.151 262.973 154.39L260.097 156.551C259.919 156.685 259.674 156.685 259.496 156.551L256.037 153.953C255.935 153.876 255.866 153.763 255.845 153.636L252.442 133.489C252.348 132.936 251.554 132.933 251.456 133.486L248.591 149.732C248.492 150.293 247.682 150.279 247.603 149.715L244.621 128.329C244.541 127.754 243.71 127.755 243.631 128.33L240.298 152.651C240.252 152.99 239.885 153.183 239.579 153.03L236.743 151.61C236.492 151.484 236.186 151.59 236.067 151.844L232.409 159.628C232.381 159.689 232.365 159.755 232.362 159.822L228.453 265.317C228.449 265.424 228.411 265.527 228.344 265.611L225.003 269.794C224.779 270.075 224.34 270.034 224.171 269.717L220.662 263.127C220.628 263.062 220.608 262.991 220.604 262.919L216.697 190.148C216.693 190.079 216.675 190.012 216.645 189.951L212.821 182.291C212.789 182.227 212.771 182.158 212.768 182.086L208.857 76.9256C208.855 76.8584 208.839 76.7924 208.81 76.7315L205.815 70.3571C205.592 69.8821 204.881 70.0279 204.863 70.5523L201.035 180.666C201.025 180.96 200.765 181.182 200.473 181.145L197.098 180.723L193.38 180.257C193.251 180.241 193.133 180.175 193.052 180.073L189.72 175.902C189.5 175.626 189.07 175.659 188.895 175.966L185.394 182.103C185.359 182.163 185.338 182.23 185.331 182.3L181.9 215.915C181.839 216.512 180.972 216.515 180.906 215.919L177.628 186.257C177.58 185.826 177.044 185.656 176.757 185.98L173.866 189.237C173.704 189.42 173.434 189.459 173.227 189.329L169.715 187.131C169.683 187.111 169.653 187.087 169.626 187.06L166.196 183.624C165.967 183.395 165.585 183.44 165.416 183.716L161.891 189.454C161.85 189.519 161.795 189.575 161.73 189.616L158.635 191.553C158.311 191.756 157.888 191.535 157.87 191.153L153.992 109.848L150.087 190.504C150.078 190.676 149.982 190.831 149.833 190.915L146.506 192.79C146.301 192.905 146.043 192.862 145.887 192.686L143.06 189.501C142.761 189.164 142.204 189.363 142.186 189.813L138.317 286.978L134.412 213.377C134.403 213.219 134.32 213.074 134.188 212.986L130.48 210.544L126.561 207.962L122.857 205.523C122.722 205.434 122.639 205.285 122.633 205.123L118.823 101.023C118.803 100.469 118.028 100.355 117.85 100.881L114.828 109.779C114.813 109.825 114.804 109.873 114.802 109.921L110.92 210.873C110.905 211.262 110.471 211.485 110.146 211.271L107.062 209.24C107 209.199 106.948 209.144 106.909 209.08L103.049 202.672L99.9474 196.172C99.7261 195.708 99.0333 195.84 98.9973 196.352L95.1413 251.319L91.3072 185.388C91.2981 185.231 91.215 185.087 91.0831 185L87.3739 182.557L83.6133 179.507C83.512 179.425 83.4468 179.307 83.4316 179.177L80.2974 152.467C80.2254 151.854 79.3234 151.89 79.3011 152.507L75.65 253.672C75.6359 254.061 75.2009 254.286 74.8752 254.071L72.3108 252.382C72.0168 252.188 71.62 252.351 71.5467 252.695L68.5336 266.85C68.4126 267.418 67.5833 267.358 67.5456 266.778L63.8618 210.159L60.0069 97.5794C59.9894 97.0682 59.3064 96.91 59.0659 97.3615L56.0523 103.021C56.0338 103.056 56.0111 103.088 55.9849 103.118L52.2247 107.355C52.1477 107.441 52.1033 107.552 52.099 107.668L48.187 213.102L44.7291 259.983C44.6838 260.597 43.7849 260.602 43.7323 259.989L40.3496 220.596L36.4309 298L32.5717 207.427L29.1401 172.965C29.0797 172.359 28.1938 172.367 28.1442 172.974L24.6748 215.426L20.7561 122.945L16.905 219.574C16.8885 219.99 16.4011 220.205 16.0831 219.937L12.9187 217.268L9 213.963'
            stroke='var(--persimmon)'
            strokeWidth='1.5'
          />
          <g opacity='0.15' filter='url(#filter1_f)'>
            <rect
              x='46'
              y='46'
              width='100'
              height='38'
              rx='5.98964'
              fill='var(--waterloo)'
            />
          </g>
          <g filter='url(#filter2_d)'>
            <rect
              x='32'
              y='30'
              width='128'
              height='45'
              rx='22.5'
              fill='white'
            />
            <rect
              x='32.3744'
              y='30.3744'
              width='127.251'
              height='44.2513'
              rx='22.1256'
              stroke='#F1F3F9'
              strokeWidth='0.748705'
            />
          </g>
          <path
            d='M84.4122 50H85.4903V41.0111H84.3717V48.1133L79.1967 41.0111H78.0512V50H79.1697V42.7495L84.4122 50ZM90.2746 50H91.6627L95.288 41.0111H94.0077L90.9754 48.7736L87.9432 41.0111H86.6629L90.2746 50ZM98.6868 50H99.8054V42.0083H102.662V41.0111H95.8432V42.0083H98.6868V50ZM112.826 50H114.146L111.72 46.3343C112.947 46.2265 114.052 45.3371 114.052 43.7199C114.052 42.0622 112.879 41.0111 111.235 41.0111H107.624V50H108.742V46.4287H110.535L112.826 50ZM112.893 43.7199C112.893 44.7306 112.165 45.4449 111.101 45.4449H108.742V42.0083H111.101C112.165 42.0083 112.893 42.7091 112.893 43.7199ZM119.589 50H120.6V45.5257C120.6 43.949 119.454 43.329 118.08 43.329C117.015 43.329 116.179 43.6794 115.479 44.4072L115.95 45.108C116.53 44.488 117.163 44.205 117.945 44.205C118.888 44.205 119.589 44.7037 119.589 45.5796V46.7521C119.063 46.1457 118.322 45.8627 117.433 45.8627C116.328 45.8627 115.155 46.55 115.155 48.0055C115.155 49.4205 116.328 50.1617 117.433 50.1617C118.309 50.1617 119.05 49.8518 119.589 49.2588V50ZM119.589 48.6254C119.198 49.1644 118.511 49.434 117.797 49.434C116.853 49.434 116.193 48.841 116.193 48.0189C116.193 47.1834 116.853 46.5904 117.797 46.5904C118.511 46.5904 119.198 46.8599 119.589 47.399V48.6254ZM124.27 50.1617C124.863 50.1617 125.227 49.9865 125.483 49.7439L125.187 48.9892C125.052 49.1375 124.782 49.2588 124.499 49.2588C124.054 49.2588 123.839 48.9084 123.839 48.4232V44.3802H125.16V43.4908H123.839V41.7118H122.828V43.4908H121.75V44.3802H122.828V48.6389C122.828 49.6092 123.313 50.1617 124.27 50.1617ZM127.086 42.3991C127.463 42.3991 127.773 42.0892 127.773 41.7118C127.773 41.3345 127.463 41.038 127.086 41.038C126.722 41.038 126.412 41.3345 126.412 41.7118C126.412 42.0892 126.722 42.3991 127.086 42.3991ZM126.587 50H127.598V43.4908H126.587V50ZM132.458 50.1617C134.439 50.1617 135.679 48.6254 135.679 46.7386C135.679 44.8519 134.439 43.329 132.458 43.329C130.477 43.329 129.237 44.8519 129.237 46.7386C129.237 48.6254 130.477 50.1617 132.458 50.1617ZM132.458 49.2588C131.07 49.2588 130.288 48.0728 130.288 46.7386C130.288 45.4179 131.07 44.232 132.458 44.232C133.846 44.232 134.614 45.4179 134.614 46.7386C134.614 48.0728 133.846 49.2588 132.458 49.2588Z'
            fill='var(--rhino)'
          />
          <path
            d='M78.85 65.99L79.3 65.64C78.66 64.38 78.26 63.23 78.26 61.57C78.26 59.9 78.66 58.76 79.3 57.49L78.85 57.15C77.95 58.39 77.44 59.96 77.44 61.57C77.44 63.18 77.95 64.76 78.85 65.99ZM83.3905 64.12C84.6005 64.12 85.4005 63.56 85.9605 62.8L85.2505 62.41C84.8705 62.98 84.1805 63.38 83.3905 63.38C81.9605 63.38 80.8505 62.25 80.8505 60.67C80.8505 59.08 81.9605 57.96 83.3905 57.96C84.1805 57.96 84.8705 58.37 85.2505 58.93L85.9505 58.54C85.4205 57.79 84.6005 57.22 83.3905 57.22C81.5005 57.22 79.9905 58.62 79.9905 60.67C79.9905 62.72 81.5005 64.12 83.3905 64.12ZM87.3583 58.36C87.6383 58.36 87.8683 58.13 87.8683 57.85C87.8683 57.57 87.6383 57.35 87.3583 57.35C87.0883 57.35 86.8583 57.57 86.8583 57.85C86.8583 58.13 87.0883 58.36 87.3583 58.36ZM86.9883 64H87.7383V59.17H86.9883V64ZM89.2344 64H89.9844V60.58C90.2044 60.19 90.8344 59.81 91.2944 59.81C91.4144 59.81 91.5044 59.82 91.5944 59.84V59.07C90.9344 59.07 90.3744 59.44 89.9844 59.95V59.17H89.2344V64ZM92.2552 61.58C92.2552 63.02 93.2252 64.12 94.6652 64.12C95.5452 64.12 96.0652 63.76 96.4352 63.28L95.9352 62.82C95.6152 63.25 95.2052 63.45 94.7052 63.45C93.6752 63.45 93.0352 62.65 93.0352 61.58C93.0352 60.51 93.6752 59.72 94.7052 59.72C95.2052 59.72 95.6152 59.91 95.9352 60.35L96.4352 59.89C96.0652 59.41 95.5452 59.05 94.6652 59.05C93.2252 59.05 92.2552 60.15 92.2552 61.58ZM97.4863 64H98.2363V57.33H97.4863V64ZM102.992 64H103.742V59.17H102.992V62.72C102.712 63.11 102.152 63.45 101.562 63.45C100.912 63.45 100.482 63.2 100.482 62.35V59.17H99.7324V62.58C99.7324 63.63 100.262 64.12 101.272 64.12C101.992 64.12 102.622 63.74 102.992 63.32V64ZM105.24 64H105.99V57.33H105.24V64ZM110.506 64H111.256V60.68C111.256 59.51 110.406 59.05 109.386 59.05C108.596 59.05 107.976 59.31 107.456 59.85L107.806 60.37C108.236 59.91 108.706 59.7 109.286 59.7C109.986 59.7 110.506 60.07 110.506 60.72V61.59C110.116 61.14 109.566 60.93 108.906 60.93C108.086 60.93 107.216 61.44 107.216 62.52C107.216 63.57 108.086 64.12 108.906 64.12C109.556 64.12 110.106 63.89 110.506 63.45V64ZM110.506 62.98C110.216 63.38 109.706 63.58 109.176 63.58C108.476 63.58 107.986 63.14 107.986 62.53C107.986 61.91 108.476 61.47 109.176 61.47C109.706 61.47 110.216 61.67 110.506 62.07V62.98ZM113.98 64.12C114.42 64.12 114.69 63.99 114.88 63.81L114.66 63.25C114.56 63.36 114.36 63.45 114.15 63.45C113.82 63.45 113.66 63.19 113.66 62.83V59.83H114.64V59.17H113.66V57.85H112.91V59.17H112.11V59.83H112.91V62.99C112.91 63.71 113.27 64.12 113.98 64.12ZM116.069 58.36C116.349 58.36 116.579 58.13 116.579 57.85C116.579 57.57 116.349 57.35 116.069 57.35C115.799 57.35 115.569 57.57 115.569 57.85C115.569 58.13 115.799 58.36 116.069 58.36ZM115.699 64H116.449V59.17H115.699V64ZM120.055 64.12C121.525 64.12 122.445 62.98 122.445 61.58C122.445 60.18 121.525 59.05 120.055 59.05C118.585 59.05 117.665 60.18 117.665 61.58C117.665 62.98 118.585 64.12 120.055 64.12ZM120.055 63.45C119.025 63.45 118.445 62.57 118.445 61.58C118.445 60.6 119.025 59.72 120.055 59.72C121.085 59.72 121.655 60.6 121.655 61.58C121.655 62.57 121.085 63.45 120.055 63.45ZM126.928 64H127.678V60.61C127.678 59.56 127.148 59.05 126.138 59.05C125.418 59.05 124.758 59.47 124.418 59.87V59.17H123.668V64H124.418V60.47C124.698 60.08 125.258 59.72 125.848 59.72C126.498 59.72 126.928 59.99 126.928 60.84V64ZM129.646 61.57C129.646 63.23 129.246 64.38 128.596 65.64L129.046 65.99C129.956 64.76 130.466 63.18 130.466 61.57C130.466 59.96 129.956 58.39 129.046 57.15L128.596 57.49C129.246 58.76 129.646 59.9 129.646 61.57Z'
            fill='var(--waterloo)'
          />
          <circle
            cx='55.9585'
            cy='52.4611'
            r='11.9793'
            fill='var(--persimmon-light)'
          />
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M48.0972 52.4611C48.0972 51.8408 48.7571 51.338 49.5712 51.338H62.346C63.16 51.338 63.82 51.8408 63.82 52.4611C63.82 53.0813 63.16 53.5841 62.346 53.5841H49.5712C48.7571 53.5841 48.0972 53.0813 48.0972 52.4611Z'
            fill='var(--persimmon)'
          />
          <circle
            cx='55.9585'
            cy='52.4611'
            r='3.74352'
            fill='var(--persimmon-light)'
            stroke='var(--persimmon)'
            strokeWidth='1.49741'
          />
          <g opacity='0.15' filter='url(#filter3_f)'>
            <rect
              x='182'
              y='46'
              width='100'
              height='38'
              rx='5.98964'
              fill='var(--waterloo)'
            />
          </g>
          <g filter='url(#filter4_d)'>
            <rect
              x='168'
              y='30'
              width='128'
              height='45'
              rx='22.5'
              fill='white'
            />
            <rect
              x='168.374'
              y='30.3744'
              width='127.251'
              height='44.2513'
              rx='22.1256'
              stroke='#F1F3F9'
              strokeWidth='0.748705'
            />
          </g>
          <path
            d='M220.412 50H221.49V41.0111H220.372V48.1133L215.197 41.0111H214.051V50H215.17V42.7495L220.412 50ZM226.275 50H227.663L231.288 41.0111H230.008L226.975 48.7736L223.943 41.0111H222.663L226.275 50ZM234.687 50H235.805V42.0083H238.662V41.0111H231.843V42.0083H234.687V50ZM248.826 50H250.146L247.72 46.3343C248.947 46.2265 250.052 45.3371 250.052 43.7199C250.052 42.0622 248.879 41.0111 247.235 41.0111H243.624V50H244.742V46.4287H246.535L248.826 50ZM248.893 43.7199C248.893 44.7306 248.165 45.4449 247.101 45.4449H244.742V42.0083H247.101C248.165 42.0083 248.893 42.7091 248.893 43.7199ZM255.589 50H256.6V45.5257C256.6 43.949 255.454 43.329 254.08 43.329C253.015 43.329 252.179 43.6794 251.479 44.4072L251.95 45.108C252.53 44.488 253.163 44.205 253.945 44.205C254.888 44.205 255.589 44.7037 255.589 45.5796V46.7521C255.063 46.1457 254.322 45.8627 253.433 45.8627C252.328 45.8627 251.155 46.55 251.155 48.0055C251.155 49.4205 252.328 50.1617 253.433 50.1617C254.309 50.1617 255.05 49.8518 255.589 49.2588V50ZM255.589 48.6254C255.198 49.1644 254.511 49.434 253.797 49.434C252.853 49.434 252.193 48.841 252.193 48.0189C252.193 47.1834 252.853 46.5904 253.797 46.5904C254.511 46.5904 255.198 46.8599 255.589 47.399V48.6254ZM260.27 50.1617C260.863 50.1617 261.227 49.9865 261.483 49.7439L261.187 48.9892C261.052 49.1375 260.782 49.2588 260.499 49.2588C260.054 49.2588 259.839 48.9084 259.839 48.4232V44.3802H261.16V43.4908H259.839V41.7118H258.828V43.4908H257.75V44.3802H258.828V48.6389C258.828 49.6092 259.313 50.1617 260.27 50.1617ZM263.086 42.3991C263.463 42.3991 263.773 42.0892 263.773 41.7118C263.773 41.3345 263.463 41.038 263.086 41.038C262.722 41.038 262.412 41.3345 262.412 41.7118C262.412 42.0892 262.722 42.3991 263.086 42.3991ZM262.587 50H263.598V43.4908H262.587V50ZM268.458 50.1617C270.439 50.1617 271.679 48.6254 271.679 46.7386C271.679 44.8519 270.439 43.329 268.458 43.329C266.477 43.329 265.237 44.8519 265.237 46.7386C265.237 48.6254 266.477 50.1617 268.458 50.1617ZM268.458 49.2588C267.07 49.2588 266.288 48.0728 266.288 46.7386C266.288 45.4179 267.07 44.232 268.458 44.232C269.846 44.232 270.614 45.4179 270.614 46.7386C270.614 48.0728 269.846 49.2588 268.458 49.2588Z'
            fill='var(--rhino)'
          />
          <path
            d='M214.85 65.99L215.3 65.64C214.66 64.38 214.26 63.23 214.26 61.57C214.26 59.9 214.66 58.76 215.3 57.49L214.85 57.15C213.95 58.39 213.44 59.96 213.44 61.57C213.44 63.18 213.95 64.76 214.85 65.99ZM217.91 64H218.74V58.07H220.86V57.33H215.8V58.07H217.91V64ZM221.084 64H221.834V60.58C222.054 60.19 222.684 59.81 223.144 59.81C223.264 59.81 223.354 59.82 223.444 59.84V59.07C222.784 59.07 222.224 59.44 221.834 59.95V59.17H221.084V64ZM227.515 64H228.385L226.525 61.52L228.275 59.17H227.405L226.065 61.01L224.725 59.17H223.855L225.605 61.52L223.755 64H224.615L226.065 62.02L227.515 64ZM233.846 64H234.876L237.566 57.33H236.616L234.366 63.09L232.116 57.33H231.166L233.846 64ZM239.923 64.12C241.393 64.12 242.313 62.98 242.313 61.58C242.313 60.18 241.393 59.05 239.923 59.05C238.453 59.05 237.533 60.18 237.533 61.58C237.533 62.98 238.453 64.12 239.923 64.12ZM239.923 63.45C238.893 63.45 238.312 62.57 238.312 61.58C238.312 60.6 238.893 59.72 239.923 59.72C240.953 59.72 241.523 60.6 241.523 61.58C241.523 62.57 240.953 63.45 239.923 63.45ZM243.535 64H244.285V57.33H243.535V64ZM249.041 64H249.791V59.17H249.041V62.72C248.761 63.11 248.201 63.45 247.611 63.45C246.961 63.45 246.531 63.2 246.531 62.35V59.17H245.781V62.58C245.781 63.63 246.311 64.12 247.321 64.12C248.041 64.12 248.671 63.74 249.041 63.32V64ZM257.119 64H257.869V60.51C257.869 59.54 257.399 59.05 256.519 59.05C255.819 59.05 255.169 59.51 254.899 59.95C254.759 59.45 254.339 59.05 253.599 59.05C252.889 59.05 252.239 59.56 252.039 59.87V59.17H251.289V64H252.039V60.47C252.299 60.08 252.819 59.72 253.309 59.72C253.939 59.72 254.199 60.11 254.199 60.72V64H254.949V60.46C255.199 60.08 255.729 59.72 256.229 59.72C256.849 59.72 257.119 60.11 257.119 60.72V64ZM259.085 61.58C259.085 63.09 260.115 64.12 261.545 64.12C262.335 64.12 262.985 63.86 263.465 63.38L263.105 62.89C262.725 63.28 262.165 63.5 261.615 63.5C260.575 63.5 259.935 62.74 259.875 61.83H263.785V61.64C263.785 60.19 262.925 59.05 261.465 59.05C260.085 59.05 259.085 60.18 259.085 61.58ZM261.455 59.67C262.555 59.67 263.035 60.56 263.045 61.28H259.875C259.915 60.54 260.425 59.67 261.455 59.67ZM265.47 61.57C265.47 63.23 265.07 64.38 264.42 65.64L264.87 65.99C265.78 64.76 266.29 63.18 266.29 61.57C266.29 59.96 265.78 58.39 264.87 57.15L264.42 57.49C265.07 58.76 265.47 59.9 265.47 61.57Z'
            fill='var(--waterloo)'
          />
          <circle
            cx='191.959'
            cy='52.4611'
            r='11.9793'
            fill='var(--malibu-light)'
          />
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M184.097 52.4611C184.097 51.8408 184.757 51.338 185.571 51.338H198.346C199.16 51.338 199.82 51.8408 199.82 52.4611C199.82 53.0813 199.16 53.5841 198.346 53.5841H185.571C184.757 53.5841 184.097 53.0813 184.097 52.4611Z'
            fill='var(--malibu)'
          />
          <circle
            cx='191.959'
            cy='52.4611'
            r='3.74352'
            fill='var(--malibu-light)'
            stroke='var(--malibu)'
            strokeWidth='1.49741'
          />
          <g opacity='0.15' filter='url(#filter5_f)'>
            <rect
              x='325.712'
              y='45.7228'
              width='79.3627'
              height='38.1839'
              rx='5.98964'
              fill='var(--waterloo)'
            />
          </g>
          <g filter='url(#filter6_d)'>
            <rect
              x='304'
              y='30'
              width='120.541'
              height='44.9223'
              rx='22.4611'
              fill='white'
            />
            <rect
              x='304.374'
              y='30.3744'
              width='119.793'
              height='44.1736'
              rx='22.0868'
              stroke='#F1F3F9'
              strokeWidth='0.748705'
            />
          </g>
          <path
            d='M349.974 56.728H355.863V55.7308H351.092V52.6311H355.769V51.6338H351.092V48.7364H355.863V47.7391H349.974V56.728ZM359.87 56.728H360.989V48.7364H363.846V47.7391H357.026V48.7364H359.87V56.728ZM371.707 56.728H372.825V47.7391H371.707V51.6069H366.451V47.7391H365.332V56.728H366.451V52.6042H371.707V56.728ZM378.401 56.728H379.519V53.1567H382.013C383.792 53.1567 384.829 51.9169 384.829 50.4479C384.829 48.9789 383.819 47.7391 382.013 47.7391H378.401V56.728ZM383.67 50.4479C383.67 51.4586 382.943 52.1594 381.878 52.1594H379.519V48.7364H381.878C382.943 48.7364 383.67 49.4371 383.67 50.4479ZM386.27 56.728H387.281V52.119C387.577 51.5934 388.426 51.0813 389.046 51.0813C389.208 51.0813 389.329 51.0948 389.451 51.1217V50.084C388.561 50.084 387.806 50.5827 387.281 51.27V50.2188H386.27V56.728ZM391.217 49.1272C391.594 49.1272 391.904 48.8172 391.904 48.4399C391.904 48.0625 391.594 47.766 391.217 47.766C390.853 47.766 390.543 48.0625 390.543 48.4399C390.543 48.8172 390.853 49.1272 391.217 49.1272ZM390.719 56.728H391.729V50.2188H390.719V56.728ZM393.368 53.4667C393.368 55.4073 394.675 56.8897 396.616 56.8897C397.802 56.8897 398.503 56.4046 399.001 55.7577L398.328 55.1378C397.896 55.7173 397.344 55.9868 396.67 55.9868C395.282 55.9868 394.419 54.9087 394.419 53.4667C394.419 52.0247 395.282 50.96 396.67 50.96C397.344 50.96 397.896 51.2161 398.328 51.809L399.001 51.1891C398.503 50.5422 397.802 50.0571 396.616 50.0571C394.675 50.0571 393.368 51.5395 393.368 53.4667ZM400.041 53.4667C400.041 55.5016 401.429 56.8897 403.356 56.8897C404.421 56.8897 405.297 56.5394 405.943 55.8925L405.458 55.2321C404.946 55.7577 404.192 56.0542 403.45 56.0542C402.049 56.0542 401.186 55.03 401.105 53.8036H406.375V53.5475C406.375 51.5934 405.216 50.0571 403.248 50.0571C401.388 50.0571 400.041 51.5799 400.041 53.4667ZM403.235 50.8926C404.717 50.8926 405.364 52.092 405.377 53.0624H401.105C401.159 52.0651 401.847 50.8926 403.235 50.8926Z'
            fill='var(--rhino)'
          />
          <circle
            cx='327.959'
            cy='52.4611'
            r='11.9793'
            fill='var(--jungle-green-light)'
          />
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M320.097 52.4611C320.097 51.8408 320.757 51.338 321.571 51.338H334.346C335.16 51.338 335.82 51.8408 335.82 52.4611C335.82 53.0813 335.16 53.5841 334.346 53.5841H321.571C320.757 53.5841 320.097 53.0813 320.097 52.4611Z'
            fill='var(--sheets)'
          />
          <circle
            cx='327.959'
            cy='52.4611'
            r='3.74352'
            fill='var(--jungle-green-light)'
            stroke='var(--sheets)'
            strokeWidth='1.49741'
          />
        </g>
        <defs>
          <filter
            id='filter0_dd'
            x='0'
            y='0'
            width='500'
            height='340'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'
          >
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feColorMatrix
              in='SourceAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            />
            <feOffset dy='2' />
            <feGaussianBlur stdDeviation='4' />
            <feColorMatrix
              type='matrix'
              values='0 0 0 0 0.232639 0 0 0 0 0.328333 0 0 0 0 0.416667 0 0 0 0.03 0'
            />
            <feBlend
              mode='normal'
              in2='BackgroundImageFix'
              result='effect1_dropShadow'
            />
            <feColorMatrix
              in='SourceAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            />
            <feOffset dy='1' />
            <feGaussianBlur stdDeviation='1' />
            <feColorMatrix
              type='matrix'
              values='0 0 0 0 0.231373 0 0 0 0 0.329412 0 0 0 0 0.415686 0 0 0 0.03 0'
            />
            <feBlend
              mode='normal'
              in2='effect1_dropShadow'
              result='effect2_dropShadow'
            />
            <feBlend
              mode='normal'
              in='SourceGraphic'
              in2='effect2_dropShadow'
              result='shape'
            />
          </filter>
          <filter
            id='filter1_f'
            x='1.07772'
            y='1.07772'
            width='189.845'
            height='127.845'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'
          >
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feBlend
              mode='normal'
              in='SourceGraphic'
              in2='BackgroundImageFix'
              result='shape'
            />
            <feGaussianBlur
              stdDeviation='22.4611'
              result='effect1_foregroundBlur'
            />
          </filter>
          <filter
            id='filter2_d'
            x='2.05181'
            y='7.53886'
            width='187.896'
            height='104.896'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'
          >
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feColorMatrix
              in='SourceAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            />
            <feOffset dy='7.48705' />
            <feGaussianBlur stdDeviation='14.9741' />
            <feColorMatrix
              type='matrix'
              values='0 0 0 0 0.476616 0 0 0 0 0.521707 0 0 0 0 0.620087 0 0 0 0.06 0'
            />
            <feBlend
              mode='normal'
              in2='BackgroundImageFix'
              result='effect1_dropShadow'
            />
            <feBlend
              mode='normal'
              in='SourceGraphic'
              in2='effect1_dropShadow'
              result='shape'
            />
          </filter>
          <filter
            id='filter3_f'
            x='137.078'
            y='1.07772'
            width='189.845'
            height='127.845'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'
          >
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feBlend
              mode='normal'
              in='SourceGraphic'
              in2='BackgroundImageFix'
              result='shape'
            />
            <feGaussianBlur
              stdDeviation='22.4611'
              result='effect1_foregroundBlur'
            />
          </filter>
          <filter
            id='filter4_d'
            x='138.052'
            y='7.53886'
            width='187.896'
            height='104.896'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'
          >
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feColorMatrix
              in='SourceAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            />
            <feOffset dy='7.48705' />
            <feGaussianBlur stdDeviation='14.9741' />
            <feColorMatrix
              type='matrix'
              values='0 0 0 0 0.476616 0 0 0 0 0.521707 0 0 0 0 0.620087 0 0 0 0.06 0'
            />
            <feBlend
              mode='normal'
              in2='BackgroundImageFix'
              result='effect1_dropShadow'
            />
            <feBlend
              mode='normal'
              in='SourceGraphic'
              in2='effect1_dropShadow'
              result='shape'
            />
          </filter>
          <filter
            id='filter5_f'
            x='280.79'
            y='0.800499'
            width='169.207'
            height='128.028'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'
          >
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feBlend
              mode='normal'
              in='SourceGraphic'
              in2='BackgroundImageFix'
              result='shape'
            />
            <feGaussianBlur
              stdDeviation='22.4611'
              result='effect1_foregroundBlur'
            />
          </filter>
          <filter
            id='filter6_d'
            x='274.052'
            y='7.53886'
            width='180.438'
            height='104.819'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'
          >
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feColorMatrix
              in='SourceAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            />
            <feOffset dy='7.48705' />
            <feGaussianBlur stdDeviation='14.9741' />
            <feColorMatrix
              type='matrix'
              values='0 0 0 0 0.476616 0 0 0 0 0.521707 0 0 0 0 0.620087 0 0 0 0.06 0'
            />
            <feBlend
              mode='normal'
              in2='BackgroundImageFix'
              result='effect1_dropShadow'
            />
            <feBlend
              mode='normal'
              in='SourceGraphic'
              in2='effect1_dropShadow'
              result='shape'
            />
          </filter>
        </defs>
      </svg>
    ),
    isLeft: true
  },
  {
    title: 'Price-DAA Divergence Template',
    description: (
      <>
        We{' '}
        <a
          className={styles.link}
          rel='noopener noreferrer'
          target='_blank'
          href='https://insights.santiment.net/read/price---daily-addresses-divergence%3A-%0Aa-primer-on-on-chain-trading-strategies-2222'
        >
          have found
        </a>{' '}
        that major differences in the coin’s price and network activity trends
        can present opportune times to buy OR sell, depending on the trend’s
        direction.
        <div className={styles.block}>
          {' '}
          This template triggers BUY and SELL signals for Bitcoin and Ethereum
          based on major divergences in price and the amount of daily addresses
          interacting with the coin.
        </div>
      </>
    ),
    svg: (
      <svg
        width='500'
        height='340'
        viewBox='0 0 500 340'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <g filter='url(#filter0_dd)'>
          <rect x='8' y='6' width='484' height='324' rx='4' fill='white' />
          <rect
            x='8.5'
            y='6.5'
            width='483'
            height='323'
            rx='3.5'
            stroke='var(--porcelain)'
          />
        </g>
        <mask
          id='mask0'
          mask-type='alpha'
          maskUnits='userSpaceOnUse'
          x='8'
          y='6'
          width='484'
          height='324'
        >
          <rect
            x='8.5'
            y='6.5'
            width='483'
            height='323'
            rx='3.5'
            fill='var(--athens)'
            stroke='var(--porcelain)'
          />
        </mask>
        <g mask='url(#mask0)'>
          <rect
            x='7'
            y='237'
            width='486'
            height='2'
            rx='1'
            fill='var(--athens)'
          />
          <rect
            x='7'
            y='154'
            width='486'
            height='2'
            rx='1'
            fill='var(--athens)'
          />
          <rect
            x='7'
            y='71'
            width='486'
            height='2'
            rx='1'
            fill='var(--athens)'
          />
          <path
            d='M7.40393 177.727L10.3726 174.593L13.3412 170.413L16.3098 177.727L19.2784 174.244L22.2471 175.986L25.2157 175.289L28.1843 176.682L31.153 177.727L34.1216 178.946L37.0902 177.379L40.0588 178.772L43.0275 176.334L45.9961 174.244L48.9647 173.199L51.9333 169.02L54.902 166.757L57.8706 165.625L60.8392 162.752L63.8079 165.886L66.7765 169.02L69.7451 167.279L72.7137 170.762L75.6824 172.851L78.651 169.717L81.6197 167.279L84.5883 169.02L87.5569 164.493L90.5255 174.593L93.4941 167.709L96.4628 160.826L99.4314 167.874L102.4 167.956L105.369 168.038L108.337 154.19L111.306 161.237L114.275 163.408L117.243 133.54L120.212 140.588L123.18 112.809L126.149 119.856L129.118 121.331L132.086 120.02L135.055 125.856L138.024 123.399L143.961 119.219L146.929 105.289L149.898 114.692L152.867 120.02L155.835 123.399L158.804 117.478L161.773 109.816L164.741 99.6547L167.71 103.896L170.678 101.458L173.647 92.0553L176.616 101.458L179.584 96.5826L182.553 112.07L185.522 112.152L188.49 112.234L191.459 117.478L194.427 112.399L197.396 107.379L200.365 112.563L203.333 109.816L206.302 112.727L209.271 105.289L212.239 135.709L215.208 143.598L218.176 135.874L221.145 131.408L224.114 136.038L227.082 136.12L230.051 129.237L233.02 133.54L235.972 135.874L238.957 134.891L241.925 140.578L244.894 144.642L247.863 141.856L250.831 147.616L253.8 155.09L256.769 157.436L259.737 139.767L262.706 145.254L265.674 147.599L268.664 149.961L271.612 143.946L274.58 146.292L277.549 138.232L280.563 140.614L283.486 142.924L286.455 149.961L289.423 152.307L292.392 144.642L295.361 136.284L298.329 133.15L301.298 127.926L304.267 142.553L307.235 135.073L310.204 122.005L313.173 123.838L316.141 112.254L319.11 120.704L322.078 122.959L325.047 124.792L327.963 133.54L330.984 131.408L333.953 137.238L336.922 141.856L339.89 143.689L342.859 145.521L345.827 137.329L348.796 139.161L351.765 140.994L354.733 142.826L357.702 144.659L360.671 145.804L363.639 127.229L366.608 130.364L369.577 128.797L372.545 127.229L375.514 129.667L378.482 127.926L381.451 123.399L384.42 126.185L387.388 127.926L390.357 124.792L393.325 125.836L396.294 122.702L399.263 117.826L402.231 121.309L405.2 121.657L408.169 122.005L411.137 113.647L414.106 119.568L417.075 122.702L420.043 128.274L423.012 124.792L425.98 130.015L428.949 126.533L431.918 88.3389L434.886 82.4185L437.855 83.8115L440.823 78.5877L443.792 83.4633L446.761 82.7668L449.729 84.1598L452.698 86.2494L455.667 84.1598L458.635 92.518L461.604 76.1499L464.573 87.6424L465.315 68.8364L467.17 70.926L470.881 58.9851L473.107 63.5124L476.818 36L480.9 69.0702L484.24 57.9403L489.806 89.2692L491.29 85.7866L493.517 129.667'
            stroke='var(--jungle-green)'
            strokeWidth='1.5'
          />
          <g opacity='0.15' filter='url(#filter1_f)'>
            <rect
              x='151.457'
              y='272.706'
              width='198.882'
              height='40.5719'
              rx='6.36422'
              fill='var(--waterloo)'
            />
          </g>
          <g filter='url(#filter2_d)'>
            <rect
              x='126'
              y='256'
              width='249'
              height='47.7316'
              rx='23.8658'
              fill='white'
            />
            <rect
              x='126.398'
              y='256.398'
              width='248.204'
              height='46.9361'
              rx='23.4681'
              stroke='#F1F3F9'
              strokeWidth='0.795527'
            />
          </g>
          <path
            d='M174.849 284.524H176.037V280.729H178.686C180.576 280.729 181.679 279.412 181.679 277.851C181.679 276.29 180.605 274.973 178.686 274.973H174.849V284.524ZM180.447 277.851C180.447 278.925 179.674 279.67 178.543 279.67H176.037V276.033H178.543C179.674 276.033 180.447 276.777 180.447 277.851ZM183.21 284.524H184.284V279.627C184.599 279.068 185.501 278.524 186.16 278.524C186.332 278.524 186.46 278.538 186.589 278.567V277.464C185.644 277.464 184.842 277.994 184.284 278.725V277.608H183.21V284.524ZM188.466 276.448C188.867 276.448 189.197 276.118 189.197 275.718C189.197 275.317 188.867 275.002 188.466 275.002C188.08 275.002 187.75 275.317 187.75 275.718C187.75 276.118 188.08 276.448 188.466 276.448ZM187.936 284.524H189.01V277.608H187.936V284.524ZM190.752 281.059C190.752 283.121 192.141 284.696 194.203 284.696C195.463 284.696 196.208 284.18 196.737 283.493L196.021 282.834C195.563 283.45 194.976 283.736 194.26 283.736C192.785 283.736 191.869 282.591 191.869 281.059C191.869 279.526 192.785 278.395 194.26 278.395C194.976 278.395 195.563 278.667 196.021 279.297L196.737 278.639C196.208 277.951 195.463 277.436 194.203 277.436C192.141 277.436 190.752 279.011 190.752 281.059ZM197.842 281.059C197.842 283.221 199.317 284.696 201.364 284.696C202.495 284.696 203.426 284.324 204.114 283.636L203.598 282.935C203.054 283.493 202.252 283.808 201.464 283.808C199.975 283.808 199.059 282.72 198.973 281.417H204.572V281.145C204.572 279.068 203.34 277.436 201.25 277.436C199.274 277.436 197.842 279.054 197.842 281.059ZM201.235 278.324C202.81 278.324 203.498 279.598 203.512 280.629H198.973C199.03 279.569 199.76 278.324 201.235 278.324Z'
            fill='var(--rhino)'
          />
          <path
            d='M213.867 275.271C213.683 275.033 213.333 275.033 213.149 275.271L210.427 278.784C210.187 279.095 210.401 279.556 210.786 279.556L212.872 279.556L212.872 284.081C212.872 284.389 213.156 284.639 213.508 284.639C213.859 284.639 214.144 284.389 214.144 284.081L214.144 279.556L216.229 279.556C216.615 279.556 216.829 279.095 216.588 278.784L213.867 275.271Z'
            fill='var(--rhino)'
          />
          <path
            d='M245.25 284.524H246.395V274.973H245.207V282.519L239.708 274.973H238.491V284.524H239.679V276.82L245.25 284.524ZM248.185 281.059C248.185 283.221 249.66 284.696 251.708 284.696C252.839 284.696 253.77 284.324 254.457 283.636L253.942 282.935C253.397 283.493 252.596 283.808 251.808 283.808C250.319 283.808 249.402 282.72 249.316 281.417H254.915V281.145C254.915 279.068 253.684 277.436 251.593 277.436C249.617 277.436 248.185 279.054 248.185 281.059ZM251.579 278.324C253.154 278.324 253.841 279.598 253.856 280.629H249.316C249.374 279.569 250.104 278.324 251.579 278.324ZM258.402 284.696C259.032 284.696 259.418 284.51 259.691 284.252L259.375 283.45C259.232 283.608 258.946 283.736 258.645 283.736C258.173 283.736 257.944 283.364 257.944 282.849V278.553H259.347V277.608H257.944V275.718H256.87V277.608H255.724V278.553H256.87V283.078C256.87 284.109 257.385 284.696 258.402 284.696ZM266.849 284.524H267.923L270.129 277.608H269.012L267.322 283.121L265.503 277.608H264.587L262.768 283.121L261.079 277.608H259.962L262.167 284.524H263.241L265.045 278.968L266.849 284.524ZM274.401 284.696C276.506 284.696 277.824 283.063 277.824 281.059C277.824 279.054 276.506 277.436 274.401 277.436C272.296 277.436 270.979 279.054 270.979 281.059C270.979 283.063 272.296 284.696 274.401 284.696ZM274.401 283.736C272.926 283.736 272.096 282.476 272.096 281.059C272.096 279.655 272.926 278.395 274.401 278.395C275.876 278.395 276.692 279.655 276.692 281.059C276.692 282.476 275.876 283.736 274.401 283.736ZM279.574 284.524H280.648V279.627C280.963 279.068 281.865 278.524 282.524 278.524C282.696 278.524 282.825 278.538 282.954 278.567V277.464C282.009 277.464 281.207 277.994 280.648 278.725V277.608H279.574V284.524ZM289.012 284.524H290.387L287.308 280.744L290.372 277.608H289.012L285.375 281.288V274.973H284.301V284.524H285.375V282.548L286.52 281.417L289.012 284.524ZM302.25 284.524H303.568L299.716 274.973H298.241L294.403 284.524H295.72L296.565 282.405H301.405L302.25 284.524ZM298.985 276.033L301.047 281.345H296.909L298.985 276.033ZM304.372 281.059C304.372 283.121 305.761 284.696 307.823 284.696C309.083 284.696 309.828 284.18 310.358 283.493L309.642 282.834C309.184 283.45 308.597 283.736 307.881 283.736C306.406 283.736 305.489 282.591 305.489 281.059C305.489 279.526 306.406 278.395 307.881 278.395C308.597 278.395 309.184 278.667 309.642 279.297L310.358 278.639C309.828 277.951 309.083 277.436 307.823 277.436C305.761 277.436 304.372 279.011 304.372 281.059ZM313.61 284.696C314.24 284.696 314.627 284.51 314.899 284.252L314.584 283.45C314.441 283.608 314.154 283.736 313.854 283.736C313.381 283.736 313.152 283.364 313.152 282.849V278.553H314.555V277.608H313.152V275.718H312.078V277.608H310.932V278.553H312.078V283.078C312.078 284.109 312.593 284.696 313.61 284.696ZM316.602 276.448C317.003 276.448 317.332 276.118 317.332 275.718C317.332 275.317 317.003 275.002 316.602 275.002C316.215 275.002 315.886 275.317 315.886 275.718C315.886 276.118 316.215 276.448 316.602 276.448ZM316.072 284.524H317.146V277.608H316.072V284.524ZM321.136 284.524H322.31L325.188 277.608H324.014L321.723 283.278L319.417 277.608H318.258L321.136 284.524ZM326.838 276.448C327.239 276.448 327.569 276.118 327.569 275.718C327.569 275.317 327.239 275.002 326.838 275.002C326.452 275.002 326.122 275.317 326.122 275.718C326.122 276.118 326.452 276.448 326.838 276.448ZM326.308 284.524H327.382V277.608H326.308V284.524ZM331.272 284.696C331.902 284.696 332.288 284.51 332.56 284.252L332.245 283.45C332.102 283.608 331.816 283.736 331.515 283.736C331.043 283.736 330.814 283.364 330.814 282.849V278.553H332.217V277.608H330.814V275.718H329.74V277.608H328.594V278.553H329.74V283.078C329.74 284.109 330.255 284.696 331.272 284.696ZM333.519 286.257L333.347 287.23C333.548 287.288 333.906 287.331 334.135 287.331C335.051 287.316 335.753 286.93 336.168 285.927L339.634 277.608H338.459L336.168 283.278L333.863 277.608H332.703L335.595 284.596L335.137 285.641C334.894 286.214 334.579 286.371 334.106 286.371C333.934 286.371 333.677 286.328 333.519 286.257Z'
            fill='var(--rhino)'
          />
          <path
            d='M347.593 284.461C347.777 284.698 348.127 284.698 348.311 284.461L351.033 280.947C351.273 280.636 351.059 280.176 350.674 280.176L348.588 280.176L348.588 275.651C348.588 275.342 348.304 275.093 347.952 275.093C347.601 275.093 347.316 275.342 347.316 275.651L347.316 280.176L345.231 280.176C344.845 280.176 344.631 280.636 344.872 280.947L347.593 284.461Z'
            fill='var(--rhino)'
          />
          <circle
            cx='151.457'
            cy='279.866'
            r='12.7284'
            fill='var(--persimmon-light)'
          />
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M151.457 288.219C150.798 288.219 150.264 287.518 150.264 286.653L150.264 273.079C150.264 272.214 150.798 271.513 151.457 271.513C152.116 271.513 152.65 272.214 152.65 273.079L152.65 286.653C152.65 287.518 152.116 288.219 151.457 288.219Z'
            fill='var(--persimmon)'
          />
          <path
            opacity='0.3'
            fillRule='evenodd'
            clipRule='evenodd'
            d='M147.081 288.219C146.422 288.219 145.888 287.518 145.888 286.653L145.888 278.648C145.888 277.783 146.422 277.081 147.081 277.081C147.741 277.081 148.275 277.783 148.275 278.648L148.275 286.653C148.275 287.518 147.741 288.219 147.081 288.219Z'
            fill='var(--persimmon)'
          />
          <path
            opacity='0.3'
            fillRule='evenodd'
            clipRule='evenodd'
            d='M155.832 288.219C155.173 288.219 154.639 287.518 154.639 286.653L154.639 281.83C154.639 280.965 155.173 280.264 155.832 280.264C156.491 280.264 157.026 280.965 157.026 281.83L157.026 286.653C157.026 287.518 156.491 288.219 155.832 288.219Z'
            fill='var(--persimmon)'
          />
          <rect
            x='108'
            y='191'
            width='4'
            height='48'
            rx='2'
            fill='var(--persimmon)'
          />
          <rect
            x='304'
            y='191'
            width='4'
            height='48'
            rx='2'
            fill='var(--persimmon)'
          />
          <rect
            x='156'
            y='191'
            width='4'
            height='48'
            rx='2'
            fill='var(--persimmon)'
          />
          <rect
            x='115'
            y='191'
            width='4'
            height='48'
            rx='2'
            fill='var(--persimmon)'
          />
          <rect
            x='365'
            y='191'
            width='4'
            height='48'
            rx='2'
            fill='var(--bright-sun)'
          />
          <rect
            x='371'
            y='191'
            width='4'
            height='48'
            rx='2'
            fill='var(--bright-sun)'
          />
          <rect
            x='426'
            y='191'
            width='4'
            height='48'
            rx='2'
            fill='var(--persimmon)'
          />
          <rect
            x='463'
            y='191'
            width='4'
            height='48'
            rx='2'
            fill='var(--persimmon)'
          />
        </g>
        <defs>
          <filter
            id='filter0_dd'
            x='0'
            y='0'
            width='500'
            height='340'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'
          >
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feColorMatrix
              in='SourceAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            />
            <feOffset dy='2' />
            <feGaussianBlur stdDeviation='4' />
            <feColorMatrix
              type='matrix'
              values='0 0 0 0 0.232639 0 0 0 0 0.328333 0 0 0 0 0.416667 0 0 0 0.03 0'
            />
            <feBlend
              mode='normal'
              in2='BackgroundImageFix'
              result='effect1_dropShadow'
            />
            <feColorMatrix
              in='SourceAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            />
            <feOffset dy='1' />
            <feGaussianBlur stdDeviation='1' />
            <feColorMatrix
              type='matrix'
              values='0 0 0 0 0.231373 0 0 0 0 0.329412 0 0 0 0 0.415686 0 0 0 0.03 0'
            />
            <feBlend
              mode='normal'
              in2='effect1_dropShadow'
              result='effect2_dropShadow'
            />
            <feBlend
              mode='normal'
              in='SourceGraphic'
              in2='effect2_dropShadow'
              result='shape'
            />
          </filter>
          <filter
            id='filter1_f'
            x='103.725'
            y='224.974'
            width='294.345'
            height='136.035'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'
          >
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feBlend
              mode='normal'
              in='SourceGraphic'
              in2='BackgroundImageFix'
              result='shape'
            />
            <feGaussianBlur
              stdDeviation='23.8658'
              result='effect1_foregroundBlur'
            />
          </filter>
          <filter
            id='filter2_d'
            x='94.1789'
            y='232.134'
            width='312.642'
            height='111.374'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'
          >
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feColorMatrix
              in='SourceAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            />
            <feOffset dy='7.95527' />
            <feGaussianBlur stdDeviation='15.9105' />
            <feColorMatrix
              type='matrix'
              values='0 0 0 0 0.476616 0 0 0 0 0.521707 0 0 0 0 0.620087 0 0 0 0.06 0'
            />
            <feBlend
              mode='normal'
              in2='BackgroundImageFix'
              result='effect1_dropShadow'
            />
            <feBlend
              mode='normal'
              in='SourceGraphic'
              in2='effect1_dropShadow'
              result='shape'
            />
          </filter>
        </defs>
      </svg>
    )
  },
  {
    title: 'Network Growth & Daily Active Addresses Template',
    isLeft: true,
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
    svg: (
      <svg
        width='500'
        height='340'
        viewBox='0 0 500 340'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <g filter='url(#filter0_dd)'>
          <rect x='8' y='6' width='484' height='324' rx='4' fill='white' />
          <rect
            x='8.5'
            y='6.5'
            width='483'
            height='323'
            rx='3.5'
            stroke='var(--porcelain)'
          />
        </g>
        <mask
          id='mask0'
          mask-type='alpha'
          maskUnits='userSpaceOnUse'
          x='8'
          y='6'
          width='484'
          height='324'
        >
          <rect
            x='8.5'
            y='6.5'
            width='483'
            height='323'
            rx='3.5'
            fill='var(--athens)'
            stroke='var(--porcelain)'
          />
        </mask>
        <g mask='url(#mask0)'>
          <rect
            x='7'
            y='250'
            width='486'
            height='2'
            rx='1'
            fill='var(--athens)'
          />
          <rect
            x='7'
            y='167'
            width='486'
            height='2'
            rx='1'
            fill='var(--athens)'
          />
          <rect
            x='7'
            y='84'
            width='486'
            height='2'
            rx='1'
            fill='var(--athens)'
          />
          <g opacity='0.15' filter='url(#filter1_f)'>
            <rect
              x='49.2202'
              y='45.7228'
              width='124.285'
              height='38.1839'
              rx='5.98964'
              fill='var(--waterloo)'
            />
          </g>
          <g filter='url(#filter2_d)'>
            <rect
              x='32'
              y='30'
              width='159.474'
              height='44.9223'
              rx='22.4611'
              fill='white'
            />
            <rect
              x='32.3744'
              y='30.3744'
              width='158.725'
              height='44.1736'
              rx='22.0868'
              stroke='#F1F3F9'
              strokeWidth='0.748705'
            />
          </g>
          <path
            d='M84.3344 56.728H85.4126V47.739H84.294V54.8412L79.1189 47.739H77.9734V56.728H79.092V49.4775L84.3344 56.728ZM87.0972 53.4666C87.0972 55.5016 88.4853 56.8897 90.4125 56.8897C91.4772 56.8897 92.3532 56.5393 93 55.8924L92.5149 55.2321C92.0028 55.7576 91.2481 56.0541 90.5068 56.0541C89.1053 56.0541 88.2428 55.0299 88.1619 53.8035H93.4313V53.5475C93.4313 51.5933 92.2723 50.057 90.3047 50.057C88.4449 50.057 87.0972 51.5799 87.0972 53.4666ZM90.2912 50.8926C91.7737 50.8926 92.4205 52.092 92.434 53.0623H88.1619C88.2158 52.065 88.9031 50.8926 90.2912 50.8926ZM96.7125 56.8897C97.3055 56.8897 97.6694 56.7145 97.9254 56.4719L97.629 55.7172C97.4942 55.8655 97.2247 55.9867 96.9416 55.9867C96.4969 55.9867 96.2813 55.6364 96.2813 55.1512V51.1082H97.602V50.2187H96.2813V48.4398H95.2705V50.2187H94.1924V51.1082H95.2705V55.3668C95.2705 56.3371 95.7557 56.8897 96.7125 56.8897ZM104.663 56.728H105.674L107.749 50.2187H106.698L105.108 55.4073L103.396 50.2187H102.534L100.822 55.4073L99.2319 50.2187H98.1808L100.256 56.728H101.267L102.965 51.499L104.663 56.728ZM111.77 56.8897C113.751 56.8897 114.991 55.3533 114.991 53.4666C114.991 51.5799 113.751 50.057 111.77 50.057C109.789 50.057 108.549 51.5799 108.549 53.4666C108.549 55.3533 109.789 56.8897 111.77 56.8897ZM111.77 55.9867C110.382 55.9867 109.601 54.8008 109.601 53.4666C109.601 52.1459 110.382 50.9599 111.77 50.9599C113.158 50.9599 113.927 52.1459 113.927 53.4666C113.927 54.8008 113.158 55.9867 111.77 55.9867ZM116.639 56.728H117.65V52.1189C117.946 51.5933 118.795 51.0812 119.415 51.0812C119.577 51.0812 119.698 51.0947 119.819 51.1217V50.084C118.93 50.084 118.175 50.5826 117.65 51.2699V50.2187H116.639V56.728ZM125.521 56.728H126.815L123.917 53.1701L126.801 50.2187H125.521L122.098 53.6822V47.739H121.087V56.728H122.098V54.8682L123.176 53.8035L125.521 56.728ZM131.161 52.2402C131.161 55.0299 133.223 56.9032 135.783 56.9032C137.252 56.9032 138.479 56.2832 139.314 55.3533V52.1055H135.11V53.1027H138.196V54.9356C137.751 55.3803 136.862 55.9059 135.783 55.9059C133.816 55.9059 132.32 54.3695 132.32 52.2402C132.32 50.0974 133.816 48.588 135.783 48.588C136.862 48.588 137.818 49.1002 138.384 49.8279L139.274 49.2754C138.479 48.2916 137.374 47.5908 135.783 47.5908C133.223 47.5908 131.161 49.4506 131.161 52.2402ZM141.092 56.728H142.103V52.1189C142.399 51.5933 143.248 51.0812 143.868 51.0812C144.03 51.0812 144.151 51.0947 144.272 51.1217V50.084C143.383 50.084 142.628 50.5826 142.103 51.2699V50.2187H141.092V56.728ZM148.384 56.8897C150.365 56.8897 151.605 55.3533 151.605 53.4666C151.605 51.5799 150.365 50.057 148.384 50.057C146.403 50.057 145.163 51.5799 145.163 53.4666C145.163 55.3533 146.403 56.8897 148.384 56.8897ZM148.384 55.9867C146.996 55.9867 146.214 54.8008 146.214 53.4666C146.214 52.1459 146.996 50.9599 148.384 50.9599C149.772 50.9599 150.54 52.1459 150.54 53.4666C150.54 54.8008 149.772 55.9867 148.384 55.9867ZM158.886 56.728H159.896L161.972 50.2187H160.921L159.33 55.4073L157.619 50.2187H156.756L155.045 55.4073L153.455 50.2187H152.403L154.479 56.728H155.49L157.188 51.499L158.886 56.728ZM164.793 56.8897C165.386 56.8897 165.75 56.7145 166.006 56.4719L165.71 55.7172C165.575 55.8655 165.306 55.9867 165.023 55.9867C164.578 55.9867 164.362 55.6364 164.362 55.1512V51.1082H165.683V50.2187H164.362V48.4398H163.351V50.2187H162.273V51.1082H163.351V55.3668C163.351 56.3371 163.837 56.8897 164.793 56.8897ZM171.518 56.728H172.528V52.1324C172.528 50.7174 171.814 50.057 170.453 50.057C169.469 50.057 168.58 50.623 168.121 51.1621V47.739H167.111V56.728H168.121V51.9707C168.512 51.4451 169.267 50.9599 170.049 50.9599C170.925 50.9599 171.518 51.2969 171.518 52.4424V56.728Z'
            fill='var(--rhino)'
          />
          <circle
            opacity='0.1'
            cx='55.9585'
            cy='52.4611'
            r='11.9793'
            fill='#8358FF'
          />
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M48.0972 52.4611C48.0972 51.8409 48.7571 51.3381 49.5712 51.3381H62.346C63.16 51.3381 63.82 51.8409 63.82 52.4611C63.82 53.0814 63.16 53.5842 62.346 53.5842H49.5712C48.7571 53.5842 48.0972 53.0814 48.0972 52.4611Z'
            fill='#8358FF'
          />
          <circle
            cx='55.9585'
            cy='52.4611'
            r='3.74352'
            fill='#ECF0FE'
            stroke='#8358FF'
            strokeWidth='1.49741'
          />
          <g opacity='0.15' filter='url(#filter3_f)'>
            <rect
              x='222.171'
              y='45.7228'
              width='79.3627'
              height='38.1839'
              rx='5.98964'
              fill='var(--waterloo)'
            />
          </g>
          <g filter='url(#filter4_d)'>
            <rect
              x='200.458'
              y='30'
              width='120.541'
              height='44.9223'
              rx='22.4611'
              fill='white'
            />
            <rect
              x='200.833'
              y='30.3744'
              width='119.793'
              height='44.1736'
              rx='22.0868'
              stroke='#F1F3F9'
              strokeWidth='0.748705'
            />
          </g>
          <path
            d='M246.432 56.728H252.321V55.7307H247.551V52.6311H252.227V51.6338H247.551V48.7363H252.321V47.739H246.432V56.728ZM256.328 56.728H257.447V48.7363H260.304V47.739H253.485V48.7363H256.328V56.728ZM268.165 56.728H269.284V47.739H268.165V51.6068H262.909V47.739H261.791V56.728H262.909V52.6041H268.165V56.728ZM274.859 56.728H275.978V53.1566H278.471C280.25 53.1566 281.288 51.9168 281.288 50.4478C281.288 48.9789 280.277 47.739 278.471 47.739H274.859V56.728ZM280.129 50.4478C280.129 51.4586 279.401 52.1594 278.336 52.1594H275.978V48.7363H278.336C279.401 48.7363 280.129 49.4371 280.129 50.4478ZM282.729 56.728H283.739V52.1189C284.036 51.5933 284.885 51.0812 285.505 51.0812C285.667 51.0812 285.788 51.0947 285.909 51.1217V50.084C285.02 50.084 284.265 50.5826 283.739 51.2699V50.2187H282.729V56.728ZM287.676 49.1271C288.053 49.1271 288.363 48.8172 288.363 48.4398C288.363 48.0625 288.053 47.766 287.676 47.766C287.312 47.766 287.002 48.0625 287.002 48.4398C287.002 48.8172 287.312 49.1271 287.676 49.1271ZM287.177 56.728H288.188V50.2187H287.177V56.728ZM289.827 53.4666C289.827 55.4073 291.134 56.8897 293.075 56.8897C294.26 56.8897 294.961 56.4045 295.46 55.7576L294.786 55.1377C294.355 55.7172 293.802 55.9867 293.128 55.9867C291.74 55.9867 290.878 54.9086 290.878 53.4666C290.878 52.0246 291.74 50.9599 293.128 50.9599C293.802 50.9599 294.355 51.216 294.786 51.809L295.46 51.189C294.961 50.5422 294.26 50.057 293.075 50.057C291.134 50.057 289.827 51.5394 289.827 53.4666ZM296.499 53.4666C296.499 55.5016 297.887 56.8897 299.814 56.8897C300.879 56.8897 301.755 56.5393 302.402 55.8924L301.917 55.2321C301.405 55.7576 300.65 56.0541 299.909 56.0541C298.507 56.0541 297.645 55.0299 297.564 53.8035H302.833V53.5475C302.833 51.5933 301.674 50.057 299.707 50.057C297.847 50.057 296.499 51.5799 296.499 53.4666ZM299.693 50.8926C301.176 50.8926 301.822 52.092 301.836 53.0623H297.564C297.618 52.065 298.305 50.8926 299.693 50.8926Z'
            fill='var(--rhino)'
          />
          <circle
            cx='224.417'
            cy='52.4611'
            r='11.9793'
            fill='var(--jungle-green-light)'
          />
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M216.556 52.4611C216.556 51.8409 217.216 51.3381 218.03 51.3381H230.804C231.619 51.3381 232.278 51.8409 232.278 52.4611C232.278 53.0814 231.619 53.5842 230.804 53.5842H218.03C217.216 53.5842 216.556 53.0814 216.556 52.4611Z'
            fill='var(--sheets)'
          />
          <circle
            cx='224.417'
            cy='52.4611'
            r='3.74352'
            fill='var(--jungle-green-light)'
            stroke='var(--sheets)'
            strokeWidth='1.49741'
          />
          <path
            d='M233.106 238.89L235.563 233.878C235.837 233.32 236.548 233.144 237.05 233.51L239.61 235.375C239.669 235.418 239.732 235.454 239.798 235.483L243.099 236.926C243.237 236.987 243.36 237.077 243.458 237.191L246.92 241.227L250.095 244.622C250.361 244.906 250.767 245.011 251.136 244.89L253.919 243.979C254.065 243.931 254.198 243.85 254.308 243.743L257.585 240.526C257.695 240.418 257.828 240.337 257.974 240.289L261.308 239.198L264.351 238.203C264.729 238.079 265.144 238.191 265.409 238.489L268.149 241.569C268.413 241.866 268.829 241.978 269.207 241.854L271.665 241.05C271.994 240.942 272.356 241.013 272.621 241.237L275.355 243.546C275.62 243.77 275.981 243.841 276.311 243.733L279.416 242.717L282.865 241.588C282.972 241.553 283.073 241.5 283.162 241.432L286.324 239.012C286.525 238.858 286.661 238.632 286.702 238.381L290.15 217.544C290.21 217.176 290.471 216.872 290.825 216.756L293.622 215.841C293.778 215.79 293.919 215.702 294.032 215.583L297.47 211.999L300.631 209.46C300.909 209.236 301.286 209.178 301.619 209.308L304.249 210.33C304.529 210.438 304.843 210.416 305.105 210.267L307.862 208.704C308.139 208.547 308.324 208.268 308.362 207.952L311.794 178.859C311.859 178.303 312.368 177.91 312.922 177.985L315.316 178.312C315.465 178.332 315.618 178.318 315.762 178.271L319.027 177.203C319.099 177.179 319.167 177.148 319.231 177.109L322.09 175.394C322.477 175.161 322.971 175.217 323.297 175.53L326.061 178.183C326.25 178.365 326.503 178.465 326.765 178.462L329.678 178.429C329.867 178.426 330.051 178.371 330.209 178.269L333.045 176.438C333.37 176.228 333.787 176.224 334.116 176.429L337.075 178.272C337.15 178.319 337.219 178.376 337.279 178.441L340.058 181.435C340.457 181.864 341.137 181.861 341.531 181.427L343.507 179.254C343.957 178.758 344.757 178.836 345.103 179.41L348.021 184.248L351.218 190.676C351.451 191.144 352.005 191.354 352.49 191.157L354.876 190.188C355.111 190.093 355.374 190.09 355.61 190.181L358.347 191.23C358.663 191.35 359.018 191.304 359.291 191.106L361.887 189.229C362.232 188.98 362.697 188.976 363.046 189.22L365.466 190.915C365.827 191.167 366.311 191.154 366.658 190.882L369.052 188.998C369.422 188.708 369.943 188.714 370.306 189.012L373.014 191.241C373.196 191.391 373.425 191.471 373.661 191.469L376.906 191.431L379.886 191.397C380.272 191.393 380.62 191.167 380.782 190.817L383.633 184.659C383.892 184.099 384.592 183.905 385.103 184.253L387.564 185.927C387.679 186.005 387.809 186.058 387.946 186.083L390.969 186.638C391.214 186.683 391.433 186.817 391.584 187.015L394.775 191.201C394.896 191.359 395.061 191.477 395.249 191.541L398.136 192.523C398.412 192.617 398.715 192.586 398.967 192.437L401.387 191.005C401.836 190.739 402.413 190.863 402.714 191.289L405.792 195.653L409.403 199.512L412.525 202.09C412.823 202.336 413.237 202.388 413.588 202.223L416.534 200.835C416.594 200.806 416.651 200.772 416.705 200.733L420.122 198.193C420.197 198.137 420.264 198.071 420.321 197.996L422.886 194.632C423.332 194.047 424.234 194.127 424.571 194.78L427.26 200.007C427.386 200.25 427.606 200.432 427.869 200.509L434.678 202.493L437.764 203.551C438.091 203.663 438.452 203.599 438.72 203.381L441.542 201.083C441.769 200.898 442.066 200.822 442.353 200.875L445.319 201.417C445.446 201.441 445.575 201.439 445.701 201.413L448.832 200.769C449.021 200.73 449.194 200.638 449.332 200.503L451.496 198.375C452.045 197.835 452.973 198.093 453.165 198.838L455.91 209.472C456.102 210.218 457.03 210.476 457.579 209.936L458.693 208.841C459.247 208.296 460.185 208.564 460.366 209.321L463.317 221.614C463.451 222.173 464.028 222.504 464.579 222.337L466.939 221.622C467.094 221.575 467.235 221.492 467.35 221.378L469.819 218.951C470.299 218.479 471.099 218.607 471.409 219.205L474.113 224.429C474.287 224.764 474.635 224.973 475.013 224.969L478.007 224.935L481.215 224.898C481.474 224.895 481.721 224.792 481.905 224.611L484.536 222.025C484.922 221.646 485.539 221.642 485.929 222.017L488.559 224.541C488.739 224.715 488.978 224.814 489.228 224.82L495.023 224.954C495.566 224.966 496 225.41 496 225.953V330C496 330.552 495.552 331 495 331H6C5.44772 331 5 330.552 5 330V207.029C5 206.321 5.85138 205.961 6.35922 206.454C6.6217 206.709 7.02362 206.754 7.33572 206.563L12.769 203.236C13.2215 202.959 13.8115 203.084 14.1135 203.52L17.6375 208.612L22.4566 213.887C22.5526 213.992 22.6251 214.117 22.6692 214.252L26.6561 226.492C26.8758 227.167 27.7084 227.404 28.251 226.947L29.3407 226.03C29.6358 225.781 30.0475 225.725 30.3987 225.885L33.9179 227.485C34.184 227.606 34.4897 227.605 34.7545 227.481L35.3101 227.222C35.9362 226.93 36.6627 227.346 36.7283 228.033L37.2163 233.154C37.307 234.106 38.5541 234.4 39.0602 233.588L40.1037 231.916C40.5294 231.233 41.5455 231.307 41.8681 232.044L44.0794 237.092C44.3751 237.768 45.2746 237.902 45.7545 237.342L47.9091 234.83C48.1646 234.532 48.571 234.412 48.9479 234.521L51.6598 235.312C51.8425 235.365 52.0367 235.365 52.2194 235.312L55.5503 234.341L59.0183 233.667C59.113 233.649 59.2098 233.644 59.3058 233.653L62.4118 233.955C62.6444 233.978 62.8776 233.918 63.0709 233.787L65.1739 232.357C65.7555 231.961 66.5528 232.274 66.7107 232.959L69.7764 246.267C69.8974 246.792 70.4127 247.127 70.9416 247.024L73.1406 246.597C73.4341 246.54 73.7376 246.617 73.9681 246.808L76.5595 248.948C76.9373 249.26 77.4856 249.252 77.8545 248.929L80.3266 246.768C80.629 246.503 81.0604 246.446 81.4218 246.621L83.8959 247.823C84.2285 247.985 84.623 247.95 84.9218 247.732L87.5615 245.808C87.8603 245.591 88.2548 245.556 88.5873 245.717L91.0983 246.937C91.4409 247.103 91.8482 247.061 92.1489 246.827L95.1699 244.479C95.2354 244.428 95.3069 244.385 95.383 244.352L98.751 242.88C98.8361 242.842 98.9156 242.794 98.9872 242.734L101.733 240.467C102.153 240.12 102.774 240.173 103.129 240.587L105.782 243.68C105.983 243.914 106.281 244.043 106.59 244.028L109.711 243.876L113.118 243.711C113.253 243.704 113.385 243.67 113.506 243.611L116.412 242.2C116.734 242.043 117.115 242.071 117.412 242.272L120.467 244.35C120.518 244.385 120.572 244.415 120.629 244.439L123.892 245.866C124.064 245.941 124.252 245.967 124.437 245.94L127.111 245.55C127.508 245.492 127.901 245.677 128.109 246.019L130.996 250.757C131.222 251.129 131.663 251.311 132.086 251.209L134.987 250.504L138.128 249.283C138.423 249.168 138.756 249.201 139.024 249.37L141.35 250.839C141.779 251.11 141.828 251.717 141.447 252.052L141.307 252.175C140.715 252.697 141.27 253.656 142.018 253.401C142.142 253.359 142.276 253.351 142.405 253.379L145.819 254.126L148.456 254.702C148.994 254.82 149.526 254.48 149.646 253.943L152.581 240.748C152.764 239.923 153.824 239.683 154.345 240.348L156.288 242.83C156.512 243.116 156.874 243.258 157.233 243.201L160.262 242.717L163.873 241.794L166.913 241.017C167.265 240.927 167.638 241.035 167.888 241.299L170.69 244.264C170.939 244.528 171.312 244.636 171.664 244.546L174.109 243.921C174.475 243.828 174.861 243.948 175.109 244.232L177.911 247.433C178.159 247.717 178.546 247.836 178.911 247.743L181.926 246.972L185.38 246.09C185.484 246.063 185.583 246.02 185.674 245.962L189.148 243.723L192.351 241.119C192.606 240.911 192.947 240.842 193.262 240.935L195.869 241.696C196.218 241.798 196.594 241.703 196.852 241.448L207.009 231.42C207.135 231.295 207.292 231.206 207.464 231.163L210.812 230.307L214.147 229.257C214.327 229.201 214.488 229.094 214.61 228.95L217.144 225.963C217.584 225.446 218.4 225.507 218.757 226.084L221.258 230.125C221.488 230.496 221.933 230.676 222.356 230.567L224.504 230.018C224.946 229.905 225.409 230.106 225.628 230.506L228.802 236.292C228.845 236.369 228.897 236.44 228.957 236.503L231.487 239.142C231.967 239.644 232.801 239.514 233.106 238.89Z'
            fill='var(--jungle-green)'
            fillOpacity='0.1'
            stroke='var(--jungle-green)'
            strokeWidth='1.16594'
          />
          <path
            d='M267.855 198.61L265.443 187.026C265.257 186.129 264.062 185.934 263.6 186.726L261.363 190.564C261.322 190.635 261.273 190.7 261.217 190.758L257.84 194.234C257.742 194.335 257.666 194.456 257.618 194.588L254.08 204.299L250.959 212.157C250.714 212.775 249.946 212.986 249.419 212.58L247.064 210.765C246.929 210.662 246.824 210.526 246.756 210.37L243.351 202.499C243.283 202.343 243.178 202.207 243.043 202.104L239.692 199.521L237.096 197.521C236.564 197.111 235.787 197.331 235.55 197.96L232.893 204.993C232.655 205.621 231.879 205.842 231.347 205.432L229.765 204.213C229.267 203.829 228.543 203.994 228.261 204.556L225.763 209.525C225.481 210.086 224.757 210.251 224.259 209.868L221.584 207.806L218.137 205.15C218.029 205.067 217.939 204.963 217.873 204.843L215.74 201C215.282 200.175 214.04 200.385 213.88 201.315L211.033 217.837C210.905 218.579 210.034 218.919 209.437 218.459L207.355 216.854C207.214 216.746 207.105 216.603 207.039 216.439L203.53 207.825L200.524 202.139C200.218 201.56 199.448 201.427 198.965 201.869L197.122 203.554C196.686 203.953 196.001 203.889 195.647 203.416L192.743 199.54C192.713 199.5 192.686 199.457 192.662 199.412L189.48 193.47C189.253 193.044 188.753 192.842 188.293 192.99L185.957 193.74C185.644 193.84 185.301 193.78 185.041 193.58L181.985 191.225C181.906 191.164 181.836 191.092 181.779 191.01L179.273 187.468C178.824 186.835 177.856 186.931 177.542 187.641L174.915 193.579C174.751 193.95 174.379 194.185 173.974 194.174L171.555 194.109C171.228 194.1 170.926 193.932 170.746 193.659L168.243 189.853C167.852 189.258 166.982 189.251 166.581 189.839L163.875 193.808C163.833 193.869 163.798 193.935 163.771 194.004L161.141 200.675C160.807 201.523 159.606 201.519 159.278 200.669L157.716 196.623C157.366 195.715 156.056 195.792 155.815 196.735L152.979 207.806L149.74 223.138C149.578 223.905 148.637 224.196 148.071 223.654L146.429 222.085C146.051 221.723 145.457 221.715 145.069 222.065L143.058 223.879C142.588 224.303 141.847 224.189 141.526 223.643L139.385 219.997C139.002 219.344 138.06 219.338 137.668 219.985L135.831 223.013C135.43 223.674 134.463 223.649 134.096 222.969L132.215 219.486C131.833 218.779 130.815 218.788 130.447 219.503L127.992 224.259C127.816 224.6 127.46 224.81 127.077 224.8L124.094 224.72L121.283 224.644C120.815 224.631 120.419 224.296 120.328 223.837L117.36 208.74C117.186 207.85 116.011 207.634 115.531 208.403L113.427 211.773C113.319 211.945 113.161 212.081 112.975 212.161L110.066 213.417C109.802 213.531 109.6 213.753 109.511 214.027L106.132 224.462C106.072 224.648 105.959 224.813 105.806 224.935L103.252 226.98C102.805 227.338 102.149 227.248 101.814 226.782L100.005 224.261C99.5206 223.587 98.4728 223.762 98.2345 224.557L95.2077 234.66L91.5969 243.746L88.6486 249.479C88.3286 250.101 87.4849 250.211 87.0165 249.691L84.4475 246.841C84.3996 246.788 84.3575 246.729 84.322 246.667L80.8159 240.531C80.7819 240.472 80.754 240.409 80.7328 240.343L78.2928 232.808C77.9784 231.837 76.5825 231.905 76.3645 232.902L73.6278 245.424C73.5734 245.672 73.4264 245.891 73.2167 246.035L66.3217 250.767L63.661 252.915C63.1697 253.311 62.4383 253.159 62.1463 252.599L59.5296 247.584C59.2875 247.12 58.7284 246.921 58.2476 247.128L55.9095 248.135C55.6428 248.249 55.3393 248.243 55.078 248.116L52.2133 246.728C51.9975 246.624 51.8264 246.445 51.7313 246.225L49.768 241.68C49.3608 240.738 47.9678 240.948 47.8559 241.968L45.0693 267.392C44.9575 268.413 43.5644 268.622 43.1573 267.68L42.5698 266.32C42.1611 265.374 40.7615 265.59 40.657 266.615L37.6103 296.503C37.5325 297.267 36.6594 297.662 36.0348 297.216L34.0519 295.802C33.9035 295.696 33.7868 295.552 33.7146 295.384L31.4435 290.128C31.0584 289.236 29.7573 289.361 29.5488 290.31L26.781 302.898C26.678 303.367 26.2569 303.696 25.7774 303.683L22.9928 303.608L20.02 303.528C19.6309 303.517 19.2833 303.282 19.129 302.925L16.6785 297.253C16.3325 296.452 15.1989 296.447 14.846 297.245L12.4086 302.755C12.2564 303.099 11.924 303.329 11.5484 303.349L5.9457 303.654C5.4153 303.683 5 304.121 5 304.653V330C5 330.552 5.4477 331 5.99999 331H495C495.552 331 496 330.552 496 330V37.9103C496 37.1675 494.984 36.9551 494.686 37.6357C494.471 38.1273 493.801 38.1926 493.495 37.7518L488.616 30.7179C488.137 30.0275 487.072 30.1997 486.835 31.0058L483.362 42.8203L478.44 55.508C478.412 55.5804 478.392 55.6558 478.382 55.7327L474.324 85.0681C474.189 86.0397 472.882 86.2572 472.44 85.3814L471.822 84.1551C471.508 83.5341 470.673 83.4146 470.198 83.9229L467.367 86.9538C466.988 87.3603 466.342 87.3563 465.968 86.9451C465.395 86.3158 464.347 86.6972 464.312 87.5477L463.772 100.909C463.725 102.055 462.099 102.234 461.806 101.124L461.03 98.1972C460.757 97.1662 459.275 97.2218 459.08 98.2704L456.951 109.715C456.765 110.716 455.377 110.831 455.029 109.875L453.113 104.615C452.889 104.001 452.146 103.763 451.607 104.133L449.626 105.492C449.285 105.726 448.836 105.726 448.495 105.492L445.521 103.452C445.474 103.419 445.423 103.391 445.371 103.367L442.147 101.892C441.947 101.8 441.723 101.777 441.508 101.826L438.922 102.418C438.507 102.513 438.077 102.334 437.851 101.973L436.175 99.2882C435.669 98.4783 434.424 98.7702 434.331 99.7205L431.143 132.306C431.076 132.99 430.356 133.404 429.732 133.118L428.264 132.447C427.778 132.225 427.204 132.424 426.959 132.899L424.7 137.292C424.323 138.025 423.271 138.013 422.911 137.271L420.834 132.994C420.521 132.35 419.652 132.233 419.181 132.772L417.48 134.719C417.03 135.234 416.207 135.155 415.863 134.564L413.654 130.774C413.309 130.183 412.487 130.104 412.037 130.619L410.285 132.623C409.828 133.146 408.989 133.054 408.655 132.444L405.797 127.213C405.753 127.134 405.7 127.061 405.637 126.996L402.225 123.483C402.156 123.412 402.098 123.332 402.053 123.244L399.556 118.389C399.157 117.614 398.026 117.685 397.727 118.504L395.169 125.527C395.011 125.961 394.575 126.23 394.116 126.178L391.289 125.854L388.062 125.485C387.815 125.457 387.587 125.338 387.423 125.15L384.954 122.326C384.513 121.821 383.709 121.885 383.353 122.455L380.513 127.003C380.475 127.063 380.431 127.119 380.382 127.17L377.288 130.356C377.018 130.633 376.612 130.73 376.246 130.605L374.257 129.922C373.706 129.733 373.11 130.053 372.964 130.618L369.952 142.258C369.787 142.897 369.06 143.203 368.488 142.876L366.11 141.516C366.046 141.479 365.986 141.436 365.931 141.386L363.259 138.941C362.808 138.528 362.096 138.613 361.754 139.12L359.112 143.05C358.914 143.345 358.887 143.722 359.041 144.042L360.653 147.389C361.076 148.267 360.016 149.111 359.255 148.502C358.973 148.276 358.585 148.237 358.264 148.402L355.181 149.989L352.229 151.508C351.838 151.71 351.361 151.632 351.054 151.316L349.106 149.311C348.584 148.773 347.677 148.98 347.44 149.692L344.677 158.001C344.498 158.54 343.907 158.822 343.376 158.622L340.824 157.662C340.767 157.64 340.712 157.614 340.66 157.583L337.127 155.456L334.523 153.889C333.995 153.571 333.309 153.802 333.079 154.373L330.343 161.191C330.114 161.762 329.427 161.993 328.9 161.675L327.328 160.729C326.792 160.406 326.093 160.651 325.875 161.238L323.104 168.693C322.886 169.28 322.188 169.524 321.651 169.201L319.074 167.65L315.657 165.594C315.529 165.517 315.42 165.412 315.338 165.287L311.852 160L308.764 154.087C308.486 153.555 307.806 153.386 307.311 153.726L304.805 155.451C304.649 155.558 304.527 155.707 304.452 155.881L294.25 179.703C294.011 180.261 293.335 180.479 292.815 180.166L290.188 178.585L286.82 176.09C286.662 175.973 286.541 175.811 286.474 175.625L284.057 168.915C283.724 167.992 282.398 168.051 282.149 169L279.695 178.336C279.525 178.981 278.784 179.283 278.212 178.939L276.922 178.163C276.341 177.813 275.587 178.131 275.433 178.793L272.152 192.874C272.14 192.926 272.124 192.976 272.104 193.024L269.76 198.783C269.388 199.698 268.056 199.577 267.855 198.61Z'
            fill='#8358FF'
            fillOpacity='0.1'
            stroke='#8358FF'
            strokeWidth='1.16594'
          />
        </g>
        <defs>
          <filter
            id='filter0_dd'
            x='0'
            y='0'
            width='500'
            height='340'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'
          >
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feColorMatrix
              in='SourceAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            />
            <feOffset dy='2' />
            <feGaussianBlur stdDeviation='4' />
            <feColorMatrix
              type='matrix'
              values='0 0 0 0 0.232639 0 0 0 0 0.328333 0 0 0 0 0.416667 0 0 0 0.03 0'
            />
            <feBlend
              mode='normal'
              in2='BackgroundImageFix'
              result='effect1_dropShadow'
            />
            <feColorMatrix
              in='SourceAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            />
            <feOffset dy='1' />
            <feGaussianBlur stdDeviation='1' />
            <feColorMatrix
              type='matrix'
              values='0 0 0 0 0.231373 0 0 0 0 0.329412 0 0 0 0 0.415686 0 0 0 0.03 0'
            />
            <feBlend
              mode='normal'
              in2='effect1_dropShadow'
              result='effect2_dropShadow'
            />
            <feBlend
              mode='normal'
              in='SourceGraphic'
              in2='effect2_dropShadow'
              result='shape'
            />
          </filter>
          <filter
            id='filter1_f'
            x='4.29794'
            y='0.800529'
            width='214.13'
            height='128.028'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'
          >
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feBlend
              mode='normal'
              in='SourceGraphic'
              in2='BackgroundImageFix'
              result='shape'
            />
            <feGaussianBlur
              stdDeviation='22.4611'
              result='effect1_foregroundBlur'
            />
          </filter>
          <filter
            id='filter2_d'
            x='2.05181'
            y='7.53886'
            width='219.37'
            height='104.819'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'
          >
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feColorMatrix
              in='SourceAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            />
            <feOffset dy='7.48705' />
            <feGaussianBlur stdDeviation='14.9741' />
            <feColorMatrix
              type='matrix'
              values='0 0 0 0 0.476616 0 0 0 0 0.521707 0 0 0 0 0.620087 0 0 0 0.06 0'
            />
            <feBlend
              mode='normal'
              in2='BackgroundImageFix'
              result='effect1_dropShadow'
            />
            <feBlend
              mode='normal'
              in='SourceGraphic'
              in2='effect1_dropShadow'
              result='shape'
            />
          </filter>
          <filter
            id='filter3_f'
            x='177.249'
            y='0.800529'
            width='169.207'
            height='128.028'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'
          >
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feBlend
              mode='normal'
              in='SourceGraphic'
              in2='BackgroundImageFix'
              result='shape'
            />
            <feGaussianBlur
              stdDeviation='22.4611'
              result='effect1_foregroundBlur'
            />
          </filter>
          <filter
            id='filter4_d'
            x='170.51'
            y='7.53886'
            width='180.438'
            height='104.819'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'
          >
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feColorMatrix
              in='SourceAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            />
            <feOffset dy='7.48705' />
            <feGaussianBlur stdDeviation='14.9741' />
            <feColorMatrix
              type='matrix'
              values='0 0 0 0 0.476616 0 0 0 0 0.521707 0 0 0 0 0.620087 0 0 0 0.06 0'
            />
            <feBlend
              mode='normal'
              in2='BackgroundImageFix'
              result='effect1_dropShadow'
            />
            <feBlend
              mode='normal'
              in='SourceGraphic'
              in2='effect1_dropShadow'
              result='shape'
            />
          </filter>
        </defs>
      </svg>
    )
  }
]
