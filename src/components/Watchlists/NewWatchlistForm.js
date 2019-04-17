import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import cx from 'classnames'
import { Button, Toggle, Input } from '@santiment-network/ui'
import * as actions from './../../actions/types'
import styles from './NewWatchlistForm.module.scss'

const MAX_NAME_LENGTH = 50

class NewWatchlistForm extends Component {
  state = {
    name: '',
    isPublic: false
  }

  onChangeName = e => {
    this.setState({ name: e.target.value })
  }

  togglePrivacy = () => {
    this.setState({ isPublic: !this.state.isPublic })
  }

  onCreateWatchlist = () => {
    const { name, isPublic } = this.state
    this.props.createWatchlist({
      name,
      isPublic
    })
  }

  render () {
    const { name, isPublic } = this.state
    const { isMobile } = this.props
    const isError = name.length > MAX_NAME_LENGTH

    return (
      <div className={cx(styles.content, { [styles.mobile]: isMobile })}>
        <div className={styles.input}>
          Name{' '}
          <span>
            ({name.length}/{MAX_NAME_LENGTH})
          </span>
          <Input
            isError={isError}
            placeholder='For example, Favorites'
            onChange={this.onChangeName}
          />
        </div>
        <div className={cx(styles.actions, styles.splitContent)}>
          <div className={styles.leftActions}>
            <Toggle
              className={styles.toggle}
              isActive={!isPublic}
              onClick={this.togglePrivacy}
            />{' '}
            Secret
          </div>
          <div>
            <Button border className={styles.cancel}>
              Cancel
            </Button>
            <Button
              variant='fill'
              accent='positive'
              onClick={this.onCreateWatchlist}
              disabled={isError}
            >
              Create
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

NewWatchlistForm.propTypes = {
  createWatchlist: PropTypes.func.isRequired,
  isMobile: PropTypes.bool
}

const mapDispatchToProps = dispatch => ({
  createWatchlist: payload =>
    dispatch({
      type: actions.USER_ADD_NEW_ASSET_LIST,
      payload
    })
})

export default connect(
  null,
  mapDispatchToProps
)(NewWatchlistForm)
