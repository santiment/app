import React, { useState } from 'react'
import cx from 'classnames'
import Dialog from './index'
import { useCreateTemplate } from '../gql/hooks'

const NewTemplate = ({ onNew, ...props }) => {
  const [createTemplate] = useCreateTemplate()

  function onSubmit (value) {
    createTemplate(value).then(({ data }) => {
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
