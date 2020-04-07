import React from 'react'
import Settings from '../Settings'
import Label from '@santiment-network/ui/Label'
import Toggle from '@santiment-network/ui/Toggle'
import styles from './AffilateSettings.module.scss'

const AffilateSettings = () => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Settings id='affilate' header='Referral link'>
          <Settings.Row>
            <div className={styles.setting__left}>
              Your Sanbase referral link
            </div>
          </Settings.Row>
        </Settings>
      </div>
      <div className={styles.right}>
        <Settings id='affilate-statistics' header='Statistics'>
          <Settings.Row>
            <div className={styles.setting__left}>Clicks</div>
          </Settings.Row>
        </Settings>
      </div>
    </div>
  )
}

export default AffilateSettings
