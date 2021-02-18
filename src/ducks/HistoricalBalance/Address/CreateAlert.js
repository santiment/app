import React, { useMemo } from 'react'
import { mapToOptions } from '../../Signals/utils/utils'
import {
  ETH_WALLET_METRIC,
  PRICE_ABS_CHANGE_BELOW
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
  value: PRICE_ABS_CHANGE_BELOW
}

const DEFAULTS = {
  metric: METRIC,
  type: TYPE
}

const CreateAlert = ({ assets, address, trigger }) => {
  const ethAddress = useMemo(() => mapToOptions(address), [address])
  const target = useMemo(
    () => ({ value: assets.length ? mapToOptions(assets[0]) : [] }),
    [assets]
  )

  return (
    <SignalMasterModalForm
      trigger={trigger}
      enabled={address && assets.length}
      canRedirect={false}
      metaFormSettings={{
        ethAddress,
        target,
        ...DEFAULTS
      }}
      buttonParams={PARAMS}
    />
  )
}

export default CreateAlert
