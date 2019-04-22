import React, { PureComponent } from 'react'
import { Dialog, Toggle, Input, Label } from '@santiment-network/ui'
import styles from './NewWatchlistDialog.module.scss'

class NewWatchlistDialog extends PureComponent {
  render () {
    const { trigger } = this.props

    return (
      <Dialog title='New watchlist' trigger={trigger}>
        <Dialog.ScrollContent withPadding className={styles.content}>
          <Label accent='waterloo'>Name</Label> (0/25)
          <Input placeholder='For example, Favorites' maxLength='25' />
        </Dialog.ScrollContent>
        <Dialog.Actions className={styles.actions}>
          <div className={styles.left}>
            <Toggle className={styles.toggle} />
            Secret
          </div>
          <div className={styles.right}>
            <Dialog.Cancel>Cancel</Dialog.Cancel>
            <Dialog.Approve className={styles.approve}>Create</Dialog.Approve>
          </div>
        </Dialog.Actions>
      </Dialog>
    )
  }
}

export default NewWatchlistDialog
