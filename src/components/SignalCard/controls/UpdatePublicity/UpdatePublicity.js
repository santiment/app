import React, { useState } from 'react'
import { connect } from 'react-redux'
import { track } from 'webkit/analytics'
import Toggle from '../../../../ducks/Watchlists/Actions/ChangeVisibility/Toggle'
import { updateTrigger } from '../../../../ducks/Signals/common/actions'
import { AlertsEvents } from '../../../../ducks/Alert/analytics'

const UpdatePublicity = ({ signal, updateAlert, ...props }) => {
  const [isActive, setActive] = useState(signal.isPublic)

  return (
    <Toggle
      onClick={() => {
        track.event(AlertsEvents.ChangeAlertVisibility, { flag: !isActive })
        setActive(!isActive)
        updateAlert({
          ...signal,
          isPublic: !isActive,
        })
      }}
      isActive={isActive}
      {...props}
    />
  )
}

const mapDispatchToProps = (dispatch) => ({
  updateAlert: (payload) => {
    dispatch(updateTrigger(payload))
  },
})

export default connect(null, mapDispatchToProps)(UpdatePublicity)
