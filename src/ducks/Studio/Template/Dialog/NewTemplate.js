import React from 'react'
import DialogForm from './DialogForm'
import { notifyCreation } from '../notifications'
import { buildTemplateMetrics } from '../utils'
import { useCreateTemplate } from '../gql/hooks'

const NewTemplate = ({ onNew, projectId, metrics, comparables, ...props }) => {
  const [createTemplate, { loading }] = useCreateTemplate()

  function onSubmit ({ title, description }) {
    createTemplate({
      title,
      description,
      metrics: buildTemplateMetrics({ metrics, comparables }),
      projectId: +projectId
    })
      .then(onNew)
      .then(notifyCreation)
  }

  return (
    <DialogForm
      {...props}
      title='New Chart Layout'
      onFormSubmit={onSubmit}
      buttonLabel='Create'
      isLoading={loading}
    />
  )
}

export default NewTemplate
