import React, { Component } from 'react'
import { Button } from '@santiment-network/ui'
import { Modal } from 'semantic-ui-react'
import styles from './InsightEditor.module.scss'

class InsightEditorBottom extends Component {
  state = { modalOpen: false }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  render () {
    const { modalOpen } = this.state
    const { onPublishClick, isPublishDisabled = false } = this.props
    return (
      <Modal
        closeIcon
        open={modalOpen}
        onClose={this.handleClose}
        trigger={
          <Button
            disabled={isPublishDisabled}
            onClick={this.handleOpen}
            className={styles.publishBtn}
            border
            variant='ghost'
          >
            Publish insight
          </Button>
        }
      >
        <Modal.Header>Publishing of the insight</Modal.Header>
        <Modal.Content>
          After publishing editing of the insight is not available. Are you sure
          you want to publish it?
        </Modal.Content>
        <Modal.Actions>
          <Button
            onClick={isPublishDisabled ? undefined : onPublishClick}
            border
            variant='ghost'
            accent='positive'
            style={{ marginRight: 15 }}
          >
            Publish
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
export default InsightEditorBottom
