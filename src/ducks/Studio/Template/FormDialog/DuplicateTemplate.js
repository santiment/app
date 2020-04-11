import React, { useState } from 'react'
import cx from 'classnames'
import Dialog from './index'

export default ({ ...props }) => {
  return (
    <Dialog
      {...props}
      title='Duplicate Template'
      onFormSubmit={console.log}
      buttonLabel='Duplicate'
      defaultValue='123'
    />
  )
}
