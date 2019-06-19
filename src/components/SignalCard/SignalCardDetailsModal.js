import React, { useState } from 'react'
import Dialog from '@santiment-network/ui/Dialog'
import SignalDetails from '../../pages/SonarFeed/SignalDetails'

export const SignalCardDetailsModal = ({ children, id }) => {
  const [, setDialogOpenState] = useState(false)
  return (
    <Dialog trigger={children} title='Signal details'>
      <Dialog.ScrollContent>
        <SignalDetails id={id} closeModal={() => setDialogOpenState(false)} />
      </Dialog.ScrollContent>
    </Dialog>
  )
}
