import React from 'react'
import { connect } from 'react-redux'
import cx from 'classnames'
import Label from '@santiment-network/ui/Label'
import { checkIsProState } from '../../../utils/account'
import ProTemplateCard from '../ProTemplateCard/ProTemplateCard'
import styles from './AlphaBlock.module.scss'

const AlphaBlock = ({ classes = {}, isProSanbase }) => {
  return (
    <div>
      <div className={cx(classes.subTitle, styles.title)}>
        Alpha
        {!isProSanbase && (
          <Label className={styles.proLabel} variant='fill' accent='texas-rose'>
            Pro
          </Label>
        )}
      </div>
      <div className={classes.description}>
        A growing collection of in-house strategies and new approaches to market
        analysis developed by the Santiment team. New Alphas added weekly!
      </div>

      <ProTemplateCard isPro={isProSanbase} />
    </div>
  )
}

const mapStateToProps = state => checkIsProState(state)

export default connect(mapStateToProps)(AlphaBlock)
