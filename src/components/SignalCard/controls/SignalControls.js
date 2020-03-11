import React from 'react'
import cx from 'classnames'
import { Button, Icon } from '@santiment-network/ui'
import { Link } from 'react-router-dom'
import {
  DAILY_ACTIVE_ADDRESSES,
  ETH_WALLET,
  METRIC_TYPES,
  PRICE_ABSOLUTE_CHANGE,
  PRICE_PERCENT_CHANGE,
  PRICE_VOLUME_DIFFERENCE,
  SIGNAL_METRIC_TYPES
} from '../../../ducks/Signals/utils/constants'
import styles from './SignalControls.module.scss'

const getIconStyles = (type, metric) => {
  switch (type) {
    case METRIC_TYPES.METRIC_SIGNAL: {
      if (metric === SIGNAL_METRIC_TYPES.active_addresses_24h) {
        return ['connection', styles.iconConnection]
      } else {
        return ['finance', styles.iconFinance]
      }
    }
    case PRICE_VOLUME_DIFFERENCE:
    case PRICE_ABSOLUTE_CHANGE:
    case PRICE_PERCENT_CHANGE: {
      return ['finance', styles.iconFinance]
    }
    case METRIC_TYPES.WALLET_MOVEMENT:
    case ETH_WALLET:
    case DAILY_ACTIVE_ADDRESSES: {
      return ['connection', styles.iconConnection]
    }
    default: {
      return ['social', styles.iconSocial]
    }
  }
}

export const SignalTypeIcon = ({ type, metric, className }) => {
  const [icon, iconClass] = getIconStyles(type, metric)

  return (
    <div className={cx(iconClass, className)}>
      <Icon type={icon} />
    </div>
  )
}

export const SettingsSignalButton = ({ id }) => (
  <Button variant='ghost'>
    <Link to={`/sonar/signal/${id}/edit`}>
      <Icon type='settings' />
    </Link>
  </Button>
)
