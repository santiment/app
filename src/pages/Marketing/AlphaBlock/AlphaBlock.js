import React from 'react'
import cx from 'classnames'
import ProPriceDivergenceCard from '../ProTemplateCard/ProPriceDivergenceCard'
import TokenDistributionCard from '../TokenDistributionCard/TokenDistributionCard'
import { useUserSubscriptionStatus } from '../../../stores/user/subscriptions'
import styles from './AlphaBlock.module.scss'

const AlphaBlock = ({ classes = {} }) => {
  const { isPro } = useUserSubscriptionStatus()

  return (
    <>
      <div className={cx(classes.description, styles.description)}>
        A growing collection of in-house strategies and new approaches to market
        analysis developed by the Santiment team. New Alphas added weekly!
      </div>

      <div className={styles.cards}>
        <ProPriceDivergenceCard isPro={isPro} />

        <TokenDistributionCard isPro={isPro} />
      </div>
    </>
  )
}

export default AlphaBlock
