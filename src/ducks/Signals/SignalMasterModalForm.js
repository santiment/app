import React, { Component } from 'react'
import { Modal } from 'semantic-ui-react'
import SignalMaster from './SignalMaster'

class SignalMasterModalForm extends Component {
  state = {
    modalOpen: false
  }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  render () {
    const { modalOpen } = this.state
    const { onDeleteClick } = this.props
    return (
      <Modal
        closeIcon
        open={modalOpen}
        onClose={this.handleClose}
        trigger={React.cloneElement(this.props.children, {
          handleOpen: this.handleOpen
        })}
      >
        <SignalMaster onCreated={this.handleClose} />
      </Modal>
    )
  }
}

export default SignalMasterModalForm
