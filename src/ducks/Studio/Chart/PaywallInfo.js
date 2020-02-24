import React from 'react'
import { connect } from 'react-redux'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import Tooltip from '@santiment-network/ui/Tooltip'
import UpgradeBtn from '../../../components/UpgradeBtn/UpgradeBtn'
import { getCurrentSanbaseSubscription } from '../../../utils/plans'
import styles from './PaywallInfo.module.scss'

const checkHasBoundaries = ({ leftBoundaryDate: a, rightBoundaryDate: b }) =>
  a || b

const PaywallInfo = ({ boundaries, subscription }) => {
  if (subscription && new Date(subscription.trialEnd) > new Date()) {
    return <UpgradeBtn variant='fill' fluid className={styles.upgrade_trial} />
  }

  return (
    checkHasBoundaries(boundaries) && (
      <Tooltip
        trigger={
          <Button className={styles.btn}>
            <Icon className={styles.icon} type='question-round-small' />
            Why the gaps?
          </Button>
        }
        className={styles.tooltip}
      >
        <div className={styles.content}>
          <h2 className={styles.title}>Why is some data hidden?</h2>
          <p className={styles.text}>
            To unlock the full potential of Santiment metrics you need to
            upgrade your account to PRO
          </p>
          <UpgradeBtn variant='fill' fluid className={styles.upgrade} />
        </div>
      </Tooltip>
    )
  )
}

const mapStateToProps = state => ({
  subscription: getCurrentSanbaseSubscription(state.user.data)
})

export default connect(mapStateToProps)(PaywallInfo)
