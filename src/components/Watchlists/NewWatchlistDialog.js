import React, { PureComponent } from 'react'
import { Dialog, Toggle, Input, Label } from '@santiment-network/ui'
import { connect } from 'react-redux'
import { USER_ADD_NEW_ASSET_LIST } from '../../actions/types'
import styles from './NewWatchlistDialog.module.scss'

class NewWatchlistDialog extends PureComponent {
  static getDerivedStateFromProps ({ isSuccess }) {
    if (!isSuccess) {
      return null
    }

    return {
      open: false,
      name: '',
      isPublic: true
    }
  }

  state = {
    open: false,
    name: '',
    isPublic: true
  }

  onToggleClick = () => {
    this.setState(({ isPublic }) => ({ isPublic: !isPublic }))
  }

  openDialog = () => {
    this.setState({ open: true })
  }

  cancelDialog = () => {
    this.setState({ open: false })
  }

  onInputChange = ({ currentTarget: { value: name } }) => {
    this.setState({ name })
  }

  onSubmit = e => {
    e.preventDefault()
    const { name, isPublic } = this.state
    const { isPending } = this.props

    if (!name || isPending) {
      return
    }

    this.props.createWatchlist({ name, isPublic })
  }

  render () {
    const { open, name, isPublic } = this.state
    const { isPending, trigger } = this.props
    const { length: inputLength } = name

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
              defaultValue={name}
            />
            <button type='submit' style={{ display: 'none' }} />
            {/* hack for submiting form */}
          </Dialog.ScrollContent>
          <Dialog.Actions className={styles.actions}>
            <div className={styles.left}>
              <Toggle
                isActive={!isPublic}
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
                disabled={!inputLength || isPending}
                type='submit'
              >
                {isPending ? 'Creating...' : 'Create'}
              </Dialog.Approve>
            </div>
          </Dialog.Actions>
        </form>
      </Dialog>
    )
  }
}

const mapStateToProps = ({
  watchlistUi: { newItemPending, newItemSuccess }
}) => ({
  isPending: newItemPending,
  isSuccess: newItemSuccess
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
