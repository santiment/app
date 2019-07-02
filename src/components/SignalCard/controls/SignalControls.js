import React from 'react'
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

export const RemoveSignalButton = ({
  id,
  removeSignal,
  redirect,
  className
}) => (
  <DeleteDialog
    id={id}
    title='Do you want to delete this trigger?'
    deleteItem={removeSignal}
    redirect={redirect}
    trigger={
      <Button variant='ghost' type='button' className={className}>
        <Icon type='remove' />
      </Button>
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
