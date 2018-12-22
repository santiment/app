import React, { PureComponent } from 'react'
import WatchlistCopyBtn from './WatchlistCopyBtn'
import WatchlistCopyPopup from './WatchlistCopyPopup'
import { connect } from 'react-redux'
import { Popup } from 'semantic-ui-react'
import * as actions from '../../actions/types'

class WatchlistCopy extends PureComponent {
  state = {
    isPopupShown: false,
    newWatchlistTitle: '',
    assetsToCopy: new Set()
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    return {
      ...prevState,
      assetsToCopy: new Set(nextProps.assets.map(({ id }) => id))
    }
  }

  onWatchlistTitleChange = ({ currentTarget }) => {
    this.setState(prevState => ({
      ...prevState,
      newWatchlistTitle: currentTarget.value
    }))
  }

  onAssetClick = id => {
    const assetsToCopy = new Set([...this.state.assetsToCopy])

    if (assetsToCopy.has(id)) {
      assetsToCopy.delete(id)
    } else {
      assetsToCopy.add(id)
    }

    this.setState(prevState => ({
      ...prevState,
      assetsToCopy
    }))
  }

  handleCopyConfirm = () => {
    const { assetsToCopy, newWatchlistTitle } = this.state
    const { copyWatchlist, assets } = this.props

    copyWatchlist({
      name: newWatchlistTitle,
      assets: assets.filter(asset => assetsToCopy.has(asset.id))
    })
  }

  render () {
    const { isPopupShown, assetsToCopy } = this.state
    const { assets } = this.props

    return (
      <div>
        <Popup
          content={
            <WatchlistCopyPopup
              assets={assets}
              assetsToCopy={assetsToCopy}
              onAssetClick={this.onAssetClick}
              handleCopyConfirm={this.handleCopyConfirm}
              onChange={this.onWatchlistTitleChange}
            />
          }
          trigger={<WatchlistCopyBtn />}
          position='bottom center'
          // on='click'
          // style={style}
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
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
