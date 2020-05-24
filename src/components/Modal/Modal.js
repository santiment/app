import React from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import UIModal from '@santiment-network/ui/Modal'
import styles from './Modal.module.scss'

const Modal = ({ classes, children, ...props }) => (
  <UIModal
    classes={{
      wrapper: styles.wrapper,
      modal: cx(styles.modal, classes.modal)
    }}
    {...props}
  >
    {closeModal => (
      <>
        <Icon
          type='close'
          onClick={closeModal}
          className={cx(styles.close, classes.close)}
        />
        {children}
      </>
    )}
  </UIModal>
)

Modal.defaultProps = {
  classes: {}
}

export default Modal
