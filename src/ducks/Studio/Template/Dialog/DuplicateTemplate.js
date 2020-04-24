import React from 'react'
import DialogForm from './DialogForm'
import { notifyDuplication } from '../notifications'
import { useCreateTemplate } from '../gql/hooks'

export default ({ onDuplicate, template, ...props }) => {
  const { title } = template
  const [createTemplate, { loading }] = useCreateTemplate()

  function onSubmit (title) {
    const { metrics, project, isPublic, options } = template

    createTemplate({
      title,
      metrics,
      isPublic,
      projectId: +project.id,
      options: JSON.stringify(options)
    })
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
      isLoading={loading}
    />
  )
}
