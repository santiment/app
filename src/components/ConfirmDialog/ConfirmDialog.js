import React, { PureComponent } from 'react'
import cx from 'classnames'
import Dialog from '@santiment-network/ui/Dialog'
import styles from './ConfirmDialog.module.scss'

class ConfirmDialog extends PureComponent {
  state = { open: false }

  static defaultProps = {
    title: 'Do you want to delete this watchlist?',
    description: 'Are you sure? This action cannot be undone.',
    confirmLabel: 'Delete',
    classes: {},
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { isOpen } = nextProps

    if (typeof isOpen === 'undefined') {
      return null
    }

    return {
      open: isOpen,
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

  render() {
    const { title, description, trigger, classes, confirmLabel, isLoading } = this.props

    const { dialog, dialogTitle, ...restClasses } = classes

    return (
      <Dialog
        open={this.state.open}
        onClose={this.onClose}
        onOpen={this.openDialog}
        trigger={trigger}
        classes={{
          dialog: cx(styles.dialog, 'box', dialog),
          title: cx('h4 txt-m c-black mrg--b mrg-s', dialogTitle),
          ...restClasses,
        }}
      >
        <Dialog.ScrollContent withPadding className={styles.content}>
          {title && <div className='row hv-center h4 txt-m mrg--b mrg-s c-black'>{title}</div>}
          {description && <div className='column hv-center body-2 c-waterloo'>{description}</div>}
        </Dialog.ScrollContent>
        <Dialog.Actions className={cx(styles.actions, 'row hv-center mrg--b')}>
          <Dialog.Approve
            className={cx(styles.button, 'btn-1 btn--green c-white')}
            onClick={this.onDeleteClick}
            isLoading={isLoading}
          >
            {confirmLabel}
          </Dialog.Approve>
          <Dialog.Cancel
            onClick={this.onClose}
            className={cx(styles.button, 'btn-2')}
            isLoading={isLoading}
          >
            Cancel
          </Dialog.Cancel>
        </Dialog.Actions>
      </Dialog>
    )
  }
}

export default ConfirmDialog
