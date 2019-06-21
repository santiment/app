import React, { PureComponent } from 'react'
import Dialog from '@santiment-network/ui/Dialog'
import styles from './DeleteDialog.module.scss'

class DeleteDialog extends PureComponent {
  state = { open: false }

  static defaultProps = {
    title: 'Do you want to delete this watchlist?'
  }

  openDialog = () => {
    this.setState({ open: true })
  }

  closeDialog = () => {
    this.setState({ open: false })
  }

  onDeleteClick = () => {
    const { id, deleteItem, redirect } = this.props
    deleteItem(id)
    redirect()
  }

  render () {
    const { title, trigger } = this.props

    return (
      <Dialog
        open={this.state.open}
        onClose={this.closeDialog}
        onOpen={this.openDialog}
        trigger={trigger}
        title={title}
        classes={styles}
      >
        <Dialog.ScrollContent withPadding>
          This action cannot be undone
        </Dialog.ScrollContent>
        <Dialog.Actions>
          <Dialog.Cancel onClick={this.closeDialog}>Cancel</Dialog.Cancel>
          <Dialog.Approve
            onClick={this.onDeleteClick}
            className={styles.approve}
          >
            Delete
          </Dialog.Approve>
        </Dialog.Actions>
      </Dialog>
    )
  }
}

export default DeleteDialog
