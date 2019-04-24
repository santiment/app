import React, { PureComponent } from 'react'
import { push } from 'react-router-redux'
import Dialog from '@santiment-network/ui/Dialog'
import { connect } from 'react-redux'
import { USER_REMOVE_ASSET_LIST } from '../../actions/types'

class WatchlistDeleteDialog extends PureComponent {
  state = { open: false }

  openDialog = () => {
    this.setState({ open: true })
  }

  closeDialog = () => {
    this.setState({ open: false })
  }

  onDeleteClick = () => {
    const { id, deleteWatchlist, goToAssetsRoot } = this.props
    deleteWatchlist(id)
    goToAssetsRoot()
  }

  render () {
    return (
      <Dialog
        open={this.state.open}
        onClose={this.closeDialog}
        onOpen={this.openDialog}
        trigger={this.props.trigger}
        title='Do you want to delete this watchlist?'
      >
        <Dialog.ScrollContent withPadding>
          This actions cannot be undone
        </Dialog.ScrollContent>
        <Dialog.Actions>
          <Dialog.Cancel onClick={this.closeDialog}>Cancel</Dialog.Cancel>
          <Dialog.Approve onClick={this.onDeleteClick}>Delete</Dialog.Approve>
        </Dialog.Actions>
      </Dialog>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteWatchlist: id => {
      dispatch({
        type: USER_REMOVE_ASSET_LIST,
        payload: { id }
      })
    },
    goToAssetsRoot: () => dispatch(push('/assets'))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(WatchlistDeleteDialog)
