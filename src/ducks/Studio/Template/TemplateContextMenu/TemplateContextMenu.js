import React, { useState } from 'react'
import { connect } from 'react-redux'
import cx from 'classnames'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import Panel from '@santiment-network/ui/Panel/Panel'
import DialogFormRenameTemplate from '../Dialog/RenameTemplate'
import DialogFormDuplicateTemplate from '../Dialog/DuplicateTemplate'
import ContextMenu from '@santiment-network/ui/ContextMenu'
import DeleteTemplate from '../Dialog/Delete/DeleteTemplate'
import ShareTemplate from '../Share/ShareTemplate'
import styles from '../Dialog/LoadTemplate/Template.module.scss'

export const Option = props => (
  <Button
    {...props}
    fluid
    variant='ghost'
    className={cx(styles.option, props.className)}
  />
)

const useMenuEffects = () => {
  const [isMenuOpened, setIsMenuOpened] = useState(false)

  function openMenu (e) {
    e.stopPropagation()

    setIsMenuOpened(true)
  }

  function closeMenu () {
    setIsMenuOpened(false)
  }

  return [isMenuOpened, openMenu, closeMenu]
}

const TemplateContextMenu = ({
  template,
  onRename,
  onDelete,
  isAuthor,
  classes = {}
}) => {
  const [isMenuOpened, openMenu, closeMenu] = useMenuEffects()

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
            trigger={<Option>Edit</Option>}
            template={template}
            onRename={data => {
              onRename && onRename(data)
              closeMenu()
            }}
          />
        )}
        <DialogFormDuplicateTemplate
          trigger={<Option>Duplicate</Option>}
          template={template}
          onDuplicate={closeMenu}
        />

        <ShareTemplate
          template={template}
          className={cx(styles.option, styles.shareBtn)}
        />

        <DeleteTemplate
          isAuthor={isAuthor}
          closeMenu={closeMenu}
          onDelete={onDelete}
          template={template}
        />
      </Panel>
    </ContextMenu>
  )
}

const mapStateToProps = ({ user }, { template: { user: { id } = {} } }) => ({
  isAuthor: user && user.data && +user.data.id === +id
})

export default connect(mapStateToProps)(TemplateContextMenu)
