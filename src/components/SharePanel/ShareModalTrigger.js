import React, { Component } from 'react'
import { Modal } from 'semantic-ui-react'
import SharePanel from './SharePanel'
import ShareBtn from './ShareBtn'

class ShareModalTrigger extends Component {
  state = { isOpen: false }

  closeModal = () => {
    this.setState({ isOpen: false })
  }

  openModal = () => {
    this.setState({ isOpen: true })
  }

  render () {
    const { shareLink, ...props } = this.props
    const { isOpen } = this.state

    return (
      <Modal
        open={isOpen}
        trigger={<ShareBtn {...props} onClick={this.openModal} />}
      >
        <Modal.Content>
          <SharePanel shareLink={shareLink} onCloseBtnClick={this.closeModal} />
        </Modal.Content>
      </Modal>
    )
  }
}
export default ShareModalTrigger
