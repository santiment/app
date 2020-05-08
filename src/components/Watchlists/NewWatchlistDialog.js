import React, { PureComponent } from 'react'
import debounce from 'lodash.debounce'
import Toggle from '@santiment-network/ui/Toggle'
import Label from '@santiment-network/ui/Label'
import Input from '@santiment-network/ui/Input'
import Dialog from '@santiment-network/ui/Dialog'
import { connect } from 'react-redux'
import { USER_ADD_NEW_ASSET_LIST } from '../../actions/types'
import styles from './NewWatchlistDialog.module.scss'

const MAX_LENGTH = 3

const NAME_EXISTS_ERROR = 'The watchlist with this name already exists'

const SHORT_NAME_ERROR = `The name should be at least ${MAX_LENGTH} characters`

const BAD_SYMBOLS_ERROR = "Use only letters, numbers, whitespace and _-.'/,"

const ALLOWED_SYMBOLS_REGEXP = /^([.\-/_' ,\w]*)$/

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
    this.checkName()
  }

  checkName = debounce(() => {
    const { name } = this.state
    const { watchlists } = this.props
    const upperCaseName = name.toUpperCase()
    let error
    if (watchlists.some(({ name }) => name.toUpperCase() === upperCaseName)) {
      error = NAME_EXISTS_ERROR
    }
    if (!name || name.length < MAX_LENGTH) {
      error = SHORT_NAME_ERROR
    }

    if (!ALLOWED_SYMBOLS_REGEXP.test(name)) {
      error = BAD_SYMBOLS_ERROR
    }
    this.setState({ error })
  }, 300)

  onSubmit = e => {
    e.preventDefault()
    const { name, isPublic, error } = this.state
    const { isPending } = this.props

    if (!name || isPending || error) {
      return
    }

    this.props.createWatchlist({ name, isPublic })
  }

  render () {
    const { open, name, isPublic, error } = this.state
    const { isPending, trigger } = this.props
    const { length: nameLength } = name

    return (
      <Dialog
        title='New watchlist'
        trigger={trigger}
        onOpen={this.openDialog}
        onClose={this.cancelDialog}
        autoFocus
        open={open}
      >
        <form onSubmit={this.onSubmit}>
          <Dialog.ScrollContent withPadding className={styles.content}>
            <Label accent='waterloo' className={styles.name}>
              Name
            </Label>{' '}
            ({nameLength}/25)
            <Input
              placeholder='For example, Favorites'
              maxLength='25'
              autoFocus
              onChange={this.onInputChange}
              defaultValue={name}
              isError={error}
            />
            <button
              // hack for submiting form
              type='submit'
              style={{ display: 'none' }}
            />
            <Label accent='persimmon' className={styles.error}>
              {error}
            </Label>
            <div className={styles.toggleWrapper}>
              <Toggle
                isActive={!isPublic}
                className={styles.toggle}
                onClick={this.onToggleClick}
              />
              Secret
            </div>
          </Dialog.ScrollContent>
          <Dialog.Actions className={styles.actions}>
            <Dialog.Cancel onClick={this.cancelDialog} type='cancel'>
              Cancel
            </Dialog.Cancel>
            <Dialog.Approve
              className={styles.approve}
              disabled={isPending || error}
              type='submit'
              isLoading={isPending}
            >
              Create
            </Dialog.Approve>
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
