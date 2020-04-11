import React, { useState } from 'react'
import cx from 'classnames'
import ContextMenu from '@santiment-network/ui/ContextMenu'
import Icon from '@santiment-network/ui/Icon'
import Button from '@santiment-network/ui/Button'
import Panel from '@santiment-network/ui/Panel'
import DialogLoadTemplate from './DialogLoadTemplate'
import FormDialogNewTemplate from './FormDialog/NewTemplate'
import FormDialogRenameTemplate from './FormDialog/RenameTemplate'
import FormDialogDuplicateTemplate from './FormDialog/DuplicateTemplate'
import styles from './index.module.scss'

const Action = props => (
  <Button {...props} fluid variant='ghost' className={styles.action} />
)

export default ({ className }) => {
  const [isMenuOpened, setIsMenuOpened] = useState()

  function openMenu () {
    setIsMenuOpened(true)
  }

  function closeMenu () {
    setIsMenuOpened(false)
  }

  return (
    <ContextMenu
      open={isMenuOpened}
      onClose={closeMenu}
      position='bottom'
      align='start'
      trigger={
        <button className={cx(styles.btn, className)}>
          <div className={styles.btn__left}>
            <Icon type='cloud-small' className={styles.cloud} />
            Template
          </div>
          <div className={styles.dropdown} onClick={openMenu}>
            <Icon
              type='arrow-down'
              className={cx(styles.icon, isMenuOpened && styles.active)}
            />
          </div>
        </button>
      }
    >
      <Panel variant='modal' className={styles.context}>
        <div className={styles.group}>
          <Action>Save template</Action>

          <DialogLoadTemplate
            onClose={closeMenu}
            trigger={<Action>Load template</Action>}
          />
        </div>
        <div className={styles.group}>
          <FormDialogNewTemplate
            onClose={closeMenu}
            trigger={<Action>New template</Action>}
          />

          <FormDialogRenameTemplate
            onClose={closeMenu}
            trigger={<Action>Rename template</Action>}
          />

          <FormDialogDuplicateTemplate
            onClose={closeMenu}
            trigger={<Action>Duplicate template</Action>}
          />
        </div>
      </Panel>
    </ContextMenu>
  )
}
