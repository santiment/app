import React from 'react'
import { Button, Icon } from '@santiment-network/ui'
import styles from './SignalControls.module.scss'
import { Link } from 'react-router-dom'
import {
  DAILY_ACTIVE_ADDRESSES,
  ETH_WALLET,
  PRICE_ABSOLUTE_CHANGE,
  PRICE_PERCENT_CHANGE,
  PRICE_VOLUME_DIFFERENCE
} from '../../../ducks/Signals/utils/constants'

export const SignalControls = ({ type }) => {
  let iconType
  let iconStyle

  switch (type) {
    case ETH_WALLET:
    case PRICE_VOLUME_DIFFERENCE:
    case PRICE_ABSOLUTE_CHANGE:
    case PRICE_PERCENT_CHANGE: {
      iconType = 'finance'
      iconStyle = styles.iconFinance
      break
    }
    case DAILY_ACTIVE_ADDRESSES: {
      iconType = 'connection'
      iconStyle = styles.iconConnection
      break
    }
    default: {
      iconType = 'social'
      iconStyle = styles.iconSocial
    }
  }

  return (
    <div className={iconStyle}>
      <Icon type={iconType} />
    </div>
  )
}

export const RemoveSignalButton = ({ id, removeSignal, redirect }) => (
  <Button
    variant='ghost'
    onClick={() => {
      removeSignal(id)
      redirect()
    }}
  >
    <Icon type='remove' />
  </Button>
)

export const SettingsSignalButton = ({ id }) => (
  <Button variant='ghost'>
    <Link to={`/sonar/feed/details/${id}/edit`}>
      <Icon type='settings' />
    </Link>
  </Button>
)
