import React from 'react'
import RemoveSignalButton from '../../../components/SignalCard/controls/RemoveSignalButton'
import NotificationActions from '../../../components/NotificationActions/NotificationActions'
import { canOpenTrigger } from '../../../components/SignalCard/card/utils'

const SignalNotificationActions = ({ signal, toLink }) => {
  const { id } = signal

  const isOpenLink = canOpenTrigger(signal.settings)

  return (
    <NotificationActions
      id={id}
      link={toLink}
      isOpenLink={isOpenLink}
      undoTrigger={RemoveSignalButton}
    />
  )
}

export default SignalNotificationActions
