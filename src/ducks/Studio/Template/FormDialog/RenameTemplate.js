import React, { useState } from 'react'
import cx from 'classnames'
import Dialog from './index'
import { notifyRename } from '../notifications'
import { useUpdateTemplate } from '../gql/hooks'

export default ({ template, onRename, ...props }) => {
  const { title } = template
  const [updateTemplate] = useUpdateTemplate()

  function onSubmit (title) {
    updateTemplate(template, { title })
      .then(onRename)
      .then(notifyRename)
  }

  return (
    <Dialog
      {...props}
      title='Rename Template'
      onFormSubmit={onSubmit}
      buttonLabel='Rename'
      defaultValue={title}
    />
  )
}
