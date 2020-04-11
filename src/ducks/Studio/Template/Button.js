import React from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import FormDialogNewTemplate from './FormDialog/NewTemplate'
import styles from './index.module.scss'

export default ({
  selectedTemplate,
  hasTemplates,
  isMenuOpened,
  saveTemplate,
  openMenu,
  forwardedRef,
  ...props
}) => {
  return (
    <button className={styles.btn} ref={forwardedRef}>
      <FormDialogNewTemplate
        {...props}
        trigger={
          <div
            onClick={selectedTemplate ? saveTemplate : undefined}
            className={cx(
              styles.btn__left,
              !hasTemplates && styles.btn__left_large
            )}
          >
            <Icon type='cloud-small' className={styles.cloud} />
            {selectedTemplate ? selectedTemplate.title : 'New Template'}
          </div>
        }
      />
      {hasTemplates && (
        <div className={styles.dropdown} onClick={openMenu}>
          <Icon
            type='arrow-down'
            className={cx(styles.icon, isMenuOpened && styles.active)}
          />
        </div>
      )}
    </button>
  )
}
