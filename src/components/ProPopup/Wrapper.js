import React from 'react'
import PropTypes from 'prop-types'
import ProPopup from './index'
import { useUserSubscriptionStatus } from '../../stores/user/subscriptions'

const TypeAlias = {
  SCREENER: 'screener',
  PROJECT: 'watchlist',
  BLOCKCHAIN_ADDRESS: 'blockchain_address_watchlist',
}

const MODULE = {
  screener: {
    title: 'Go Pro for full Screener access',
    description:
      'Sanbase Pro includes advanced Screener features and access to the full Santiment platform!',
    features: [
      'Unlock ‘% change’ filters for all metrics',
      'Create and save unlimited screeners',
      'Export the Screener as .csv',
      'Full access to all Santiment metrics and market insights',
    ],
  },
  watchlist: {
    title: 'Go Pro for full watchlist access',
    description:
      'Sanbase Pro includes advanced watchlist features and access to the full Santiment platform!',
    features: [
      'Unlock all metrics in watchlist table',
      'Export the watchlist as .csv',
      'Full access to all Santiment metrics and market insights',
    ],
  },
  blockchain_address_watchlist: {
    title: 'Go Pro for full blockchain addresses watchlist access',
    description:
      'Sanbase Pro includes advanced watchlist features and access to the full Santiment platform!',
    features: [
      'Export the watchlist as .csv',
      'Full access to all Santiment metrics and market insights',
    ],
  },
}

const ProPopupWrapper = ({
  type,
  trigger: Trigger,
  children,
  className,
  toggleOpen,
  isOpen = false,
}) => {
  const { isPro } = useUserSubscriptionStatus()
  const module = TypeAlias[type] || type

  if (isPro) {
    return children
  }

  return (
    <ProPopup
      trigger={Trigger ? <Trigger /> : <div className={className}>{children}</div>}
      isOpen={isOpen}
      toggleOpen={toggleOpen}
      {...MODULE[module]}
    />
  )
}

ProPopupWrapper.propTypes = {
  type: PropTypes.string.isRequired,
}

export default ProPopupWrapper
