import React from 'react'
import RemoveSignalButton from '../../../components/SignalCard/controls/RemoveSignalButton'
import NotificationActions from '../../../components/NotificationActions/NotificationActions'

const SignalNotificationActions = ({ id, toLink }) => {
  return (
    <NotificationActions
      id={id}
      link={toLink}
      undoTrigger={RemoveSignalButton}
    />
  )
}

export default SignalNotificationActions
