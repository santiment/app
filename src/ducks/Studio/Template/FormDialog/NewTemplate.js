import React, { useState } from 'react'
import cx from 'classnames'
import Dialog from './index'
import { useCreateTemplate } from '../gql/hooks'

const getMetricKey = ({ key }) => key

const NewTemplate = ({ onNew, projectId, activeMetrics, ...props }) => {
  const [createTemplate] = useCreateTemplate()

  function onSubmit (title) {
    const newTemplate = {
      title,
      metrics: activeMetrics.map(getMetricKey),
      projectId: +projectId
    }

    createTemplate(newTemplate).then(({ data }) => {
      onNew(data.template)
    })
  }

  return (
    <Dialog
      {...props}
      title='New Template'
      placeholder='Name of the template...'
      onFormSubmit={onSubmit}
      buttonLabel='Create'
    />
  )
}

export default NewTemplate
