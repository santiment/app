import React, { Fragment, Component } from 'react'
import { Modal } from 'semantic-ui-react'
import styles from './InsightViewPageImageModalWrapper.module.scss'

class InsightViewPageImageModalWrapper extends Component {
  state = {
    imgSrc: undefined
  }

  onImgClick = ({ target }) => {
    if (target.tagName.toUpperCase() !== 'IMG') return
    this.setState({
      imgSrc: target.src
    })
  }

  onModalClose = () => {
    this.setState({
      imgSrc: undefined
    })
  }

  render () {
    const { imgSrc } = this.state
    const { children } = this.props

    return (
      <Fragment>
        {imgSrc && (
          <Modal
            defaultOpen
            closeIcon
            basic
            className={styles.wrapper}
            onUnmount={this.onModalClose}
          >
            <Modal.Content>
              <img src={imgSrc} alt='Modal pic' className={styles.img} />
            </Modal.Content>
          </Modal>
        )}
        <div onClick={this.onImgClick}>{children}</div>
      </Fragment>
    )
  }
}

export default InsightViewPageImageModalWrapper
