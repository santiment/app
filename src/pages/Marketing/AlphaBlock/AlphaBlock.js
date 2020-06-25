import React from 'react'
import { connect } from 'react-redux'
import { checkIsProState } from '../../../utils/account'
import ProPriceDivergenceCard from '../ProTemplateCard/ProPriceDivergenceCard'
import TokenDistributionCard from '../TokenDistributionCard/TokenDistributionCard'
import styles from './AlphaBlock.module.scss'

const AlphaBlock = ({ classes = {}, isProSanbase }) => {
  return (
    <>
      <div className={classes.description}>
        A growing collection of in-house strategies and new approaches to market
        analysis developed by the Santiment team. New Alphas added weekly!
      </div>

      <div className={styles.cards}>
        <ProPriceDivergenceCard isPro={isProSanbase} />

        <TokenDistributionCard isPro={isProSanbase} />
      </div>
    </>
  )
}

const mapStateToProps = state => checkIsProState(state)

export default connect(mapStateToProps)(AlphaBlock)
