import React, { PureComponent } from 'react'
import { Dialog, Toggle, Input, Label } from '@santiment-network/ui'
import { connect } from 'react-redux'
import { USER_ADD_NEW_ASSET_LIST } from '../../actions/types'
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

  onSubmit = e => {
    e.preventDefault()
    const { value, isSecret } = this.state

    if (!value) {
      return
    }

    this.props.createWatchlist({ name: value, isPublic: !isSecret })
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
        <form onSubmit={this.onSubmit}>
          <Dialog.ScrollContent withPadding className={styles.content}>
            <Label accent='waterloo'>Name</Label> ({inputLength}/25)
            <Input
              placeholder='For example, Favorites'
              maxLength='25'
              onChange={this.onInputChange}
            />
            <button type='submit' style={{ display: 'none' }} />
            {/* hack for submiting form */}
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
              <Dialog.Cancel onClick={this.cancelDialog} type='cancel'>
                Cancel
              </Dialog.Cancel>
              <Dialog.Approve
                className={styles.approve}
                disabled={!inputLength}
                type='submit'
              >
                Create
              </Dialog.Approve>
            </div>
          </Dialog.Actions>
        </form>
      </Dialog>
    )
  }
}

const mapStateToProps = ({ watchlistUi: { newItemPending } }) => ({
  isPending: newItemPending
})

const mapDispatchToProps = dispatch => ({
  createWatchlist: payload =>
    dispatch({
      type: USER_ADD_NEW_ASSET_LIST,
      payload
    })
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewWatchlistDialog)
