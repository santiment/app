import React, { useState } from 'react'
import cx from 'classnames'
import ContextMenu from '@santiment-network/ui/ContextMenu'
import Icon from '@santiment-network/ui/Icon'
import Dialog from '@santiment-network/ui/Dialog'
import { DesktopOnly, MobileOnly } from '../Responsive'
import styles from './Filter.module.scss'

const FilterWrapper = ({ children, dialogTitle = 'Filter' }) => {
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
        </Dialog>
      </MobileOnly>
    </>
  )
}

export default FilterWrapper
