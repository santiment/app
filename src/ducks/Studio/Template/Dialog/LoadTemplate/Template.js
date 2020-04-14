import React, { useState } from 'react'
import cx from 'classnames'
import ContextMenu from '@santiment-network/ui/ContextMenu'
import Panel from '@santiment-network/ui/Panel/Panel'
import Button from '@santiment-network/ui/Button'
import Toggle from '@santiment-network/ui/Toggle'
import Icon from '@santiment-network/ui/Icon'
import DialogFormRenameTemplate from '../RenameTemplate'
import DialogFormDuplicateTemplate from '../DuplicateTemplate'
import { useDeleteTemplate, useUpdateTemplate } from '../../gql/hooks'
import ConfirmDialog from '../../../../../components/ConfirmDialog/ConfirmDialog'
import styles from './Template.module.scss'

const Option = props => (
  <Button {...props} fluid variant='ghost' className={styles.context__btn} />
)

const Template = ({
  template,
  selectedTemplate,
  selectTemplate,
  rerenderTemplates,
  rerenderTemplate
}) => {
  const { title, metrics, project } = template
  const [isPublic, setIsPublic] = useState(template.isPublic)
  const [isMenuOpened, setIsMenuOpened] = useState(false)
  const [deleteTemplate] = useDeleteTemplate()
  const [updateTemplate] = useUpdateTemplate()

  function toggleIsPublic () {
    setIsPublic(state => {
      const newState = !state
      updateTemplate(template, { isPublic: newState })
      return newState
    })
  }

  function openMenu () {
    setIsMenuOpened(true)
  }

  function closeMenu () {
    setIsMenuOpened(false)
  }

  function onTemplateClick ({ target, currentTarget }) {
    if (target === currentTarget) {
      selectTemplate(template)
    }
  }

  function onDeleteClick () {
    deleteTemplate(template)
    selectTemplate()
  }

  function onRename (template) {
    rerenderTemplates()
    rerenderTemplate(template)
    closeMenu()
  }

  return (
    <div className={styles.wrapper} onClick={onTemplateClick}>
      <div className={styles.left}>
        <div>{title}</div>
        <div className={styles.info}>
          {project.name} · {metrics.length} metrics
        </div>
      </div>
      <div
        className={cx(styles.publicity, isPublic && styles.publicity_public)}
        onClick={toggleIsPublic}
      >
        <Icon type={isPublic ? 'eye' : 'lock-small'} className={styles.icon} />
      </div>

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
          <Option onClick={toggleIsPublic}>
            Public
            <Toggle isActive={isPublic} className={styles.toggle} />
          </Option>
          <DialogFormRenameTemplate
            trigger={<Option>Rename</Option>}
            template={template}
            onRename={onRename}
          />
          <DialogFormDuplicateTemplate
            trigger={<Option>Duplicate</Option>}
            template={template}
            onDuplicate={closeMenu}
          />
          <ConfirmDialog
            title='Do you want to delete this template?'
            trigger={<Option>Delete</Option>}
            onApprove={onDeleteClick}
            onCancel={closeMenu}
          />
        </Panel>
      </ContextMenu>
    </div>
  )
}

export default Template
