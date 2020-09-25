import React from 'react'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import cx from 'classnames'
import { getTemplateInfo, prepareTemplateLink } from '../../utils'
import TemplateDetailsDialog, {
  TemplateInfoTrigger
} from '../../TemplateDetailsDialog/TemplateDetailsDialog'
import TemplateStatus from '../../TemplateStatus/TemplateStatus'
import { updateHistory } from '../../../../../utils/utils'
import styles from './Template.module.scss'
import { isUserAuthorOfTemplate, usePublicTemplates } from './utils'

export const openTemplate = ({ redirect, template, asProject }) => {
  const link = prepareTemplateLink(template, asProject)

  updateHistory(link)
  redirect(link)
}

const Template = ({
  template,
  selectTemplate,
  isAuthor,
  asLink = false,
  className,
  redirect,
  onOpenTemplate,
  onRename = () => {},
  asProject
}) => {
  const { title } = template
  const { isPublic, toggleIsPublic } = usePublicTemplates(template)

  function onTemplateClick () {
    selectTemplate && selectTemplate(template)

    if (asLink) {
      openTemplate({ redirect, template, asProject })
    }
  }

  const { assets: usedAssets, metrics: usedMetrics } = getTemplateInfo(template)

  return (
    <div className={cx(styles.wrapper, className)}>
      <div className={styles.left} onClick={onTemplateClick}>
        <div className={styles.title}>{title}</div>
        <div className={styles.info}>
          <TemplateStatus
            isAuthor={isAuthor}
            isPublic={isPublic}
            toggleIsPublic={toggleIsPublic}
            classes={styles}
          />
          <span>
            · {usedAssets.length} asset(s) · {usedMetrics.length} metric(s)
          </span>
        </div>
      </div>

      {onOpenTemplate ? (
        <TemplateInfoTrigger
          classes={styles}
          onClick={e => {
            e.stopPropagation()

            onOpenTemplate(template)
          }}
        />
      ) : (
        <TemplateDetailsDialog
          template={template}
          onRename={onRename}
          selectTemplate={selectTemplate}
        />
      )}
    </div>
  )
}

const mapStateToProps = ({ user }, { template }) => ({
  isAuthor: isUserAuthorOfTemplate(user, template)
})

const mapDispatchToProps = dispatch => ({
  redirect: route => {
    dispatch(push(route))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Template)
