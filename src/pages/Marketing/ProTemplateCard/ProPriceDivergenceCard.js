import React from 'react'
import styles from './ProPriceDivergenceCard.module.scss'

const Img = (
  <svg
    className={styles.img}
    width='368'
    height='125'
    viewBox='0 0 368 125'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      opacity='0.2'
      d='M270.376 1C313.904 0.999928 320.152 58.4077 367 83.6667V125H1V69.7812C27.352 97.3368 53.704 14.7419 82.984 44.5938C109.523 71.6515 115.704 28.016 141.544 23.963C170.824 19.3704 167.896 26.2596 194.248 30.8522C226.586 36.488 235.24 1.00006 270.376 1Z'
      fill='url(#paint0_linear)'
    />
    <path
      d='M367 83.6667C320.152 58.4077 313.904 0.999928 270.376 1C235.24 1.00006 226.586 37.6358 194.248 32C167.896 27.4074 170.824 19.3704 141.544 23.963C115.704 28.016 109.523 71.6515 82.984 44.5938C53.704 14.7419 27.352 97.3368 1.00002 69.7813'
      stroke='var(--lima)'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      opacity='0.2'
      d='M97.624 42.3333C54.0961 42.3333 47.848 80.6052 1 97.4444V125H367V5.59259C340.648 23.963 314.296 62.2348 285.016 82.136C258.477 100.175 252.296 60.344 226.456 57.642C197.176 54.5802 200.104 77.5434 173.752 80.6052C141.414 84.3623 132.76 42.3334 97.624 42.3333Z'
      fill='url(#paint1_linear)'
    />
    <path
      d='M1 97.4444C47.848 80.6052 54.0961 42.3333 97.624 42.3333C132.76 42.3334 141.414 84.3623 173.752 80.6052C200.104 77.5434 197.176 54.5802 226.456 57.642C252.296 60.344 258.477 100.175 285.016 82.136C314.296 62.2348 340.648 23.963 367 5.59259'
      stroke='var(--rhino)'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <circle opacity='0.3' cx='326.5' cy='44.5' r='6.5' fill='var(--lima)' />
    <circle opacity='0.3' cx='83.5' cy='44.5' r='6.5' fill='var(--lima)' />
    <circle
      opacity='0.3'
      cx='113.5'
      cy='44.5'
      r='6.5'
      fill='var(--persimmon)'
    />
    <path
      d='M86.25 44.425C86.25 45.8871 85.0342 47.1 83.5 47.1C81.9658 47.1 80.75 45.8871 80.75 44.425C80.75 42.9629 81.9658 41.75 83.5 41.75C85.0342 41.75 86.25 42.9629 86.25 44.425Z'
      fill='white'
      stroke='var(--lima)'
      strokeWidth='1.5'
    />
    <path
      d='M116.25 44.425C116.25 45.8871 115.034 47.1 113.5 47.1C111.966 47.1 110.75 45.8871 110.75 44.425C110.75 42.9629 111.966 41.75 113.5 41.75C115.034 41.75 116.25 42.9629 116.25 44.425Z'
      fill='white'
      stroke='var(--persimmon)'
      strokeWidth='1.5'
    />
    <path
      d='M329.25 44.425C329.25 45.8871 328.034 47.1 326.5 47.1C324.966 47.1 323.75 45.8871 323.75 44.425C323.75 42.9629 324.966 41.75 326.5 41.75C328.034 41.75 329.25 42.9629 329.25 44.425Z'
      fill='white'
      stroke='var(--lima)'
      strokeWidth='1.5'
    />
    <defs>
      <linearGradient
        id='paint0_linear'
        x1='184'
        y1='1'
        x2='184'
        y2='125'
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='var(--lima)' />
        <stop offset='1' stopColor='white' stopOpacity='0' />
      </linearGradient>
      <linearGradient
        id='paint1_linear'
        x1='184'
        y1='42.3333'
        x2='184'
        y2='125'
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='var(--rhino)' />
        <stop offset='1' stopColor='white' stopOpacity='0' />
      </linearGradient>
    </defs>
  </svg>
)

const ProPriceDivergenceCard = ({ isPro }) => {
  const linkProps = {
    href: isPro
      ? 'https://docs.google.com/spreadsheets/u/1/d/1Wu-d_uBuvLp3FoNqz3azzbNzFr8Zaw2n6bcLLsQxNGc/view'
      : '/pricing',
    rel: 'noopener noreferrer',
    target: isPro ? '_blank' : '_self'
  }

  return (
    <div className={styles.card}>
      <div className={styles.info}>
        <a className={styles.title} {...linkProps}>
          Price - Daily Addresses Divergence
        </a>
        <div className={styles.description}>
          Tracks the relationship between Bitcoin’s price and the number of
          addresses interacting with BTC daily.
          <div className={styles.block}>
            When the price pushes up while the amount of active addresses
            declines, the model triggers a ‘SELL’ signal - and vice versa.
            Historically, strong divergences in these metrics earmarked
            opportune Buy/Sell levels.
          </div>
        </div>
      </div>

      {Img}
    </div>
  )
}

export default ProPriceDivergenceCard
