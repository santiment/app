import React from 'react'
import { connect } from 'react-redux'
import { checkIsProState } from '../../../utils/account'
import ProTemplateCard from '../ProTemplateCard/ProTemplateCard'

const AlphaBlock = ({ classes = {}, isProSanbase }) => {
  return (
    <>
      <div className={classes.description}>
        A growing collection of in-house strategies and new approaches to market
        analysis developed by the Santiment team. New Alphas added weekly!
      </div>

      <ProTemplateCard isPro={isProSanbase} />
    </>
  )
}

const mapStateToProps = state => checkIsProState(state)

export default connect(mapStateToProps)(AlphaBlock)
