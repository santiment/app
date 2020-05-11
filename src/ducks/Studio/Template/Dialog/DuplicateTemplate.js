import React from 'react'
import DialogForm from './DialogForm'
import { notifyDuplication } from '../notifications'
import { useCreateTemplate } from '../gql/hooks'

export default ({
  onDuplicate,
  template,
  buttonLabel = 'Duplicate',
  ...props
}) => {
  const { title } = template
  const [createTemplate, { loading }] = useCreateTemplate()

  function onSubmit ({ title, description }) {
    const { metrics, project, options } = template

    createTemplate({
      title,
      description,
      metrics,
      isPublic: false,
      projectId: +project.id,
      options: JSON.stringify(options)
    })
      .then(onDuplicate)
      .then(notifyDuplication)
  }

  return (
    <DialogForm
      title='Duplicate Chart Layout'
      {...props}
      onFormSubmit={onSubmit}
      buttonLabel={buttonLabel}
      defaultValue={title ? title + ' copy' : title}
      isLoading={loading}
    />
  )
}
