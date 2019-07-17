import React, { PureComponent } from 'react'
import Dialog from '@santiment-network/ui/Dialog'
import styles from './DeleteDialog.module.scss'

class DeleteDialog extends PureComponent {
  state = { open: false }

  static defaultProps = {
    title: 'Do you want to delete this watchlist?',
    description: 'This action cannot be undone'
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
    redirect && redirect()
  }

  render () {
    const { title, description, trigger } = this.props

    return (
      <Dialog
        open={this.state.open}
        onClose={this.closeDialog}
        onOpen={this.openDialog}
        trigger={trigger}
        title={title}
        classes={styles}
      >
        <Dialog.ScrollContent withPadding>{description}</Dialog.ScrollContent>
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
