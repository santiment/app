import React from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import styles from './index.module.scss'
import btnStyles from './Button.module.scss'

export default ({
  forwardedRef,
  selectedTemplate,
  hasTemplates,
  isMenuOpened,
  isLoggedIn,
  saveTemplate,
  openMenu,
  onNewTemplate,
  loading,
  ...props
}) => (
  <div className={btnStyles.btn} ref={forwardedRef}>
    <span className={btnStyles.action} onClick={saveTemplate}>
      Save{selectedTemplate ? '' : ' as'}
    </span>
    <span className={btnStyles.action} onClick={openMenu}>
      <Icon
        type='arrow-down'
        className={cx(btnStyles.arrow, isMenuOpened && styles.active)}
      />
    </span>
  </div>
)
