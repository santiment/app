import React, { useState } from 'react'
import cx from 'classnames'
import Dialog from './index'

export default ({ template, onRename, ...props }) => {
  const { title } = template

  function onSubmit (value) {
    template.title = value
    onRename(value)
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
