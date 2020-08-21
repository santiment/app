import React from 'react'
import cx from 'classnames'
import UpgradeBtn from '../../../../components/UpgradeBtn/UpgradeBtn'
import Panel from '@santiment-network/ui/Panel/Panel'
import proIcon from './../../../../assets/feed/pro-icon.svg'
import { useUserSubscriptionStatus } from '../../../../stores/user/subscriptions'
import styles from './MakeProSubscriptionCard.module.scss'

const MakeProSubscriptionCard = ({ classes = {} }) => {
  const { loading, isPro } = useUserSubscriptionStatus
  if (loading) {
    return 'Loading...'
  }
  if (isPro) {
    return null
  }

  return (
    <Panel padding className={cx(styles.card, classes.card)}>
      <div className={styles.center}>
        <img src={proIcon} alt='pro-icon' className={styles.icon} />

        <div className={styles.content}>
          <div className={styles.title}>Go PRO and get more data</div>
          <div className={styles.description}>
            Unlimited metrics, all types of alerts, handcrafted report and much
            more
          </div>
        </div>
      </div>

      <div className={styles.right}>
        <UpgradeBtn className={styles.upgrade} variant='fill' />
      </div>
    </Panel>
  )
}

export default MakeProSubscriptionCard
