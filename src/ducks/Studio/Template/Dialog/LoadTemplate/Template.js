import React, { useState } from 'react'
import {push} from "react-router-redux";
import {connect} from "react-redux";
import {stringify} from "query-string";
import cx from 'classnames'
import { useUpdateTemplate } from '../../gql/hooks'
import {getMultiChartsValue, getTemplateAssets, getTemplateMetrics} from "../../utils";
import TemplateDetailsDialog, {TemplateInfoTrigger} from "../../TemplateDetailsDialog/TemplateDetailsDialog";
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

export const usePublicTemplates = (template) => {
  const [updateTemplate] = useUpdateTemplate()
  const [isPublic, setIsPublic] = useState(template.isPublic)
  function toggleIsPublic (e) {
    e.stopPropagation()

    setIsPublic(state => {
      const newState = !state
      updateTemplate(template, { isPublic: newState })
      return newState
    })
  }

  return {isPublic, toggleIsPublic}
}

const Template = ({
  template,
  selectTemplate,
  isAuthor,
  asLink = false,
  className,
  redirect,
  onOpenTemplate,
  onRename = () => {}
}) => {
  const { title } = template
  const {isPublic, toggleIsPublic} = usePublicTemplates(template);

  function onTemplateClick ({ target, currentTarget }) {
    if (target === currentTarget) {
      selectTemplate && selectTemplate(template)

      if(asLink){
        const link = prepareTemplateLink(template)

        redirect(link)
      }
    }
  }

  const usedAssets = getTemplateAssets(template)
  const usedMetrics = getTemplateMetrics(template)

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
             · {usedAssets.length} asset(s) · {usedMetrics.length} metric(s)
          </span>
        </div>
      </div>

      {onOpenTemplate
        ? <TemplateInfoTrigger onClick={() => onOpenTemplate(template)}/>
        : <TemplateDetailsDialog
          template={template}
          onRename={onRename}
          selectTemplate={selectTemplate}
        />}
    </div>
  )
}

const mapStateToProps = ({ user }, { template: {user: {id} = {}} }) => ({
  isAuthor: user && user.data && +user.data.id === +id
})
const mapDispatchToProps = dispatch => ({
  redirect: (route) => {
    dispatch(push(route))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Template)
