import React, { useState } from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import { useDeleteTemplate, useUpdateTemplate } from '../../gql/hooks'
import styles from './Template.module.scss'
import TemplateContextMenu from '../../TemplateContextMenu/TemplateContextMenu'

const Template = ({
  template,
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
      selectTemplate && selectTemplate(template)
    }
  }

  function onDeleteClick () {
    deleteTemplate(template)
    selectTemplate && selectTemplate()
  }

  function onRename (template) {
    rerenderTemplates()
    rerenderTemplate(template)
    closeMenu()
  }

  return (
    <div
      className={cx(styles.wrapper, !selectTemplate && styles.unclickable)}
      onClick={onTemplateClick}
    >
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

      <TemplateContextMenu
        template={template}
        isMenuOpened={isMenuOpened}
        closeMenu={closeMenu}
        toggleIsPublic={toggleIsPublic}
        openMenu={openMenu}
        onDeleteClick={onDeleteClick}
        onRename={onRename}
        isPublic={isPublic}
      />
    </div>
  )
}

export default Template
