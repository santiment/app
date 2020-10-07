import React, { useMemo } from 'react'
import { mapToOptions } from '../../Signals/utils/utils'
import {
  ETH_WALLET_AMOUNT_UP,
  ETH_WALLET_METRIC
} from '../../Signals/utils/constants'
import SignalMasterModalForm from '../../Signals/signalModal/SignalMasterModalForm'

const PARAMS = {
  variant: 'ghost',
  border: true
}

const METRIC = {
  value: ETH_WALLET_METRIC
}
const TYPE = {
  value: ETH_WALLET_AMOUNT_UP
}

const CreateAlert = ({ assets, address }) => {
  const ethAddress = useMemo(() => mapToOptions(address), [address])
  const target = useMemo(
    () => ({ value: assets.length ? mapToOptions(assets[0]) : undefined }),
    [assets]
  )

  return (
    <SignalMasterModalForm
      label='Create alert'
      enabled={address && assets.length}
      canRedirect={false}
      metaFormSettings={{
        ethAddress,
        target,
        metric: METRIC,
        type: TYPE
      }}
      buttonParams={PARAMS}
    />
  )
}

export default CreateAlert
