import React from 'react'
import Dialog from '@santiment-network/ui/Dialog'

const ShareSignalPopup = ({ signalId, title }) => {
  return (
    <Dialog trigger={<div>Share</div>}>
      <Dialog.ScrollContent>Share?</Dialog.ScrollContent>
    </Dialog>
  )
}

export default ShareSignalPopup
