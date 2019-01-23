import React, { Component } from 'react'
import { Panel, Button, Input } from '@santiment-network/ui'
import * as actions from '../../actions/types'
import { connect } from 'react-redux'
import CreateWatchlistBtn from '../WatchlistPopup/CreateWatchlistBtn'
import IconPlus from './IconPlus'
import dropdownStyles from './NavbarDropdown.module.scss'

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

class WatchlistBottom extends Component {
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
      <div className={dropdownStyles.newList}>
        {creatingWatchlist ? (
          <WatchlistCreateForm
            className={dropdownStyles.createForm}
            onBlur={this.onBlur}
          />
        ) : (
          <div onClick={this.onClick} style={{ width: '100%' }}>
            <Button variant='ghost' className={dropdownStyles.newList__btn}>
              <IconPlus />
              Create new watchlist
            </Button>
          </div>
        )}
      </div>
    )
  }
}

export default WatchlistBottom
