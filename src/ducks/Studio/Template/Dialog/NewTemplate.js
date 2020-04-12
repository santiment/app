import React, { useState } from 'react'
import cx from 'classnames'
import DialogForm from './DialogForm'
import { getMetricKey } from '../utils'
import { notifyCreation } from '../notifications'
import { useCreateTemplate } from '../gql/hooks'

const NewTemplate = ({ onNew, projectId, metrics, comparables, ...props }) => {
  const [createTemplate] = useCreateTemplate()

  function onSubmit (title) {
    createTemplate({
      title,
      metrics,
      comparables,
      projectId
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
    />
  )
}

export default NewTemplate
