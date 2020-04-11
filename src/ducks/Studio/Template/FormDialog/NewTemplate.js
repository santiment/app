import React, { useState } from 'react'
import cx from 'classnames'
import Dialog from './index'
import { getMetricKey } from '../utils'
import { useCreateTemplate } from '../gql/hooks'

const NewTemplate = ({ onNew, projectId, metrics, ...props }) => {
  const [createTemplate] = useCreateTemplate()

  function onSubmit (title) {
    const newTemplate = {
      title,
      metrics: metrics.map(getMetricKey),
      projectId: +projectId
    }

    createTemplate(newTemplate).then(onNew)
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
