import React from 'react'
import styles from './TokenDistributionCard.module.scss'

const TokenDistributionCard = ({ isPro }) => {
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
          Token Distribution Report
        </a>
        <div className={styles.description}>
          In theory, a ‘healthy’ token should be broadly distributed across the
          project’s network/addresses, and relatively sparse in exchange and
          ‘whale’ wallets.
          <div className={styles.block}>
            This report calculates the top 15 most concentrated and 15 most
            distributed ERC-20 tokens at the moment, and compares the
            performance of the two portfolios over time.
          </div>
        </div>
      </div>
    </div>
  )
}

export default TokenDistributionCard
