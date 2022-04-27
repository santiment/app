import React from 'react'
import AlertModal from '../../Alert/AlertModal'
import { ALERT_TYPES } from '../../Alert/constants'
import { getAddressInfrastructure } from '../../../utils/address'

const DEFAULT_SIGNAL = {
  cooldown: '1d',
  description: '',
  iconUrl: '',
  isActive: true,
  isPublic: false,
  isRepeating: true,
  tags: [],
  title: '',
  settings: {
    type: 'wallet_movement',
    target: { address: '' },
    selector: { infrastructure: '', slug: '' },
    channel: [],
    time_window: '',
    operation: {},
  },
}

const CreateAlert = ({ assets, address, trigger }) => {
  const infrastructure = getAddressInfrastructure(address)
  const slug = assets.length !== 0 ? assets[0].slug : ''

  return (
    <AlertModal
      defaultType={ALERT_TYPES[2]}
      signalData={{
        ...DEFAULT_SIGNAL,
        settings: {
          ...DEFAULT_SIGNAL.settings,
          target: { ...DEFAULT_SIGNAL.settings.target, address },
          selector: {
            ...DEFAULT_SIGNAL.settings.selector,
            slug,
            infrastructure,
          },
        },
      }}
      trigger={trigger}
      disabled={!address || !slug}
    />
  )
}

export default CreateAlert
