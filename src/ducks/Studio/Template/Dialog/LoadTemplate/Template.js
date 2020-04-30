import React, { useState } from 'react'
import {push} from "react-router-redux";
import {connect} from "react-redux";
import {stringify} from "query-string";
import cx from 'classnames'
import { useDeleteTemplate, useUpdateTemplate } from '../../gql/hooks'
import {getMultiChartsValue} from "../../utils";
import {COMPARE_CONNECTOR} from "../../../url";
import TemplateDetailsDialog from "../../TemplateDetailsDialog/TemplateDetailsDialog";
import TemplateStatus from "../../TemplateStatus/TemplateStatus";
import styles from './Template.module.scss'

export function prepareTemplateLink(template) {
  const {project, metrics} = template
  const {slug} = project

  const Shareable = {
    metrics,
    isMultiChartsActive: getMultiChartsValue(template)
  }

  return `/projects/${slug}?` + stringify(Shareable, {
    arrayFormat: 'comma'
  })
}

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
  const { title, metrics } = template
  const [isPublic, setIsPublic] = useState(template.isPublic)
  const [deleteTemplate] = useDeleteTemplate()
  const [updateTemplate] = useUpdateTemplate()

  function toggleIsPublic (e) {
    e.stopPropagation()

    setIsPublic(state => {
      const newState = !state
      updateTemplate(template, { isPublic: newState })
      return newState
    })
  }


  function onTemplateClick ({ target, currentTarget }) {
    if (target === currentTarget) {
      selectTemplate && selectTemplate(template)

      if(asLink){
        const link = prepareTemplateLink(template)

        redirect(link)
      }
    }
  }

  function onDeleteClick () {
    deleteTemplate(template)
    selectTemplate && selectTemplate()
  }

  function onRename (template) {
    rerenderTemplates && rerenderTemplates()
    rerenderTemplate && rerenderTemplate(template)
  }

  const countAssets = metrics.reduce((total,x) => (x.indexOf(COMPARE_CONNECTOR) !== -1 ? total+1 : total), 0) + 1

  return (
    <div
      className={cx(
        styles.wrapper,
        className,
      )}
      onClick={onTemplateClick}
    >
      <div className={styles.left}>
        <div className={styles.title}>{title}</div>
        <div className={styles.info}>
          <TemplateStatus isAuthor={isAuthor} isPublic={isPublic} toggleIsPublic={toggleIsPublic}/>
          <span>
             · {countAssets} assets · {metrics.length} metrics
          </span>
        </div>
      </div>

      <TemplateDetailsDialog
        template={template}
        toggleIsPublic={toggleIsPublic}
        onDeleteClick={onDeleteClick}
        onRename={onRename}
        isPublic={isPublic}
        isAuthor={isAuthor}/>

    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  redirect: (route) => {
    dispatch(push(route))
  }
})

export default connect(null, mapDispatchToProps)(Template)
