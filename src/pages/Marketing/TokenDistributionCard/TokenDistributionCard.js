import React from 'react'
import pdfFile from './../../../assets/report-3.pdf'
import ShareModalTrigger from '../../../components/Share/ShareModalTrigger'
import styles from './TokenDistributionCard.module.scss'

const TokenDistributionCard = ({ isPro }) => {
  const linkProps = {
    href: isPro ? pdfFile : '/pricing',
    rel: 'noopener noreferrer',
    target: isPro ? '_blank' : '_self'
  }

  console.log(window.location.href + pdfFile)

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

      {isPro && (
        <div className={styles.shareBlock}>
          <ShareModalTrigger
            dialogTitle='Share'
            className={styles.shareBtn}
            shareLink={window.location.origin + pdfFile}
            border={false}
          />
        </div>
      )}
    </div>
  )
}

export default TokenDistributionCard
