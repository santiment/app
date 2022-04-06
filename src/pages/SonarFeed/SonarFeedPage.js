import React from 'react'
import SignalMasterModalForm from '../../ducks/Signals/signalModal/SignalMasterModalForm'
import { ALERT_ROUTES } from '../../ducks/Signals/common/constants'
import { getShareSignalParams, useSignal } from '../../ducks/Signals/common/getSignal'
import { METRIC_TYPES } from '../../ducks/Signals/utils/constants'
import ScreenerSignalDialog from '../../ducks/Signals/ScreenerSignal/ScreenerSignalDialog'

export const SignalModal = ({ id: triggerId, params, ...rest }) => {
  const shareSignalParams = getShareSignalParams(params)

  const isOpen = !!triggerId
  const { data = {}, loading } = useSignal({ triggerId, skip: !isOpen })

  if (loading || !data) {
    return null
  }

  const { trigger: { trigger = {} } = {} } = data
  const { settings: { type } = {} } = trigger

  switch (type) {
    case METRIC_TYPES.SCREENER_SIGNAL: {
      return (
        <ScreenerSignalDialog
          signal={trigger}
          defaultOpen={isOpen}
          goBackTo={ALERT_ROUTES.ALERTS}
        />
      )
    }
    default: {
      return (
        <SignalMasterModalForm
          id={triggerId}
          shareParams={shareSignalParams}
          defaultOpen={isOpen}
          {...rest}
        />
      )
    }
  }
}
