import React, { useState } from 'react'
import Button from '@santiment-network/ui/Button'
import Dialog from '@santiment-network/ui/Dialog'
import Plans from './Plans'
import styles from './PlansDialog.module.scss'

const PlansDialog = ({ subscription }) => {
  const [opened, setOpened] = useState(false)

  function closeDialog () {
    setOpened(false)
  }

  function openDialog () {
    setOpened(true)
  }

  return (
    <Dialog
      open={opened}
      title='Existing plans'
      classes={styles}
      onClose={closeDialog}
      trigger={
        <Button accent='positive' variant='fill' onClick={openDialog}>
          {subscription ? 'Change' : 'Upgrade'} plan
        </Button>
      }
    >
      <Dialog.ScrollContent>
        <Plans classes={styles} onDialogClose={closeDialog} />
      </Dialog.ScrollContent>
    </Dialog>
  )
}

export default PlansDialog
