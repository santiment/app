import React, { Component } from 'react'
import { Icon, Button } from '@santiment-network/ui'
import { Modal } from 'semantic-ui-react'
import styles from './InsightDraftCard.module.scss'

class InsightDraftCardDeleteBtn extends Component {
  state = { modalOpen: false }

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
        trigger={
          <Icon
            onClick={this.handleOpen}
            type='close'
            className={styles.remove}
          />
        }
      >
        <Modal.Header>Are you sure you want to delete the draft?</Modal.Header>
        <Modal.Actions>
          <Button
            onClick={onDeleteClick}
            border
            variant='ghost'
            accent='positive'
            style={{ marginRight: 15 }}
          >
            Delete
          </Button>
          <Button
            onClick={this.handleClose}
            border
            variant='ghost'
            accent='negative'
          >
            Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}
export default InsightDraftCardDeleteBtn
