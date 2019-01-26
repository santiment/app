import React, { Component } from 'react'
import PropTypes from 'prop-types'
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
        onClose={this.closeModal}
      >
        <SharePanel shareLink={shareLink} onCloseBtnClick={this.closeModal} />
      </Modal>
    )
  }
}

ShareModalTrigger.propTypes = {
  shareLink: PropTypes.string.isRequired
}

export default ShareModalTrigger
