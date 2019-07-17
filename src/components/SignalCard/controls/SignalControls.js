import React, { Fragment } from 'react'
import { Button, Icon } from '@santiment-network/ui'
import { Link } from 'react-router-dom'
import {
  DAILY_ACTIVE_ADDRESSES,
  ETH_WALLET,
  PRICE_ABSOLUTE_CHANGE,
  PRICE_PERCENT_CHANGE,
  PRICE_VOLUME_DIFFERENCE
} from '../../../ducks/Signals/utils/constants'
import DeleteDialog from '../../DeleteDialog/DeleteDialog'
import styles from './SignalControls.module.scss'

const getIconStyles = type => {
  switch (type) {
    case PRICE_VOLUME_DIFFERENCE:
    case PRICE_ABSOLUTE_CHANGE:
    case PRICE_PERCENT_CHANGE: {
      return ['finance', styles.iconFinance]
    }
    case ETH_WALLET:
    case DAILY_ACTIVE_ADDRESSES: {
      return ['connection', styles.iconConnection]
    }
    default: {
      return ['social', styles.iconSocial]
    }
  }
}

export const SignalTypeIcon = ({ type }) => {
  const [icon, className] = getIconStyles(type)

  return (
    <div className={className}>
      <Icon type={icon} />
    </div>
  )
}

const RemoveDescription = title => {
  return (
    <Fragment>
      Are you sure you want to delete{' '}
      <span className={styles.title}>{title}</span> ?
    </Fragment>
  )
}

export const RemoveSignalButton = ({
  id,
  signalTitle = 'trigger',
  removeSignal,
  redirect,
  className,
  trigger
}) => (
  <DeleteDialog
    id={id}
    title='Delete trigger'
    description={RemoveDescription(signalTitle)}
    deleteItem={removeSignal}
    redirect={redirect}
    trigger={
      trigger || (
        <Button variant='ghost' type='button' className={className}>
          <Icon type='remove' />
        </Button>
      )
    }
  />
)

export const SettingsSignalButton = ({ id }) => (
  <Button variant='ghost'>
    <Link to={`/sonar/feed/details/${id}/edit`}>
      <Icon type='settings' />
    </Link>
  </Button>
)
