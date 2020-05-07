import React from 'react'
import { connect } from 'react-redux'
import DialogForm from './DialogForm'
import { notifyRename } from '../notifications'
import { useUpdateTemplate } from '../gql/hooks'
import { TemplateStatusToggle } from '../TemplateStatus/TemplateStatus'
import { usePublicTemplates } from './LoadTemplate/Template'
import styles from '../TemplateDetailsDialog/TemplateDetailsDialog.module.scss'

const RenameTemplate = ({ template, onRename, isAuthor, ...props }) => {
  const { title, description } = template
  const [updateTemplate, { loading }] = useUpdateTemplate()

  function onSubmit ({ title, description }) {
    updateTemplate(template, { title, description })
      .then(onRename)
      .then(notifyRename)
  }

  const { isPublic, toggleIsPublic } = usePublicTemplates(template)

  return (
    <DialogForm
      {...props}
      title='Save Chart Layout as...'
      onFormSubmit={onSubmit}
      buttonLabel='Save'
      defaultValue={title}
      description={description}
      isLoading={loading}
      actions={
        isAuthor ? (
          <TemplateStatusToggle
            isPublic={isPublic}
            classes={styles}
            toggleIsPublic={toggleIsPublic}
          />
        ) : null
      }
    />
  )
}

const mapStateToProps = ({ user }, { template: { user: { id } = {} } }) => ({
  isAuthor: user && user.data && +user.data.id === +id
})

export default connect(mapStateToProps)(RenameTemplate)
