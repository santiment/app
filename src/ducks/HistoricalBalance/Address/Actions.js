import React from 'react'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import CreateAlert from './CreateAlert'
import AddToWatchlist from './AddToWatchlist'
import ActionsMenu from '../../../components/ActionsMenu'
import styles from './index.module.scss'

const CreateAlertTrigger = ({ className, assets, address, isWithIcon }) => (
  <CreateAlert
    assets={assets}
    address={address}
    trigger={
      isWithIcon ? (
        <Button className={styles.btn}>
          <Icon type='signal' className={styles.btn__icon} /> Create Alert
        </Button>
      ) : (
        <div className={className}>Create Alert</div>
      )
    }
  />
)

const Actions = ({ address, infrastructure, assets }) => (
  <div className={styles.actions}>
    <ActionsMenu
      Trigger={props => (
        <CreateAlertTrigger {...props} assets={assets} address={address} />
      )}
    >
      <CreateAlertTrigger assets={assets} address={address} isWithIcon />
      <AddToWatchlist address={address} infrastructure={infrastructure} />
    </ActionsMenu>
  </div>
)

export default Actions
