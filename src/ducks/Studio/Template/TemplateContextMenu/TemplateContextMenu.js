import React from 'react'
import cx from 'classnames'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import Panel from '@santiment-network/ui/Panel/Panel'
import DialogFormRenameTemplate from '../Dialog/RenameTemplate'
import DialogFormDuplicateTemplate from '../Dialog/DuplicateTemplate'
import ConfirmDialog from '../../../../components/ConfirmDialog/ConfirmDialog'
import ContextMenu from '@santiment-network/ui/ContextMenu'
import styles from '../Dialog/LoadTemplate/Template.module.scss'

export const Option = props => (
  <Button
    {...props}
    fluid
    variant='ghost'
    className={cx(styles.option, props.className)}
  />
)

const TemplateContextMenu = ({
  template,
  isMenuOpened,
  closeMenu,
  openMenu,
  onDelete,
  onRename,
  isAuthor,
  classes = {}
}) => {
  return (
    <ContextMenu
      open={isMenuOpened}
      onClose={closeMenu}
      trigger={
        <Button
          variant='ghost'
          className={cx(
            styles.menu,
            classes.menuBtn,
            !isAuthor && styles.withUse
          )}
          onClick={openMenu}
        >
          <Icon type='dots' className={styles.dots} />
        </Button>
      }
      passOpenStateAs='isActive'
      position='bottom'
      align='end'
    >
      <Panel variant='modal' className={styles.options}>
        {isAuthor && (
          <DialogFormRenameTemplate
            trigger={<Option>Rename</Option>}
            template={template}
            onRename={data => {
              onRename(data)
              closeMenu()
            }}
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
            trigger={<Option className={styles.delete}>Delete</Option>}
            onApprove={() => {
              onDelete(template)
            }}
            onCancel={closeMenu}
          />
        )}
      </Panel>
    </ContextMenu>
  )
}

export default TemplateContextMenu
