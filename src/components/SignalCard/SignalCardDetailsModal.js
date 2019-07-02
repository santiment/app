import React from 'react'
import Dialog from '@santiment-network/ui/Dialog'
import SignalDetails from '../../pages/SonarFeed/SignalDetails'

export const SignalCardDetailsModal = ({ children, id }) => {
  return (
    <Dialog trigger={children} title='Signal details'>
      <Dialog.ScrollContent>
        <SignalDetails id={id} />
      </Dialog.ScrollContent>
    </Dialog>
  )
}
