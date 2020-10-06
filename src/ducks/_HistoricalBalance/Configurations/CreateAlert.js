import React from 'react'
import {
  ETH_WALLET_AMOUNT_UP,
  ETH_WALLET_METRIC,
} from '../../Signals/utils/constants'
import SignalMasterModalForm from '../../Signals/signalModal/SignalMasterModalForm'

const PARAMS = {
  variant: 'ghost',
  border: true,
}

const CreateAlert = ({ assets, address }) => {
  return (
    <SignalMasterModalForm
      label='Create alert'
      enabled={address && assets.length}
      canRedirect={false}
      metaFormSettings={{
        target: {
          /* value: assets.length > 0 ? mapToOption(assets[0]) : undefined, */
        },
        metric: {
          value: ETH_WALLET_METRIC,
        },
        type: {
          value: ETH_WALLET_AMOUNT_UP,
        },
        /* ethAddress: mapToOptions(address), */
      }}
      buttonParams={PARAMS}
    />
  )
}

export default CreateAlert
