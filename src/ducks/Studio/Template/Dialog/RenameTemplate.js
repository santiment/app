import React from 'react'
import DialogForm from './DialogForm'
import { notifyRename } from '../notifications'
import { useUpdateTemplate } from '../gql/hooks'

export default ({ template, onRename, ...props }) => {
  const { title, description } = template
  const [updateTemplate, { loading }] = useUpdateTemplate()

  function onSubmit ({ title, description }) {
    updateTemplate(template, { title, description })
      .then(onRename)
      .then(notifyRename)
  }

  return (
    <DialogForm
      {...props}
      title='Save Chart Layout as...'
      onFormSubmit={onSubmit}
      buttonLabel='Save'
      defaultValue={title}
      description={description}
      isLoading={loading}
    />
  )
}
