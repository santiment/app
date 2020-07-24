import React, { PureComponent } from 'react'
import Dialog from '@santiment-network/ui/Dialog'
import styles from './ConfirmDialog.module.scss'

class ConfirmDialog extends PureComponent {
  state = { open: false }

  static defaultProps = {
    title: 'Do you want to delete this watchlist?',
    description: 'This action cannot be undone',
    confirmLabel: 'Delete',
    classes: {}
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    const { isOpen } = nextProps

    if (typeof isOpen === 'undefined') {
      return null
    }

    return {
      open: isOpen
    }
  }

  openDialog = () => {
    this.setState({ open: true })
  }

  onClose = () => {
    const { onCancel } = this.props

    this.closeDialog()
    onCancel && onCancel()
  }

  closeDialog = () => {
    this.setState({ open: false })
  }

  onDeleteClick = () => {
    const { id, onApprove, redirect, name } = this.props
    onApprove(id, name)
    if (redirect) {
      redirect()
    }
  }

  render () {
    const {
      title,
      description,
      trigger,
      classes,
      confirmLabel,
      isLoading
    } = this.props

    const mergedClasses = { ...styles, ...classes }

    return (
      <Dialog
        open={this.state.open}
        onClose={this.onClose}
        onOpen={this.openDialog}
        trigger={trigger}
        title={title}
        classes={mergedClasses}
      >
        <Dialog.ScrollContent withPadding>
          <div className={classes.description}>{description}</div>
        </Dialog.ScrollContent>
        <Dialog.Actions>
          <Dialog.Cancel
            onClick={this.onClose}
            className={styles.cancel}
            isLoading={isLoading}
          >
            Cancel
          </Dialog.Cancel>
          <Dialog.Approve onClick={this.onDeleteClick} isLoading={isLoading}>
            {confirmLabel}
          </Dialog.Approve>
        </Dialog.Actions>
      </Dialog>
    )
  }
}

export default ConfirmDialog
