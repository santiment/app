import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Popup } from 'semantic-ui-react'
import { Button } from '@santiment-network/ui'
import * as actions from '../../actions/types'
import { checkIsLoggedIn } from '../../pages/UserSelectors'
import WatchlistCopyPopup from './WatchlistCopyPopup'

const style = {
  padding: 0
}

class WatchlistCopy extends PureComponent {
  state = {
    isPopupVisible: false,
    newWatchlistName: '',
    assetsToCopy: new Set(),
    loaded: false
  }

  static getDerivedStateFromProps ({ assets }, { loaded }) {
    if (loaded || assets.length === 0) {
      return null
    }

    return {
      loaded: true,
      assetsToCopy: new Set(assets.map(({ id }) => id))
    }
  }

  onWatchlistTitleChange = ({ currentTarget }) => {
    this.setState(prevState => ({
      ...prevState,
      newWatchlistName: currentTarget.value
    }))
  }

  onAssetClick = id => {
    const assetsToCopy = new Set([...this.state.assetsToCopy])

    if (assetsToCopy.has(id)) {
      console.log(id)
      assetsToCopy.delete(id)
    } else {
      assetsToCopy.add(id)
    }

    this.setState(prevState => ({
      ...prevState,
      assetsToCopy
    }))
  }

  onFormSubmit = evt => {
    evt.preventDefault()

    const { assetsToCopy, newWatchlistName } = this.state
    const { copyWatchlist, assets } = this.props

    copyWatchlist({
      name: newWatchlistName,
      assets: assets.filter(asset => assetsToCopy.has(asset.id))
    })

    this.setState(prevState => ({
      ...prevState,
      isPopupVisible: false
    }))
  }

  onPopupOpen = () => {
    this.setState({
      isPopupVisible: true
    })
  }
  onPopupClose = () => {
    this.setState({
      isPopupVisible: false
    })
  }

  render () {
    const { isPopupVisible, assetsToCopy } = this.state
    const { assets, trigger, isLoggedIn } = this.props

    if (!isLoggedIn) {
      return null
    }

    return (
      assets.length > 0 && (
        <Popup
          content={
            <WatchlistCopyPopup
              assets={assets}
              assetsToCopy={assetsToCopy}
              onAssetClick={this.onAssetClick}
              onFormSubmit={this.onFormSubmit}
              onChange={this.onWatchlistTitleChange}
            />
          }
          trigger={trigger}
          position='bottom center'
          style={style}
          open={isPopupVisible}
          on='click'
          onOpen={this.onPopupOpen}
          onClose={this.onPopupClose}
        />
      )
    )
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: checkIsLoggedIn(state),
    assets: state.projects.items
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  copyWatchlist: payload =>
    dispatch({
      type: actions.USER_COPY_ASSET_LIST,
      payload
    })
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WatchlistCopy)
