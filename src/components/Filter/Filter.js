import React, { useState } from 'react'
import cx from 'classnames'
import ContextMenu from '@santiment-network/ui/ContextMenu'
import Icon from '@santiment-network/ui/Icon'
import Dialog from '@santiment-network/ui/Dialog'
import { DesktopOnly, MobileOnly } from '../Responsive'
import styles from './Filter.module.scss'

const FilterWrapper = ({ children, dialogTitle = 'Filter', isMobile }) => {
  const [isOpen, setOpen] = useState(false)

  return (
    <>
      <DesktopOnly>
        <ContextMenu
          position='bottom'
          align='end'
          className={styles.contextMenu}
          trigger={
            <div className={cx(styles.trigger, isOpen && styles.openState)}>
              <Icon type='filter' className={styles.iconFilter} />
            </div>
          }
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
        >
          {children}
        </ContextMenu>
      </DesktopOnly>
      <MobileOnly>
        <Dialog
          open={isOpen}
          title={dialogTitle}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          trigger={
            <div className={cx(styles.trigger, isOpen && styles.openState)}>
              <Icon type='filter' className={styles.iconFilter} />
            </div>
          }
          classes={styles}
        >
          {children}
          {isMobile && (
            <div className={styles.btnWrapper}>
              <button
                className={cx(styles.btn, 'btn-1 body-2 fluid row hv-center')}
                onClick={() => setOpen(false)}
              >
                Apply filter
              </button>
            </div>
          )}
        </Dialog>
      </MobileOnly>
    </>
  )
}

export default FilterWrapper
