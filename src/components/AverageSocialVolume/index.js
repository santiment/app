import React from 'react'
import HelpPopup from '../HelpPopup/HelpPopup'
import Content from './Content'
import PaywallBanner from './PaywallBanner'
import styles from './index.module.scss'
import stylesTooltip from '../../components/HelpPopup/HelpPopup.module.scss'

const AverageSocialVolume = ({ hasPremium, ...props }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h3 className={styles.title}>Average, 30d</h3>
        <HelpPopup>
          <h4 className={stylesTooltip.title}>Average Social Volume</h4>
          The average number of daily mentions in the past 30 days
        </HelpPopup>
      </div>
      {hasPremium && <Content {...props} />}
      {hasPremium === false && <PaywallBanner />}
    </div>
  )
}

export default AverageSocialVolume
