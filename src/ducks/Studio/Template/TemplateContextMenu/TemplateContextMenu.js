import React, { useState } from 'react'
import { connect } from 'react-redux'
import cx from 'classnames'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import Panel from '@santiment-network/ui/Panel/Panel'
import ContextMenu from '@santiment-network/ui/ContextMenu'
import Option from './Option'
import DialogFormRenameTemplate from '../Dialog/RenameTemplate'
import DeleteTemplate from '../Dialog/Delete/DeleteTemplate'
import ShareTemplate from '../Share/ShareTemplate'
import { isUserAuthorOfTemplate } from '../Dialog/LoadTemplate/utils'
import styles from '../Dialog/LoadTemplate/Template.module.scss'

const useMenuEffects = () => {
  const [isMenuOpened, setIsMenuOpened] = useState(false)

  function openMenu(e) {
    e.stopPropagation()

    setIsMenuOpened(true)
  }

  function closeMenu() {
    setIsMenuOpened(false)
  }

  return [isMenuOpened, openMenu, closeMenu]
}

const TemplateContextMenu = ({ template, onRename, onDelete, isAuthor, classes = {} }) => {
  const [isMenuOpened, openMenu, closeMenu] = useMenuEffects()

  return (
    <ContextMenu
      open={isMenuOpened}
      onClose={closeMenu}
      trigger={
        <Button
          variant='ghost'
          className={cx(styles.menu, classes.menuBtn, !isAuthor && styles.withUse)}
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
            onRename={(data) => {
              onRename && onRename(data)
              closeMenu()
            }}
          />
        )}

        <ShareTemplate template={template} className={cx(styles.option, styles.shareBtn)} />

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

const mapStateToProps = ({ user }, { template }) => ({
  isAuthor: isUserAuthorOfTemplate(user, template),
})

export default connect(mapStateToProps)(TemplateContextMenu)
