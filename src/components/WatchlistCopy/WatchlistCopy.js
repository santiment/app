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
    assetsToCopy: new Set(this.props.assets.map(({ id }) => id))
  }
  onWatchlistTitleChange = ({ currentTarget }) => {
    console.log(currentTarget)
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
    this.props.createWatchlist({ name: this.state.newWatchlistTitle })
  }

  render () {
    const { isPopupShown, assetsToCopy } = this.state
    const { createWatchlist, assets } = this.props

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
  createWatchlist: payload =>
    dispatch({
      type: actions.USER_ADD_NEW_ASSET_LIST,
      payload
    })
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WatchlistCopy)
