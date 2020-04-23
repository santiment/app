import React, { useState } from 'react'
import {push} from "react-router-redux";
import {connect} from "react-redux";
import {stringify} from "query-string";
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import { useDeleteTemplate, useUpdateTemplate } from '../../gql/hooks'
import TemplateContextMenu from '../../TemplateContextMenu/TemplateContextMenu'
import styles from './Template.module.scss'

const Template = ({
  template,
  selectTemplate,
  rerenderTemplates,
  rerenderTemplate,
  isAuthor = true,
  asLink = false,
  className,
  redirect
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

    if(asLink){
      const {slug} = project

      const Shareable = {
        metrics
      }

      const link = `/projects/${slug}?` + stringify(Shareable, {
        arrayFormat: 'comma'
      })

      redirect(link)
    }
  }

  function onDeleteClick () {
    deleteTemplate(template)
    selectTemplate && selectTemplate()
  }

  function onRename (template) {
    rerenderTemplates && rerenderTemplates()
    rerenderTemplate && rerenderTemplate(template)
    closeMenu()
  }

  return (
    <div
      className={cx(
        styles.wrapper,
        className,
      )}
      onClick={onTemplateClick}
    >
      <div className={styles.left}>
        <div>{title}</div>
        <div className={styles.info}>
          {project.name} · {metrics.length} metrics
        </div>
      </div>
      <div
        className={cx(
          styles.publicity,
          isPublic && styles.publicity_public,
          !isAuthor && styles.unclickable
        )}
        onClick={isAuthor && toggleIsPublic}
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
        isAuthor={isAuthor}
      />
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  redirect: (route) => {
    dispatch(push(route))
  }
})

export default connect(null, mapDispatchToProps)(Template)
