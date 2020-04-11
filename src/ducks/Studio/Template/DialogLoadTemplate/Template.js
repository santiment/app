import React, { useState, useEffect } from 'react'
import cx from 'classnames'
import ContextMenu from '@santiment-network/ui/ContextMenu'
import Panel from '@santiment-network/ui/Panel/Panel'
import Button from '@santiment-network/ui/Button'
import Toggle from '@santiment-network/ui/Toggle'
import Icon from '@santiment-network/ui/Icon'
import FormDialogRenameTemplate from '../FormDialog/RenameTemplate'
import FormDialogDuplicateTemplate from '../FormDialog/DuplicateTemplate'
import { useDeleteTemplate, useUpdateTemplate } from '../gql/hooks'
import styles from './Template.module.scss'

const Option = props => (
  <Button {...props} fluid variant='ghost' className={styles.context__btn} />
)

const Template = ({
  template,
  selectTemplate,
  rerenderTemplates,
  rerenderTemplate
}) => {
  const { title, metrics, project } = template
  const [isPublic, setIsPublic] = useState(template.isPublic)
  const [deleteTemplate] = useDeleteTemplate()
  const [updateTemplate] = useUpdateTemplate()

  function toggleIsPublic () {
    setIsPublic(state => {
      const newState = !state
      updateTemplate(template, { isPublic: newState })
      return newState
    })
  }

  function onTemplateClick ({ target, currentTarget }) {
    if (target === currentTarget) {
      selectTemplate(template)
    }
  }

  function onDeleteClick () {
    deleteTemplate(template)
  }

  function onRename () {
    rerenderTemplates()
    rerenderTemplate()
  }

  return (
    <div className={styles.wrapper} onClick={onTemplateClick}>
      <div className={styles.left}>
        <div>{title}</div>
        <div className={styles.info}>
          {project.name} | {metrics.length} metrics
        </div>
      </div>
      <div
        className={cx(styles.publicity, isPublic && styles.publicity_public)}
        onClick={toggleIsPublic}
      >
        <Icon type={isPublic ? 'eye' : 'lock-small'} className={styles.icon} />
      </div>

      <ContextMenu
        trigger={
          <Button variant='flat' className={cx(styles.menu)}>
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

          <FormDialogRenameTemplate
            trigger={<Option>Rename</Option>}
            template={template}
            onRename={onRename}
          />

          <FormDialogDuplicateTemplate
            trigger={<Option>Duplicate</Option>}
            template={template}
          />

          <Option onClick={onDeleteClick}>Delete</Option>
        </Panel>
      </ContextMenu>
    </div>
  )
}

export default Template
