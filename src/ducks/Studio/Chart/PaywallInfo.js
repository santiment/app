import React from 'react'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import Tooltip from '@santiment-network/ui/Tooltip'
import UpgradeBtn from '../../../components/UpgradeBtn/UpgradeBtn'
import styles from './PaywallInfo.module.scss'

export default () => {
  return (
    <Tooltip
      trigger={
        <Button className={styles.btn}>
          <Icon className={styles.icon} type='question-round-small' />
          Why the gaps?
        </Button>
      }
    >
      <div className={styles.content}>
        <h2 className={styles.title}>Why those data is hidden?</h2>
        <p className={styles.text}>
          To unlock the full potential of Santiment metrics you need to upgrade
          your account to PRO
        </p>
        <UpgradeBtn variant='fill' fluid className={styles.upgrade} />
      </div>
    </Tooltip>
  )
}
