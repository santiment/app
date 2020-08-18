import React, { useState } from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import Button from '@santiment-network/ui/Button'
import Dialog from '@santiment-network/ui/Dialog'
import TemplateContextMenu from '../TemplateContextMenu/TemplateContextMenu'
import UseTemplateBtn from '../UseTemplateBtn/UseTemplateBtn'
import {
  isUserAuthorOfTemplate,
  usePublicTemplates
} from '../Dialog/LoadTemplate/utils'
import TemplateStatus, {
  TemplateStatusToggle
} from '../TemplateStatus/TemplateStatus'
import TemplateInfo from './TemplateInfo'
import externalStyles from '../Dialog/LoadTemplate/Template.module.scss'
import styles from './TemplateDetailsDialog.module.scss'

export const TemplateInfoTrigger = ({ onClick, classes = {}, ...rest }) => (
  <Button
    {...rest}
    onClick={e => {
      e.stopPropagation()
      onClick(e)
    }}
    variant='flat'
    className={cx(externalStyles.menu, styles.trigger, classes.trigger)}
  >
    See details
  </Button>
)

const TemplateDetailsDialog = ({
  template,
  isAuthor,
  isDialog = true,
  onRename,
  onDelete,
  selectTemplate
}) => {
  const { isPublic, toggleIsPublic } = usePublicTemplates(template)

  const [isOpen, setOpen] = useState(false)

  const El = isDialog ? Dialog : 'div'

  return (
    <El
      open={isOpen}
      onOpen={() => {
        setOpen(true)
      }}
      onClose={() => {
        setOpen(false)
      }}
      title={isDialog && template.title}
      classes={styles}
      trigger={<TemplateInfoTrigger />}
      className={styles.template}
    >
      <div className={styles.container}>
        <div className={styles.actions}>
          {!isAuthor && (
            <UseTemplateBtn
              template={template}
              onClick={() => selectTemplate(template)}
            />
          )}

          <TemplateContextMenu
            template={template}
            onRename={data => {
              setOpen(false)
              onRename(data)
            }}
            classes={styles}
            onDelete={onDelete}
          />

          {isAuthor ? (
            <TemplateStatusToggle
              isPublic={isPublic}
              classes={styles}
              toggleIsPublic={toggleIsPublic}
            />
          ) : (
            <TemplateStatus
              isAuthor={isAuthor}
              isPublic={isPublic}
              classes={styles}
            />
          )}
        </div>

        <TemplateInfo template={template} as='div' />
      </div>
    </El>
  )
}

const mapStateToProps = ({ user }, { template }) => ({
  isAuthor: isUserAuthorOfTemplate(user, template)
})

export default connect(mapStateToProps)(TemplateDetailsDialog)
