import React from 'react'
import Icon from '@santiment-network/ui/Icon'
import PriceHistogram from './PriceHistogram'
import SocialContext from './SocialContext'
import styles from './index.module.scss'

const Components = {
  'Spent coin cost': PriceHistogram,
  'Social Context': SocialContext
}

export default ({ advancedView, toggleAdvancedView, ...rest }) => {
  const El = Components[advancedView]
  return (
    <>
      <div className={styles.toggle} onClick={() => toggleAdvancedView()}>
        {El.Icon} <Icon type='arrow-right' className={styles.arrow} />
      </div>

      <El {...rest} />
    </>
  )
}
