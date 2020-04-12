import React, { useState } from 'react'
import cx from 'classnames'
import DialogForm from './DialogForm'
import { notifyDuplication } from '../notifications'
import { useCreateTemplate } from '../gql/hooks'

export default ({ onDuplicate, template, ...props }) => {
  const { title } = template
  const [createTemplate] = useCreateTemplate()

  function onSubmit (title) {
    const { metrics, project, isPublic } = template
    const duplicatedTemplate = {
      title,
      metrics,
      isPublic,
      projectId: +project.id
    }

    createTemplate(duplicatedTemplate)
      .then(onDuplicate)
      .then(notifyDuplication)
  }

  return (
    <DialogForm
      {...props}
      title='Duplicate Template'
      onFormSubmit={onSubmit}
      buttonLabel='Duplicate'
      defaultValue={title + ' copy'}
    />
  )
}
