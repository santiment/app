import React from 'react'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import CreateAlert from './CreateAlert'
import AddToWatchlist from './AddToWatchlist'
import styles from './index.module.scss'

const Actions = ({ address, infrastructure, assets }) => (
  <div className={styles.actions}>
    <CreateAlert
      assets={assets}
      address={address}
      trigger={
        <Button className={styles.btn}>
          <Icon type='signal' className={styles.btn__icon} />
          Create Alert
        </Button>
      }
    />

    <div className={styles.divider} />

    <AddToWatchlist address={address} infrastructure={infrastructure} />
  </div>
)

export default Actions
