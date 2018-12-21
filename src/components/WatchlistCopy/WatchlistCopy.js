import React, { PureComponent } from 'react'
import WatchlistCopyBtn from './WatchlistCopyBtn'
import WatchlistCopyPopup from './WatchlistCopyPopup'
import { connect } from 'react-redux'
import { Popup } from 'semantic-ui-react'
import * as actions from '../../actions/types'

class WatchlistCopy extends PureComponent {
  state = {
    isPopupShown: false
  }

  handleCopyConfirm = () => {}

  render () {
    const { isPopupShown } = this.state
    const { assets, createWatchlist } = this.props

    return (
      <div>
        <Popup
          content={
            <WatchlistCopyPopup
              assets={assets}
              handleCopyConfirm={createWatchlist}
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
