import React, { PureComponent } from 'react'
import { Dialog } from '@santiment-network/ui'

class WatchlistEdit extends PureComponent {
  state = {
    open: false
  }

  openDialog = () => {
    this.setState({ open: true })
  }

  cancelDialog = () => {
    this.setState({ open: false })
  }

  render () {
    const { open } = this.state
    const { trigger, name } = this.props

    return (
      <Dialog
        title={`Edit ${name}`}
        trigger={trigger}
        onOpen={this.openDialog}
        onClose={this.cancelDialog}
        open={open}
      >
        <Dialog.ScrollContent withPadding />
      </Dialog>
    )
  }
}

export default WatchlistEdit
