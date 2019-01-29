import React, { Component } from 'react'
import { Button, Icon } from '@santiment-network/ui'
import { connect } from 'react-redux'
import * as actions from '../../actions/types'
import CreateWatchlistBtn from '../WatchlistPopup/CreateWatchlistBtn'
import styles from './NavbarAssetsDropdownWatchlist.module.scss'

const mapStateToProps = ({ watchlistUi }) => ({
  watchlistUi
})

const mapDispatchToProps = dispatch => ({
  createWatchlist: payload =>
    dispatch({
      type: actions.USER_ADD_NEW_ASSET_LIST,
      payload
    })
})

const WatchlistCreateForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateWatchlistBtn)

class NavbarAssetsDropdownWatchlistBottom extends Component {
  state = {
    creatingWatchlist: false
  }

  onBlur = () => {
    this.setState({ creatingWatchlist: false })
  }

  onClick = () => {
    this.setState({ creatingWatchlist: true })
  }

  render () {
    const { creatingWatchlist } = this.state
    return (
      <div className={styles.newList}>
        {creatingWatchlist ? (
          <WatchlistCreateForm
            className={styles.createForm}
            onBlur={this.onBlur}
          />
        ) : (
          <Button
            onClick={this.onClick}
            fluid
            variant='ghost'
            className={styles.newList__btn}
          >
            <Icon type='plus-round' />
            Create new watchlist
          </Button>
        )}
      </div>
    )
  }
}

export default NavbarAssetsDropdownWatchlistBottom
