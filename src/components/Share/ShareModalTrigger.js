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
    const { shareTitle, shareText, shareLink, ...props } = this.props
    const { isOpen } = this.state

    return window.navigator.share ? (
      <ShareBtn
        {...props}
        onClick={() => {
          window.navigator.share({
            title: shareTitle,
            text: shareText,
            url: shareLink
          })
        }}
      />
    ) : (
      <Modal
        open={isOpen}
        trigger={<ShareBtn {...props} onClick={this.openModal} />}
        onClose={this.closeModal}
      >
        <SharePanel
          shareTitle={shareTitle}
          shareText={shareText}
          shareLink={shareLink}
          onCloseBtnClick={this.closeModal}
        />
      </Modal>
    )
  }
}

ShareModalTrigger.propTypes = {
  shareLink: PropTypes.string.isRequired,
  shareTitle: PropTypes.string,
  shareText: PropTypes.string
}

ShareModalTrigger.defaultProps = {
  shareTitle: 'Sanbase',
  shareText: 'Hey! Look what I have found at the app.santiment.net!'
}

export default ShareModalTrigger
