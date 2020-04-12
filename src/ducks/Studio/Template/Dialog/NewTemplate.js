import React from 'react'
import DialogForm from './DialogForm'
import { notifyCreation } from '../notifications'
import { buildTemplateMetrics } from '../utils'
import { useCreateTemplate } from '../gql/hooks'

const NewTemplate = ({ onNew, projectId, metrics, comparables, ...props }) => {
  const [createTemplate, { loading }] = useCreateTemplate()

  function onSubmit (title) {
    createTemplate({
      title,
      metrics: buildTemplateMetrics({ metrics, comparables }),
      projectId: +projectId
    })
      .then(onNew)
      .then(notifyCreation)
  }

  return (
    <DialogForm
      {...props}
      title='New Template'
      placeholder='Name of the template...'
      onFormSubmit={onSubmit}
      buttonLabel='Create'
      isLoading={loading}
    />
  )
}

export default NewTemplate
