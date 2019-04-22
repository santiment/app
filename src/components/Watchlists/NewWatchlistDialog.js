import React, { PureComponent } from 'react'
import { Dialog, Toggle, Input, Label } from '@santiment-network/ui'
import styles from './NewWatchlistDialog.module.scss'

class NewWatchlistDialog extends PureComponent {
  state = {
    open: false,
    value: '',
    isSecret: false
  }

  onToggleClick = () => {
    this.setState(({ isSecret }) => ({ isSecret: !isSecret }))
  }

  openDialog = () => {
    this.setState({ open: true })
  }

  cancelDialog = () => {
    this.setState({ open: false })
  }

  onInputChange = ({ currentTarget: { value } }) => {
    this.setState({ value })
  }

  render () {
    const {
      open,
      value: { length: inputLength },
      isSecret
    } = this.state
    const { trigger } = this.props

    return (
      <Dialog
        title='New watchlist'
        trigger={trigger}
        onOpen={this.openDialog}
        onClose={this.cancelDialog}
        open={open}
      >
        <Dialog.ScrollContent withPadding className={styles.content}>
          <Label accent='waterloo'>Name</Label> ({inputLength}/25)
          <Input
            placeholder='For example, Favorites'
            maxLength='25'
            onChange={this.onInputChange}
          />
        </Dialog.ScrollContent>
        <Dialog.Actions className={styles.actions}>
          <div className={styles.left}>
            <Toggle
              isActive={isSecret}
              className={styles.toggle}
              onClick={this.onToggleClick}
            />
            Secret
          </div>
          <div className={styles.right}>
            <Dialog.Cancel onClick={this.cancelDialog}>Cancel</Dialog.Cancel>
            <Dialog.Approve className={styles.approve} disabled={!inputLength}>
              Create
            </Dialog.Approve>
          </div>
        </Dialog.Actions>
      </Dialog>
    )
  }
}

export default NewWatchlistDialog
