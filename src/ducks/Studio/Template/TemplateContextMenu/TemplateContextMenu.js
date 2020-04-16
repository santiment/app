import React from 'react'
import cx from 'classnames'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import Panel from '@santiment-network/ui/Panel/Panel'
import Toggle from '@santiment-network/ui/Toggle'
import DialogFormRenameTemplate from '../Dialog/RenameTemplate'
import DialogFormDuplicateTemplate from '../Dialog/DuplicateTemplate'
import ConfirmDialog from '../../../../components/ConfirmDialog/ConfirmDialog'
import ContextMenu from '@santiment-network/ui/ContextMenu'
import styles from '../Dialog/LoadTemplate/Template.module.scss'

const Option = props => (
  <Button {...props} fluid variant='ghost' className={styles.context__btn} />
)

const TemplateContextMenu = ({
  template,
  isMenuOpened,
  closeMenu,
  toggleIsPublic,
  openMenu,
  onDeleteClick,
  onRename,
  isPublic,
  isAuthor
}) => {
  return (
    <ContextMenu
      open={isMenuOpened}
      onClose={closeMenu}
      trigger={
        <Button variant='flat' className={cx(styles.menu)} onClick={openMenu}>
          <Icon type='dots' />
        </Button>
      }
      passOpenStateAs='isActive'
      position='bottom'
      align='end'
    >
      <Panel variant='modal' className={styles.options}>
        {isAuthor && (
          <Option onClick={toggleIsPublic}>
            Public
            <Toggle isActive={isPublic} className={styles.toggle} />
          </Option>
        )}
        {isAuthor && (
          <DialogFormRenameTemplate
            trigger={<Option>Rename</Option>}
            template={template}
            onRename={onRename}
          />
        )}
        <DialogFormDuplicateTemplate
          trigger={<Option>Duplicate</Option>}
          template={template}
          onDuplicate={closeMenu}
        />
        {isAuthor && (
          <ConfirmDialog
            title='Do you want to delete this template?'
            trigger={<Option>Delete</Option>}
            onApprove={onDeleteClick}
            onCancel={closeMenu}
          />
        )}
      </Panel>
    </ContextMenu>
  )
}

export default TemplateContextMenu
