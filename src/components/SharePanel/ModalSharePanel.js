import React, { Component } from 'react'
import { Modal } from 'semantic-ui-react'
import SharePanel from './SharePanel'

class ModalSharePanel extends Component {
  state = { isOpen: false }

  closeModal = () => {
    this.setState({ isOpen: false })
  }
  openModal = () => {
    this.setState({ isOpen: true })
  }

  render () {
    const { trigger, shareLink } = this.props
    const { isOpen } = this.state

    return (
      <Modal
        open={isOpen}
        trigger={<span onClick={this.openModal}>{trigger}</span>}
      >
        <Modal.Content>
          <SharePanel shareLink={shareLink} onCloseBtnClick={this.closeModal} />
        </Modal.Content>
      </Modal>
    )
  }
}
export default ModalSharePanel
